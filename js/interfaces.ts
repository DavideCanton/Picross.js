///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-resource.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="utils.ts"/>


module Interfaces
{
    export interface MyRouteParams extends ng.route.IRouteParamsService
    {
        schemeId : number;
    }

    export interface JSONSchemeData
    {
        rowLabels : number[][];
        colLabels : number[][];
        rows : number;
        cols : number;
        name : string;
    }

    export interface JSONSchemeName
    {
        name : string;
        id : string;
    }


    export interface IPicrossCtrlScope extends IBodyControllerScope
    {
        schemeId : number;
        table : Utils.PicrossTable;
        loaded : boolean;
        end : boolean;

        range(n : number) : number[];
        updateEnabled(r : number, c : number) : void;
        pressedCell(i : number, j : number) : void;
        pressedRightCell(i : number, j : number) : void;
        getCellClass(i : number, j : number) : string;
        getLabelClass(index : number, isRow : boolean):string;
        checkEnd():boolean;
    }


    export interface IBodyControllerScope extends ng.IScope
    {
        current : number;
        error : boolean;
        errorMsg : string;
        names : JSONSchemeName[];

        next(i : number) : number;
        previous(i : number) : number;
        increase() : void;
        decrease() : void;
        reload_route() : void;
        reset() : void;
    }

    export interface ErrorRouteParams extends ng.route.IRouteParamsService
    {
        status : string;
    }

    export interface IErrorCtrlScope extends ng.IScope
    {
        errorMsg : string;
    }

    export interface IScheme extends ng.resource.IResource<IScheme>
    {
        schemeID : number
    }

    export interface ISchemeResource extends ng.resource.IResourceClass<IScheme>
    {
    }
}