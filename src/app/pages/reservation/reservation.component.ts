import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import {Router} from "@angular/router";
import {Movie, MovieService} from "../movie/services/movie.service";
import {Screening, ScreeningService} from "./services/screening.service";
import {Reservation, ReservationService} from "./services/reservation.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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

  movieColumns = ['rated', 'title'];

  screeningColumns = ['sequence', 'whenScreened']

  focusedRowKey = 1;

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
      this.screenings = result;
    },
      (error) => {
        console.log(error);
      })
  }

  onFocusedRowChanging(e) {
    const rowsCount = e.component.getVisibleRows().length;
    const pageCount = e.component.pageCount();
    const pageIndex = e.component.pageIndex();
    const key = e.event && e.event.key;

    if (key && e.prevRowIndex === e.newRowIndex) {
      if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
        e.component.pageIndex(pageIndex + 1).done(() => {
          e.component.option('focusedRowIndex', 0);
        });
      } else if (e.newRowIndex === 0 && pageIndex > 0) {
        e.component.pageIndex(pageIndex - 1).done(() => {
          e.component.option('focusedRowIndex', rowsCount - 1);
        });
      }
    }
  }

  onFocusedRowChanged(e) {
    const rowData = e.row && e.row.data;

    if (rowData) {
      this.taskSubject = rowData.Task_Subject;
      this.taskDetailsHtml = this.sanitizer.bypassSecurityTrustHtml(rowData.Task_Description);
      this.taskStatus = rowData.Task_Status;
      this.taskProgress = rowData.Task_Completion ? `${rowData.Task_Completion}` + '%' : '';
    }
  }
}
