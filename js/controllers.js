///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="interfaces.ts"/>
///<reference path="services.ts"/>
///<reference path="utils.ts"/>
"use strict";
var Controllers;
(function (Controllers) {
    Controllers.controllers = angular.module('controllers', []);
    var PicrossCtrl = (function () {
        function PicrossCtrl($scope, $routeParams, $location, Scheme) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.Scheme = Scheme;
            $scope.schemeId = $routeParams.schemeId;
            $scope.end = false;
            Scheme.get({ schemeID: $scope.schemeId }, function (data) {
                $scope.table = new Utils.PicrossTable(data);
                $scope.loaded = true;
                $scope.$emit("loaded");
            }, function () {
                $scope.loaded = false;
                $location.path("/error/404");
                $scope.$emit("error", "404");
            });
            $scope.range = function (n) {
                var a = [];
                for (var i = 0; i < n; i++)
                    a.push(i);
                return a;
            };
            $scope.updateEnabled = function (r, c) {
                $scope.table.updateRowStatus(r);
                $scope.table.updateColStatus(c);
            };
            $scope.pressedCell = function (i, j) {
                if ($scope.end)
                    return;
                if ($scope.table.getRowData(i).disabled || $scope.table.getColData(j).disabled)
                    return;
                $scope.table.closeCell(i, j);
                $scope.updateEnabled(i, j);
                if ($scope.table.isCompleted()) {
                    $scope.end = true;
                    $scope.$emit("end");
                }
            };
            $scope.pressedRightCell = function (i, j) {
                if ($scope.end)
                    return;
                if ($scope.table.getRowData(i).disabled || $scope.table.getColData(j).disabled)
                    return;
                $scope.table.grayCell(i, j);
                $scope.updateEnabled(i, j);
            };
        }
        PicrossCtrl.$inject = ["$scope", "$routeParams", "$location", "Scheme"];
        return PicrossCtrl;
    })();
    Controllers.PicrossCtrl = PicrossCtrl;
    var BodyController = (function () {
        function BodyController($scope, $location, $route, Scheme) {
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.Scheme = Scheme;
            $scope.names = [];
            $scope.reset = function () {
                $scope.errorMsg = "";
                $scope.error = false;
            };
            $scope.reset();
            Scheme.query({}, function (data) {
                $scope.names = data;
            }, function (data, status) {
                $scope.error = true;
                $location.path("/error/" + status);
            });
            $scope.$on("error", function (event, status) {
                $scope.error = true;
                $location.path("/error/" + status);
            });
            $scope.$on("loaded", function (event) {
                var childScope = event.targetScope;
                $scope.current = parseInt(childScope.schemeId) - 1;
            });
            $scope.next = function (i) {
                return (i + 1) % $scope.names.length;
            };
            $scope.previous = function (i) {
                return (i - 1 + $scope.names.length) % $scope.names.length;
            };
            $scope.increase = function () {
                $scope.reset();
                $scope.current = $scope.next($scope.current);
                $route.updateParams({ 'schemeId': $scope.names[$scope.current].id });
            };
            $scope.decrease = function () {
                $scope.reset();
                $scope.current = $scope.previous($scope.current);
                $route.updateParams({ 'schemeId': $scope.names[$scope.current].id });
            };
            $scope.reload_route = function () {
                if (confirm("Sei sicuro?")) {
                    $scope.reset();
                    $route.reload();
                }
            };
        }
        BodyController.$inject = ["$scope", "$location", "$route", "Scheme"];
        return BodyController;
    })();
    Controllers.BodyController = BodyController;
    var ErrorCtrl = (function () {
        function ErrorCtrl($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.errorMsg = $routeParams.status;
        }
        ErrorCtrl.$inject = ["$scope", "$routeParams"];
        return ErrorCtrl;
    })();
    Controllers.ErrorCtrl = ErrorCtrl;
    Controllers.controllers.controller('bodyCtrl', Controllers.BodyController).controller('picrossCtrl', Controllers.PicrossCtrl).controller('errorCtrl', Controllers.ErrorCtrl);
})(Controllers || (Controllers = {}));
//# sourceMappingURL=controllers.js.map