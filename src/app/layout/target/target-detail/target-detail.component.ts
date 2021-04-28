import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router, RouterLink} from '@angular/router';
import {Target} from '../../../glu/models/target';
import {Drug} from '../../../glu/models/drug';
import {DrugbankId} from '../../../glu/models/drugbank-id';
import {Observable, of} from 'rxjs';
import {Pathway} from '../../../glu/models/pathway';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.css']
})

export class TargetDetailComponent implements OnInit {
  target: Target;
  drugs: Drug[];
  restUrl$: Observable<string>;
  pathways: Pathway[] | null;
  drugbankIds: DrugbankId[];
  includeParams = '&exclude[]=drug_set.*' +
    // '&include[]=drug_set.smiles&include[]=drug_set.mol_image&' +
    '&include[]=drug_set.drug_name' +
    // '&include[]=drug_set.id&include[]=drug_set.drug_state' +
    '&include[]=drugbankids.*' + '&include[]=pathway_set.*';
  constructor(private rest: RestService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    console.log('target detail init');
    this._getTargetDetail()
  }

  goMoleculeDetail(targetId: string, targetName?: string) {
    this.router.navigate(['molecule'], {queryParams: {
      targetId: targetId,
      targetName: targetName
    }})
  }

  gotoDrugDetail(id: number | string) {
    this.router.navigate(['/drug-glau-treatment', id])
  }

  private _getTargetDetail() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const chemblid = params.get('chemblid');
      this.restUrl$ = of(`drugbankid/?filter{target_set.chemblid}=${chemblid}`);
      // fetch target by chembl id
      this.rest.getData(`target/?filter{chemblid}=${chemblid}${this.includeParams}`)
        .subscribe(data => {
          this.target = data['targets'][0];
          this.drugs = data['targets'][0]['drug_set'];
          this.drugbankIds = data['targets'][0]['drugbankids'];
          this.pathways = data['targets'][0]['pathway_set'];
        });
    })
  }
}
