import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movies';
import { Auth } from '../auth/auth';
import { Favourites } from '../models/favourites';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>(`${this.apiURL}/movies-popular`);
  }

  getFavourite() {
    return this.http.get<Favourites[]>(`${this.apiURL}/favorites`);
  }

  addFavourite(movieId: number, userId: number) {
    const favourite: Favourites = {
      movieId: movieId,
      userId: userId,
    };

    return this.http.post<Favourites>(`${this.apiURL}/favorites`, favourite);
  }

  getUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      const userData: Auth = JSON.parse(user);
      return userData.user.id;
    }
    return 0;
  }
  getUserInfo(): Auth | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userInfo: Auth = JSON.parse(user);
      return userInfo;
    }
    return null;
  }
  removeFavourite(id: number) {
    return this.http.delete<Favourites>(`${this.apiURL}/favourites/${id}`);
  }
}
