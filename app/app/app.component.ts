import {Component, OnInit} from "angular2/core";
import {PicrossComponent} from "../picross/picross.component";
import {TableService} from "../js/tableService";
import {ROUTER_PROVIDERS, RouteConfig, Router, ROUTER_DIRECTIVES} from "angular2/router";


@Component({
    selector: 'app',
    templateUrl: 'app/app/app.component.html',
    styleUrls: ['app/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, PicrossComponent],
    providers: [ROUTER_PROVIDERS, TableService]
})
@RouteConfig([
    {path: '/scheme', name: "Scheme", component: PicrossComponent},
    //  { path: '/error/:error', component: ErrorComponent, name: 'ErrorComponent'},
])
export class AppComponent implements OnInit
{
    waiting : boolean;
    errorMsg : string;
    error : boolean;

    rows : number;
    cols : number;

    private hash: number;

    constructor(private router : Router, private tableService : TableService)
    {
        this.waiting = false;

        this.reset();
    }

    ngOnInit() : any
    {
        this.rows = 5;
        this.cols = 5;
        this.hash = 0;
    }

    reset()
    {
        this.errorMsg = "";
        this.error = false;
    }

    generateSchema(event : MouseEvent)
    {
        if (event)
            event.preventDefault();

        let {w = 5, h = 5} = {w: this.rows, h: this.cols };

        this.router.navigate(['Scheme', {w: w, h: h, t: this.hash}]);

        ++this.hash;
    }

    clearTable()
    {
        swal({
            title: "Attenzione!",
            text: "Perderai i tuoi progressi! Sei sicuro?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true
        }, isOk =>
        {
            if (isOk)
                this.tableService.clearTable();
        });

    }
}