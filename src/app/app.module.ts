import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PicrossComponent } from './picross/picross.component';
import { PicrossCellComponent } from './picross-cell/picross-cell.component';
import { PicrossLabelComponent } from './picross-label/picross-label.component';
import { TableService } from './js/table.service';
import { TimerComponent } from './timer/timer.component';


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
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
