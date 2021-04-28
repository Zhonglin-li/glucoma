import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {Drug} from '../../../glu/models/drug';
import {Target} from '../../../glu/models/target';
import {Pathway} from '../../../glu/models/pathway';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-drug-detail',
  templateUrl: './drug-detail.component.html',
  styleUrls: ['./drug-detail.component.css']
})

export class DrugDetailComponent implements OnInit {
  drug: Drug;
  targetList: Target[] | null;
  pathwayList: Pathway[] | null;
  targetRestUrl$: Observable<string>;
  pathwayRestUrl$: Observable<string>;
  dataSource = new MatTableDataSource();
  includeParams = '?include[]=targets.*&include[]=pathway_set.*';
  targetDisplayedColumns = ['chembl_id', 'target_name', 'keggid', 'uniprot_accession', 'entry_name', 'gene',
    // 'pdbid','type',
    // 'compound_count', 'bioactivity_count', 'reference_count'
  ];
  pathwayDisplayedColumns = ['pathway_id', 'pathway_name'];
  targetIncludeParams =
    // '&exclude[]=chembl_small_molecules_all_infos.*' +
    // '&include[]=chembl_small_molecules_all_infos.doc_chembl_id' +
    // '&exclude[]=chembl_small_molecules_structure_info.*' +
    // '&include[]=chembl_small_molecules_structure_info.id' +
    '&exclude[]=drug_set.*&include[]=drug_set.id' +
    '&exclude[]=pathway_set.*&include[]=pathway_set.id';
  pathwayIncludeParams = '&exclude[]=targets.*&include[]=targets.id' +
    '&exclude[]=drugs.*&include[]=drugs.id';

  constructor(private rest: RestService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('drug-detail');
    this._getDrugDetail();
  //   this.drug = {
  //     smiles: 'CC(=O)NC1=CC=C(C=C1)SC[C@@](C)(C(=O)NC2=CC(=C(C=C2)C#N)C(F)(F)F)O',
  //     drugbank_id: 'DB00819',
  //     IUPAC: '	N-(5-sulfamoyl-1,3,4-thiadiazol-2-yl)acetamide',
  //     rtb: 6,
  //     psa: '102.22',
  //     drug_name: 'Acetazolamide',
  //     mol_weight: '437.10',
  //     alogp: '4.02',
  //     cid: '	10873814',
  //     cas:'216665-38-2',
  //     hbd: 3,
  //     hba: 5,
  //     drug_state: 'Approved',
  //     formula: 'C20H18F3N3O3S',
  //  }
   
  }

  private _getDrugDetail() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      this.targetRestUrl$ = of(`target/?filter{drug_set.id}=${id}${this.targetIncludeParams}`);
      this.pathwayRestUrl$ = of(`pathway/?filter{drugs.id}=${id}${this.pathwayIncludeParams}`);
      this.rest.getData(`drugs/${id}/${this.includeParams}`)
        .subscribe(data => {
          this.drug = data['drug'];
          this.targetList = data['drug']['targets'];
          this.pathwayList = data['drug']['pathway_set'];
          this.dataSource.data = this.targetList;
        })
    })
  }
}
