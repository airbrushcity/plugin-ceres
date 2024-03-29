<template>
    <div class="cmp-totals">
        <div class="h3">{{ $translate("Ceres::Template.basketSum") }}</div>
        <div class="component-loading with-icon refreshing" :class="{ 'is-loading': isBasketLoading }">
            <dl>
                <slot name="before-item-sum"></slot>

                 <!--  AdditionalCosts with Tax -->
                <template v-if="(visibleFields.includes('additionalCosts') || visibleFields.includes('basket.additional_costs')) && displayedProperties.length">
                    <template v-for="property in displayedProperties">
                        <dt :class="{ 'font-weight-bold': showNetPrices }" :key="'property-name-' + property.propertyId" data-testing="additionalcost-with-tax">
                            {{ property.name }}
                        </dt><!--
                        --><dd :class="{ 'font-weight-bold': showNetPrices }" :key="'property-price-' + property.propertyId">
                            {{ property.price | currency }}
                        </dd>
                    </template>
                </template>
                <!-- AdditionalCosts with Tax -->

                <!-- Basket value (net) -->
                <template v-if="visibleFields.includes('basketValueNet') || visibleFields.includes('basket.value_of_items_net')">
                    <dt :class="{ 'font-weight-bold': showNetPrices }">
                        {{ $translate("Ceres::Template.basketValue") }} {{ $translate("Ceres::Template.basketNet") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': showNetPrices }" data-testing="item-sum-net">
                        {{ calculateBaseValue(basket.itemSumNet, basket.basketRebate) | currency }}
                    </dd>
                </template>
                <!-- Basket value (net) -->

                <!-- Basket value (gross) -->
                <template v-if="visibleFields.includes('basketValueGross') || visibleFields.includes('basket.value_of_items_gross')">
                    <dt :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ $translate("Ceres::Template.basketValue") }} {{ $translate("Ceres::Template.basketGross") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': !showNetPrices }" data-testing="item-sum">
                        {{ calculateBaseValue(basket.itemSum, basket.basketRebate)| currency  }}
                    </dd>
                </template>
                <!-- Basket value (gross) -->

                <!-- Rebate -->
                <template v-if="(visibleFields.includes('rebate') || visibleFields.includes('basket.rebate')) && basket.basketRebate">
                    <dt class="rebate-hint">
                        {{ $translate("Ceres::Template.basketRebate") }}
                    </dt><!--
                --><dd class="rebate-hint" v-if="!showNetPrices">
                        {{ $translate("Ceres::Template.basketRebateSign") }}{{calculateBaseValue(basket.itemSum, basket.basketRebate) - basket.itemSum | currency }}
                    </dd><!--
                --><dd class="rebate-hint" v-else>
                        {{ $translate("Ceres::Template.basketRebateSign") }}{{ calculateBaseValue(basket.itemSumNet, basket.basketRebate) - basket.itemSumNet | currency  }}
                    </dd>
                    <dt :class="{ 'font-weight-bold': showNetPrices }">
                        {{ $translate("Ceres::Template.basketSubTotal") }} {{ $translate("Ceres::Template.basketNet") }}
                    </dt><!--
                --><dd :class="{ 'font-weight-bold': showNetPrices }">
                        {{ basket.itemSumNet | currency }}
                    </dd>
                    <dt :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ $translate("Ceres::Template.basketSubTotal") }} {{ $translate("Ceres::Template.basketGross") }}
                    </dt><!--
                --><dd :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ basket.itemSum | currency }}
                    </dd>
                </template>
                <!-- Rebate -->


                <slot name="after-item-sum"></slot>

                <slot name="before-shipping-costs"></slot>

                <!-- Shipping (net) -->
                <template v-if="visibleFields.includes('shippingCostsNet') || visibleFields.includes('basket.shipping_costs_net')">
                    <dt :class="{ 'font-weight-bold': showNetPrices }">
                        {{ $translate("Ceres::Template.basketShippingCosts") }} {{ $translate("Ceres::Template.basketNet") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': showNetPrices }" data-testing="shipping-amount-net">
                        {{ basket.shippingAmountNet | currency }}
                    </dd>
                </template>
                <!-- Shipping (net) -->

                <!-- Shipping (gross) -->
                <template v-if="visibleFields.includes('shippingCostsGross') || visibleFields.includes('basket.shipping_costs_gross')">
                    <dt :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ $translate("Ceres::Template.basketShippingCosts") }} {{ $translate("Ceres::Template.basketGross") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': !showNetPrices }" data-testing="shipping-amount">
                        {{ basket.shippingAmount | currency }}
                    </dd>
                </template>
                <!-- Shipping (gross) -->

                <slot name="after-shipping-costs"></slot>

                <!-- Coupon -->
                <template v-if="(visibleFields.includes('promotionCoupon') || visibleFields.includes('basket.promotion_coupon')) && basket.couponCode && basket.couponCampaignType === 'promotion'">
                    <dt class="font-weight-bold">
                        {{ $translate("Ceres::Template.basketCoupon") }}
                    </dt><!--
                --><dd class="font-weight-bold" data-testing="promotion-coupon">
                        {{ basket.couponDiscount | currency }}
                    </dd>
                </template>
                <!-- Coupon -->

                <hr>
                <slot name="before-total-sum"></slot>

                <!-- Subamount (net) -->
                <template v-if="visibleFields.includes('subAmount') || visibleFields.includes('basket.order_total_net')">
                    <dt :class="{ 'font-weight-bold': showNetPrices }">
                        {{ $translate("Ceres::Template.basketSubAmount" ) }} {{ $translate("Ceres::Template.basketNet") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': showNetPrices }" data-testing="basket-sub-amount">
                        {{ basket.subAmount | currency }}
                    </dd>
                </template>
                <!-- Subamount (net) -->

                <slot name="before-vat"></slot>

                <!-- VAT -->
                <template v-if="visibleFields.includes('vats') || visibleFields.includes('basket.vat')" class="vatTotals" v-for="totalVat in basket.totalVats">
                    <dt>
                        {{ $translate("Ceres::Template.basketVAT") }} {{ totalVat.vatValue }}%
                    </dt><!--
                    --><dd data-testing="vat-amount">
                        {{ totalVat.vatAmount | currency }}
                    </dd>
                </template>
                <!-- VAT -->

                <slot name="after-vat"></slot>

                <!-- AdditionalCosts or order properties without tax -->
                <template v-if="(visibleFields.includes('additionalCosts') || visibleFields.includes('basket.additional_costs')) && displayedPropertiesWithoutTax.length">
                    <template v-for="property in displayedPropertiesWithoutTax">
                        <dt :class="{ 'font-weight-bold': showNetPrices }" :key="'property-name-' + property.propertyId" data-testing="additionalcost-without-tax">
                            {{ property.name }}
                        </dt><!--
                        --><dd :class="{ 'font-weight-bold': showNetPrices }" :key="'property-price-' + property.propertyId">
                            {{ property.price | currency }}
                        </dd>
                    </template>
                </template>
                <!-- AdditionalCosts or order properties without tax -->

                <div class="totalSum">
                    <hr>

                    <!-- Total sum (net) -->
                    <template v-if="visibleFields.includes('totalSumNet') || visibleFields.includes('basket.order_total_net')">
                        <dt :class="{ 'font-weight-bold': showNetPrices }">
                            {{ $translate("Ceres::Template.basketTotalSum") }} {{ $translate("Ceres::Template.basketNet") }}
                        </dt><!--
                        --><dd :class="{ 'font-weight-bold': showNetPrices }" data-testing="basket-amount-net">
                            {{ basket.basketAmountNet | currency }}
                        </dd>
                    </template>
                    <!-- Total sum (net) -->

                    <!-- Total sum (gross) -->
                    <template v-if="visibleFields.includes('totalSumGross') || visibleFields.includes('basket.order_total_gross')">
                        <dt :class="{ 'font-weight-bold': !showNetPrices }">
                            {{ $translate("Ceres::Template.basketTotalSum") }} {{ $translate("Ceres::Template.basketGross") }}
                        </dt><!--
                        --><dd :class="{ 'font-weight-bold': !showNetPrices }" data-testing="basket-amount">
                            {{ basket.basketAmount | currency }}
                        </dd>
                    </template>
                    <!-- Total sum (gross) -->

                    <!-- Coupon -->
                    <template v-if="(visibleFields.includes('salesCoupon') || visibleFields.includes('basket.sales_coupon')) && basket.couponCode && basket.couponCampaignType === 'sales'">
                        <dt class="font-weight-bold">
                            {{ $translate("Ceres::Template.basketCoupon") }}
                        </dt><!--
                     --><dd class="font-weight-bold" data-testing="sales-coupon">
                            {{ basket.couponDiscount | currency }}
                        </dd>
                    </template>
                    <!-- Coupon -->

                    <!-- Coupon open amount -->
                    <template v-if="(visibleFields.includes('openAmount') || visibleFields.includes('basket.open_amount')) && basket.couponCampaignType === 'sales'">
                        <dt class="font-weight-bold">
                            {{ $translate("Ceres::Template.basketOpenAmount") }}
                        </dt><!--
                    --><dd class="font-weight-bold" data-testing="open-amount">
                            {{ basket.openAmount | currency }}
                        </dd>
                    </template>
                    <!-- Coupon open amount -->
                </div>

                <slot name="after-total-sum"></slot>
            </dl>
        </div>

        <div v-if="basket.isExportDelivery && deliveryExportTranslation" class="alert alert-info w-100">
            {{ deliveryExportTranslation }}
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { hasVat, isAdditionalCosts } from "../../helper/OrderPropertyHelper";
export default {
    name: "basket-totals",
    data() {
        return {
            displayedProperties: [],
            displayedPropertiesWithoutTax: []
        }
    },
    created() {
        this.setPropertiesForTotals(this.basketItems);
    },
    watch: {
        
        basketItems: 
        {
            deep: true,
            handler(newItems)
            {
                this.setPropertiesForTotals(newItems)
            }
        }
        
    },

    props:
    {
        visibleFields:
        {
            type: Array,
            default: () => [
                "basketValueNet",
                "basketValueGross",
                "rebate",
                "shippingCostsNet",
                "shippingCostsGross",
                "promotionCoupon",
                "totalSumNet",
                "vats",
                "additionalCosts",
                "totalSumGross",
                "salesCoupon",
                "openAmount",
                "subAmount"
            ]
        }
    },

    computed:
    {
        currentShippingCountry()
        {
            const shippingCountryId = this.basket.shippingCountryId;

            return this.shippingCountries.find(country => country.id === shippingCountryId);
        },

        shopCountry()
        {
            const shopCountryId = this.basket.shopCountryId;

            return this.shippingCountries.find(country => country.id === shopCountryId);
        },

        deliveryExportTranslation()
        {
            const shopCountry = this.shopCountry && this.shopCountry.currLangName;
            const currentShippingCountry = this.currentShippingCountry && this.currentShippingCountry.currLangName;

            return this.$translate("Ceres::Template.basketExportDeliveryWarning", { from: shopCountry, to: currentShippingCountry });
        },

        ...mapState({
            basket: state => state.basket.data,
            basketItems: state => state.basket.items,
            isBasketLoading: state => state.basket.isBasketLoading,
            shippingCountries: state => state.localization.shippingCountries,
            showNetPrices: state => state.basket.showNetPrices
        })
    },

    methods: {
        calculateBaseValue(value, percent)
        {
            return (value / (100 - percent)) * 100;
        },

        isVariationProperty(property)
        {
            return property.property.isOderProperty && App.useVariationOrderProperties;
        },

        isInBasketItemOrderParams(basketItem, property)
        {
            if (!property.property.isOderProperty && !App.useVariationOrderProperties)
            {
                return true;
            }
            return !!basketItem.basketItemOrderParams.find(param => Number(param.propertyId) === Number(property.propertyId));
        },
        
        setPropertiesForTotals(newBasketItems)
        {
            this.displayedPropertiesWithoutTax = [];
            this.displayedProperties = [];
            for (const basketItem of newBasketItems)
            {
                basketItem.variation.data.properties?.forEach(property => {
                    if(this.isInBasketItemOrderParams(basketItem, property) && 
                      (isAdditionalCosts(property) || (!hasVat(property) && App.useVariationOrderProperties )))
                    {
                        const existsIndisplayedProperties = this.displayedProperties.find(entry => entry.propertyId === property.propertyId)
                        const existsIndisplayedPropertiesWithoutTax = this.displayedPropertiesWithoutTax.find(entry => entry.propertyId === property.propertyId)
                        const existingProperty = existsIndisplayedProperties || existsIndisplayedPropertiesWithoutTax;

                        // if new item gets added and its property already exist update quantity
                        if (existingProperty) 
                        {
                            existingProperty.quantity += basketItem.quantity
                        }
                        else
                        {
                            const newProperty = {
                                propertyId: property.propertyId,
                                name: property.property.names.name,
                                quantity: basketItem.quantity,
                                surcharge: this.$options.filters.propertySurcharge(basketItem.variation.data.properties, property.propertyId),
                                vatId: property.property.vatId
                            }
                            !hasVat(property) ? this.displayedPropertiesWithoutTax.push(newProperty) : this.displayedProperties.push(newProperty);
                        }
                    }
                });
            }
            this.displayedPropertiesWithoutTax.forEach((entry) => 
            {
                entry.price = entry.quantity * entry.surcharge;
            })
            this.displayedProperties.forEach((entry) => 
            {
                entry.price = entry.quantity * entry.surcharge;
            })
        }
    }
}
</script>
