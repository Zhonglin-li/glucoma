import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShareModule} from '../../share/share.module';
import {HomeComponent} from './home/home.component';
import {HelpComponent} from './help/help.component';
import {ContactComponent} from './contact/contact.component';
import {SearchComponent} from './search/search.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { SeaComponent } from './sea/sea.component';
import {ChemicalScreeningComponent} from "./chemical-screening/chemical-screening.component";
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FileUploadModule} from 'ng2-file-upload';



@NgModule({
  declarations: [
    HomeComponent,
    HelpComponent,
    ContactComponent,
    SearchComponent,
    PageNotFoundComponent,
    SeaComponent,
    ChemicalScreeningComponent,
    
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    FileUploadModule,

  ],  
  exports: [
    HomeComponent,
    HelpComponent,
    ContactComponent,
    SearchComponent,
    PageNotFoundComponent,
    SeaComponent,
    ChemicalScreeningComponent,
    FormsModule,
    ShareModule,
  ]
})

export class PageModule { }
