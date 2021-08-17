import { Component, OnInit } from '@angular/core';;
import {RestService} from '../../../service/rest/rest.service';
import {Herb} from '../../../glu/models/herb';
import {PageMeta} from '../../../glu/models/page-meta';

@Component({
  selector: 'app-drug-for-herb',
  templateUrl: './drug-for-herb.component.html',
  styleUrls: ['./drug-for-herb.component.css']
})
export class DrugForHerbComponent implements OnInit {
  herbs: Herb[];
  targets = [];
  selectedTargetName = 'All';
  pageMeta: PageMeta | null;
  pageIndex: number;
  pageSize = 12;
  tableTitle = '';
  pageSizeOptions = [10, 20, 50, 100];

  constructor(private rest: RestService) { }

  ngOnInit(): void {
    console.log('drug for herb init');
    this._getTargetName();
    // this._getAllDrugBankIds();
    this.getHerbs();
  }

  getHerbs() {
    this.pageIndex = 0;
    if (this.selectedTargetName === 'All') {
      this._getAllHerbs(0, 12);
    } else {
      this._getHerbByTargetName(0, 12);
    }
  }

  private _getHerbByTargetName(page?, perPage?) {
    // console.log(this.selectedTargetName)
    this.rest.getDataList(`herb/?filter{target_set.gene}=${this.selectedTargetName}` +
      `&sort[]=molecule_smile`, page, perPage)
      .subscribe(data => {
        // console.log(data)
        this.herbs = data['herbs'];
        this.pageMeta = data['meta'];
      })
  }

  private _getAllHerbs(page?, perPage?) {
    this.rest.getDataList(`herb/?sort[]=molecule_smile`, page, perPage)
      .subscribe(data => {
        // console.log(data)
        this.herbs = data['herbs'];
        this.pageMeta = data['meta'];
      })
  }

  private _getTargetName() {
    this.rest.getDataList(`target/?exclude[]=*&include[]=gene&sort[]=gene`, 0, 999999)
      .subscribe(data => {
        this.targets = data['targets'];
        this.targets.unshift({gene: 'All'});
        // console.log(this.targets.length, this.targets)
      })
  }

  pageChange(event) {
    this.pageIndex = this.pageIndex + 1;
    if (this.selectedTargetName === 'All') {
      this._getAllHerbs(this.pageIndex, event.pageSize)
    } else  {
      this._getHerbByTargetName(this.pageIndex, event.pageSize)
    }
  }

}
