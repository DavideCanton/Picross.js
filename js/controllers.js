"use strict";
/*jshint undef: false */

var controllers = angular.module('controllers', []);


controllers.controller("picrossCtrl", ["$scope", "$http", "$routeParams", "$location",
    function ($scope, $http, $routeParams, $location)
    {
        $scope.schemeId = $routeParams.schemeId;

        $http.get('data/scheme' + $scope.schemeId + '.json').success(function (data)
        {
            $scope.rowLabels = data.rowLabels;
            $scope.rowLabelStatus = init_val_array($scope.rowLabels);
            $scope.colLabels = data.colLabels;
            $scope.colLabelStatus = init_val_array($scope.colLabels);

            $scope.rowsDisabled = [];
            $scope.colsDisabled = [];
            var i;
            for (i = 0; i < data.rows; i++)
                if ($scope.rowLabelStatus[i] === RowStatus.EQUAL)
                    $scope.rowsDisabled.push(i);

            for (i = 0; i < data.cols; i++)
                if ($scope.colLabelStatus[i] === RowStatus.EQUAL)
                    $scope.colsDisabled.push(i);

            $scope.table = new PicrossTable(data.rows, data.cols, $scope.rowsDisabled, $scope.colsDisabled);

            $scope.loaded = true;
            $scope.$emit("loaded");

        }).error(function (data, status)
        {
            $scope.loaded = false;
            $location.path("/error/" + status);
            $scope.$emit("error", status);
        });

        $scope.range = function (n)
        {
            return new Array(n);
        };

        $scope.updateEnabled = function (r, c)
        {
            var row = $scope.table.checkRowStatus(r);
            var col = $scope.table.checkColStatus(c);

            $scope.rowLabelStatus[r] = checkRow($scope.rowLabels[r], row);
            $scope.colLabelStatus[c] = checkRow($scope.colLabels[c], col);
        };

        $scope.pressedCell = function (i, j)
        {
            if ($scope.rowsDisabled.indexOf(i) >= 0 || $scope.colsDisabled.indexOf(j) >= 0)
                return;
            $scope.table.cycleCell(i, j);
            $scope.updateEnabled(i, j);
            if ($scope.checkEnd())
                $scope.$emit("end");
        };

        $scope.getCellClass = function (i, j)
        {
            if ($scope.table === undefined)
                return; // avoids calls before the table has loaded
            var cell = $scope.table.getCellStatus(i, j);
            if (cell == CellStatus.CLOSED)
                return "fill";
            else if (cell == CellStatus.CROSSED)
                return "crossed";
            else
                return "";
        };

        $scope.getLabelClass = function (index, isRow)
        {
            var status = isRow ? $scope.rowLabelStatus[index] : $scope.colLabelStatus[index];

            if (status == RowStatus.EQUAL)
                return "label_disabled";
            else if (status == RowStatus.WRONG)
                return "label_wrong";
            else
                return "";
        };

        $scope.checkEnd = function ()
        {
            return all($scope.rowLabelStatus, RowStatus.EQUAL) && all($scope.colLabelStatus, RowStatus.EQUAL);
        };
    }]);

controllers.controller("bodyController", ["$scope", "$http", "$location", "$route",
    function ($scope, $http, $location, $route)
    {
        $scope.error = false;
        $scope.child = {};
        $scope.errorMsg = "";
        $scope.names = [1, 2, 3];
        $scope.end = false;

        $http.get('data/schemes.json').success(function (data)
        {
            $scope.names = data;
        }).error(function (data, status)
        {
            $scope.error = true;
            $location.path("/error/" + status);
        });

        $scope.next = function (i)
        {
            return (i + 1) % $scope.names.length;
        };

        $scope.previous = function (i)
        {
            return (i - 1 + $scope.names.length) % $scope.names.length;
        };

        $scope.increase = function ()
        {
            $scope.current = $scope.next($scope.current);
            $location.path("/" + $scope.names[$scope.current].id);
        };

        $scope.decrease = function ()
        {
            $scope.current = $scope.previous($scope.current);
            $location.path("/" + $scope.names[$scope.current].id);
        };

        $scope.reload_route = function ()
        {
            if (confirm("Sei sicuro?"))
                $route.reload();
        };

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
            $scope.current = parseInt(event.targetScope.schemeId - 1);
        });
    }]);

controllers.controller("errorCtrl", ["$scope", "$routeParams",
    function ($scope, $routeParams)
    {
        $scope.errorMsg = "" + $routeParams.status;
    }]);