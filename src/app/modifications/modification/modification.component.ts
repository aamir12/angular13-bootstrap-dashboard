import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgModelGroup } from '@angular/forms';
import { ContractService } from '../../contract.service';
import { Modification } from '../../model';
import { formViewProvider } from 'src/app/providers/controlContainer.provider';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css'],
  viewProviders: [formViewProvider],
})
// viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }],
export class ModificationComponent  {
  @Input() modification!: Modification;
  @Input() modificationIndex: number = 0;
  @Input() baseIndex: number = 0;
  
}
