import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTableComponent } from './list-table/list-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './header/header.component';
import { AddTableComponent } from './add-table/add-table.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import { ViewTableComponent } from './view-table/view-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTableComponent,
    HeaderComponent,
    AddTableComponent,
    EditTableComponent,
    ViewTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
