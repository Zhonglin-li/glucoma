import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {DrugbankId} from '../../../glu/models/drugbank-id';
import {PageMeta} from '../../../glu/models/page-meta';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-drug-for-target-table',
  templateUrl: './drug-for-targets-table.component.html',
  styleUrls: ['./drug-for-targets-table.component.css']
})

export class DrugForTargetsTableComponent implements OnInit {
  drugbankIds: DrugbankId[];
  pageMeta: PageMeta | null;
  restUrl: string;
  @Input() tableTitle = '';
  @Input() pageSize = 48;
  @Input() pageSizeOptions = [10, 20, 50, 100];
  @Input() restUrl$: Observable<string>;
  constructor(private rest: RestService) { }

  ngOnInit() {
    console.log('drug for target init');
    this._getDrugbankIds(0, this.pageSize);
  }

  private _getDrugbankIds(page?, perPage?) {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.rest.getDataList(this.restUrl, page, perPage)
      .subscribe(data => {
        this.drugbankIds = data['drug_bank_ids'];
        this.pageMeta = data['meta'];
      })
  }

  pageChange(event) {
    this._getDrugbankIds(event.pageIndex, event.pageSize)
  }
}
