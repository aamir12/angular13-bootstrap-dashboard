export class Modification {
  mod: number | null = null;
  dateSigned: string = '';
  obligationAmount: number | null = null;
  totalValue: number | null = null;
}

export class BasePeriod {
  startDate: string = '';
  endDate: string = '';
  totalObligation: number | null = null;
  periodValue: number | null = null;

  modifications: Modification[] = [];
}

export class Project {
  title: string = '';
  basePeriods: BasePeriod[] = [];
}
