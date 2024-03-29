import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-banner',
  templateUrl: './info-banner.component.html',
  styleUrls: ['./info-banner.component.scss']
})
export class InfoBannerComponent {
  @Input() title: string = 'Default title';
  @Input() description: string = 'Default Description';
  @Input() features: string[] = [];
  constructor() { }

}
