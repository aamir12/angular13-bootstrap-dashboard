import { Injectable } from "@angular/core";

@Injectable()
export class TestingService {
  randomNumber!: number;
  constructor() { 
    this.randomNumber = Math.floor(Math.random() * 1000);
  }
}
