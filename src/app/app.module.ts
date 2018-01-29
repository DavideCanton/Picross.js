import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PicrossComponent } from './components/picross/picross.component';
import { AppComponent } from './components/app/app.component';
import { PicrossCellComponent } from './components/picross-cell/picross-cell.component';
import { PicrossLabelComponent } from './components/picross-label/picross-label.component';
import { TimerComponent } from './components/timer/timer.component';
import { AppRoutingModule } from './app-routing.module';
import { TableService } from './services/table/table.service';
import { EnvironmentService } from './services/environment/environment.service';


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
