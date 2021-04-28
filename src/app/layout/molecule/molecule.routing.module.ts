import {RouterModule, Routes} from '@angular/router';
import {MoleculeListComponent} from './molecule-list/molecule-list.component';
import {MoleculeDrugComponent} from './molecule-drug/molecule-drug.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MoleculeListComponent
  },
  {
    path: 'molecule-drug',
    component: MoleculeDrugComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculeRoutingModule { }
