import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Molecule} from '../../../glu/models/molecule';
import {PageMeta} from '../../../glu/models/page-meta';
import {MatDialog} from '@angular/material/dialog';
import {DocCardComponent} from '../../../share/card/doc-card/doc-card.component';
import {MoleculePropertiesCardComponent} from '../../../share/card/molecule-properties-card/molecule-properties-card.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-molecule-list',
  templateUrl: './molecule-list.component.html',
  styleUrls: ['./molecule-list.component.css']
})

export class MoleculeListComponent implements OnInit, OnDestroy {
  molecules: Molecule[] | null;
  tempArr: Molecule[] | null;
  targetName: string;
  targetId: number;
  tableTitle = '';
  newMolecules = [];
  pageMeta: PageMeta | null;
  selectedType = 'notEmpty';
  moleculeSubscription: Subscription;
  targetIdSubscription: Subscription;
  pageSizeOptions = [5, 10, 20, 50, 100];
  displayedColumns = ['chembl_id', 'standard_value', 'standard_type', 'doc_chembl_id', 'doc_title', 'doc_pubmed_id'];

  constructor(private rest: RestService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log('molecule list init');
    this._getMolecules();
  }

  ngOnDestroy() {
    this.targetIdSubscription.unsubscribe();
    this.moleculeSubscription.unsubscribe();
  }

  private _getMolecules(page?, perPage?) {
    this.targetIdSubscription = this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.targetId = +params.get('targetId');
      this.targetName = params.get('targetName');
      // fetch molecule layout sort by molecule_chembl_id;
      this.moleculeSubscription = this.rest.getDataList(`target-related-mol-chembl/?filter{target_set.id}=${this.targetId}&sort[]=molecule_chembl_id`, page, perPage)
        .subscribe(data => {
          this.molecules = data['ch_embl_small_molecule_all_infos'];
          console.log('molecule', this.molecules, 'data', data);
          this.pageMeta = data['meta'];
          this.molecules.push(this.molecules[0]);  // 不添加 newMolecule二维数组中的数组的length会小于10
          this.activityFilter();
        },
          error => {},
          () => {})
    })
  }

  activityFilter() {
    if (this.selectedType === 'all') {
      this._newMolecules(this.molecules);
    } else if (this.selectedType === 'notEmpty') {
      // 过滤掉 activity_standard_value 为空的数据
      const moleculesFilter = this.molecules.filter(function (molecule: Molecule) {
        return molecule.activity_standard_value !== null ;
      });
      // console.log('filterMolecules', moleculesFilter);
      this._newMolecules(moleculesFilter);
    }
  }

  // 将 molecule_smiles 相同的合并，得到一个二维数组
  private _newMolecules(molecules: Molecule[]) {
    this.newMolecules = [];
    this.tempArr = [];
    for (let i = 0, j = molecules.length; i < j; i++) {
      if (molecules[i]['molecule_chembl_id'] === molecules[i + 1]['molecule_chembl_id']) {
        this.tempArr.push(molecules[i]);
      } else {
        this.tempArr.push(molecules[i]);
        this.newMolecules.push(this.tempArr.slice(0));
        this.tempArr.length = 0;
      }
    }
  }

  getMoleculeId(molecules: any) {
    return molecules[0].id;
  }

  getMoleculeSmiles(molecule: any) {
    return molecule[0].molecule_smile
  }

  getMoleculeChemblId(molecules: any) {
    return molecules[0].molecule_chembl_id
  }

  openDocDialog(moleculeId: number | string) {
    this.dialog.open(DocCardComponent, {
      width: '600px',
      data: {
        moleculeId: moleculeId
      }
    })
  }

  openMoleculePropertiesDialog(moleculeChemblId: number | string) {
    this.dialog.open(MoleculePropertiesCardComponent, {
      width: '600px',
      data: {
        moleculeChemblId: moleculeChemblId
      }
    })
  }


  pageChange(event) {
    console.log('event', event);
    this.newMolecules = [];
    this._getMolecules(event.pageIndex, event.pageSize);
  }
}
