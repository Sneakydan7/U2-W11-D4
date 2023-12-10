import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movies';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Favourites } from 'src/app/models/favourites';
import { Auth } from 'src/app/auth/auth';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] | undefined;
  userId: number = 0;
  favourite!: Favourites[];
utente! : Auth | null
  constructor(private srv: UserService, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.userId = this.srv.getUserId();
    this.srv.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      this.getFave();

      this.authSrv.user$.subscribe((_user) => {
        this.utente = _user;
      });
      console.log(this.movies);
    });
  }

  isFavourite(movieId: number): boolean {
    return (
      Array.isArray(this.favourite) &&
      this.favourite.some((movie) => movie.movieId === movieId)
    );
  }

  faveOrNot(movieId: number) {
    if (this.isFavourite(movieId)) {
      let faveMovie: any = this.favourite.find((movie) => movie.movieId === movieId);
      if (faveMovie) {
        this.removeFavourite(faveMovie.id);
      }
    } else {
      this.addFavourite(movieId);
    }
  }


  addFavourite(movieId: number) {
    this.srv
      .addFavourite(movieId, this.userId)
      .subscribe((favourite: Favourites) => {
        this.getFave();
      });
  }

  removeFavourite(id: number) {
    this.srv.removeFavourite(id).subscribe(() => {
      this.getFave();
    });
  }

  getFave() {
    this.srv.getFavourite().subscribe((favourite: Favourites[]) => {
      let userfavourite: Favourites[] = favourite.filter(
        (movie) => movie.userId === this.userId
      );
      this.favourite = userfavourite;
    });
  }
}
