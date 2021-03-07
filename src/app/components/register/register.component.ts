import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
// import { getMaxListeners } from 'process';

function passwordsMatchValidator(form){
  const password = form.get('password')
  const confirmPassword = form.get('confirmPassword')

  if(password.value !== confirmPassword.value){
    confirmPassword.setErrors({passwordsMatch: true})
  }else{
    confirmPassword.setErrors(null)
  }
  return null
}

function symbolValidator(control){
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;

  if(control.value.indexOf('@')> -1){
  return null
}else{
  return {symbol: true}
}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 registerForm: FormGroup;

  constructor(private builder: FormBuilder) { }

  // ngOnInit(): void {
  // }
  ngOnInit() {
   this.buildForm()
  }

  buildForm(){
    this.registerForm = this.builder.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, symbolValidator, Validators.minLength(8)]],
      confirmPassword:''
    }, {
      Validators: passwordsMatchValidator
    })
  }

  register(){
    console.log(this.registerForm.value)
  }

}
