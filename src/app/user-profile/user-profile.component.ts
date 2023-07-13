// // import { Component, Input, OnInit } from '@angular/core';
// // import { FetchApiDataService } from '../fetch-api-data.service';
// // import { MatSnackBar } from '@angular/material/snack-bar';

// // @Component({
// //   selector: 'app-user-profile',
// //   templateUrl: './user-profile.component.html',
// //   styleUrls: ['./user-profile.component.scss']
// // })
// // export class UserProfileComponent implements OnInit {
// //   user: any = {};
// //   @Input() userData = { username: '', password: '', email: '', birthday: '' };

// //   constructor(
// //     private fetchApiData: FetchApiDataService,
// //     private snackBar: MatSnackBar
// //   ) { }

// //   ngOnInit(): void {
// //     this.getUser();
// //   }

// //   getUser(): void {
// //     this.fetchApiData.getUser(localStorage.getItem("user") || "").subscribe((resp: any) => {
// //       this.user = resp;
// //       console.log(this.user);
// //       return this.user;
// //     });
// //   }

// //   updateUser(): void {
// //     this.fetchApiData.editUser(localStorage.getItem("user") || "", this.userData).subscribe((resp: any) => {
// //       console.log(resp);
// //       this.snackBar.open("Successfully changed userdata", 'OK', {
// //         duration: 4000
// //       });
// //       this.getUser();
// //     }, (result) => {
// //       this.snackBar.open(result, 'OK', {
// //         duration: 4000
// //       });
// //     });
// //   }
// // }

// import { Component, Input, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FetchApiDataService } from '../fetch-api-data.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { formatDate } from '@angular/common';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss']
// })

// /**
//  * this component fetches user information from the API
//  * @user data is stored about the specific user
//  * @favorites stores an array of favorite movies from the user
//  * 
//  */
// export class UserProfileComponent implements OnInit {
//   user: any = {};
//   initialInput: any = {};
//   favorites: any = [];

//   /**
//    * the updatedUser object is passed to the API to store the new information
//    */
//   @Input() updatedUser = {
//     Username: '',
//     Password: '',
//     Email: '',
//     Birthday: '',
//   };

//   constructor(  
//     public fetchApiData: FetchApiDataService,
//     public snackBar: MatSnackBar,
//     private router: Router
//   ) {}

//     /** this function implements OnInit when the component is initialized */
//   // ngOnInit(): void {
//   //   this.getUserInfo();
//   // }
//     ngOnInit(): void {
//     this.getUser();
//   }

//   getUser(): void {
//         this.fetchApiData.getUser(localStorage.getItem("user") || "").subscribe((resp: any) => {
//           this.user = resp;
//           console.log(this.user);
//           return this.user;
//         });
//       }
//       updateUser(): void {
//         const { Username, Password, Email, Birthday } = this.updatedUser;
//         this.fetchApiData.editUser(localStorage.getItem("user") || "", Password, Email, Birthday).subscribe(
//           (resp: any) => {
//             console.log(resp);
//             this.snackBar.open("Successfully changed userdata", 'OK', {
//               duration: 4000
//             });
//             this.getUser();
//           },
//           (result) => {
//             this.snackBar.open(result, 'OK', {
//               duration: 4000
//             });
//           }
//         );
//       }
//   /**
//    * this function makes the API call to get user info from the database
//    * @returns a JSON object with user information
//    */
//   // getUserInfo(): void {
//   //   // this.fetchApiData.getUser().subscribe((resp: any) => {
//   //     this.fetchApiData.getUser(localStorage.getItem('user') || '').subscribe((resp: any) => {
//   //     this.user = resp;
//   //     this.updatedUser.Username = this.user.Username;
//   //     this.updatedUser.Email = this.user.Email;
//   //     // this.user.Birthday comes in as ISOString format, like so: "2011-10-05T14:48:00.000Z"
//   //     this.updatedUser.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
//   //     this.favorites = this.user.FavoriteMovies;
//   //     return this.user;
//   //   });
//   // }

//   /**
//    * this function makes the API call to update user information
//    */
//   // updateUserInfo(): void {
//   //   // this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
//   //     this.fetchApiData.editUser(localStorage.getItem('user') || '', this.updatedUser).subscribe((result) => {
//   //     console.log(result);
//   //     if (
//   //       this.user.Username !== result.Username ||
//   //       this.user.Password !== result.Password
//   //     ) {
//   //       localStorage.clear();
//   //       this.router.navigate(['welcome']);
//   //       this.snackBar.open(
//   //         'Credentials updated! Please login using your new credentials',
//   //         'OK',
//   //         {
//   //           duration: 2000,
//   //         }
//   //       );
//   //     } else {
//   //       this.snackBar.open('User information has been updated!', 'OK', {
//   //         duration: 2000,
//   //       });
//   //     }
//   //   });
//   // }

//   /**
//    * this function makes the API call to delete specific user data from the database 
//    */
//   deleteAccount(): void {
//     if (confirm('All your data will be lost - this cannnot be undone!')) {
//       this.router.navigate(['welcome']).then(() => {
//         this.snackBar.open(
//           'You have successfully deleted your account - we are sorry to see you go!',
//           'OK',
//           {
//             duration: 2000,
//           }
//         );
//       });
//       this.fetchApiData.deleteUser().subscribe((result) => {
//         console.log(result);
//         localStorage.clear();
//       });
//     }
//   }
// }

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * this component fetches user information from the API
 * @user data is stored about the specific user
 * @favorites stores an array of favorite movies from the user
 * 
 */
export class UserProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  favorites: any = [];

  /**
   * the updatedUser object is passed to the API to store the new information
   */
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(  
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

    /** this function implements OnInit when the component is initialized */
  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * this function makes the API call to get user info from the database
   * @returns a JSON object with user information
   */
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      // this.user.Birthday comes in as ISOString format, like so: "2011-10-05T14:48:00.000Z"
      this.updatedUser.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
      this.favorites = this.user.FavoriteMovies;
      return this.user;
    });
  }

  /**
   * this function makes the API call to update user information
   */
  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      if (
        this.user.Username !== result.Username ||
        this.user.Password !== result.Password
      ) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Credentials updated! Please login using your new credentials',
          'OK',
          {
            duration: 2000,
          }
        );
      } else {
        this.snackBar.open('User information has been updated!', 'OK', {
          duration: 2000,
        });
      }
    });
  }

  /**
   * this function makes the API call to delete specific user data from the database 
   */
  deleteAccount(): void {
    if (confirm('All your data will be lost - this cannnot be undone!')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account - we are sorry to see you go!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}