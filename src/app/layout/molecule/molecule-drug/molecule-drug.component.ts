import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PageMeta} from '../../../glu/models/page-meta';
import {Drug} from '../../../glu/models/drug';
import {MatSort} from '@angular/material/sort';
import {GlobalService} from '../../../service/global/global.service';
import {TargetListParamType} from '../../../glu/enum/target-list-param-type.enum';
import {MoleculeStructure} from '../../../glu/models/molecule-structure';
import {Subscription} from "rxjs";
import {DrugbankId} from '../../../glu/models/drugbank-id';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-molecule-drug',
  templateUrl: './molecule-drug.component.html',
  styleUrls: ['./molecule-drug.component.css']
})

export class MoleculeDrugComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  smiles: string;
  body: object;
  structureType: string;
  drugPageMeta: PageMeta | null;
  moleculePageMeta: PageMeta | null;
  drugForTargetPageMeta: PageMeta | null;
  moleculesDataSource = new MatTableDataSource();
  drugDataSource = new MatTableDataSource();
  drugForTargetDataSource = new MatTableDataSource();
  drugs: Drug[] | null;
  tableTitle = '';
  molecules: MoleculeStructure[] | null;
  drugForTargets: DrugbankId[] | null;
  moleculeSubscription: Subscription;
  drugSubscription: Subscription;
  drugForTargetSubscription: Subscription;
  pageSizeOptions = [5, 10, 20, 50, 100];
  moleculeIncludeParams = '?sort[]=molecule_chembl_id' + '&exclude[]=target_set.*&include[]=target_set.id';
  drugIncludeParams = '&sort[]=id&exclude[]=pathway_set.*&exclude[]=targets.*';
  displayedColumns = ['chembl_id', 'formula', 'mol_weight', 'alogp', 'psa', 'rtb', 'hbd', 'hba', 'targets'];
  allColumns = ['chembl_id', 'formula', 'mol_weight', 'alogp', 'psa', 'rtb', 'hbd', 'hba', 'targets'];
  drugDisplayedColumns = ['drugbank_id', 'drug_name', 'formula', 'mol_weight', 'alogp', 'psa', 'rtb', 'hbd', 'hba'];
  drugForTargetDisplayedColumns = ['drugbank_id', 'drug_name', 'formula', 'mol_weight', 'alogp', 'psa', 'rtb', 'hbd', 'hba'];

  constructor(private rest: RestService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService) {
  }


  ngOnInit() {
    console.log('molecule drug init');
    this._postMoleculeDrug();
  }


  ngOnDestroy() {
    this.drugSubscription.unsubscribe();
    this.moleculeSubscription.unsubscribe();
    this.drugForTargetSubscription.unsubscribe()
  }

  private _postMoleculeDrug() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.structureType = params.get('structureType');
      this.smiles = params.get('smiles');
      if (this.structureType === 'substructure') {
        this.body = {smiles: this.smiles, similarity: 0, substructure_search: 1};
        this._postDrugs(0,5);
        this._postDrugForTarget(0, 5);
        this._postMolecules(0,5);
      } else if (this.structureType === 'structure') {
        const similarity = params.get('similarity');
        this.body = {smiles: this.smiles, similarity: similarity, substructure_search: 0};
        this._postDrugs(0,5);
        this._postDrugForTarget(0, 5);
        this._postMolecules(0,5);
      }
    })
  }

  private _postMolecules(page?, perPage?) {
   this.moleculeSubscription = this.rest.postDataList(
     `target-related-mol-structure/search/?${this.moleculeIncludeParams}`,
     this.body, page, perPage)
      .subscribe(data => {
          this.molecules = data['ch_embl_small_molecules'];
          this.moleculePageMeta = data['meta'];
          // 去掉重复的小分子结构
          this.moleculesDataSource.data = this.molecules;
      })
  }

  private _postDrugs(page?, perPage?) {
   this.drugSubscription = this.rest.postDataList(`drugs/search/?${this.drugIncludeParams}`, this.body, page, perPage)
      .subscribe(data => {
          this.drugs = data['drugs'];
          this.drugPageMeta = data['meta'];
          this.drugDataSource.data = this.drugs;
      })
  }

  private _postDrugForTarget(page?, perPage?) {
    this.drugForTargetSubscription = this.rest.postDataList(`drugbankid/search/?`, this.body, page, perPage)
      .subscribe(data => {
        this.drugForTargets = data['drug_bank_ids'];
        this.drugForTargetPageMeta = data['meta'];
        this.drugForTargetDataSource.data = this.drugForTargets;
      })
  }

  gotoDrugDetail(id: number | string) {
    this.router.navigate(['/drug-glau-treatment', id])
  }

  goTargetList(moleculeChemblId: string) {
    this.globalService.gotoTargetList(TargetListParamType.molecule_chembl_id, {
      moleculeChemblId: moleculeChemblId,
    })
  }


  drugPageChange(event) {
    this._postDrugs(event.pageIndex, event.pageSize)
  }

  moleculePageChange(event) {
    this._postMolecules(event.pageIndex, event.pageSize);
  }

  drugForTargetPageChange(event) {
    this._postDrugForTarget(event.pageIndex, event.pageSize)
  }

}


// private postMolecules(page?, perPage?): void {
//   this.route.queryParamMap
//   .subscribe((params: ParamMap) => {
//     this.structureType = params.get('structureType');
//     this.smiles = params.get('smiles');
//     if (this.structureType) {
//       console.log(params.has('similes'));
//       if (this.structureType === 'structure') {
//         const similarity = +params.get('similarity');
//         this.rest.postMoleculeByStructure(this.smiles, similarity, this.moleculeIncludeParams, page, perPage)
//           .subscribe(layout => {
//               this.molecules = layout['ch_embl_small_molecules'];
//               this.moleculePageMeta = layout['meta'];
//               this.moleculesDataSource.layout = this.molecules;
//               // if layout is empty, no display
//               // if (layout.length === 0) {
//               //   this.moleculesIsEmpty = true;
//               // }
//
//             },
//             error => {
//             },
//             () => {
//             })
//       } else if (this.structureType === 'substructure') {
//         this.rest.postMoleculeBySubstructure(this.smiles, this.moleculeIncludeParams, page, perPage)
//           .subscribe(layout => {
//               this.molecules = layout['ch_embl_small_molecules'];
//               this.moleculesDataSource.layout = this.molecules;
//               this.moleculePageMeta = layout['meta'];
//               if (layout.length === 0) {
//                 this.moleculesIsEmpty = true;
//               }
//             },
//             error => {
//             },
//             () => {
//             })
//       }
//     }
//   })
// }

