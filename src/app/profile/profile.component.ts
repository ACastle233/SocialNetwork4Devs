import { Component, OnInit } from '@angular/core';
import { Score, ScoreModule } from '../models/ScoreModel';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  selectedValue?: string[];
  selectedCar?: string[];

  pBD: Score[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'}
  ];

  scoreknowledge?: Array<ScoreModule> = new Array<ScoreModule>();
  constructor() { 
    let aux: ScoreModule = {score:this.pBD}
    for (let j = 0; j < 5; j++) {
      this.scoreknowledge?.push(aux)
      
    }
    console.log(this.scoreknowledge![1].score)
    
  }

  ngOnInit(): void {
    
  }




}
