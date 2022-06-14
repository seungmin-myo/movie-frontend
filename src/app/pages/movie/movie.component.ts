import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import parse from 'parse-duration'
import {Movie, MovieService} from "./services/movie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'sample-movie',
  providers: [MovieService],
  templateUrl: 'movie.component.html',
  styleUrls: ['./movie.component.scss'],
})

export class MovieComponent implements OnInit {

  filter = '';

  movies: Movie[];

  currentMovie: Movie;

  popupVisible = false;

  durationStr: string;

  constructor(private movieService: MovieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.movieService.list().subscribe(result => {
      for (let movie of result) {
        let str = movie.runningTime.toLowerCase().substring(2, movie.runningTime.length);
        movie.runningTime = parse(str, 'm');
      }
      this.movies = result;
      this.currentMovie = this.movies[0];
    });
  }

  showMovie(movie: Movie) {
    this.currentMovie = movie;
    this.popupVisible = true;
  }

  moveReservationPage($event: any) {
    this.router.navigate(['/reservation']);
  }
}
