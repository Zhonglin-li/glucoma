import {RouterModule, Routes} from '@angular/router';
import {DrugListComponent} from './drug-list/drug-list.component';
import {DrugDetailComponent} from './drug-detail/drug-detail.component';
import {DrugForTargetsTableComponent} from '../container/drug-for-targets-table/drug-for-targets-table.component';
import {NgModule} from '@angular/core';
import {DrugForTargetComponent} from './drug-for-target/drug-for-target.component';
import {DrugSearchComponent} from './drug-search/drug-search.component';

const routes: Routes = [
  {
    path: '',
    component: DrugListComponent
  },
  {
    path: 'drug-search',
    component: DrugSearchComponent
  },
  {
    path: 'drug-for-target',
    component: DrugForTargetComponent
  },
  {
    path: ':id',
    component: DrugDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugRoutingModule { }
