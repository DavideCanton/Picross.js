import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from 'app/app-routing.module';
import {AppComponent} from 'app/components/app/app.component';
import {PicrossCellComponent} from 'app/components/picross-cell/picross-cell.component';
import {PicrossLabelComponent} from 'app/components/picross-label/picross-label.component';
import {PicrossComponent} from 'app/components/picross/picross.component';
import {TimerComponent} from 'app/components/timer/timer.component';
import {EnvironmentService} from 'app/services/environment/environment.service';
import {TableService} from 'app/services/table/table.service';

@NgModule({
  declarations: [
    AppComponent,
    PicrossComponent,
    PicrossCellComponent,
    PicrossLabelComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [TableService, EnvironmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
