import {Component, OnDestroy, OnInit} from "@angular/core";
import {RestService} from "../../../service/rest/rest.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
// import {TargetPkl} from "../../../glu/models/target-pkl";
import {TargetPre} from '../../../glu/models/target-pre'
import {GlobalService} from "../../../service/global/global.service";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './target-prediction.component.html',
  styleUrls: ['./target-prediction.component.css'],
})

export class TargetPredictionComponent implements OnInit, OnDestroy {
  // targetPkls: TargetPkl[];
  targets: any;
  includeParam = '';
  target:string;
  loadingStatus: boolean;
  isEmpty = false;
  smiles: string;
  SeaSubscription: Subscription;

  constructor(private rest: RestService,
              private globalService: GlobalService,
              private route: ActivatedRoute,
              private router: Router) {
    this.globalService.loadingStatus$
      .subscribe(status => this.loadingStatus = status)
  }

  ngOnInit() {
    console.log('target-prediction init');
    this._fetchData();
  }

  ngOnDestroy() {
    this.SeaSubscription.unsubscribe();
  }

  goTargetDetail(chemblid: string) {
    this.router.navigate(['target', chemblid]);
  }

  private _fetchData(): void {
    this.route.queryParamMap
      .subscribe((params: ParamMap) => {
          this.smiles = params.get('smiles');
          this.target = params.get('target');
          this.postTargetPrediction();
        },
        error => {
        },
        () => {
        })
  }


  postTargetPrediction() {
    this.SeaSubscription = this.rest.postTargetPrediction(this.smiles, this.target, this.includeParam)
      .subscribe(data => {
        // layout include one or more targets
        console.log(this.target)
        this.targets = data;
        // console.log(this.targets)

        // if targets is non-layout, no display;
        if (this.targets.length === 0) {
          this.isEmpty = true;
        }
      })
  }

}

