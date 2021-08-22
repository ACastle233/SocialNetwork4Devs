import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/Profile';
import { Score, ScoreModule } from '../models/ScoreModel';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any
  public userProfile?: Profile = new Profile();
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
  constructor(private apiService:ApiService, private auth:AuthService) { 
    let aux: ScoreModule = {score:this.pBD}
    for (let j = 0; j < 5; j++) {
      this.scoreknowledge?.push(aux)
      
    }
    console.log(this.scoreknowledge![1].score)
    
  }

  ngOnInit(): void {

    this.user = this.auth.getUserDetails();

    this.apiService.getTypeRequest(`api/profiles/getProfile/${this.user.id}`).subscribe((res:any)=>{
      this.auth.setDataInLocalStorage('profile',JSON.stringify(res))
      this.userProfile = JSON.parse(localStorage.getItem('profile')!)
      console.log(this.userProfile?.country)
    })
  }




}
