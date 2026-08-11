(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "EuResponsibleDetails",
  props: {
    manufacturer: {
      type: Object,
      required: true
    },
    concatenatedNames: {
      type: String,
      default: ''
    },
    visibleFieldsEu: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isEuResponsibleTabShown() {
      return this.manufacturer.responsibleEmail !== "" || this.manufacturer.responsibleHouseNo !== "" || this.manufacturer.responsibleName !== "" || this.manufacturer.responsiblePhoneNo !== "" || this.manufacturer.responsiblePostCode !== "" || this.manufacturer.responsibleStreet !== "" || this.manufacturer.responsibleTown !== "" || this.manufacturer.responsibleContactUrl !== "" || this.manufacturer.responsibleCountry !== 0;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EuResponsibleDetails.vue */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "item-eu-responsible-data-list",
  components: {
    EuResponsibleDetails: _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    itemComponents: {
      type: Array,
      default: () => []
    },
    visibleFieldsEu: {
      type: Array,
      default: () => []
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemManufacturerDataList_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemManufacturerDataList.vue */ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue");
/* harmony import */ var _ItemEuResponsibleDataList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemEuResponsibleDataList.vue */ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue");
/* harmony import */ var _ManufacturerDetails_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ManufacturerDetails.vue */ "./resources/js/src/app/components/item/ManufacturerDetails.vue");
/* harmony import */ var _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EuResponsibleDetails.vue */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue");




/* harmony default export */ __webpack_exports__["default"] = ({
  name: "item-manufacturer",
  components: {
    ItemManufacturerDataList: _ItemManufacturerDataList_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    ItemEuResponsibleDataList: _ItemEuResponsibleDataList_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    ManufacturerDetails: _ManufacturerDetails_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    EuResponsibleDetails: _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    selectionType: String,
    visibleFields: {
      type: Array,
      default: () => []
    },
    visibleFieldsEu: {
      type: Array,
      default: () => []
    }
  },
  inject: {
    itemId: {
      default: null
    }
  },
  computed: {
    simpleItemManufacturer() {
      if (!this.isItemSet && !this.isBundle) {
        return this.$store.getters[`${this.itemId}/currentItemVariation`].item.manufacturer;
      }
    },
    currentVariation() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`];
    },
    isBundle() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].variation.bundleType === 'bundle';
    },
    bundleComponents() {
      const bundleComponents = this.$store.getters[`${this.itemId}/currentItemVariation`].bundleComponents || [];
      const items = bundleComponents.map(component => ({
        manufacturerId: component.data.item.manufacturerId,
        manufacturer: component.data.item.manufacturer,
        texts: component.data.texts
      }));
      return this.transformComponents(items);
    },
    isItemSet() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].item.itemType === 'set';
    },
    setComponents() {
      const items = this.$store.getters[`${this.itemId}/currentItemVariation`].setComponents || [];
      return this.transformComponents(items);
    }
  },
  methods: {
    transformComponents(components) {
      const manufacturerMap = {};
      components.forEach(item => {
        var _item$texts;
        const manufacturerId = item.manufacturerId;
        const itemName = ((_item$texts = item.texts) === null || _item$texts === void 0 ? void 0 : _item$texts.name1) || '';
        const manufacturer = item.manufacturer;
        if (!manufacturerMap[manufacturerId]) {
          manufacturerMap[manufacturerId] = {
            manufacturerId: manufacturerId,
            manufacturer: manufacturer,
            concatenatedNames: []
          };
        }
        manufacturerMap[manufacturerId].concatenatedNames.push(itemName);
      });
      return Object.values(manufacturerMap).map(item => ({
        ...item,
        concatenatedNames: item.concatenatedNames.join(', ')
      }));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManufacturerDetails_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManufacturerDetails.vue */ "./resources/js/src/app/components/item/ManufacturerDetails.vue");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "item-manufacturer-data-list",
  components: {
    ManufacturerDetails: _ManufacturerDetails_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    itemComponents: {
      type: Array,
      default: () => []
    },
    visibleFields: {
      type: Array,
      default: () => []
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ManufacturerDetails",
  props: {
    manufacturer: {
      type: Object,
      required: true
    },
    concatenatedNames: {
      type: String,
      default: ''
    },
    visibleFields: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isManufacturerTabShown() {
      return this.manufacturer.url !== "" || this.manufacturer.street !== "" || this.manufacturer.houseNo !== "" || this.manufacturer.postcode !== "" || this.manufacturer.town !== "" || this.manufacturer.countryId !== 0 || this.manufacturer.phoneNumber !== "" || this.manufacturer.faxNumber !== "" || this.manufacturer.email !== "" || this.manufacturer.legalName !== "" || this.manufacturer.contactUrl !== "" || this.manufacturer.name !== "" || this.manufacturer.externalName !== "";
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196 ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("h4", [_vm._v(_vm._s(_vm.$translate("Ceres::Template.itemEuResponsiblePersonTitle")))]), _vm._v(" "), _vm.manufacturer && _vm.isEuResponsibleTabShown ? [_vm.concatenatedNames ? _c("div", {
    staticClass: "mb-2"
  }, [_c("b", [_vm._v(_vm._s(_vm.concatenatedNames))])]) : _vm._e(), _vm._v(" "), _vm.visibleFieldsEu.includes("EUname") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleName))])]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "p-0"
  }, [_vm.visibleFieldsEu.includes("EUstreet") ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleStreet))]) : _vm._e(), _vm._v(" "), _vm.visibleFieldsEu.includes("EUhouseNr") ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleHouseNo))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "p-0"
  }, [_vm.visibleFieldsEu.includes("EUzipcode") ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsiblePostCode))]) : _vm._e(), _vm._v(" "), _vm.visibleFieldsEu.includes("EUcity") ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleTown))]) : _vm._e(), _vm._v(" "), _vm.manufacturer.responsibleCountryObject && _vm.visibleFieldsEu.includes("EUcountry") ? _c("span", [_vm._v("\n        " + _vm._s(_vm.manufacturer.responsibleCountryObject.name) + "\n      ")]) : _vm._e()]), _vm._v(" "), _vm.visibleFieldsEu.includes("EUmail") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleEmail))])]) : _vm._e(), _vm._v(" "), _vm.visibleFieldsEu.includes("EUphone") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.responsiblePhoneNo))])]) : _vm._e(), _vm._v(" "), _vm.visibleFieldsEu.includes("EUcontactForm") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleContactUrl))])]) : _vm._e()] : [_vm._v("\n    " + _vm._s(_vm.$translate("Ceres::Template.itemEuResponsibleNoInformation")) + "\n  ")]], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_vm.itemComponents.length > 0 ? [_vm._l(_vm.itemComponents, function (component) {
    return [_c("eu-responsible-details", {
      attrs: {
        manufacturer: component.manufacturer,
        "concatenated-names": component.concatenatedNames,
        "visible-fields-eu": _vm.visibleFieldsEu
      }
    }), _vm._v(" "), _c("hr")];
  })] : _vm._e()], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444 ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_vm.isItemSet ? [_vm.selectionType === "manufacturer" ? [_c("item-manufacturer-data-list", {
    attrs: {
      "visible-fields": _vm.visibleFields,
      "item-components": _vm.setComponents
    }
  })] : _vm._e(), _vm._v(" "), _vm.selectionType === "eu-responsible" ? [_c("item-eu-responsible-data-list", {
    attrs: {
      "visible-fields-eu": _vm.visibleFieldsEu,
      "item-components": _vm.setComponents
    }
  })] : _vm._e()] : _vm.isBundle ? [_vm.selectionType === "manufacturer" ? [_c("item-manufacturer-data-list", {
    attrs: {
      "visible-fields": _vm.visibleFields,
      "item-components": _vm.bundleComponents
    }
  })] : _vm._e(), _vm._v(" "), _vm.selectionType === "eu-responsible" ? [_c("item-eu-responsible-data-list", {
    attrs: {
      "visible-fields-eu": _vm.visibleFieldsEu,
      "item-components": _vm.bundleComponents
    }
  })] : _vm._e()] : [_vm.selectionType === "manufacturer" && _vm.simpleItemManufacturer ? _c("manufacturer-details", {
    attrs: {
      "visible-fields": _vm.visibleFields,
      manufacturer: _vm.simpleItemManufacturer
    }
  }) : _vm.selectionType === "eu-responsible" && _vm.simpleItemManufacturer ? _c("eu-responsible-details", {
    attrs: {
      "visible-fields-eu": _vm.visibleFieldsEu,
      manufacturer: _vm.simpleItemManufacturer
    }
  }) : _vm._e()]], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134 ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_vm.itemComponents.length > 0 ? [_vm._l(_vm.itemComponents, function (component) {
    return [_c("manufacturer-details", {
      attrs: {
        manufacturer: component.manufacturer,
        "concatenated-names": component.concatenatedNames,
        "visible-fields": _vm.visibleFields
      }
    }), _vm._v(" "), _c("hr")];
  })] : _vm._e()], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47 ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("h4", [_vm._v(_vm._s(_vm.$translate("Ceres::Template.itemManufacturerDetailsTitle")))]), _vm._v(" "), _vm.manufacturer && _vm.isManufacturerTabShown ? [_vm.concatenatedNames ? _c("div", {
    staticClass: "mb-2"
  }, [_c("b", [_vm._v(_vm._s(_vm.concatenatedNames))])]) : _vm._e(), _vm._v(" "), _vm.manufacturer.name && _vm.visibleFields.includes("name") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.name))])]) : _vm._e(), _vm._v(" "), _vm.manufacturer.externalName && _vm.visibleFields.includes("externalName") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.externalName))])]) : _vm._e(), _vm._v(" "), _vm.visibleFields.includes("legalName") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.legalName))])]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "p-0"
  }, [_vm.visibleFields.includes("street") ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.street))]) : _vm._e(), _vm._v(" "), _vm.visibleFields.includes("houseNr") ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.houseNo))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "p-0"
  }, [_vm.visibleFields.includes("zipcode") ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.postcode))]) : _vm._e(), _vm._v(" "), _vm.visibleFields.includes("city") ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.town))]) : _vm._e(), _vm._v(" "), _vm.manufacturer.countryObject && _vm.visibleFields.includes("country") ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.countryObject.name))]) : _vm._e()]), _vm._v(" "), _vm.visibleFields.includes("mail") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.email))])]) : _vm._e(), _vm._v(" "), _vm.visibleFields.includes("homepage") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.url))])]) : _vm._e(), _vm._v(" "), _vm.visibleFields.includes("phone") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.phoneNumber))])]) : _vm._e(), _vm._v(" "), _vm.visibleFields.includes("fax") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.faxNumber))])]) : _vm._e(), _vm._v(" "), _vm.visibleFields.includes("contactForm") ? _c("div", {
    staticClass: "p-0"
  }, [_c("span", [_vm._v(_vm._s(_vm.manufacturer.contactUrl))])]) : _vm._e()] : [_vm._v("\n    " + _vm._s(_vm.$translate("Ceres::Template.itemManufacturerNoInformation")) + "\n  ")]], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/src/app/components/item/EuResponsibleDetails.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/app/components/item/EuResponsibleDetails.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EuResponsibleDetails_vue_vue_type_template_id_74bdf196__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EuResponsibleDetails.vue?vue&type=template&id=74bdf196 */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196");
/* harmony import */ var _EuResponsibleDetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EuResponsibleDetails.vue?vue&type=script&lang=js */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EuResponsibleDetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _EuResponsibleDetails_vue_vue_type_template_id_74bdf196__WEBPACK_IMPORTED_MODULE_0__["render"],
  _EuResponsibleDetails_vue_vue_type_template_id_74bdf196__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/EuResponsibleDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EuResponsibleDetails.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196 ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_template_id_74bdf196__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EuResponsibleDetails.vue?vue&type=template&id=74bdf196 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_template_id_74bdf196__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_template_id_74bdf196__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e */ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e");
/* harmony import */ var _ItemEuResponsibleDataList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemEuResponsibleDataList.vue?vue&type=script&lang=js */ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemEuResponsibleDataList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e__WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemEuResponsibleDataList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemEuResponsibleDataList.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturer.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturer.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemManufacturer_vue_vue_type_template_id_b140e444__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemManufacturer.vue?vue&type=template&id=b140e444 */ "./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444");
/* harmony import */ var _ItemManufacturer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemManufacturer.vue?vue&type=script&lang=js */ "./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemManufacturer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemManufacturer_vue_vue_type_template_id_b140e444__WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemManufacturer_vue_vue_type_template_id_b140e444__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemManufacturer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturer.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444 ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_template_id_b140e444__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturer.vue?vue&type=template&id=b140e444 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_template_id_b140e444__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_template_id_b140e444__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturerDataList.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemManufacturerDataList_vue_vue_type_template_id_c4011134__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemManufacturerDataList.vue?vue&type=template&id=c4011134 */ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134");
/* harmony import */ var _ItemManufacturerDataList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemManufacturerDataList.vue?vue&type=script&lang=js */ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemManufacturerDataList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemManufacturerDataList_vue_vue_type_template_id_c4011134__WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemManufacturerDataList_vue_vue_type_template_id_c4011134__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemManufacturerDataList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturerDataList.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134 ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_template_id_c4011134__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturerDataList.vue?vue&type=template&id=c4011134 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_template_id_c4011134__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_template_id_c4011134__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/ManufacturerDetails.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/src/app/components/item/ManufacturerDetails.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManufacturerDetails_vue_vue_type_template_id_145dfd47__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManufacturerDetails.vue?vue&type=template&id=145dfd47 */ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47");
/* harmony import */ var _ManufacturerDetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManufacturerDetails.vue?vue&type=script&lang=js */ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ManufacturerDetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManufacturerDetails_vue_vue_type_template_id_145dfd47__WEBPACK_IMPORTED_MODULE_0__["render"],
  _ManufacturerDetails_vue_vue_type_template_id_145dfd47__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ManufacturerDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManufacturerDetails.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47 ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_template_id_145dfd47__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManufacturerDetails.vue?vue&type=template&id=145dfd47 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_template_id_145dfd47__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_template_id_145dfd47__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-4.js.map