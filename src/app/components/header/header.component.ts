import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onShowSideNav = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  showSideNav() {
    this.onShowSideNav.emit(true);
  }

}
