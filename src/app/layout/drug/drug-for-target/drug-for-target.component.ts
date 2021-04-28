import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {DrugbankId} from '../../../glu/models/drugbank-id';
import {PageMeta} from '../../../glu/models/page-meta';


@Component({
  selector: 'app-drug-for-target',
  templateUrl: './drug-for-target.component.html',
  styleUrls: ['./drug-for-target.component.css']
})

export class DrugForTargetComponent implements OnInit {
  drugbankIds: DrugbankId[];
  targets = [{protein_description:'All'}, {protein_description:'ssss'}];
  selectedTargetName = 'All';
  pageMeta: PageMeta | null;
  pageIndex: number;
  pageSize = 12;
  tableTitle = '';
  pageSizeOptions = [10, 20, 50, 100];
  constructor(private rest: RestService) { }

  ngOnInit() {
    console.log('drug for target init');
    this._getTargetName();
    // this._getAllDrugBankIds();
    this.getDrugbankIds();
  }

  getDrugbankIds() {
    this.pageIndex = 0;
    if (this.selectedTargetName === 'All') {
      this._getAllDrugBankIds(0, 12);
    } else {
      this._getDrugbankIdByTargetName(0, 12);
    }
  }

  private _getDrugbankIdByTargetName(page?, perPage?) {
    this.rest.getDataList(`drugbankid/?filter{target_set.protein_description}=${this.selectedTargetName}` +
      `&sort[]=smiles`, page, perPage)
      .subscribe(data => {
        this.drugbankIds = data['drug_bank_ids'];
        this.pageMeta = data['meta'];
      })
  }

  private _getAllDrugBankIds(page?, perPage?) {
    this.rest.getDataList(`drugbankid/?sort[]=smiles`, page, perPage)
      .subscribe(data => {
        this.drugbankIds = data['drug_bank_ids'];
        this.pageMeta = data['meta'];
      })
  }

  private _getTargetName() {
    this.rest.getDataList(`target/?exclude[]=*&include[]=protein_description&sort[]=protein_description`, 0, 999999)
      .subscribe(data => {
        this.targets = data['targets'];
        this.targets.unshift({protein_description: 'All'});
        console.log(this.targets.length, this.targets)
      })
  }

  pageChange(event) {
    this.pageIndex = this.pageIndex + 1;
    if (this.selectedTargetName === 'All') {
      this._getAllDrugBankIds(this.pageIndex, event.pageSize)
    } else  {
      this._getDrugbankIdByTargetName(this.pageIndex, event.pageSize)
    }
  }
}
