import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTableComponent } from './list-table/list-table.component';
import { AddTableComponent } from './add-table/add-table.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import { ViewTableComponent } from './view-table/view-table.component';


const routes: Routes = [
  {path:'',component:ListTableComponent},
  {path:'Tables',component:ListTableComponent},
  {path:'Table/add',component:AddTableComponent},
  {path:'Table/edit/:id',component:EditTableComponent},
  {path:'Table/view/:id',component:ViewTableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
