import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formLogin!: FormGroup;
  
  // errorMessage:string ="";

   constructor(private creadorFormulario: FormBuilder, private apiService:ApiService,
    private auth:AuthService, private router:Router) { }
  
  ngOnInit() {

    this.createFormLoginBuilder()
  //   //this.isUserLogin();
  }

  createFormLoginBuilder() {
    this.formLogin = this.creadorFormulario.group({
      username: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],email: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      //CHECAR REGEX PASS
      password: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],passwordConfirm: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }

  register(){
    let username = String(this.formLogin?.value.username);
    let email = String(this.formLogin?.value.email);
    let passwordConfirm = String(this.formLogin?.value.passwordConfirm);
    let password = String(this.formLogin?.value.password);
    console.log(username, email, password, passwordConfirm)

    if(password === passwordConfirm){
      let usuario = {
        username: username,
        email: email,
        password: password
      }
      this.apiService.postTypeRequest('api/usuarios/register', usuario).subscribe((res:any) =>{
        console.log(res)
        alert('User registered!')
      })
    }else alert('The passwords are not the same')
    
  }

}
