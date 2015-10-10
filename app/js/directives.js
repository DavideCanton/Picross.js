///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="utils.ts"/>
"use strict";
var Directives;
(function (Directives) {
    Directives.directives = angular.module("directives", []);
    var PicrossLabelDirective = (function () {
        function PicrossLabelDirective() {
            this.restrict = 'A';
            this.scope = {
                status: '=picrossLabel'
            };
        }
        PicrossLabelDirective.prototype.link = function (scope, element) {
            scope.$watch(function () { return scope.status; }, function (value) {
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
        };
        PicrossLabelDirective.factory = function () {
            var directive = function () { return new PicrossLabelDirective(); };
            directive.$inject = [];
            return directive;
        };
        return PicrossLabelDirective;
    })();
    var PicrossCellDirective = (function () {
        function PicrossCellDirective() {
            this.restrict = 'A';
            this.scope = {
                row: "=",
                col: "=",
                onclick: "&",
                onrightclick: "&",
                val: "&"
            };
        }
        PicrossCellDirective.prototype.link = function (scope, element) {
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
        };
        PicrossCellDirective.factory = function () {
            var directive = function () { return new PicrossCellDirective(); };
            directive.$inject = [];
            return directive;
        };
        return PicrossCellDirective;
    })();
    Directives.directives.directive("picrossLabel", PicrossLabelDirective.factory());
    Directives.directives.directive("picrossCell", PicrossCellDirective.factory());
})(Directives || (Directives = {}));
//# sourceMappingURL=directives.js.map