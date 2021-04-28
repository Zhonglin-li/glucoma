import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculeCountPipe } from './molecule-count.pipe';
import { StringTrimPipe } from './string-trim.pipe';



@NgModule({
  declarations: [
    MoleculeCountPipe,
    StringTrimPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoleculeCountPipe,
    StringTrimPipe,
  ]
})
export class PipeModule { }
