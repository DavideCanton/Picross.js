///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="utils.ts"/>

"use strict";
module Directives
{
    export var directives : ng.IModule = angular.module("directives", []);


    class PicrossLabelDirective implements ng.IDirective
    {
        restrict = 'A';
        scope =
        {
            status: '=picrossLabel'
        };

        link(scope : Interfaces.LabelClassDirectiveScope, element : ng.IAugmentedJQuery)
        {
            scope.$watch(() => scope.status, (value) =>
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

        static factory()
        {
            var directive = () => new PicrossLabelDirective();
            directive.$inject = [];
            return directive;
        }
    }

    class PicrossCellDirective implements ng.IDirective
    {
        restrict = 'A';
        scope = {
            row: "=",
            col: "=",
            onclick: "&",
            onrightclick: "&",
            val: "&"
        };

        link(scope : Interfaces.ICellTdScope, element : ng.IAugmentedJQuery)
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

        static factory()
        {
            var directive = () => new PicrossCellDirective();
            directive.$inject = [];
            return directive;
        }
    }


    directives.directive("picrossLabel", PicrossLabelDirective.factory());
    directives.directive("picrossCell", PicrossCellDirective.factory());
}
