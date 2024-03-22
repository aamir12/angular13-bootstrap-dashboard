import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContractComponent } from './pages/contract/contract.component';
import { ContractDetailComponent } from './pages/contract-detail/contract-detail.component';
import { ContractListComponent } from './pages/contract-list/contract-list.component';
import { TemplateFormComponent } from './pages/template-form/template-form.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'contracts',
    component:ContractComponent,
    children:[
      {
        path:'',
        component:ContractListComponent
      },
      {
        path:':id',
        component:ContractDetailComponent
      }
    ]
  },
  {
    path:'templateForm',
    component: TemplateFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
