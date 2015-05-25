///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-resource.d.ts"/>
///<reference path="interfaces.ts"/>

"use strict";

module Services
{
    export var services : angular.IModule = angular.module("services", ['ngResource']);

    services.factory("Scheme", ['$resource', ($resource : ng.resource.IResourceService) : Interfaces.ISchemeResource =>
    {
        return <Interfaces.ISchemeResource> $resource("data/:schemeID.json", {schemeID: "schemes"}, {});
    }]);
}