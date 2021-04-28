import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/page/home/home.component';
import { SearchComponent } from './layout/page/search/search.component';
import {PageNotFoundComponent} from './layout/page/page-not-found/page-not-found.component';
import {SelectivePreloadingStrategy} from './selective-preloading-strategy';
import {HelpComponent} from './layout/page/help/help.component';
import {PathwayListComponent} from './layout/pathway/pathway-list/pathway-list.component';
import {DrugListComponent} from './layout/drug/drug-list/drug-list.component';
import {DrugDetailComponent} from './layout/drug/drug-detail/drug-detail.component';
import {TargetListComponent} from './layout/target/target-list/target-list.component';
import {DrugForTargetComponent} from './layout/drug/drug-for-target/drug-for-target.component';
import {TargetPredictionComponent} from './layout/target/target-prediction/target-prediction.component';
import {TargetDetailComponent} from './layout/target/target-detail/target-detail.component';
import {MoleculeListComponent} from './layout/molecule/molecule-list/molecule-list.component';
import {MoleculeDrugComponent} from './layout/molecule/molecule-drug/molecule-drug.component';
import {ContactComponent} from "./layout/page/contact/contact.component";
import {SeaComponent} from "./layout/page/sea/sea.component";
import {ChemicalScreeningComponent} from "./layout/page/chemical-screening/chemical-screening.component";



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  // {path: 'sea', component: SeaComponent},
  {
    path: 'pathway',
    loadChildren: 'src/app/layout/pathway/pathway.module#PathwayModule'
  },
  {
    path: 'sea',
    component: SeaComponent,
  },
  {
    path: 'chemical-screening',
    component: ChemicalScreeningComponent
  },
  {
    path: 'drug-glau-treatment',
    loadChildren: './layout/drug/drug.module#DrugModule'
  },
  // {path: 'drug-glau-treatment', component: DrugListComponent},
  // {path: 'drug/:id', component: DrugDetailComponent},
  {
    path: 'target',
    loadChildren: 'src/app/layout/target/target.module#TargetModule'
  },
  // {path: 'drug-for-target', component: DrugForTargetComponent},
  // {path: 'target/:chemblid', component: TargetDetailComponent},
  {
    path: 'molecule',
    loadChildren: 'src/app/layout/molecule/molecule.module#MoleculeModule'
  },
  // {path: 'molecule-drug', component: MoleculeDrugComponent},

  // {path: 'target-prediction/:smiles', component: TargetPredictionComponent},

  // {path: 'search', loadChildren: 'app/search/search.module#SearchModule'},
  {path: 'help', component: HelpComponent},
  {path: 'contact', component: ContactComponent},
  // {path: 'layout-browse', loadChildren: 'app/layout-browse/layout-browse.module#DataBrowseModule',
  // layout: {preload: true}},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
