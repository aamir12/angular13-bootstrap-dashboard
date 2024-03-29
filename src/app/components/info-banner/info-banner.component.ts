import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-banner',
  templateUrl: './info-banner.component.html',
  styleUrls: ['./info-banner.component.scss'],
})
export class InfoBannerComponent {
  allFeature:{name:string,className:string}[] = [];
  @Input() title: string = 'Default title';
  @Input() description: string = 'Default Description';
  @Input() set features(features:string[]) {
    this.allFeature = features.map((feature) => {
      return {
        name:feature,
        className: this.getRandomTagType(),
      };
    });
  }
  constructor() {}

  colors = [
    'bg-primary',
    'bg-secondary',
    'bg-success',
    'bg-danger',
    'bg-warning text-dark',
    'bg-info text-dark',
    'bg-dark',
  ];
  getRandomTagType() {
    let randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
}
