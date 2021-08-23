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
      ],firstName: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],lastName: [
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
    let firstName = String(this.formLogin?.value.firstName);
    let lastName = String(this.formLogin?.value.lastName);
    console.log(username, email, password, passwordConfirm, firstName, lastName)

    if(password === passwordConfirm){
      let usuario = {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName:lastName
      }
      this.apiService.postTypeRequest('api/usuarios/register', usuario).subscribe((res:any) =>{
        console.log(res)
        alert('User registered!')
        this.router.navigateByUrl('');
      })
    }else alert('The passwords are not the same')
    
  }

}
