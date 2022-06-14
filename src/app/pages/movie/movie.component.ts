import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import {Movie, MovieService} from "./services/movie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'sample-employee',
  providers: [MovieService],
  templateUrl: 'movie.component.html',
  styleUrls: ['./movie.component.scss'],
})

export class MovieComponent implements OnInit {

  filter = '';

  movies: Movie[];

  currentMovie: Movie;

  popupVisible = false;

  constructor(private movieService: MovieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.movieService.list().subscribe(result => {
      this.movies = result;
    });
    this.currentMovie = this.movies[0];
  }

  showMovie(movie: Movie) {
    this.currentMovie = movie;
    this.popupVisible = true;
  }

  changeFavoriteState($event: any) {
    this.router.navigate(['/booking']);
  }
}
