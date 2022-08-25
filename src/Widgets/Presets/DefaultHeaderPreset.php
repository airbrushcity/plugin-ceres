<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\PresetHelper;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Application;

/**
 * Class DefaultHeaderPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a default header. It contains:
 * - TopBarWidget
 * - SearchSuggestionItemWidget
 * - NavigationWidget
 * - BreadcrumbWidget
 *
 * @package Ceres\Widgets\Presets
 */
class DefaultHeaderPreset implements ContentPreset
{
    /** @var PresetWidgetFactory */
    private $topBarWidget;
    
    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        /** @var CeresConfig $config */
        $config = pluginApp(CeresConfig::class);

        /** @var PresetHelper $preset */
        $preset = pluginApp(PresetHelper::class);

        $this->topBarWidget = $preset->createWidget("Ceres::TopBarWidget")
            ->withSetting("isFixed", $config->header->fixedNavBar)
            ->withSetting("searchStyle", "onDemand")
            ->withSetting("enableLogin", true)
            ->withSetting("enableRegistration", false)
            ->withSetting("enableLanguageSelect", false)
            ->withSetting("enableShippingCountrySelect", false)
            ->withSetting("enableCurrencySelect", false)
            ->withSetting("enableWishList", true)
            ->withSetting("enableBasketPreview", true)
            ->withSetting("basketValues", $config->header->basketValues)
            ->withSetting("showItemImages", true)
            ->withSetting("forwardToSingleItem", $config->search->forwardToSingleItem)
            ->withSetting('customClass', '');

        $this->topBarWidget->createChild('suggestions', 'Ceres::SearchSuggestionItemWidget')
            ->withSetting('customClass', '');

        return $preset->toArray();
    }
}
