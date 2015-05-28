///<reference path="typings/angularjs/angular.d.ts"/>
var Directives;
(function (Directives) {
    Directives.directives = angular.module("directives", []);
    Directives.directives.directive('ngRightClick', ['$parse', function ($parse) {
            return function (scope, element, attrs) {
                var fn = $parse(attrs.ngRightClick);
                element.bind('contextmenu', function (event) {
                    scope.$apply(function () {
                        event.preventDefault();
                        fn(scope, { $event: event });
                    });
                });
            };
        }]);
})(Directives || (Directives = {}));
