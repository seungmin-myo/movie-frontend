import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Movie {
  id: number;

  title: string;

  rated: string;

  advanceTicketSale: string;

  openingDate: string;

  runningTime: string;

  genre: string

  description: string;

  image: string;

}

const URL = '/dna/practice/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get<any>(`${URL}`);
  }

  find(id: number): Observable<Movie> {
    return this.http.get<any>(`${URL}/${id}`);
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<any>(`${URL}`, movie);
  }

  update(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<any>(`${URL}/${id}`, movie);
  }

  delete(id: number): Observable<Movie> {
    return this.http.delete<any>(`${URL}/${id}`);
  }
}
