import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {ContainerModule} from '../container/container.module';
import {DrugRoutingModule} from './drug-routing.module';
import {DrugListComponent} from './drug-list/drug-list.component';
import {DrugForTargetComponent} from './drug-for-target/drug-for-target.component';
import {DrugDetailComponent} from './drug-detail/drug-detail.component';
import {CardModule} from '../../share/card/card.module';
import {CommonModule} from '@angular/common';
import { DrugSearchComponent } from './drug-search/drug-search.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DrugForHerbComponent } from './drug-for-herb/drug-for-herb.component'

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    ContainerModule,
    CardModule,
    DrugRoutingModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  declarations: [
    DrugListComponent,
    DrugDetailComponent,
    DrugForTargetComponent,
    DrugSearchComponent,
    DrugForHerbComponent,

  ]
})
export class DrugModule { }
