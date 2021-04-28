import {RouterModule, Routes} from '@angular/router';
import {PathwayListComponent} from './pathway-list/pathway-list.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PathwayListComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PathwayRoutingModule { }
