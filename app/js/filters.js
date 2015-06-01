///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="interfaces.ts"/>
///<reference path="utils.ts"/>
"use strict";
var Filters;
(function (Filters) {
    Filters.filters = angular.module("filters", []);
    Filters.filters.filter('reverse', function () {
        return function (items) { return angular.isArray(items) ? items.slice().reverse() : false; };
    });
    Filters.filters.filter('labelClass', function () {
        return function (status) {
            switch (status) {
                case 0 /* EQUAL */:
                    return "label_disabled";
                case 1 /* WRONG */:
                    return "label_wrong";
                default:
                    return "";
            }
        };
    });
    Filters.filters.filter('cellClass', function () {
        return function (status) {
            switch (status) {
                case 1 /* CLOSED */:
                    return "fill";
                case 2 /* GRAYED */:
                    return "crossed";
                default:
                    return "";
            }
        };
    });
})(Filters || (Filters = {}));
//# sourceMappingURL=filters.js.map