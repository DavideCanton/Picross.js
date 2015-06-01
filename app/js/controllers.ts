///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="interfaces.ts"/>
///<reference path="services.ts"/>
///<reference path="utils.ts"/>

"use strict";

module Controllers
{
    export var controllers : ng.IModule = angular.module('controllers', []);

    export class PicrossCtrl
    {
        static $inject = ["$scope", "$routeParams", "$location", "Scheme"];

        constructor(private $scope : Interfaces.IPicrossCtrlScope,
                    private $routeParams : Interfaces.MyRouteParams,
                    private $location : ng.ILocationService,
                    private Scheme : Interfaces.ISchemeResource)
        {
            $scope.schemeId = $routeParams.schemeId;

            Scheme.get({schemeID: $scope.schemeId}, (data : Interfaces.JSONSchemeData) =>
            {
                $scope.table = new Utils.PicrossTable(data);
                $scope.loaded = true;
                $scope.$emit("loaded");
            }, () =>
            {
                $scope.loaded = false;
                $location.path("/error/404");
                $scope.$emit("error", "404");
            });

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
                if ($scope.table.isRowDisabled(i) || $scope.table.isColDisabled(j))
                    return;
                $scope.table.closeCell(i, j);
                $scope.updateEnabled(i, j);
                if ($scope.table.isCompleted())
                    $scope.$emit("end");
            };

            $scope.pressedRightCell = (i : number, j : number) : void =>
            {
                if ($scope.table.isRowDisabled(i) || $scope.table.isColDisabled(j))
                    return;
                $scope.table.grayCell(i, j);
                $scope.updateEnabled(i, j);
            };
        }
    }

    interface MyRouteService extends ng.route.IRouteService
    {
        updateParams(any):void;
    }

    export class BodyController
    {
        static $inject = ["$scope", "$location", "$route", "Scheme"];

        constructor(private $scope : Interfaces.IBodyControllerScope,
                    private $location : ng.ILocationService,
                    private $route : MyRouteService,
                    private Scheme : Interfaces.ISchemeResource)
        {
            $scope.names = [];

            $scope.reset = () : void =>
            {
                $scope.errorMsg = "";
                $scope.end = false;
                $scope.error = false;
            };

            $scope.reset();

            Scheme.query({}, (data : Interfaces.JSONSchemesData[]) =>
            {
                $scope.names = data;
            }, (data, status : string) =>
            {
                $scope.error = true;
                $location.path("/error/" + status);
            });

            $scope.$on("end", () =>
            {
                console.log("end");
                $scope.end = true;
            });

            $scope.$on("error", (event, status) =>
            {
                $scope.error = true;
                $location.path("/error/" + status);
            });

            $scope.$on("loaded", (event) =>
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
                $scope.reset();
                $scope.current = $scope.next($scope.current);
                $route.updateParams({'schemeId': $scope.names[$scope.current].id});
            };

            $scope.decrease = () : void =>
            {
                $scope.reset();
                $scope.current = $scope.previous($scope.current);
                $route.updateParams({'schemeId': $scope.names[$scope.current].id});
            };

            $scope.reload_route = () : void =>
            {
                if (confirm("Sei sicuro?"))
                {
                    $scope.reset();
                    $route.reload();
                }
            }

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