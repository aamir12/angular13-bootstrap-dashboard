import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgModelGroup } from '@angular/forms';

import { Modification } from '../model';

@Component({
  selector: 'app-modifications',
  templateUrl: './modifications.component.html',
  styleUrls: ['./modifications.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }],
})
export class ModificationsComponent implements OnInit {
  @Input() modifications: Modification[] = [];
  @Input() baseIndex: number = 0;
  modificationActive: number = 0;

  ngOnInit() {}

  addModification(event: Event) {
    event.preventDefault();
    const modification = new Modification();
    this.modifications.push(modification);
    this.modificationActive = this.modifications.length - 1;
  }

  removeModificationIndex(index: number, event: Event) {
    event.preventDefault();
    this.modifications.splice(index, 1);

    if (index > 0) {
      this.modificationActive = index - 1;
    } else {
      this.modificationActive = 0;
    }
  }
}
