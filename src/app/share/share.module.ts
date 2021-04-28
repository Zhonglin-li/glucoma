import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PipeModule} from './pipe/pipe.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { JsmeModule } from '../jsme/jsme.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
    JsmeModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatFormFieldModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    JsmeModule,
    ReactiveFormsModule,
    PipeModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatFormFieldModule,
  ]
})
export class ShareModule { }
