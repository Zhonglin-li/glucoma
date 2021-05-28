import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from '../../../service/global/global.service';
import {TargetListParamType} from '../../../glu/enum/target-list-param-type.enum';
import {DrugListParamsType} from '../../../glu/enum/drug-list-param-type.enum';
import {PathwayListParamType} from "../../../glu/enum/pathway-list-param-type.enum";
import {JsmeComponent} from '../../../jsme/jsme/jsme.component';
import { $ } from 'protractor';
import {NzModalService} from 'ng-zorro-antd/modal'
import { compilePipeFromMetadata } from '@angular/compiler';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  jsmeSmiles: string;
  structureTypes = ['structure', 'substructure'];
  structureType = this.structureTypes[0];
  similarity = 0.85;
  public validation = '';
  public filter: any = {
    mode: 'By Inputting Drug',
    modes: ['By Inputting Drug',  'By Inputting Target',  'By Inputting Pathway','By Drawing Molecule from Editor', ],
  };
  drugSearchTypeList = [
    {inputType: 'Drug name', value: 'Lisinopril'},
    {inputType: 'Drugbank ID', value: 'DB00722'},
  ];
  drugSelectedType = this.drugSearchTypeList[0].inputType;
  // drugSelectedType = 'Drug name';
  drugKeyword = this.drugSearchTypeList[0].value;
  targetSearchTypeList = [
    {inputType: 'Target name', value: 'Angiotensin-converting enzyme'},
    {inputType: 'Entry name', value: 'ACE_HUMAN'},
    {inputType: 'Gene name', value: 'ACE'},
    {inputType: 'ChEMBL ID', value: 'CHEMBL1808'}
  ];
  targetSelectedType = this.targetSearchTypeList[0].inputType;
  targetKeyword = this.targetSearchTypeList[0].value;
  pathwaySearchTypeList = [
    {inputType: 'Pathway name', value: 'Renin-angiotensin system'},
    {inputType: 'Pathway ID', value: 'hsa04614'}
  ];
  pathwaySelectedType = this.pathwaySearchTypeList[0].inputType;
  pathwayKeyword = this.pathwaySearchTypeList[0].value;

  constructor(private router: Router,
              private globalService: GlobalService,
              private modal: NzModalService,
              ) { };

  ngOnInit() {
    // this.jsmeSmiles = 'FC1=CC=C2OCC[C@]3(NC(=O)NC3=O)C2=C1';
  }

  getJsmeSmiles() {
    this.jsmeSmiles = this.jsme.smiles;
  }


  drugSearchTypeChange(selectedType: string) {
    this.drugKeyword = this.drugSearchTypeList.find(el => el.inputType === selectedType).value;
  }

  drugSubmit() {
    this.drugKeyword = this.drugKeyword.trim();
    if (this.drugSelectedType === 'Drug name') {
      this.router.navigate(['drug-glau-treatment/drug-search'], {
        queryParams: {
          drugName: this.drugKeyword
        }
      })
    } else if (this.drugSelectedType === 'Drugbank ID') {
      this.router.navigate(['drug-glau-treatment/drug-search'], {
        queryParams: {
          drugbankId: this.drugKeyword
        }
      })
    }
  }

  targetSearchTypeChange(selectedType: string) {
    this.targetKeyword = this.targetSearchTypeList.find(el => el.inputType === selectedType).value;
  }

  targetSubmit() {
    this.targetKeyword = this.targetKeyword.trim();
    if (this.targetSelectedType === 'Target name') {
      this.globalService.gotoTargetList(TargetListParamType.target_name, {
        targetName: this.targetKeyword
      });
    } else if (this.targetSelectedType === 'Entry name') {
      this.globalService.gotoTargetList(TargetListParamType.entry_name, {
        entryName: this.targetKeyword.toUpperCase()
      });
    } else if (this.targetSelectedType === 'Gene name') {
      this.globalService.gotoTargetList(TargetListParamType.gene_name, {
        geneName: this.targetKeyword.toUpperCase()
      });
    } else if (this.targetSelectedType === 'ChEMBL ID') {
      this.globalService.gotoTargetList(TargetListParamType.chembl_id, {
        chemblId: this.targetKeyword.toUpperCase()
      });
    }
  }

  pathwaySearchTypeChange(selectedType: string) {
    this.pathwayKeyword = this.pathwaySearchTypeList.find(el => el.inputType === selectedType).value;
  }

  pathwaySubmit() {
    this.pathwayKeyword = this.pathwayKeyword.trim();
    if (this.pathwaySelectedType === 'Pathway ID') {
      this.globalService.gotoPathwayList(PathwayListParamType.pathway_id, {
        pathwayId: this.pathwayKeyword
      })
    } else if (this.pathwaySelectedType === 'Pathway name') {
      this.globalService.gotoPathwayList(PathwayListParamType.pathway_name, {
        pathwayName: this.pathwayKeyword
      })
    }
  }

  modalError(): void{
    this.modal.error({
      nzTitle: 'Error',
      nzContent: '<b>Please draw a correct strucure!</b>',
      nzOkText: 'Comfirm',

    });
  }


  onSubmit() {
    // console.log(this.structureType, this.jsme.smiles, this.similarity)
    // console.log(this.structureType,smiles, this.similarity)
    if (this.jsme.smiles){
      if (this.structureType === 'structure') {
        this.router.navigate(['molecule/molecule-drug'], {queryParams: {
          structureType: this.structureType,
          smiles: this.jsme.smiles,
          similarity: this.similarity
        }})
      } else if ( this.structureType === 'substructure') {
        this.router.navigate(['molecule/molecule-drug'], {queryParams: {
          structureType: this.structureType,
          smiles: this.jsme.smiles,
        }})
      }
    }
    else{
      this.modalError()
    }
      
    }
}
