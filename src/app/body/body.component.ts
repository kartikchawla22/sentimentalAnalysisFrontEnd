import { Component, OnInit } from '@angular/core';
import { ApicallService } from "../apicall.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
lat;
lng;
query;
  public doughnutChartLabels:string[] = ['Positive Tweets', 'Negative Tweets'];
  public demodoughnutChartData:number[] = [10, 20];
  public doughnutChartType:string = 'doughnut';
  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#d13537', '#b0o0b5']
    }
  ];
constructor(
    private _apiservice: ApicallService
  ) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      });
    }
  }

  onclick(el: string) {
    const elem = document.querySelector(el);
    let offsetTop = elem.getBoundingClientRect().top;
    window.scroll({top: offsetTop, left: 0, behavior: 'smooth'} );

// if(!!this.query) {
//   this.demodoughnutChartData = [];
//   this._apiservice.getGraph(this.lat, this.lng, this.query).subscribe((res) => {
//     if (this.demodoughnutChartData.length === 0) {
//       this.demodoughnutChartData.push(res.data.arr[0]);
//       this.demodoughnutChartData.push(res.data.arr[1]);
//     }
//   })
// }
  }

}
