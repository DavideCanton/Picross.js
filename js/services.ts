///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-resource.d.ts"/>

"use strict";

var services : angular.IModule = angular.module("services", ['ngResource']);

interface IScheme extends ng.resource.IResource<IScheme>
{
    schemeID : number
}

interface  ISchemeResource extends ng.resource.IResourceClass<IScheme>
{
}

services.factory("Scheme", ['$resource', ($resource : ng.resource.IResourceService) : ISchemeResource =>
{
    return <ISchemeResource> $resource("data/:schemeID.json", {schemeID: "schemes"}, {});
}]);
