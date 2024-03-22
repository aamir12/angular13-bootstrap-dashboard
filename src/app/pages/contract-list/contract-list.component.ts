import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  createContract() {
    this.router.navigate(['/contracts/1'])
  }

}
