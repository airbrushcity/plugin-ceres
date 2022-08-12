<template>
    <div>
        <slot :getDataField="getDataField" :getFilteredDataField="getFilteredDataField">
            <div class="single container-max page-content">
                <div class="row position-relative px-2">

                    <div class="col-12 mt-3">
                        <h2 class="h2 title" data-testing="item-name">
                            <span>{{ currentVariation | itemName }}</span>
                        </h2>
                    </div>

                    <div class="col-12 col-md-4 mt-2">
                        <slot name="image-carousel"></slot>
                    </div>

                    <div class="col-12 col-md-4 mt-md-2">

                            <ul class="nav nav-tabs" role="tablist">
							
								<li class="nav-item" v-if="isVideoAvailable">
                                    <a :class="{ 'active': isDescriptionTabActive || isTechnicalDataTabActive || isPdfTabActive && !isVideoTabActive}" class="nav-link" data-toggle="tab" :href="'#youtube-videos'" role="tab">Produkt Video</a>
                                </li>

                            </ul>

                            <div class="producertag h6 producer text-muted" v-if="currentVariation.filter.hasManufacturer">
                                Marke: {{ currentVariation.item.manufacturer.externalName }}
                            </div>
                            <div class="my-2">
                            <p class="single-description"
                               v-if="isShortDescriptionActive && currentVariation.texts.shortDescription !== ''"
                               v-html="currentVariation.texts.shortDescription"></p>
                            </div>
                            <div class="my-2" v-html="currentVariation.texts.technicalData">
                            </div>
                    </div>

                    <div class="col-12 col-md-4 mt-md-2">
                        
                            <div class="row mb-2">
                                <div class="col-6 pt-1">
                                    <span class="articlenumber small text-muted">
                                        <span>{{ $translate("Ceres::Template.singleItemNumber") }} </span>
                                        <b>{{ currentVariation.item.id }}</b>
                                    </span>
                                </div>
                                <div class="col-6">
                                    <div v-if="isWishListEnabled">
                                        <add-to-wish-list :variation-id="currentVariation.variation.id"></add-to-wish-list>
                                    </div>
                                </div>
                            </div>

                            <!-- Variation -->
                            <div class="mb-0" v-if="attributes.length || Object.keys(units).length">
                                <variation-select></variation-select>
                            </div>
                            <!-- /Variation -->

                            <!-- Item Bundle -->
                            <item-bundle v-if="currentVariation.variation.bundleType === 'bundle'" :bundle-type="currentVariation.variation.bundleType" :bundle-components="currentVariation.bundleComponents"></item-bundle>
                            <!-- /Item Bundle -->

                            
                            <item-availability></item-availability>

                            <div class="my-2">
                            <h6>Versandgewicht: {{ currentVariation.variation.weightG }} Gramm.</h6>
                            <h6><strong>Deutschland:</strong> Standard DHL Lieferzeit 1 bis 3 Tage.</h6>
                            <h6>(Auslandsversand Lieferzeit 3 bis 14 Tage)</h6>
                            </div>

                            <slot name="before-price"></slot>

                            <div v-if="currentVariation.filter.isSalable && variationGroupedProperties.length">
                                <order-property-list></order-property-list>
                            </div>

                            <graduated-prices></graduated-prices>

                            <item-price :show-cross-price="isRecommendedPriceActive"></item-price>

                            <slot name="after-price"></slot>


                            <div class="my-3">
                                <div class="w-100">
                                    <slot name="before-add-to-basket"></slot>
                                </div>

                                <div v-if="currentVariation.item.itemType === 'set'" class="alert alert-info w-100">
                                    {{ $translate("Ceres::Template.singleItemSetInfo") }}
                                </div>
                                <div v-else class="col-12 col-sm-7 col-md-12 col-lg-8 my-3 pl-0">
                                    <add-to-basket
                                        :variation-id="currentVariation.variation.id"
                                        :is-salable="!!currentVariation.filter && currentVariation.filter.isSalable"
                                        :has-children="!!currentVariation.filter && currentVariation.filter.hasActiveChildren"
                                        :interval-quantity="currentVariation.variation.intervalOrderQuantity || 1"
                                        :minimum-quantity="currentVariation.variation.minimumOrderQuantity"
                                        :maximum-quantity="!!currentVariation.variation.maximumOrderQuantity && currentVariation.variation.maximumOrderQuantity > 0 ? currentVariation.variation.maximumOrderQuantity : null"
                                        :order-properties="currentVariation.properties.filter(function(prop) { return prop.property.isOderProperty })"
                                        :has-order-properties="currentVariation.hasOrderProperties"
                                        :has-required-order-property="currentVariation.hasRequiredOrderProperty"
                                        :use-large-scale="false"
                                        :show-quantity="true"
                                        :item-url="currentVariation | itemURL"
                                        :is-variation-selected="isVariationSelected && currentVariation.filter.isSalable"
                                        :has-price="currentVariation | hasItemDefaultPrice"
                                    >
                                    </add-to-basket>
                                </div>

                                <div class="w-100">
                                    <slot name="after-add-to-basket"></slot>
                                </div>
                            </div>

                            <!-- ./ITEM DETAIL -->

                            <slot name="additional-content-after-add-to-basket"></slot>

                            <slot name="additional-content-after-vat"></slot>
                            <!-- END SINGLEITEM_DETAILS -->
                      
                    </div>

                    <div>
                    
                        <!-- Hier kommt das Crosselling ähnliche Artikel dann rein -->

                    </div>

                    <div class="col-12">
                        <!-- ITEM DESCRIPTION -->
                        <div class="my-2">
                            <ul class="nav nav-tabs" role="tablist">
							
                                <li class="nav-item" v-if="isDescriptionTabActive">
                                    <a class="nav-link active" data-toggle="tab" :href="'#details-' + currentVariation.variation.id" role="tab">{{ $translate("Ceres::Template.singleItemDescription") }}</a>
                                </li>
								
								<li class="nav-item" v-if="isTechnicalDataTabActive">
                                    <a :class="{ 'active': !isDescriptionTabActive && !isVideoTabActive && !isPdfTabActive && isTechnicalDataTabActive }" class="nav-link" data-toggle="tab" :href="'#data-' + currentVariation.variation.id" role="tab">{{ $translate("Ceres::Template.singleItemTechnicalData") }}</a>
                                </li>


                                <li class="nav-item" v-if="isVideoTabActive">
                                    <a :class="{ 'active': !isDescriptionTabActive && !isTechnicalDataTabActive && !isPdfTabActive && isVideoTabActive }" class="nav-link" data-toggle="tab" href="#youtube-videos" role="tab">Produkt Video</a>
                                </li>

								<li class="nav-item" v-if="isPdfTabActive">
                                    <a :class="{ 'active': !isDescriptionTabActive && !isTechnicalDataTabActive && !isVideoTabActive && isPdfTabActive }" class="nav-link" data-toggle="tab" href="#assessments-details" role="tab">{{ $translate("Ceres::Template.singleItemMoreDetails") }}</a>
                                </li>

                                <slot name="add-detail-tabs"></slot>
                            </ul>

                            <div class="tab-content overflow-hidden">
                                <div class="tab-pane active overflow-auto" :id="'details-' + currentVariation.variation.id" role="tabpanel" v-if="isDescriptionTabActive"> 

                                    <div class="my-2 p-2" v-html="currentVariation.texts.description">
                                    </div>

                                </div>


                                <div :class="{ 'active': !isDescriptionTabActive && !isVideoTabActive && !isPdfTabActive && isTechnicalDataTabActive }" class="tab-pane overflow-auto" :id="'data-' + currentVariation.variation.id" role="tabpanel" v-if="isTechnicalDataTabActive">
                                    <div class="my-2">

                                        <table class="table table-striped table-hover table-sm">
                                            <tbody>
                                            <tr v-if="itemConfig.includes('item.id') || itemConfig.includes('all')">
                                                <td>{{ $translate("Ceres::Template.singleItemId") }}</td>
                                                <td>{{ currentVariation.item.id }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.item.condition && currentVariation.item.condition.names.name !== '' && (itemConfig.includes('item.condition') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemCondition") }}</td>
                                                <td>{{ currentVariation.item.condition.names.name }}</td>
                                            </tr>

                                            <tr v-if="itemConfig.includes('item.age_rating') || itemConfig.includes('all')">
                                                <td>{{ $translate("Ceres::Template.singleItemAge") }}</td>
                                                <td>{{ currentVariation.item.ageRestriction | ageRestriction }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.externalId !== '' && (itemConfig.includes('item.external_id') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemExternalVariationId") }}</td>
                                                <td>{{ currentVariation.variation.externalId }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.model !== '' && (itemConfig.includes('item.variation_model') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemModel") }}</td>
                                                <td>{{ currentVariation.variation.model }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.filter.hasManufacturer && currentVariation.item.manufacturer.externalName !== '' && (itemConfig.includes('item.manufacturer') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemManufacturer") }}</td>
                                                <td>{{ currentVariation.item.manufacturer.externalName }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.item.producingCountry && currentVariation.item.producingCountry.names.name !== '' && (itemConfig.includes('item.producerCountry') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemManufacturingCountry") }}</td>
                                                <td>{{ currentVariation.item.producingCountry.names.name }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.unit && (itemConfig.includes('item.variationBase_content') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemContent") }}</td>
                                                <td>{{ currentVariation.unit.content }} {{ currentVariation.unit.names.name }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.weightG !== '' && (itemConfig.includes('item.weightG') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemWeight") }}</td>
                                                <td>{{ currentVariation.variation.weightG }} g</td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.weightNetG !== '' && (itemConfig.includes('item.weightNetG') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemNetWeight") }}</td>
                                                <td>{{ currentVariation.variation.weightNetG }} g</td>
                                            </tr>

                                            <tr v-if="itemConfig.includes('item.variation_dimensions') || itemConfig.includes('all')">
                                                <td>{{ $translate("Ceres::Template.singleItemDimensions") }}</td>
                                                <td>
                                                    <span>{{ currentVariation.variation.lengthMM }}</span>&times;<!--
                                                --><span>{{ currentVariation.variation.widthMM }}</span>&times;<!--
                                                --><span>{{ currentVariation.variation.heightMM }}</span> mm
                                                </td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.customsTariffNumber !== '' && (itemConfig.includes('variation.customs_tariff_number') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemCustomsTariffNumber") }}</td>
                                                <td>{{ currentVariation.variation.customsTariffNumber }}</td>
                                            </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>

                                <div :class="{ 'active': !isDescriptionTabActive && !isTechnicalDataTabActive && !isPdfTabActive && isVideoTabActive }" class="tab-pane overflow-auto" id="youtube-videos" role="tabpanel" v-if="isVideoTabActive">
                                    <div class="my-2">

                                        <!-- Hier kommt das Video! -->
                                        <template v-if="$store.getters.currentItemVariation.variationProperties && $store.getters.currentItemVariation.variationProperties.length > 0">
                                            <template v-for="(variationPropertyGroups, index) in $store.getters.currentItemVariation.variationProperties">
                                                <template v-for="(variationProperty, index) in variationPropertyGroups.properties">
                                                    <template v-if="variationProperty.id === 169 && variationProperty.values.value.length > 0">
                                                        <div class="row mx-2 mb-4">
                                                            <div class="col-12 p-0 embed-responsive embed-responsive-16by9">
                                                                <iframe class="embed-responsive-item"  :src="'https://www.youtube-nocookie.com/embed/' + variationProperty.values.value" rel=0 allowfullscreen></iframe>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template v-else></template>
                                                </template>
                                            </template>
                                        </template>

                                    </div>
                                </div>

                                <div :class="{ 'active': !isDescriptionTabActive && !isVideoTabActive && !isTechnicalDataTabActive && isPdfTabActive}" class="tab-pane overflow-auto" id="assessments-details" role="tabpanel" v-if="isPdfTabActive">
                                    <div class="my-2">
                                        <div class="text-center">
                                        <!-- Hier kommen die PDF Anhänge -->
                                        <template v-if="$store.getters.currentItemVariation.variationProperties && $store.getters.currentItemVariation.variationProperties.length > 0">
                                            <template v-for="(variationPropertyGroups, index) in $store.getters.currentItemVariation.variationProperties">
                                                <template v-for="(variationProperty, index) in variationPropertyGroups.properties" v-if="variationPropertyGroups.id === 1">
                                                    <template v-if="variationProperty.id === 4">
                                                        <div>
                                                            <a :href="cdnUrl + '/frontend/anhang/sicherheitsdatenblatt/' + variationProperty.values.value" v-html="variationProperty.names.name" target="_blank"></a>
                                                        </div>
                                                    </template>
                                                    <template v-if="variationProperty.id === 5">
                                                        <div>
                                                            <a :href="cdnUrl + '/frontend/anhang/merkblatt/' + variationProperty.values.value" v-html="variationProperty.names.name" target="_blank"></a> 
                                                        </div>
                                                    </template>
                                                    <template v-if="variationProperty.id === 7">
                                                         <div>
                                                            <a :href="cdnUrl + '/frontend/anhang/bedienungsanleitung/' + variationProperty.values.value" v-html="variationProperty.names.name" target="_blank"></a> 
                                                        </div>
                                                    </template>
                                                    <template v-if="variationProperty.id === 223">
                                                         <div>
                                                            <a :href="cdnUrl + '/frontend/anhang/farbkarte/' + variationProperty.values.value" v-html="variationProperty.names.name" target="_blank"></a> 
                                                        </div>
                                                    </template>
                                                    <template v-if="variationProperty.id === 224">
                                                        <div>
                                                            <a :href="cdnUrl + '/frontend/anhang/sonstige/' + variationProperty.values.value" v-html="variationProperty.names.name" target="_blank"></a> 
                                                        </div>
                                                    </template>
                                                    <template v-else></template>
                                                </template>
                                            </template>
                                        </template>
                                        </div>
                                    </div>
                                </div>

                                <slot name="add-detail-tabs-content"></slot>
                            </div>
                        </div>
                        <!-- ./ITEM DESCRIPTION -->
                    </div>

                </div>

                <slot name="item-list-container"></slot>
                <slot name="feedback-container"></slot>
            </div>
        </slot>
    </div>
</template>

<script>
import { get } from "../../helper/get";
import { isNullOrUndefined } from "../../helper/utils";

export default {

    name: "single-item",

    props: {
        pleaseSelectOptionVariationId: {
            type: Number,
            default: 0
        },
        initPleaseSelectOption: {
            type: Boolean,
            default: false
        },
        showNetPrices: {
            type: Boolean,
            default: false
        },
        isWishListEnabled: {
            type: Boolean,
            default: false
        },
        itemId: {
            type: Number,
            required: true
        },
        afterKey: Object
    },

    jsonDataFields: [
        "itemData",
        "attributesData",
        "variations"
    ],

    provide()
    {
        return {
            itemId: this.$props.itemId
        }
    },

    data: function() 
    {
        return {
            cdnUrl: 'https://image.airbrush-city.de'
        };            
    },

    computed:
    {
        itemConfig()
        {
            return App.config.item.itemData;
        },

        isDescriptionTabActive()
        {
            return (App.config.item.itemData.includes("item.description") || App.config.item.itemData.includes("all"))
                && !!this.currentVariation.texts.description.length;
        },

        isRecommendedPriceActive()
        {
            return App.config.item.itemData.includes("item.recommendedPrice") || App.config.item.itemData.includes("all");
        },

        isShortDescriptionActive()
        {
            return App.config.item.itemData.includes("item.shortDescription") || App.config.item.itemData.includes("all");
        },

        hasShippingCostsCategoryId()
        {
            return App.config.global.shippingCostsCategoryId > 0;
        },

        isTechnicalDataTabActive()
        {
            return (App.config.item.itemData.includes("item.technical_data") || App.config.item.itemData.includes("all"))
                && !!this.currentVariation.texts.technicalData.length;
        },

        variationGroupedProperties()
        {
            return this.$store.getters[`${this.itemId}/variationGroupedProperties`];
        },

        variationMissingProperties()
        {
            return this.$store.getters[`${this.itemId}/variationMissingProperties`];
        },

        isVideoAvailable()
        {
            return this.$store.getters[`${this.itemId}/variationGroupedProperties.variationPropertyGroups.id[2].variationProperties.id[169].variationProperty.values.value.length`];
        },

        isVideoTabActive()
        {
            return this.$store.getters.currentItemVariation.variationProperties && this.$store.getters.currentItemVariation.variationProperties.length;
        },

        isPdfTabActive()
        {
            return this.$store.getters.currentItemVariation.variationProperties && this.$store.getters.currentItemVariation.variationProperties.length;
        },

        currentVariation() {
            return get(this.$store.state, `items[${this.itemId}].variation.documents[0].data`);
        },

        isVariationSelected() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.isVariationSelected`);
        },

        attributes() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.attributes`);
        },

        units() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.units`);
        },

        isItemSet() {
            return this.$store.state.items.isItemSet;
        }
    },

    created()
    {
        this.$store.dispatch("initVariation", this.itemData);
        this.$store.commit(`${this.itemId}/setPleaseSelectVariationId`, this.pleaseSelectOptionVariationId);
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.$store.dispatch(`${this.itemId}/variationSelect/setVariationSelect`, {
                itemId:             this.itemId,
                attributes:         this.attributesData,
                variations:         this.variations,
                initialVariationId: this.currentVariation.variation.id,
                isPleaseSelectOption: this.initPleaseSelectOption,
                afterKey:           this.afterKey
            });

            if (this.isItemSet)
            {
                this.$store.dispatch("initSetComponents", this.itemData);   
            }
        })

        // listen for variation change to hydrate all children lazy-hydrate components
        document.addEventListener("onVariationChanged", () => this.hydrateChildren(this.$children));
    },

    methods:
    {
        getDataField(field)
        {
            return get(this.currentVariation, field);
        },

        getFilteredDataField(field, filter)
        {
            if (!isNullOrUndefined(this.$options.filters[filter]))
            {
                return this.$options.filters[filter](this.getDataField(field));
            }

            return this.getDataField(field);
        },

        // iterate recursively the children components and call their hydrate method, if it is a lazy-hydrate component
        hydrateChildren(nodes)
        {
            nodes.forEach(component => {
                if (component.$options.name === "lazy-hydrate")
                {
                    component.hydrate();
                }
                else if (component.$children.length)
                {
                    this.hydrateChildren(component.$children);
                }
            })
        }
    }
}
</script>