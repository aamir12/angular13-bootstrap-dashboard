import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ContractComponent } from './pages/contract/contract.component';
import { ContractDetailComponent } from './pages/contract-detail/contract-detail.component';
import { ContractListComponent } from './pages/contract-list/contract-list.component';
import { PreventDefaultDirective } from './directives/prevent-default.directive';
import { IaaListComponent } from './pages/iaa-list/iaa-list.component';
import { IaaDetailComponent } from './pages/iaa-detail/iaa-detail.component';
import { IaaComponent } from './pages/iaa/iaa.component';
import { ContractorComponent } from './pages/contractor/contractor.component';
import { ContractorListComponent } from './pages/contractor-list/contractor-list.component';
import { ContractorDetailComponent } from './pages/contractor-detail/contractor-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { ValidatorBaseDirective } from './directives/validator-base';
import { BasePeriodsComponent } from './base-periods/base-periods.component';
import { BasePeriodComponent } from './base-periods/base-period/base-period.component';
import { ModificationsComponent } from './modifications/modifications.component';
import { ModificationComponent } from './modifications/modification/modification.component';
import { AfterDateDirective } from './directives/after-date-validator';
import { DatePickerComponent } from './components/date-picker/date-picker';
import { AP3DateAdapter, AP3DateParserFormatter } from './ap3-date-parser-formatter';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from './pages/template-form/template-form.component';
import { InfoBannerComponent } from './components/info-banner/info-banner.component';
import { ReactiveFormComponent } from './pages/reactive-form/reactive-form.component';
import { RbasePeriodsComponent } from './pages/reactive-form/rbase-periods/rbase-periods.component';
import { RmodificationsComponent } from './pages/reactive-form/rbase-periods/rmodifications/rmodifications.component';
import { EventTestingComponent } from './pages/event-testing/event-testing.component';
import { EventChildComponent } from './pages/event-testing/event-child/event-child.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkAutoCompleteComponent } from './pages/ak-auto-complete/ak-auto-complete.component';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectAutoCompleteModule } from './components/autocomplete/multi-select-auto-complete.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    PageHeaderComponent,
    ContractComponent,
    ContractDetailComponent,
    ContractListComponent,
    PreventDefaultDirective,
    IaaListComponent,
    IaaDetailComponent,
    IaaComponent,
    ContractorComponent,
    ContractorListComponent,
    ContractorDetailComponent,
    FooterComponent,
    BasePeriodsComponent,
    BasePeriodComponent,
    ModificationsComponent,
    ModificationComponent,
    ValidatorBaseDirective,
    AfterDateDirective,
    DatePickerComponent,
    TemplateFormComponent,
    InfoBannerComponent,
    ReactiveFormComponent,
    RbasePeriodsComponent,
    RmodificationsComponent,
    EventTestingComponent,
    EventChildComponent,
    AkAutoCompleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MultiSelectAutoCompleteModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: AP3DateAdapter },
    { provide: NgbDateParserFormatter, useClass: AP3DateParserFormatter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
