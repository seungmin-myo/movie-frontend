import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";
import {Movie} from "../../movie/services/movie.service";

export class Reservation {
  id: number;

  customerName: string;

  screening: Screening;

  discountCost: number;

  audienceCount: number;
}

export class Screening {
  id: number;

  movie: Movie;

  sequence: number;

  whenScreened: number;
}


const reservations: Reservation[] = [{
  id: 1,
  customerName: '방승민',
  screening: {
    id: 1,
    movie: {
      id: 10,
      title: '실종',
      advanceTicketSale: '0.7',
      openingDate: '2022.06.15',
      runningTime: '123',
      genre: '스릴러',
      description: '수배 중인 연쇄살인마를 목격한 후 포상금을 탈 생각에 들떠있던 아빠 ‘사토시’\n' +
        '어느 날, 아무런 흔적도 없이 사라져버린다.\n' +
        '딸 ‘카에데’는 유일한 가족인 아빠를 찾아 나서고,\n' +
        '아빠의 일터에서 아빠의 이름을 쓰고 있는 한 남자를 발견한다.\n' +
        '그리고 그가 바로 아빠가 사라지기 전 목격한\n' +
        '연쇄살인마라는 사실을 알게 되고 그를 쫓기 시작하는데…',
      image: '/assets/movie/poster/실종.jpg',
      rated: '18',},
    sequence: 1,
    whenScreened: Date.now()
  },
  discountCost: 10000,
  audienceCount: 2
}];

const screenings: Screening[] = [{
  id: 1,
  movie: {
    id: 10,
    title: '실종',
    advanceTicketSale: '0.7',
    openingDate: '2022.06.15',
    runningTime: '123',
    genre: '스릴러',
    description: '수배 중인 연쇄살인마를 목격한 후 포상금을 탈 생각에 들떠있던 아빠 ‘사토시’\n' +
      '어느 날, 아무런 흔적도 없이 사라져버린다.\n' +
      '딸 ‘카에데’는 유일한 가족인 아빠를 찾아 나서고,\n' +
      '아빠의 일터에서 아빠의 이름을 쓰고 있는 한 남자를 발견한다.\n' +
      '그리고 그가 바로 아빠가 사라지기 전 목격한\n' +
      '연쇄살인마라는 사실을 알게 되고 그를 쫓기 시작하는데…',
    image: '/assets/movie/poster/실종.jpg',
    rated: '18',
  },
  sequence: 1,
  whenScreened: Date.now()
}];


const URL = '/dna/practice/reservations';

@Injectable()
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  find(id: number): Observable<Reservation> {
    return this.http.get<any>(`${URL}/${id}`);
  }

  create(employee: Reservation): Observable<Reservation> {
    return this.http.post<any>(`${URL}`, employee);
  }

  update(id: number, employee: Reservation): Observable<Reservation> {
    return this.http.put<any>(`${URL}/${id}`, employee);
  }

  delete(id: number): Observable<Reservation> {
    return this.http.delete<any>(`${URL}/${id}`);
  }

  getReservations() {
    return reservations;
  }

  getScreening() {
    return screenings;
  }
}
