///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-resource.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="utils.ts"/>


module Interfaces
{
    export interface MyRouteParams extends ng.route.IRouteParamsService
    {
        p : number;
        w : number;
        h : number;
    }

    export interface JSONSchemeData
    {
        rowLabels : number[][];
        colLabels : number[][];
        rows : number;
        cols : number;
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
        hoveredCell(i : number, j : number, $event : JQueryMouseEventObject) : void;
        setCellStatus(i : number, j : number, status : Utils.CellStatus);
        pressedRightCell(i : number, j : number) : void;
        getCellClass(i : number, j : number) : string;
        getLabelClass(index : number, isRow : boolean):string;
        checkEnd():boolean;
    }

    export interface ICellTdScope extends ng.IScope
    {
        row: number;
        col:number;
        onclick: (any) => void;
        onrightclick: (any) => void;
        val: (any) => void;
    }

    export interface IBodyControllerScope extends ng.IScope
    {
        error : boolean;
        errorMsg : string;

        rows: number;
        cols: number;
        goTo(w : number, h : number, event : JQueryEventObject) : void;
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
}