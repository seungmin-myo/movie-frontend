import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import {Movie, ReservationService} from "./services/reservation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'sample-employee',
  providers: [ReservationService],
  templateUrl: 'reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})

export class ReservationComponent implements OnInit {

  filter = '';

  movies: Movie[];

  currentMovie: Movie;

  popupVisible = false;

  constructor(private movieService: ReservationService,
              private router: Router) {
    this.movies = movieService.getMovies();
    this.currentMovie = this.movies[0];
  }

  ngOnInit(): void {
  }

  showMovie(movie: Movie) {
    this.currentMovie = movie;
    this.popupVisible = true;
  }

  changeFavoriteState($event: any) {
    this.router.navigate(['/booking']);
  }
}
