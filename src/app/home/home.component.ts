import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router) { }
  user:any
  ngOnInit(): void {
    this.user = this.auth.getUserDetails();
    console.log(this.user)
  }

  logout(){
    this.auth.clearStorage()
    this.router.navigate(['login']);
  }

}
