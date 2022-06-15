import {Component, OnInit} from '@angular/core';
import {MovieService} from "../movie/services/movie.service";
import {Router} from "@angular/router";
import {Reservation, ReservationService} from "../reservation/services/reservation.service";
import parse from "parse-duration";

@Component({
  templateUrl: 'booked-info.component.html',
  styleUrls: ['./booked-info.component.scss']
})

export class BookedInfoComponent implements OnInit {

  reservations: Reservation[];


  constructor(private reservationService: ReservationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.reservationService.list().subscribe(result => {
      console.log(result);
      for (let reservation of result) {
        let runningTimeStr = parse(reservation.screening.movie.runningTime.toLowerCase().substring(2, reservation.screening.movie.runningTime.length), 'm') + '분';
        let runningTime = parse(reservation.screening.movie.runningTime.toLowerCase().substring(2, reservation.screening.movie.runningTime.length), 'ms');
        let startTime = new Date(Date.parse(reservation.screening.whenScreened));
        let endTime = new Date(Date.parse(reservation.screening.whenScreened) + runningTime);

        reservation.screening.runningTimeStr = runningTimeStr;
        reservation.screening.runningTime = runningTime;
        reservation.screening.startTime = this.transDate(startTime);
        reservation.screening.endTime = this.transDate(endTime);
        reservation.totalCost = reservation.discountCost * reservation.audienceCount;
      }

      this.reservations = result;
      console.log(this.reservations.length == 0);
    })
  }

  transDate(date: Date): string {
    const formatDate = (date) => {
      let dateStr = date.getHours() + ":" + date.getMinutes();
      return dateStr;
    }
    return formatDate(date);
  }

  doReservationCancel(id: number): void {
    this.reservationService.delete(id).subscribe(result => {
      this.ngOnInit();
      // this.router.navigate(['/bookedInfo']);
    })
  }
}
