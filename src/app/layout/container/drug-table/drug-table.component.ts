import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {Drug} from '../../../glu/models/drug';
import {PageMeta} from '../../../glu/models/page-meta';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-drug-table',
  templateUrl: './drug-table.component.html',
  styleUrls: ['./drug-table.component.css']
})

export class DrugTableComponent implements OnInit {
  drugs: Drug[];
  pageMeta: PageMeta | null;
  restUrl: string;
  @Input() tableTitle = '';
  @Input() restUrl$: Observable<string>;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() pageSize = 12;

  constructor(private rest: RestService,
              private router: Router) { }
  ngOnInit() {
    console.log('drug table init');
    this._getDrugs(0, this.pageSize);
  }

  private _getDrugs(page?, perPage?) {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.rest.getDataList(this.restUrl, page, perPage)
      .subscribe(data => {
        this.drugs = data['drugs'];
        this.pageMeta = data['meta'];
      })
  }

  pageChange(event) {
    this._getDrugs(event.pageIndex, event.pageSize);
  }

  gotoDrugDetail(id: number | string) {
    this.router.navigate(['/drug-glau-treatment', id])
  }
}
