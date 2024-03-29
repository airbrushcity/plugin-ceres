<template>
        <div class="position-relative mx-1">
            <div class="d-flex flex-grow-1 position-relative">
                <input type="search" class="search-input flex-grow-1 p-0 ml-2 bg-white" ref="searchInput" v-model="searchString" @input="onValueChanged($event.target.value)"
                    @keyup.enter="search()" @focus="isSearchFocused = true" @blur="onBlurSearchField($event)" :autofocus="isShopBuilder" :placeholder="$translate('Ceres::Template.headerSearchPlaceholder')" :aria-label="$translate('Ceres::Template.headerSearchTerm')">

                <slot name="search-button">
                    <button class="my-search-button px-2 mr-1" type="submit" @click="search()" :aria-label="$translate('Ceres::Template.headerSearch')">
                        <icon class="fa-fw" icon="search" :loading="autocompleteIsLoading"></icon>
                    </button>
                </slot>
            </div>

            <template v-if="isSearchFocused">
                <div v-show="(searchString.length >= searchMinLength && hasInitialInput) || $ceres.isShopBuilder">
                    <slot name="autocomplete-suggestions">
                        <div class="autocomplete-suggestions shadow bg-white w-100">
                            <search-suggestion-item
                                :show-images="showItemImages"
                                suggestion-type="item">
                            </search-suggestion-item>
                        </div>
                    </slot>
                </div>
            </template>
        </div>
</template>

<script>
import UrlService from "../../services/UrlService";
import { isNullOrUndefined, defaultValue } from "../../helper/utils";
import { pathnameEquals } from "../../helper/url";
import { mapState } from 'vuex';
import { debounce } from '../../helper/debounce';

export default {

    name: "item-search",

    props: {
        showItemImages:
        {
            type: Boolean
        },
        forwardToSingleItem:
        {
            type: Boolean,
            default: App.config.search.forwardToSingleItem
        },
        timeout:
        {
            type: Number,
            default: 200
        },
        searchMinLength:
        {
            type: Number,
            default: 2
        }
    },

    data()
    {
        return {
            isSearchFocused: App.isShopBuilder,
            onValueChanged: null,
            searchString: "",
            hasInitialInput: false
        };
    },

    computed:
    {
        hasAutocompleteResults()
        {
            const item       = this.autocompleteResult.item;
            const category   = this.autocompleteResult.category;
            const suggestion = this.autocompleteResult.suggestion;

            return App.isShopBuilder || (item && item.length) || (category && category.length) || (suggestion && suggestion.length);
        },

        isShopBuilder()
        {
            return App.isShopBuilder;
        },

        ...mapState({
            autocompleteResult: state => state.itemSearch.autocompleteResult,
            moduleSearchString: state => state.itemList.searchString,
            autocompleteIsLoading: state => state.itemSearch.autocompleteIsLoading
        })
    },

    mounted()
    {
        this.onValueChanged = debounce(searchString =>
        {
            this.autocomplete(searchString);
        }, defaultValue(this.timeout, 200));

        this.$nextTick(() =>
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            this.$store.commit("setItemListSearchString", urlParams.query);

            this.$refs.searchInput.value = !isNullOrUndefined(urlParams.query) ? urlParams.query : "";
        });
    },

    methods:
    {
        search()
        {
            if (this.$refs.searchInput.value.length)
            {
                if (pathnameEquals(App.urls.search))
                {
                    this.$store.dispatch("searchItems", this.$refs.searchInput.value);
                }
                else
                {
                    window.open(`${App.urls.search}?query=${ this.searchString }`, "_self", false);
                }
            }
        },

        autocomplete(searchString)
        {
            if (searchString.length >= this.searchMinLength)
            {
                this.$store.dispatch("loadItemSearchAutocomplete", searchString);
            }
            else
            {
                this.$store.commit("setAutocompleteResult", { item: [], category: [], suggestion: [] });

                // hide the autocomplete box
                this.hasInitialInput = false;
            }
        },

        // hide search, if targetElement of the blur event is not a child of components' root element
        onBlurSearchField(event)
        {
            const target = event.relatedTarget;

            if (isNullOrUndefined(target) || !isNullOrUndefined(target) && !this.$el.contains(target))
            {
                this.isSearchFocused = false;
            }
        }
    },

    watch:
    {
        // set the current search string, after clicking on a suggestion
        moduleSearchString(newVal)
        {
            if (newVal && newVal.length)
            {
                this.searchString = newVal;
            }
        },

        autocompleteIsLoading(newVal, oldVal) {
            // when client was loading and has stopped now, the autocomplete box should be shown
            if (oldVal && !newVal) {
                this.hasInitialInput = true;
            }
        }
    }
}
</script>
