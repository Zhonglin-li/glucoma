import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RestService} from '../../../service/rest/rest.service';
import {Router} from '@angular/router';
import {MoleculeStructure} from '../../../glu/models/molecule-structure';
import {GlobalService} from '../../../service/global/global.service';
import {TargetListParamType} from '../../../glu/enum/target-list-param-type.enum';

@Component({
  selector: 'app-molecule-properties-card',
  templateUrl: './molecule-properties-card.component.html',
  styleUrls: ['./molecule-properties-card.component.css']
})

export class MoleculePropertiesCardComponent implements OnInit {
  moleculeStructure: MoleculeStructure | null;
  includeParams = '&exclude[]=target_set.*&include[]=target_set.id'
  constructor(public dialogRef: MatDialogRef<MoleculePropertiesCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
              private router: Router,
              private globalService: GlobalService,) { }

  ngOnInit() {
    console.log('molecule properties card init');
    this.rest.getData(`target-related-mol-structure/?filter{molecule_chembl_id}=${this.data.moleculeChemblId}${this.includeParams}`)
      .subscribe(data => {
        this.moleculeStructure = data['ch_embl_small_molecules'][0];
        // console.log('molecule', this.moleculeStructure)
      })
  }

  goTargetList(moleculeChemblId: string) {
    this.globalService.gotoTargetList(TargetListParamType.molecule_chembl_id, {
      moleculeChemblId: moleculeChemblId
    })
  }

  close() {
    this.dialogRef.close()
  }

}
