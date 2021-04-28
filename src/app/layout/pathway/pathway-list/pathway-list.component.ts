import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';
import {PathwayListParamType} from '../../../glu/enum/pathway-list-param-type.enum';


@Component({
  selector: 'app-pathway',
  templateUrl: './pathway-list.component.html',
  styleUrls: ['./pathway-list.component.css']
})

export class PathwayListComponent implements  OnInit {
  restUrl$: Observable<string>;
  displayedColumns = ['pathway_id', 'pathway_name', 'target_count', 'drug_count'];
  // displayedColumns = ['Pathway ID', 'pathway_name', 'target_count', 'drug_count'];
  includeParams = '&exclude[]=targets.*&include[]=targets.id' +
                  '&exclude[]=drugs.*&include[]=drugs.id';
  title = 'Pathway List';
  constructor(private rest: RestService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('pathway init');
    this.restUrl$ = this._getRestUrl();
  }
  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.pipe(map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case PathwayListParamType.pathway:
            return `pathway/?${this.includeParams}`
          case PathwayListParamType.target_id: {
            const targetId = +params.get('targetId');
            return `pathway/?filter{targets.id}=${targetId}${this.includeParams}`
          }
          case PathwayListParamType.pathway_id: {
            this.title = 'Pathway Search Results';
            const pathwayId = params.get('pathwayId');
            return `pathway/?filter{pathway_name}=${pathwayId}${this.includeParams}`
          }
          case PathwayListParamType.pathway_name: {
            this.title = 'Pathway Search Results';
            const pathwayName = params.get('pathwayName');
            return `pathway/?filter{descripor.icontains}=${pathwayName}${this.includeParams}`
          }
        }
      }
    }));
  }
}
