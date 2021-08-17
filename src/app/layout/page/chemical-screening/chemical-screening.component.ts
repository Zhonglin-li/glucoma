import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Target} from '../../../glu/models/target';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {environment} from "../../../../environments/environment";
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-chemical-screening',
  templateUrl: './chemical-screening.component.html',
  styleUrls: ['./chemical-screening.component.css']
})

export class ChemicalScreeningComponent implements OnInit {
  targets: Target[] = [];
  inputFile: File;
  chemicalScreeningForm: FormGroup;
  public choice: any = {
    target: 'ACE',
    targets: [
      'ACE', 'AGTR1', 'AKR1B1', 'AR', 'FLT1',
      'ICAM1', 'KDR', 'MAPT', 'NOS2',
      'NOS3', 'PRKCB', 'SERPINE1', 'SLC2A1', 'TNF', 'VCAM1'
    ],
  };
 

  constructor(private rest: RestService, private modal: NzModalService,) {
  }


  public uploder: FileUploader = new FileUploader({
    url: `${environment.REST_HOST}/bulk-target-prediction/`,
    method: "POST",
    itemAlias: "structure_file"
  });


  ngOnInit() {
    this.createForm();
    // this._getTargetName();
    this.uploder.onSuccessItem = this.successItem.bind(this);
  }

  private _getTargetName() {
    this.rest.getDataList(`target/?exclude[]=*&include[]=protein_description` +
      `&include[]=chemblid&sort[]=protein_description`, 0, 999999)
      .subscribe(data => {
        this.targets = data['targets'];
        // this.targets.unshift({ chemblid: 'All', protein_description: 'All'});
        console.log(this.targets.length, this.targets)
      })
  }

  createForm() {
    this.chemicalScreeningForm = new FormGroup({
      queryFile: new FormControl('',),
      email: new FormControl('', [Validators.required, Validators.email]),
      target: new FormControl('ACE', Validators.required)
    })
  }


  modalTip(title: 'success'|'error'|'warning', content: string): void {
    const ret = this.modal[title]({
      nzTitle: title,
      nzContent: content,
      nzOkText: 'comfirm',

    });
  }

  get queryFile() {
    return this.chemicalScreeningForm.get('queryFile');
  }

  get email() {
    return this.chemicalScreeningForm.get('email');
  }

  get target() {
    return this.chemicalScreeningForm.get('target');
  }

  fileChange(event: any) {
    this.inputFile = event.target.files[0];
    this.fileAlert();
  }

  fileAlert() {
    const a = this.inputFile.name.lastIndexOf('.sdf'); // 无值为-1.存在值最小为1
    const b = this.inputFile.name.lastIndexOf('.smi');
    if (a + b < 0) {
      // this.modalTip('Warning', 'Please submit MDL sdf or SMILES format file!')
      this.modalTip('warning', 'Please submit MDL sdf or SMILES format file!',)
      // alert('Please submit MDL sdf or SMILES format file!')
    } else if (this.inputFile.size > 41943040) {
      // this.modalTip('Warning', 'please submit less than 40M file!')
      // alert('please submit less than 40M file!')
      this.modalTip('warning', 'please submit less than 40M file!',)
    }
  }

  onSubmit() {
    if (!this.inputFile) {
      // alert('Please submit MDL sdf or SMILES format file!')
      this.modalTip('warning', 'Please submit MDL sdf or SMILES format file!',)
    } else if (this.inputFile) {
      const a = this.inputFile.name.lastIndexOf('.sdf'); // 无值为-1.存在值最小为1
      const b = this.inputFile.name.lastIndexOf('.smi');
      if (a + b < 0) {
        this.modalTip('warning', 'Please submit MDL sdf or SMILES format file!',)
        // alert('Please submit MDL sdf or SMILES format file!')
      } else if (this.inputFile.size > 41943040) {
        // alert('please submit less than 40M file!')
        this.modalTip('warning', 'please submit less than 40M file!',)
      } else {
        this.uploaderFile();
      }
    }

  }

  uploaderFile() {
    const form = this.chemicalScreeningForm.value;
    const emailAddress = form.email;
    const target = form.target;
    this.uploder.setOptions({
      additionalParameter: {
        'email_addr': emailAddress,
        'prediction_type': target,
      }
    });
    // console.log(this.uploder, target);
    // this.uploder.queue[0].onSuccess = function (response, status, headers) {
    //   if (status == 200) {
    //     let temRes = JSON.parse(response);
    //     // console.log('response', temRes);
    //     // alert('File Submission Successful! The prediction result will be sent to your email.');
    //     this.modalTip('success', 'File Submission Successful! The prediction result will be sent to your email.',)
    //   } else {
    //     alert('File Submission Failed. Please resubmit the query file!')
    //     // this.modalTip('error', 'File Submission Failed. Please resubmit the query file!',)
    //   }
    // };
    this.uploder.queue[0].upload();
    this.rebuildForm();
  }

  rebuildForm() {
    this.chemicalScreeningForm.reset({
      target: this.choice.target,
    })
  }

  successItem(item:FileItem, response: string, status: number, headers: ParsedResponseHeaders): any{
    if (status == 200) {
      let temRes = JSON.parse(response);
      // console.log('response', temRes);
      this.modalTip('success', 'File Submission Successful! The prediction result will be sent to your email.',);
    } else {
      this.modalTip('error', 'File Submission Failed. Please resubmit the query file!',)
    };
    this.uploder.clearQueue();
  }
  

}

