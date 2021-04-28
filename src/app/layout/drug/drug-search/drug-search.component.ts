import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable} from "rxjs";
import {of as observableOf} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {PageMeta} from "../../../glu/models/page-meta";
import {RestService} from "../../../service/rest/rest.service";
import {GlobalService} from "../../../service/global/global.service";
import {Drug} from "../../../glu/models/drug";
import {DrugbankId} from "../../../glu/models/drugbank-id";

@Component({
  selector: 'app-drug-search',
  templateUrl: './drug-search.component.html',
  styleUrls: ['./drug-search.component.css']
})
export class DrugSearchComponent implements OnInit {
  drugDataSource = new MatTableDataSource();
  drugPageMeta: PageMeta | null;
  drugRestUrl$: Observable<string>;
  drugs: Drug[] | null;
  drugRestUrl: string;
  tableTitle = '';
  pageSizeOptions = [5, 10, 20, 50, 100];
  drugForTargetRestUrl: string;
  drugForTargetRestUrl$: Observable<string>;
  drugForTargetDataSource = new MatTableDataSource();
  drugForTargetPageMeta: PageMeta | null;
  drugForTargets: DrugbankId[];
  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private router: Router) { }

  ngOnInit() {
    this.getRestUrl();
  }

  getRestUrl() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.has('drugbankId')) {
        const drugbankId = params.get('drugbankId');
        this.drugRestUrl = `drugs/?filter{drugbank_id}=${drugbankId}`;
        this.drugForTargetRestUrl = `drugbankid/?filter{drugbank_id}=${drugbankId}`;
        this.drugRestUrl$ = observableOf(`drugs/?filter{drugbank_id}=${drugbankId}`);
        this.drugForTargetRestUrl$ = observableOf(`drugbankid/?filter{drugbank_id}=${drugbankId}`);
      } else if (params.has('drugName')) {
        const drugName = params.get('drugName');
        this.drugRestUrl = `drugs/?filter{drug_name.icontains}=${drugName}`;
        this.drugForTargetRestUrl = `drugbankid/?filter{generic_name.icontains}=${drugName}`;
        this.drugRestUrl$ = observableOf(`drugs/?filter{drug_name.icontains}=${drugName}`);
        this.drugForTargetRestUrl$ = observableOf(`drugbankid/?filter{generic_name.icontains}=${drugName}`);
      }
   });
    this._getDrugs();
    this._getDrugForTargets();
  }

  private _getDrugs(page?, perPage?) {
    this.rest.getDataList(this.drugRestUrl, page, perPage)
      .subscribe(data => {
        this.drugs = data['drugs'];
        this.drugPageMeta = data['meta'];
      })
  }

  private _getDrugForTargets(page?, perPage?) {
    this.rest.getDataList(this.drugForTargetRestUrl, page, perPage)
      .subscribe(data => {
        this.drugForTargets = data['drug_bank_ids'];
        this.drugForTargetPageMeta = data['meta'];
      })
  }

  drugPageChange(event) {
    this._getDrugs(event.pageIndex, event.pageSize);
  }

  drugForTargetPageChange(event) {
    this._getDrugForTargets(event.pageIndex, event.pageSize)
  }

  gotoDrugDetail(id: number | string) {
    this.router.navigate(['/drug-glau-treatment', id])
  }
}
