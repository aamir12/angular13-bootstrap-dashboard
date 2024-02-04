import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() isShowSideNav = false;
  @Output() onCloseSideNav = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  closeSideNav() {
    this.onCloseSideNav.emit(false);
  }

}
