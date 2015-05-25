///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-resource.d.ts"/>
"use strict";
var services = angular.module("services", ['ngResource']);
services.factory("Scheme", ['$resource', function ($resource) {
    return $resource("data/:schemeID.json", { schemeID: "schemes" }, {});
}]);
//# sourceMappingURL=services.js.map