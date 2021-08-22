import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

interface Profile{
  firstName:string,
  lastName:string,
  description?:string,
  country?: string,
  city?: string 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any;
  public userProfile?: Profile;
  profiles: Array<Profile> = new Array<Profile>()
  constructor(private auth:AuthService, private router: Router, private apiService:ApiService) { 
    this.userProfile = {firstName: "", lastName:"", description:"Description"}
  }
  
  ngOnInit(): void {
    this.user = this.auth.getUserDetails();
    console.log(this.user)
    
    this.apiService.getTypeRequest(`api/usuarios/getProfile/${this.user.id}`).subscribe((res:any)=>{
      this.auth.setDataInLocalStorage('profile',JSON.stringify(res))
      this.userProfile = JSON.parse(localStorage.getItem('profile')!)
      console.log(this.userProfile)
    })

    this.apiService.getTypeRequest(`api/usuarios/profiles`).subscribe((res:any)=>{
      //console.log(res)
      res.forEach((element:any) => {
        this.profiles.push(element)
      });
      console.log(this.profiles)
    })


  }

  logout(){
    this.auth.clearStorage()
    this.router.navigate(['login']);
  }

}
