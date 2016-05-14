System.register(["angular2/core", "../js/utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, utils_1;
    var PicrossLabelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            PicrossLabelComponent = (function () {
                function PicrossLabelComponent() {
                }
                Object.defineProperty(PicrossLabelComponent.prototype, "isEqual", {
                    get: function () {
                        return this.status === utils_1.RowStatus.EQUAL;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PicrossLabelComponent.prototype, "isWrong", {
                    get: function () {
                        return this.status === utils_1.RowStatus.WRONG;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PicrossLabelComponent.prototype, "status", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PicrossLabelComponent.prototype, "labelClass", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PicrossLabelComponent.prototype, "text", void 0);
                PicrossLabelComponent = __decorate([
                    core_1.Component({
                        selector: '[picross-label]',
                        templateUrl: 'app/picross-label/picross-label.component.html',
                        styleUrls: ['app/picross-label/picross-label.component.css'],
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [])
                ], PicrossLabelComponent);
                return PicrossLabelComponent;
            }());
            exports_1("PicrossLabelComponent", PicrossLabelComponent);
        }
    }
});
//# sourceMappingURL=picross-label.component.js.map