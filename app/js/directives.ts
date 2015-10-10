///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="utils.ts"/>

module Directives
{
    export var directives : ng.IModule = angular.module("directives", []);

    directives.directive('ngRightClick', ['$parse', ($parse : ng.IParseService) =>
    {
        return {
            restrict: 'A',
            link: (scope, element, attrs) =>
            {
                var fn = $parse(attrs.ngRightClick);
                element.bind('contextmenu', (event) =>
                {
                    scope.$apply(() =>
                    {
                        event.preventDefault();
                        fn(scope, {$event: event});
                    });
                });
            }
        }
    }]);

    directives.directive("labelClass", ['$parse', ($parse : ng.IParseService) =>
    {
        return {
            restrict: 'A',
            scope: false,
            link: (scope, element, attrs) =>
            {
                var v = $parse(attrs.labelClass);

                scope.$watch(() => v(scope), (value) =>
                {
                    var cl;
                    switch (value)
                    {
                        case Utils.RowStatus.EQUAL:
                            cl = "label_disabled";
                            break;
                        case Utils.RowStatus.WRONG:
                            cl = "label_wrong";
                            break;
                        default:
                            cl = "";
                    }
                    element.removeClass("label_disabled label_wrong").addClass(cl);
                });
            }
        }
    }]);

    directives.directive("cellTd", () =>
    {
        return {
            restrict: 'A',
            scope: {
                row: "=",
                col: "=",
                onclick: "&",
                onrightclick: "&",
                val: "&"
            },
            link: (scope : Interfaces.ICellTdScope, element) =>
            {
                scope.$watch(() => scope.val({row: scope.row, col: scope.col}), (status) =>
                {
                    var cl;
                    switch (status)
                    {
                        case Utils.CellStatus.CLOSED:
                            cl = "fill";
                            break;
                        case Utils.CellStatus.GRAYED:
                            cl = "crossed";
                            break;
                        default:
                            cl = "";
                    }
                    element.removeClass("fill crossed").addClass(cl);
                });

                element.bind("click", () =>
                {
                    scope.$apply(() => scope.onclick({row: scope.row, col: scope.col}));
                });

                element.bind('contextmenu', (event) =>
                {
                    scope.$apply(() =>
                    {
                        event.preventDefault();
                        scope.onrightclick({row: scope.row, col: scope.col});
                    });
                });
            }
        }
    });
}
