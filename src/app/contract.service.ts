import { Injectable } from '@angular/core';
import { BasePeriod, Modification, Project } from './model';

@Injectable()
export class ContractService {
  //share this data among all component
  project = new Project(); 
  

  getBasePeriods(): BasePeriod[] {
    return this.project.basePeriods as BasePeriod[];
  }

  getBasePeriod(basePeriodIndex: number): BasePeriod {
    return this.project.basePeriods[basePeriodIndex] as BasePeriod;
  }

  getModifications(basePeriodIndex: number): Modification[] {
    return this.project.basePeriods[basePeriodIndex].modifications as Modification[];
  }

  getModification(basePeriodIndex: number,modificationIndex:number): Modification {
    return this.project.basePeriods[basePeriodIndex].modifications[modificationIndex] as Modification;
  }

}
