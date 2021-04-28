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
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.jsmeSmiles = 'CNCC(O)c1ccc(OC(=O)C(C)(C)C)c(OC(=O)C(C)(C)C)c1';
  }


  getJsmeSmiles() {
    this.jsmeSmiles = this.jsme.smiles;
  }

  goTargetPrediction(smiles: string) {
    this.router.navigate(['target/target-prediction'], {
      queryParams: {
        smiles: smiles
      }
    })
  }



}
