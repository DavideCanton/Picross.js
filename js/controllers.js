///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="services.ts"/>
///<reference path="utils.ts"/>
"use strict";
var controllers = angular.module('controllers', []);
var PicrossCtrl = (function () {
    function PicrossCtrl($scope, $routeParams, $location, Scheme) {
        this.$scope = $scope;
        this.$routeParams = $routeParams;
        this.$location = $location;
        this.Scheme = Scheme;
        $scope.schemeId = $routeParams.schemeId;
        Scheme.get({ schemeID: $scope.schemeId }, function (data) {
            $scope.rowLabels = data.rowLabels;
            $scope.rowLabelStatus = init_val_array($scope.rowLabels);
            $scope.colLabels = data.colLabels;
            $scope.colLabelStatus = init_val_array($scope.colLabels);
            $scope.rowsDisabled = [];
            $scope.colsDisabled = [];
            var i;
            for (i = 0; i < data.rows; i++)
                if ($scope.rowLabelStatus[i] === 0 /* EQUAL */)
                    $scope.rowsDisabled.push(i);
            for (i = 0; i < data.cols; i++)
                if ($scope.colLabelStatus[i] === 0 /* EQUAL */)
                    $scope.colsDisabled.push(i);
            $scope.table = new PicrossTable(data.rows, data.cols, $scope.rowsDisabled, $scope.colsDisabled);
            $scope.loaded = true;
            $scope.$emit("loaded");
        }, function () {
            $scope.loaded = false;
            $location.path("/error/404");
            $scope.$emit("error", "404");
        });
        $scope.range = function (n) { return new Array(n); };
        $scope.updateEnabled = function (r, c) {
            var row = $scope.table.checkRowStatus(r);
            var col = $scope.table.checkColStatus(c);
            $scope.rowLabelStatus[r] = checkRow($scope.rowLabels[r], row);
            $scope.colLabelStatus[c] = checkRow($scope.colLabels[c], col);
        };
        $scope.pressedCell = function (i, j) {
            if ($scope.rowsDisabled.indexOf(i) >= 0 || $scope.colsDisabled.indexOf(j) >= 0)
                return;
            $scope.table.cycleCell(i, j);
            $scope.updateEnabled(i, j);
            if ($scope.checkEnd())
                $scope.$emit("end");
        };
        $scope.getCellClass = function (i, j) {
            if ($scope.table === undefined)
                return; // avoids calls before the table has loaded
            var cell = $scope.table.getCellStatus(i, j);
            if (cell === 1 /* CLOSED */)
                return "fill";
            else if (cell == 2 /* CROSSED */)
                return "crossed";
            else
                return "";
        };
        $scope.getLabelClass = function (index, isRow) {
            var status = isRow ? $scope.rowLabelStatus[index] : $scope.colLabelStatus[index];
            if (status === 0 /* EQUAL */)
                return "label_disabled";
            else if (status == 1 /* WRONG */)
                return "label_wrong";
            else
                return "";
        };
        $scope.checkEnd = function () {
            return all_el($scope.rowLabelStatus, 0 /* EQUAL */) && all_el($scope.colLabelStatus, 0 /* EQUAL */);
        };
    }
    PicrossCtrl.$inject = ["$scope", "$routeParams", "$location", "Scheme"];
    return PicrossCtrl;
})();
controllers.controller("picrossCtrl", PicrossCtrl);
var BodyController = (function () {
    function BodyController($scope, $location, $route, Scheme) {
        this.$scope = $scope;
        this.$location = $location;
        this.$route = $route;
        this.Scheme = Scheme;
        $scope.error = false;
        $scope.errorMsg = "";
        $scope.names = [null, null, null];
        $scope.end = false;
        Scheme.query({}, function (data) {
            $scope.names = data;
        }, function (data, status) {
            $scope.error = true;
            $location.path("/error/" + status);
        });
        $scope.$on("end", function () {
            console.log("end");
            $scope.end = true;
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
            $scope.current = $scope.next($scope.current);
            $location.path("/" + $scope.names[$scope.current].id);
        };
        $scope.decrease = function () {
            $scope.current = $scope.previous($scope.current);
            $location.path("/" + $scope.names[$scope.current].id);
        };
        $scope.reload_route = function () {
            if (confirm("Sei sicuro?"))
                $route.reload();
        };
    }
    BodyController.$inject = ["$scope", "$location", "$route", "Scheme"];
    return BodyController;
})();
controllers.controller("bodyController", BodyController);
var ErrorCtrl = (function () {
    function ErrorCtrl($scope, $routeParams) {
        this.$scope = $scope;
        this.$routeParams = $routeParams;
        $scope.errorMsg = "" + $routeParams.status;
    }
    ErrorCtrl.$inject = ["$scope", "$routeParams"];
    return ErrorCtrl;
})();
controllers.controller("errorCtrl", ErrorCtrl);
//# sourceMappingURL=controllers.js.map