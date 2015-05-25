///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-resource.d.ts"/>
///<reference path="interfaces.ts"/>
"use strict";
var Services;
(function (Services) {
    Services.services = angular.module("services", ['ngResource']);
    Services.services.factory("Scheme", ['$resource', function ($resource) {
        return $resource("data/:schemeID.json", { schemeID: "schemes" }, {});
    }]);
})(Services || (Services = {}));
//# sourceMappingURL=services.js.map