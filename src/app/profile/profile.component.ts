import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../models/Profile';
import { Score, ScoreModule } from '../models/ScoreModel';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from '../popups/edit-profile/edit-profile.component';

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
  formPass!: FormGroup;
  pBD: Score[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'}
  ];
 
  scoreknowledge?: Array<ScoreModule> = new Array<ScoreModule>();
  constructor(private modalService: NgbModal, private apiService:ApiService, private auth:AuthService, private formBuilder: FormBuilder, private router:Router) { 
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

    this.createFormLoginBuilder()
  }

  createFormLoginBuilder() {
    this.formPass = this.formBuilder.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
        ]),
      ],
      //CHECAR REGEX PASS
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
        ]),
      ],
      remember_me: [false],
    });
  }

  changePass(){
    let pass = String(this.formPass?.value.password);
    let confirmPass = String(this.formPass?.value.confirmPassword);
    try {
      if(pass !== confirmPass){
        alert('Las contraseñas no coinciden')
      }else{
        this.apiService.putTypeRequest('api/usuarios/changePass', {email:this.user.email, password:pass}).subscribe((res:any)=>{
          console.log(res)
          alert(res.message)
          this.router.navigateByUrl('')
        })
      }
    } catch (err) {
      console.log(err)
      alert(`Error: ${err.message}`)
    }
  }
  open() {
    const modalRef = this.modalService.open(EditProfileComponent);
    modalRef.componentInstance.name = 'World';
  }



}
