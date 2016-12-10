System.register(["angular2/core", "../picross/picross.component", "../js/tableService", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, picross_component_1, tableService_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (picross_component_1_1) {
                picross_component_1 = picross_component_1_1;
            },
            function (tableService_1_1) {
                tableService_1 = tableService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router, tableService) {
                    this.router = router;
                    this.tableService = tableService;
                    this.waiting = false;
                    this.reset();
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.rows = 5;
                    this.cols = 5;
                    this.hash = 0;
                };
                AppComponent.prototype.reset = function () {
                    this.errorMsg = "";
                    this.error = false;
                };
                AppComponent.prototype.generateSchema = function (event) {
                    if (event)
                        event.preventDefault();
                    var _a = { w: this.rows, h: this.cols }, _b = _a.w, w = _b === void 0 ? 5 : _b, _c = _a.h, h = _c === void 0 ? 5 : _c;
                    this.router.navigate(['Scheme', { w: w, h: h, t: this.hash }]);
                    ++this.hash;
                };
                AppComponent.prototype.clearTable = function () {
                    var _this = this;
                    swal({
                        title: "Attenzione!",
                        text: "Perderai i tuoi progressi! Sei sicuro?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true
                    }, function (isOk) {
                        if (isOk)
                            _this.tableService.clearTable();
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/app/app.component.html',
                        styleUrls: ['app/app/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, picross_component_1.PicrossComponent],
                        providers: [router_1.ROUTER_PROVIDERS, tableService_1.TableService]
                    }),
                    router_1.RouteConfig([
                        { path: '/scheme', name: "Scheme", component: picross_component_1.PicrossComponent },
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, tableService_1.TableService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map