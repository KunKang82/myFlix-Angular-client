// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

/** @Component decorator to tell Angular that the class right below is a component.*/
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * The @userData object will then be passed into the API call in the registerUser function.
   * @userData object contains: @Username (required), @Password (required), @Email (required), @Birthday
   */
  @Input() userData = {
    Username: '', Password: '', Email: '', Birthday: ''
  };

/**
   * Constructor arguments then will be avaliable through "this" method
   * @param FetchApiData to use functions to make API call
   * @param dialogRef to call dialog with login inputs
   * @param snackBar to show the message, that user has successfuly loged in
   */
constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  // The ngOnInit method is called once the component has received all its inputs
  // (all its data-bound properties) from the calling component (user)
  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
ngOnInit(): void {
}

/**
 * This is the function responsible for sending the form inputs to the backend
 */
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
  // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
    console.log(response);
    this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
    });
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      this.router.navigate(['movies']);
    });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}