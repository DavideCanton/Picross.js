///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="interfaces.ts"/>
///<reference path="utils.ts"/>
"use strict";
var Controllers;
(function (Controllers) {
    Controllers.controllers = angular.module('controllers', []);
    var PicrossCtrl = (function () {
        function PicrossCtrl($scope, $routeParams, $location) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.$location = $location;
            $scope.end = false;
            $scope.table = Utils.PicrossTable.randomTable(+$routeParams.w, +$routeParams.h, +$routeParams.p);
            $scope.loaded = true;
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
                if ($scope.table.isCompleted())
                    $scope.end = true;
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
        PicrossCtrl.$inject = ["$scope", "$routeParams", "$location"];
        return PicrossCtrl;
    })();
    Controllers.PicrossCtrl = PicrossCtrl;
    var BodyController = (function () {
        function BodyController($scope, $location, $route) {
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            $scope.rows = 5;
            $scope.cols = 5;
            $scope.reset = function () {
                $scope.errorMsg = "";
                $scope.error = false;
            };
            $scope.goTo = function (w, h, event) {
                if (event)
                    event.preventDefault();
                var p = 0.8;
                $route.reload();
                $location.search({ 'w': w || 5, 'h': h || 5, 'p': p }).path("/scheme");
            };
            $scope.reset();
            $scope.$on("error", function (event, status) {
                $scope.error = true;
                $location.path("/error/" + status);
            });
        }
        BodyController.$inject = ["$scope", "$location", "$route"];
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