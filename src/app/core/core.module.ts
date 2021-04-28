import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from '../app-routing.module';
import { ShareModule } from '../share/share.module';
import { RestService } from '../service/rest/rest.service';
import { GlobalService } from '../service/global/global.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import { PageModule } from '../layout/page/page.module';
import { DrugModule } from '../layout/drug/drug.module';
import { PathwayModule } from '../layout/pathway/pathway.module';
import { TargetModule } from '../layout/target/target.module';
import { MoleculeModule } from '../layout/molecule/molecule.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShareModule,
    FormsModule,
    PageModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AppRoutingModule, 
  ],
  exports: [
    ShareModule,
    AppRoutingModule,

  ],
  providers: [RestService, GlobalService]
})
export class CoreModule { 
  constructor( @Optional() @SkipSelf() parentModule: CoreModule){
    if (parentModule) {
      throw new Error('CoreModule is already loaded.')
    }
  }
}
