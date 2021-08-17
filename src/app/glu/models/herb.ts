import {Target} from './target';

export interface Herb{
    molecule_herb_id_url?: string;
    molecule_herb_id?: string;
    herb_drugbank_id?: string; 
    herb_drugbank_id_url?: string;
    cas?: string;
    pubchem?: string;
    ob_score?; string;
    id?: string;
    target_set?: Target[];
    molecule_smile?: string;
    mol_block?: string;
    psa?: string;
    mol_weight?: string;
    alogp?: string;
    mol?: string;
    hbd?: string;
    rtb?: string;
    hba?: string;
    formula?: string;
    bfp?: string;
    generic_name?: string;
}