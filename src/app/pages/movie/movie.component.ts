import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import {House, MovieService} from "./services/movie.service";

@Component({
  selector: 'sample-employee',
  providers: [MovieService],
  templateUrl: 'movie.component.html',
  styleUrls: ['./movie.component.scss'],
})

export class MovieComponent implements OnInit {

  filter = '';

  houses: House[];

  currentHouse: House;

  popupVisible = false;

  ADD_TO_FAVORITES = 'Add to Favorites';

  REMOVE_FROM_FAVORITES = 'Remove from Favorites';

  constructor(private movieService: MovieService) {
    this.houses = movieService.getHouses();
    this.currentHouse = this.houses[0];
  }

  ngOnInit(): void {
  }

  showHouse(house: House) {
    this.currentHouse = house;
    this.popupVisible = true;
  }

  changeFavoriteState($event: any) {

  }
}
