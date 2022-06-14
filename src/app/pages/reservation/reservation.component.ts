import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import {Router} from "@angular/router";
import {Movie, MovieService} from "../movie/services/movie.service";
import {Screening, ScreeningService} from "./services/screening.service";
import {Reservation, ReservationService} from "./services/reservation.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import parse from "parse-duration";

@Component({
  selector: 'sample-reservation',
  providers: [ReservationService],
  templateUrl: 'reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})

export class ReservationComponent implements OnInit {

  screenings: Screening[];
  movies: Movie[];
  reservation: Reservation;

  popupVisible = false;

  focusedMovie = 1;
  focusedScreening = 1;

  selectedMovie: Movie;
  selectedScreening: Screening;

  autoNavigateToFocusedRow = true;


  taskSubject: string;
  taskDetailsHtml: SafeHtml;
  taskStatus: string;
  taskProgress: string;

  constructor(
    private movieService: MovieService,
    private screeningService: ScreeningService,
    private reservationService: ReservationService,
    private router: Router,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.movieService.list().subscribe(result => {
      this.movies = result;
    })

    this.screeningService.list().subscribe(result => {

      for (let screening of result) {
        let runningTimeStr = parse(screening.movie.runningTime.toLowerCase().substring(2, screening.movie.runningTime.length), 'm') + '분';
        let runningTime = parse(screening.movie.runningTime.toLowerCase().substring(2, screening.movie.runningTime.length), 'ms');
        let startTime = new Date(Date.parse(screening.whenScreened));
        let endTime = new Date(Date.parse(screening.whenScreened) + runningTime);

        screening.runningTimeStr = runningTimeStr;
        screening.runningTime = runningTime;
        screening.startTime = this.transDate(startTime);
        screening.endTime = this.transDate(endTime);
      }

      this.screenings = result;
    })
  }

  onFocusedRowChanging(e) {
  }

  onFocusedRowChanged(e) {
    if (e.element.id == 'movieGrid') {
      this.selectedMovie = e.row.data;
    } else if (e.element.id == 'screeningGrid') {
      this.selectedScreening = e.row.data;
    }
  }

  transDate(date: Date): string {
    const formatDate = (date) => {
      let dateStr = date.getHours() + ":" + date.getMinutes();
      return dateStr;
    }
    return formatDate(date);
  }
}
