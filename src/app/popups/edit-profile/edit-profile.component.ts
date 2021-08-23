import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user:any
  formProfile!:FormGroup
  constructor(public activeModal: NgbActiveModal, private apiService:ApiService, private auth:AuthService, private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.user = this.auth.getUserDetails();

    this.createFormLoginBuilder()
  }

  createFormLoginBuilder() {
    this.formProfile = this.formBuilder.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      country: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      city: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      studies: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      hobbies: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      languages: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      linkedin: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      age: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ]
    });
  }

  saveProfile(){
    let firstName = String(this.formProfile?.value.firstName);
    let lastName = String(this.formProfile?.value.lastName);
    let description = String(this.formProfile?.value.description);
    let country = String(this.formProfile?.value.country);
    let city = String(this.formProfile?.value.city);
    let studies = String(this.formProfile?.value.studies);
    let languages = String(this.formProfile?.value.languages);
    let hobbies = String(this.formProfile?.value.hobbies);
    let linkedin = String(this.formProfile?.value.linkedin);
    let age = String(this.formProfile?.value.age);
    try {
      
        this.apiService.postTypeRequest('api/profiles/addProfile', {firstName: firstName, lastName:lastName,
          description: description,
          country: country,
          city: city,
          studies: studies,
          languages: languages,
          hobbies: hobbies,
          linkedin: linkedin,
          age: age,
          idUser: this.user.id
        }).subscribe((res:any)=>{
          console.log(res)
          alert('Your profile is updated')
          window.location.reload()
      
      });
    } catch (err) {
      console.log(err)
      alert(`Error: ${err.message}`)
    }
  }

}
