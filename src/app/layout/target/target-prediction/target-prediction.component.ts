import {Component, OnDestroy, OnInit} from "@angular/core";
import {RestService} from "../../../service/rest/rest.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TargetPkl} from "../../../glu/models/target-pkl";
import {GlobalService} from "../../../service/global/global.service";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './target-prediction.component.html',
  styleUrls: ['./target-prediction.component.css'],
})

export class TargetPredictionComponent implements OnInit, OnDestroy {
  targetPkls: TargetPkl[];
  includeParam = '';
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
          this.postTargetPrediction();
        },
        error => {
        },
        () => {
        })
  }


  postTargetPrediction() {
    this.SeaSubscription = this.rest.postTargetPrediction(this.smiles, this.includeParam)
      .subscribe(data => {
        // layout include one or more targets
        this.targetPkls = data;

        // if targets is non-layout, no display;
        if (this.targetPkls.length === 0) {
          this.isEmpty = true;
        }
      })
  }

}

