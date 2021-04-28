import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {DrugListParamsType} from '../../../glu/enum/drug-list-param-type.enum';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-drug-glau-treatment',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.css']
})

export class DrugListComponent implements OnInit {
  restUrl$: Observable<string>;
  includeParam = '&exclude[]=*&include[]=smiles' +
    '&include[]=drug_name&include[]=id&include[]=drug_state';
  constructor(private rest: RestService,
              private route: ActivatedRoute,
              ) { }

  ngOnInit() {
    console.log('drug-list init');
    this.restUrl$ = this._getRestUrl();
  }


  private _getRestUrl(): Observable<string> {
   return this.route.queryParamMap.pipe(map(
      (params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case DrugListParamsType.drug: {
            return `drugs/?${this.includeParam}`;
          }
          case DrugListParamsType.drug_name: {
            const drugName = params.get('drugName');
            return `drugs/?filter{drug_name.icontains}=${drugName}${this.includeParam}`;
          }
          case DrugListParamsType.target_drug: {
            const targetId = +params.get('target_id');
            return `drugs/?filter{targets.id}=${targetId}${this.includeParam}`
          }
          case DrugListParamsType.pathway_id: {
            const pathwayId = +params.get('pathwayId');
            return `drugs/?filter{pathway_set.id}=${pathwayId}${this.includeParam}`
          }
        }
      }
    }));
  }
}

