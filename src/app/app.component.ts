import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'merry-go-round';
  palette: string;

  ngOnInit(): void {
    let palette = localStorage.getItem('palette');
    if (palette !== null) {
      this.palette = palette;
    } else {
      this.palette = 'merry';
      localStorage.setItem('palette', 'merry');
    }
  }
  getPalette() {
    let palette = localStorage.getItem('palette');
    return palette;
  }
}
