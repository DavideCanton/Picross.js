///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="utils.ts"/>
var Directives;
(function (Directives) {
    Directives.directives = angular.module("directives", []);
    Directives.directives.directive('ngRightClick', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var fn = $parse(attrs.ngRightClick);
                element.bind('contextmenu', function (event) {
                    scope.$apply(function () {
                        event.preventDefault();
                        fn(scope, { $event: event });
                    });
                });
            }
        };
    }]);
    Directives.directives.directive("labelClass", ['$parse', function ($parse) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                var v = $parse(attrs.labelClass);
                scope.$watch(function () { return v(scope); }, function (value) {
                    var cl;
                    switch (value) {
                        case 0 /* EQUAL */:
                            cl = "label_disabled";
                            break;
                        case 1 /* WRONG */:
                            cl = "label_wrong";
                            break;
                        default:
                            cl = "";
                    }
                    element.removeClass("label_disabled label_wrong").addClass(cl);
                });
            }
        };
    }]);
    Directives.directives.directive("cellTd", function () {
        return {
            restrict: 'A',
            scope: {
                row: "=",
                col: "=",
                onclick: "&",
                onrightclick: "&",
                val: "&"
            },
            link: function (scope, element) {
                scope.$watch(function () { return scope.val({ row: scope.row, col: scope.col }); }, function (status) {
                    var cl;
                    switch (status) {
                        case 1 /* CLOSED */:
                            cl = "fill";
                            break;
                        case 2 /* GRAYED */:
                            cl = "crossed";
                            break;
                        default:
                            cl = "";
                    }
                    element.removeClass("fill crossed").addClass(cl);
                });
                element.bind("click", function () {
                    scope.$apply(function () { return scope.onclick({ row: scope.row, col: scope.col }); });
                });
                element.bind('contextmenu', function (event) {
                    scope.$apply(function () {
                        event.preventDefault();
                        scope.onrightclick({ row: scope.row, col: scope.col });
                    });
                });
            }
        };
    });
})(Directives || (Directives = {}));
//# sourceMappingURL=directives.js.map