import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from "../../movie/services/movie.service";

export class Screening {
  id: number;

  movie: Movie;

  sequence: string;

  whenScreened: string;
}

const URL = '/dna/practice/screenings';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get<any>(`${URL}`);
  }

  find(id: number): Observable<Screening> {
    return this.http.get<any>(`${URL}/${id}`);
  }

  create(screening: Screening): Observable<Screening> {
    return this.http.post<any>(`${URL}`, screening);
  }

  update(id: number, screening: Screening): Observable<Screening> {
    return this.http.put<any>(`${URL}/${id}`, screening);
  }

  delete(id: number): Observable<Screening> {
    return this.http.delete<any>(`${URL}/${id}`);
  }
}
