import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  _isShowSideNav = false;
  isShowing = false;
  isHiding = false;
  @Input() set isShowSideNav(value:boolean) {
    if(!value) {
      this.isHiding = true;
    }else {   
      this.isShowing = true;
    }
    
    setTimeout(() => {
      this.isHiding = false;
      this.isShowing = false;
      this._isShowSideNav = value;
    },200)
  } 
  @Output() onCloseSideNav = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  closeSideNav() {
    this.onCloseSideNav.emit(false);
  }

}
