import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Screening} from "./screening.service";

export class Reservation {
  id: number;

  customerName: string;

  screening: Screening;

  discountCost: number;

  totalCost: number;

  fee: any;

  audienceCount: number;

  constructor(screening: Screening, customerName: string) {
    this.screening = screening;
    this.customerName = customerName;
    this.audienceCount = 1;
  }
}

const URL = '/dna/practice/reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get<any>(`${URL}`);
  }

  find(id: number): Observable<Reservation> {
    return this.http.get<any>(`${URL}/${id}`);
  }

  create(reservation: Reservation): Observable<Reservation> {
    return this.http.post<any>(`${URL}`, reservation);
  }

  update(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<any>(`${URL}/${id}`, reservation);
  }

  delete(id: number): Observable<Reservation> {
    return this.http.delete<any>(`${URL}/${id}`);
  }

  calculateFee(reservation: Reservation): Observable<Reservation> {
    return this.http.post<any>(`${URL}/calculateFee`, reservation);
  }
}
