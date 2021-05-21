import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {JsmeComponent} from "../../../jsme/jsme/jsme.component";

@Component({
  selector: 'app-sea',
  templateUrl: './sea.component.html',
  styleUrls: ['./sea.component.css']
})
export class SeaComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  jsmeSmiles: string;
  public validation = '';
  public choice: any = {
    target: 'ACE',
    targets: [
      'ACE', 'AGTR1', 'AKR1B1', 'AR', 'FLT1',
      'ICAM1', 'KDR', 'MAPT', 'NOS2',
      'NOS3', 'PRKCB', 'SERPINE1', 'SLC2A1', 'TNF', 'VCAM1'
    ],
  };
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.jsmeSmiles = '';
  }


  getJsmeSmiles() {
    this.jsmeSmiles = this.jsme.smiles;
  }

  goTargetPrediction() {
    this.router.navigate(['target/target-prediction'], {
      queryParams: {
        smiles: this.jsmeSmiles,
        target: this.choice.target
      }
    })
  }



}
