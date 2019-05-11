import { Component, OnInit } from '@angular/core';
import { ApicallService } from "../apicall.service";
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  lat;
  lng;
  query;
  showLoader: boolean = false;
  public doughnutChartLabels: string[] = ['Positive Tweets', 'Negative Tweets', 'Neutral Tweets'];
  public demodoughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';
  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#63FFCE', '#FF4863', '#A4A70D']
    }
  ];

  constructor(
    private _apiservice: ApicallService
  ) {
  }

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

this.showLoader = true;
    if (!!this.query) {
      this.demodoughnutChartData = [];
      this._apiservice.getGraph(this.lat, this.lng, this.query).subscribe((res) => {
        if (this.demodoughnutChartData.length === 0) {
          this.demodoughnutChartData.push(res.data.arr[0]);
          this.demodoughnutChartData.push(res.data.arr[1]);
          this.demodoughnutChartData.push(res.data.arr[2]);
          setTimeout(() => {
            const elem = document.querySelector(el);
            if(!!elem) {
              let offsetTop = elem.getBoundingClientRect().top;
              window.scroll({top: offsetTop, left: 0, behavior: 'smooth'});
            }
            this.showLoader = false;
          }, 100)
        }
      })
    }
  }
  public captureScreen()
  {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Result.pdf'); // Generated PDF
    });
  }
}
