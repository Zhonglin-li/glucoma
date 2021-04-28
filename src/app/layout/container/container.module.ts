import {NgModule} from '@angular/core';
import {DrugForTargetsTableComponent} from './drug-for-targets-table/drug-for-targets-table.component';
import {DrugTableComponent} from './drug-table/drug-table.component';
import {PathwayTableComponent} from './pathway-table/pathway-table.component';
import {TargetTableComponent} from './target-table/target-table.component';
import {CommonModule} from '@angular/common';
import {ShareModule} from '../../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
  ],
  declarations: [
    DrugForTargetsTableComponent,
    DrugTableComponent,
    PathwayTableComponent,
    TargetTableComponent,
  ],
  exports: [
    DrugForTargetsTableComponent,
    DrugTableComponent,
    PathwayTableComponent,
    TargetTableComponent,
  ]
})
export class ContainerModule { }
