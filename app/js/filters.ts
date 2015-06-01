///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="interfaces.ts"/>
///<reference path="utils.ts"/>

"use strict";

module Filters
{
    export var filters : ng.IModule = angular.module("filters", []);

    filters.filter('reverse', () =>
    {
        return (items) => angular.isArray(items) ? items.slice().reverse() : false;
    });

    filters.filter('labelClass', () =>
    {
        return (status : Utils.RowStatus) =>
        {
            switch (status)
            {
                case Utils.RowStatus.EQUAL:
                    return "label_disabled";
                case Utils.RowStatus.WRONG:
                    return "label_wrong";
                default:
                    return "";
            }
        };
    });

    filters.filter('cellClass', () =>
    {
        return (status : Utils.CellStatus) =>
        {
            switch (status)
            {
                case Utils.CellStatus.CLOSED:
                    return "fill";
                case Utils.CellStatus.GRAYED:
                    return "crossed";
                default:
                    return "";
            }
        };
    });
}
