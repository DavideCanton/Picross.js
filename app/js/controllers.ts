///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="interfaces.ts"/>
///<reference path="utils.ts"/>

"use strict";

module Controllers
{
    export var controllers : ng.IModule = angular.module('controllers', []);

    export class PicrossCtrl
    {
        static $inject = ["$scope", "$routeParams", "$location"];

        constructor(private $scope : Interfaces.IPicrossCtrlScope,
                    private $routeParams : Interfaces.MyRouteParams,
                    private $location : ng.ILocationService)
        {
            $scope.end = false;

            $scope.table = Utils.PicrossTable.randomTable(+$routeParams.w, +$routeParams.h, +$routeParams.p);
            $scope.loaded = true;

            $scope.range = (n : number) : number[] =>
            {
                var a = [];
                for (var i = 0; i < n; i++)
                    a.push(i);
                return a;
            };

            $scope.updateEnabled = (r : number, c : number) : void =>
            {
                $scope.table.updateRowStatus(r);
                $scope.table.updateColStatus(c);
            };

            $scope.pressedCell = (i : number, j : number) : void =>
            {
                if ($scope.end)
                    return;
                if ($scope.table.getRowData(i).disabled || $scope.table.getColData(j).disabled)
                    return;

                $scope.table.closeCell(i, j);
                $scope.updateEnabled(i, j);

                if ($scope.table.isCompleted())
                    $scope.end = true;
            };


            $scope.pressedRightCell = (i : number, j : number) : void =>
            {
                if ($scope.end)
                    return;
                if ($scope.table.getRowData(i).disabled || $scope.table.getColData(j).disabled)
                    return;
                $scope.table.grayCell(i, j);
                $scope.updateEnabled(i, j);
            };
        }
    }

    export class BodyController
    {
        static $inject = ["$scope", "$location", "$route"];

        constructor(private $scope : Interfaces.IBodyControllerScope,
                    private $location : ng.ILocationService,
                    private $route : ng.route.IRouteService)
        {
            $scope.rows = 5;
            $scope.cols = 5;

            $scope.reset = () : void =>
            {
                $scope.errorMsg = "";
                $scope.error = false;
            };

            $scope.goTo = (w : number, h : number, event : JQueryEventObject) =>
            {
                if (event)
                    event.preventDefault();
                var p = 0.8;
                $route.reload();
                $location.search({'w': w || 5, 'h': h || 5, 'p': p}).path("/scheme");
            };

            $scope.reset();

            $scope.$on("error", (event, status) =>
            {
                $scope.error = true;
                $location.path("/error/" + status);
            });

        }
    }

    export class ErrorCtrl
    {
        static $inject = ["$scope", "$routeParams"];

        constructor(private $scope : Interfaces.IErrorCtrlScope,
                    private $routeParams : Interfaces.ErrorRouteParams)
        {
            $scope.errorMsg = $routeParams.status;
        }
    }

    controllers.controller('bodyCtrl', Controllers.BodyController)
        .controller('picrossCtrl', Controllers.PicrossCtrl)
        .controller('errorCtrl', Controllers.ErrorCtrl);
}