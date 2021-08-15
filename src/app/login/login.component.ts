import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  isLogin: boolean = false
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
      user: [
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
      ],
      remember_me: [false],
    });
  }

  signIn(){
    let email = String(this.formLogin?.value.user);
    let password = String(this.formLogin?.value.password);
    console.log(email, password)
    this.apiService.postTypeRequest('api/usuarios/login', {email:email, password:password}).subscribe((res:any)=>{
      console.log(res)
      this.auth.setDataInLocalStorage('user', JSON.stringify(res.usuario))

      this.auth.setDataInLocalStorage('token', JSON.stringify(res.token))
      this.router.navigate(['']);

    })
    
  }
  
  // onSubmit() {
  //   // console.log('Your form data : ', form.value);
  //   // this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
  //   //   if (res.status) {
  //   //     console.log(res)
  //   //     this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
  //   //     this._auth.setDataInLocalStorage('token', res.token);this._router.navigate(['']);
  //   //   } 
  //   //   else {}
  //   // }, err => {this.errorMessage = err['error'].message;});
  // }
  
  // isUserLogin(){
  //   console.log(this._auth.getUserDetails())
  //   if(this._auth.getUserDetails() != null){
  //     this.isLogin = true;
  //   }
  // }

  //   logout(){
  //     this._auth.clearStorage()
  //     this._router.navigate(['']);
  //   }
  }