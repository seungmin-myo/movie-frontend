import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import {ActivatedRoute, Router} from "@angular/router";
import {Movie, MovieService} from "../movie/services/movie.service";
import {Screening, ScreeningService} from "./services/screening.service";
import {Reservation, ReservationService} from "./services/reservation.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import parse from "parse-duration";
import {$e} from "@angular/compiler/src/chars";

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

  focusedMovie: any;
  focusedScreening: any;

  selectedMovie: Movie;
  selectedScreening: Screening;

  autoNavigateToFocusedRow = true;

  constructor(
    private movieService: MovieService,
    private screeningService: ScreeningService,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.movieId != null) {
      this.focusedMovie = Number(this.activatedRoute.snapshot.params.movieId);
    }

    this.movieService.list().subscribe(result => {
      this.movies = result;
      this.selectedMovie = this.movies[0];

      if (this.focusedMovie != null) {
        this.getScreeningByMovie(this.selectedMovie.id);
      }
    })
  }

  onFocusedRowChanged(e) {
    if (e.element.id == 'movieGrid') {
      this.selectedMovie = e.row.data;
      this.getScreeningByMovie(this.selectedMovie.id);
      this.focusedScreening = null;
    }
  }

  onScreeningClick(e): void {
    this.selectedScreening = e.data;

    this.reservation = new Reservation(this.selectedScreening, '방승민');

    this.reservationService.calculateFee(this.reservation).subscribe(result => {
      this.reservation.discountCost = result.fee.amount;
      this.reservation.fee = result.fee;
      this.reservation.totalCost = this.reservation.discountCost * this.reservation.audienceCount;
    })

    this.popupVisible = true;
  }

  changeTotalCost(): void {
    this.reservation.totalCost = this.reservation.discountCost * this.reservation.audienceCount;
  }

  getScreeningByMovie(movieId: number): void {
    this.screeningService.list(movieId).subscribe(result => {
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

  transDate(date: Date): string {
    const formatDate = (date) => {
      let dateStr = date.getHours() + ":" + date.getMinutes();
      return dateStr;
    }
    return formatDate(date);
  }

  doReservation(): void {
    this.reservationService.create(this.reservation).subscribe(result => {
      this.popupVisible = false;
      this.router.navigate(['/bookedInfo']);
    })
  }

  log($event: any): void {
    console.log($event);
  }
}
