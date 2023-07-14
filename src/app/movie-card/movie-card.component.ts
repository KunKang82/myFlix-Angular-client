import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: string[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  /**
   * Navigate to profile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logout user and return to welcome page
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  /**
   * Get all movies from API
   * @returns movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Get users favorite movies
   * @returns favoriteMovies
   */
  getFavMovies(): void {
    this.fetchApiData.getFavMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
    });
  }

  /**
   * Add or remove movie from favorite list
   * @param id 
   */
  toggleFavorite(id: string): void {
    if (this.favoriteMovies.includes(id)) {
      // Remove from favorites
      this.fetchApiData.deleteFavMovie(id).subscribe((resp: any) => {
        this.snackBar.open('Successfully removed movie from favorites', 'OK', {
          duration: 4000,
        });
        this.getFavMovies();
      });
    } else {
      // Add to favorites
      this.fetchApiData.addFavMovie(id).subscribe((resp: any) => {
        this.snackBar.open('Successfully added movie to favorites', 'OK', {
          duration: 4000,
        });
        this.getFavMovies();
      });
    }
  }
  /**
   *Open genre dialogue
   * @param name
   * @param description
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      maxWidth: '600px',
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  /**
   * Open director dialogue
   * @param name 
   * @param bio 
   * @param birthyear 
   */
  openDirector(name: string, bio: string, birthyear: string): void {
    this.dialog.open(DirectorComponent, {
      maxWidth: '600px',
      data: {
        Name: name,
        Bio: bio,
        Birthyear: birthyear,
      },
    });
  }

  /**
   * Open movie details dialogue
   * @param title 
   * @param description 
   * @param year 
   */
  openMovie(title: string, description: string, year: string): void {
    this.dialog.open(MovieDetailsComponent, {
      maxWidth: '600px',
      data: {
        Title: title,
        Description: description,
        Year: year,
      },
    });
  }
}
