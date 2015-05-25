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
                $scope.rowLabels = data.rowLabels;
                $scope.rowLabelStatus = Utils.init_val_array($scope.rowLabels);
                $scope.colLabels = data.colLabels;
                $scope.colLabelStatus = Utils.init_val_array($scope.colLabels);

                $scope.rowsDisabled = [];
                $scope.colsDisabled = [];
                var i : number;
                for (i = 0; i < data.rows; i++)
                    if ($scope.rowLabelStatus[i] === Utils.RowStatus.EQUAL)
                        $scope.rowsDisabled.push(i);

                for (i = 0; i < data.cols; i++)
                    if ($scope.colLabelStatus[i] === Utils.RowStatus.EQUAL)
                        $scope.colsDisabled.push(i);

                $scope.table = new Utils.PicrossTable(data.rows, data.cols, $scope.rowsDisabled, $scope.colsDisabled);

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

                $scope.rowLabelStatus[r] = Utils.checkRow($scope.rowLabels[r], row);
                $scope.colLabelStatus[c] = Utils.checkRow($scope.colLabels[c], col);
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
                if (cell === Utils.CellStatus.CLOSED)
                    return "fill";
                else if (cell == Utils.CellStatus.CROSSED)
                    return "crossed";
                else
                    return "";
            };

            $scope.getLabelClass = (index : number, isRow : boolean) : string =>
            {
                var status : Utils.RowStatus = isRow ? $scope.rowLabelStatus[index] : $scope.colLabelStatus[index];

                if (status === Utils.RowStatus.EQUAL)
                    return "label_disabled";
                else if (status == Utils.RowStatus.WRONG)
                    return "label_wrong";
                else
                    return "";
            };

            $scope.checkEnd = () : boolean =>
            {
                return (Utils.all_el($scope.rowLabelStatus, Utils.RowStatus.EQUAL) &&
                Utils.all_el($scope.colLabelStatus, Utils.RowStatus.EQUAL));
            };
        }
    }

    export class BodyController
    {
        static $inject = ["$scope", "$location", "$route", "Scheme"];

        constructor(private $scope : Interfaces.IBodyControllerScope,
                    private $location : ng.ILocationService,
                    private $route : ng.route.IRouteService,
                    private Scheme : Interfaces.ISchemeResource)
        {
            $scope.error = false;
            $scope.errorMsg = "";
            $scope.names = [null, null, null];
            $scope.end = false;

            Scheme.query({}, (data : Interfaces.JSONSchemesData[]) =>
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

    export class ErrorCtrl
    {
        static $inject = ["$scope", "$routeParams"];

        constructor(private $scope : Interfaces.IErrorCtrlScope,
                    private $routeParams : Interfaces.ErrorRouteParams)
        {
            $scope.errorMsg = "" + $routeParams.status;
        }
    }

    controllers.controller('bodyCtrl', Controllers.BodyController)
        .controller('picrossCtrl', Controllers.PicrossCtrl)
        .controller('errorCtrl', Controllers.ErrorCtrl);
}