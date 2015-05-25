///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="services.ts"/>
///<reference path="utils.ts"/>

"use strict";

var controllers : ng.IModule = angular.module('controllers', []);

interface MyRouteParams extends ng.route.IRouteParamsService
{
    schemeId : number;
}

interface JSONSchemeData
{
    rowLabels : number[][];
    colLabels : number[][];
    rows : number;
    cols : number;
    name : string;
}

interface  JSONSchemesData
{
    name : string;
    id : string;
}


interface IPicrossCtrlScope extends ng.IScope
{
    schemeId : number;
    rowLabels : number[][];
    colLabels : number[][];
    rowLabelStatus : RowStatus[];
    colLabelStatus : RowStatus[];
    rowsDisabled : number[];
    colsDisabled : number[];
    table : PicrossTable;
    loaded : boolean;

    range(n : number) : number[];
    updateEnabled(r : number, c : number):void;
    pressedCell(i : number, j : number):void;
    getCellClass(i : number, j : number):string;
    getLabelClass(index : number, isRow : boolean):string;
    checkEnd():boolean;
}

class PicrossCtrl
{
    static $inject = ["$scope", "$routeParams", "$location", "Scheme"];

    constructor(private $scope : IPicrossCtrlScope,
                private $routeParams : MyRouteParams,
                private $location : ng.ILocationService,
                private Scheme : ISchemeResource)
    {
        $scope.schemeId = $routeParams.schemeId;

        Scheme.get({schemeID: $scope.schemeId}, (data : JSONSchemeData) =>
        {
            $scope.rowLabels = data.rowLabels;
            $scope.rowLabelStatus = init_val_array($scope.rowLabels);
            $scope.colLabels = data.colLabels;
            $scope.colLabelStatus = init_val_array($scope.colLabels);

            $scope.rowsDisabled = [];
            $scope.colsDisabled = [];
            var i : number;
            for (i = 0; i < data.rows; i++)
                if ($scope.rowLabelStatus[i] === RowStatus.EQUAL)
                    $scope.rowsDisabled.push(i);

            for (i = 0; i < data.cols; i++)
                if ($scope.colLabelStatus[i] === RowStatus.EQUAL)
                    $scope.colsDisabled.push(i);

            $scope.table = new PicrossTable(data.rows, data.cols, $scope.rowsDisabled, $scope.colsDisabled);

            $scope.loaded = true;
            $scope.$emit("loaded");
        }, () =>
        {
            $scope.loaded = false;
            $location.path("/error/404");
            $scope.$emit("error", "404");
        });

        $scope.range = (n : number) : number[] => new Array(n);

        $scope.updateEnabled = (r : number, c : number) : void =>
        {
            var row = $scope.table.checkRowStatus(r);
            var col = $scope.table.checkColStatus(c);

            $scope.rowLabelStatus[r] = checkRow($scope.rowLabels[r], row);
            $scope.colLabelStatus[c] = checkRow($scope.colLabels[c], col);
        };

        $scope.pressedCell = (i : number, j : number) : void =>
        {
            if ($scope.rowsDisabled.indexOf(i) >= 0 || $scope.colsDisabled.indexOf(j) >= 0)
                return;
            $scope.table.cycleCell(i, j);
            $scope.updateEnabled(i, j);
            if ($scope.checkEnd())
                $scope.$emit("end");
        };

        $scope.getCellClass = (i : number, j : number) : string =>
        {
            if ($scope.table === undefined)
                return; // avoids calls before the table has loaded
            var cell = $scope.table.getCellStatus(i, j);
            if (cell === CellStatus.CLOSED)
                return "fill";
            else if (cell == CellStatus.CROSSED)
                return "crossed";
            else
                return "";
        };

        $scope.getLabelClass = (index : number, isRow : boolean) : string =>
        {
            var status : RowStatus = isRow ? $scope.rowLabelStatus[index] : $scope.colLabelStatus[index];

            if (status === RowStatus.EQUAL)
                return "label_disabled";
            else if (status == RowStatus.WRONG)
                return "label_wrong";
            else
                return "";
        };

        $scope.checkEnd = () : boolean =>
        {
            return all_el($scope.rowLabelStatus, RowStatus.EQUAL) && all_el($scope.colLabelStatus, RowStatus.EQUAL);
        };
    }
}

controllers.controller("picrossCtrl", PicrossCtrl);

interface IBodyControllerScope extends ng.IScope
{
    current : number;
    error : boolean;
    errorMsg : string;
    names : JSONSchemesData[];
    end : boolean;

    next(i : number) : number;
    previous(i : number) : number;
    increase() : void;
    decrease() : void;
    reload_route() : void;
}

class BodyController
{
    static $inject = ["$scope", "$location", "$route", "Scheme"];

    constructor(private $scope : IBodyControllerScope,
                private $location : ng.ILocationService,
                private $route : ng.route.IRouteService,
                private Scheme : ISchemeResource)
    {
        $scope.error = false;
        $scope.errorMsg = "";
        $scope.names = [null, null, null];
        $scope.end = false;

        Scheme.query({}, (data : JSONSchemesData[]) =>
        {
            $scope.names = data;
        }, (data, status : string) =>
        {
            $scope.error = true;
            $location.path("/error/" + status);
        });

        $scope.$on("end", function ()
        {
            console.log("end");
            $scope.end = true;
        });

        $scope.$on("error", function (event, status)
        {
            $scope.error = true;
            $location.path("/error/" + status);
        });

        $scope.$on("loaded", function (event)
        {
            var childScope : any = event.targetScope;
            $scope.current = parseInt(childScope.schemeId) - 1;
        });

        $scope.next = (i : number) : number =>
        {
            return (i + 1) % $scope.names.length;
        };

        $scope.previous = (i : number) : number =>
        {
            return (i - 1 + $scope.names.length) % $scope.names.length;
        };

        $scope.increase = () : void =>
        {
            $scope.current = $scope.next($scope.current);
            $location.path("/" + $scope.names[$scope.current].id);
        };

        $scope.decrease = () : void =>
        {
            $scope.current = $scope.previous($scope.current);
            $location.path("/" + $scope.names[$scope.current].id);
        };

        $scope.reload_route = () : void =>
        {
            if (confirm("Sei sicuro?"))
                $route.reload();
        }

    }
}


controllers.controller("bodyController", BodyController);

interface ErrorRouteParams extends ng.route.IRouteParamsService
{
    status : string;
}

interface IErrorCtrlScope extends ng.IScope
{
    errorMsg : string;
}

class ErrorCtrl
{
    static $inject = ["$scope", "$routeParams"];

    constructor(private $scope : IErrorCtrlScope,
                private $routeParams : ErrorRouteParams)
    {
        $scope.errorMsg = "" + $routeParams.status;
    }
}

controllers.controller("errorCtrl", ErrorCtrl);