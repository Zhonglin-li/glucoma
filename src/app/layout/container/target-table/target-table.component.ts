import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {Router} from '@angular/router';
import {PageMeta} from '../../../glu/models/page-meta';
import {MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {Target} from '../../../glu/models/target';
import {GlobalService} from '../../../service/global/global.service';
import {DrugListParamsType} from '../../../glu/enum/drug-list-param-type.enum';
import {Molecule} from '../../../glu/models/molecule';
import {PathwayListParamType} from '../../../glu/enum/pathway-list-param-type.enum';
import {merge} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs';

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})

export class TargetTableComponent implements OnInit, AfterViewInit {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  targets: Target[];
  molecules: Molecule[];
  restUrl: string;
  isLoading = false;
  isLoadingError = false;
  @Input() tableTitle = '';
  @Input() includeParams = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['chembl_id', 'target_name', 'keggid', 'uniprot_accession', 'entry_name',
    'gene',  'drugs', 'pathways',
    // 'pdbid', 'detail', 'type',
    'compound_count', 'bioactivity_count', 'reference_count'
  ];
  constructor(private rest: RestService,
              private router: Router,
              private globaService: GlobalService) { }

  ngOnInit() {
    console.log('target table init');
    this.pageMeta.per_page = this.pageSize;
  }

  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    merge(this.sort.sortChange, this.paginator.page, this.restUrl$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
            return this.rest.getDataList(
              this.restUrl,
              this.paginator.pageIndex,
              this.paginator.pageSize,
              this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
              this.includeParams
            );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          return data['targets'];
        }),
        catchError(() => {
          this.isLoadingError = true;
          this.isLoading = false;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data;
      });
  }


  // getCompound(targetId: any): number {
  //   const molecules = this.targets.find(el => el.id === targetId).chembl_small_molecules_all_infos;
  //   if (molecules.length !== 0) {
  //     this.molecules = molecules;
  //     const compounds = [this.molecules[0]];
  //
  //     for (let i = 0, j = this.molecules.length - 1; i < j; i++) {
  //       if (this.molecules[i].molecule_chembl_id !== compounds[compounds.length - 1].molecule_chembl_id) {
  //         compounds.push(this.molecules[i])
  //       }
  //     }
  //     return compounds.length
  //   }
  //   return 0
  // }

  getReferences(targetId: any): number {
    const molecules = this.targets.find(el => el.id === targetId).chembl_small_molecules_all_infos;
    if (molecules.length !== 0) {
      // 依据doc_chembl_id 的不同去重
      const temp = {};
      for (let i = 0, j = molecules.length; i < j; i++) {
        const tmp = molecules[i].doc_chembl_id;
        if (!temp.hasOwnProperty(tmp)) {  // hasOwnProperty用来判断一个对象是否有你给出名称的属性或对象
          temp[molecules[i].doc_chembl_id] = 'yes'
        }
      }
      let len = 0;
      const tempArr = [];
      for (const i in temp) { // 迭代出对象的key值
        tempArr[len++] = i;
        ;
      }
      return tempArr.length;
    }
    return 0
  }



  goDrugList(targetId: string | number) {
    this.globaService.gotoDrugList(DrugListParamsType.target_drug, {
      target_id: targetId
    })
  }

  goPathwayList(targetId: number | string) {
    this.globaService.gotoPathwayList(PathwayListParamType.target_id, {
      targetId: targetId
    })
  }

  goTargetDetail(chemblid: string) {
    this.router.navigate(['target', chemblid] )
  }

  goMoleculeList(targetId: string, targetName?: string) {
    this.router.navigate(['molecule'], {queryParams: {
      targetId: targetId,
      targetName: targetName
    }})
  }
}
