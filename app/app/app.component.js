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
                };
                AppComponent.prototype.reset = function () {
                    this.errorMsg = "";
                    this.error = false;
                };
                AppComponent.prototype.goTo = function (event) {
                    if (event)
                        event.preventDefault();
                    var params = _.assign({ w: 5, h: 5 }, { w: this.rows, h: this.cols });
                    //this.waiting = true;
                    this.router.navigate(['Scheme', { w: params.w, h: params.h }]);
                };
                AppComponent.prototype.clearTable = function () {
                    swal({
                        title: "Attenzione!",
                        text: "Perderai i tuoi progressi! Sei sicuro?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true
                    }, function (isOk) {
                        if (isOk)
                            this.tableService.clearTable();
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