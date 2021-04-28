import {Pipe, PipeTransform} from '@angular/core';
import {RestService} from '../../service/rest/rest.service';
import {Molecule} from '../../glu/models/molecule';
import {Observable} from 'rxjs';
import {Target} from '../../glu/models/target';
import {MoleculeStructure} from '../../glu/models/molecule-structure';
import { map } from 'rxjs/operators';


@Pipe({
  name: 'moleculeCount'
})
export class MoleculeCountPipe implements PipeTransform {
  includeParams = '&exclude[]=chembl_small_molecules_all_infos.*' +
    '&include[]=chembl_small_molecules_all_infos.doc_chembl_id' +
    '&exclude[]=chembl_small_molecules_structure_info.*' +
    '&include[]=chembl_small_molecules_structure_info.id' ;
  molecules: Molecule[];
  references: string[];
  compounds: MoleculeStructure[];
  target: Target;
  constructor(private rest: RestService) {
  }

  transform(targetId: string, Type: string): Observable<number> {
  return this.rest.getData(`target/${targetId}/?${this.includeParams}`)
     // + `&sort[]=chembl_small_molecules_all_infos.doc_chembl_id`)
     .pipe(map(data => {
        this.target = data['target'];
        this.molecules = this.target.chembl_small_molecules_all_infos;
        this.compounds = this.target.chembl_small_molecules_structure_info;
        if (this.molecules.length !== 0) {
          const temp = {};
          for (let i = 0, j = this.molecules.length ; i < j; i++) {
            const tmp = this.molecules[i].doc_chembl_id;
            if (!temp.hasOwnProperty(tmp)) {
              temp[this.molecules[i].doc_chembl_id] = 'yes'
            }
          }
          let len = 0;
          const tempArr = [];
          for (const i in temp) {
            tempArr[len++] = i;
            this.references = tempArr;
          }
          // this.references = [this.molecules[0]];
          // for (let i = 0, j = this.molecules.length - 1; i < j; i++) {
          //   if (this.molecules[i].doc_chembl_id !== this.references[this.references.length - 1].doc_chembl_id) {
          //     this.references.push(this.molecules[i])
          //   }
          // }

          switch (Type) {
            case 'compounds':
              return this.compounds.length
            case 'bioactivities':
              return this.molecules.length
            case 'references':
              return this.references.length
          }
        }
        return 0;
      })
     );
  }
}
