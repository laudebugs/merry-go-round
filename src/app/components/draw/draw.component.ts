import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Wheel from 'lottery-wheel';
import {
  Item,
  NgxWheelComponent,
  TextAlignment,
  TextOrientation,
} from 'ngx-wheel';

@Component({
  selector: 'draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent {
  @ViewChild(NgxWheelComponent, { static: false }) wheel;
  textAlignment: TextAlignment;
  textOrientation: TextOrientation;

  spinDuration: number = 8;
  items: Item[] = [
    { text: 'mary', id: 1, fillStyle: '#0B6184' },
    { text: 'mark', id: 2, fillStyle: '#0B6184' },
    { text: 'john', id: 3, fillStyle: '#0B6184' },
  ];
  idToLandOn = 3;
  constructor() {}

  ngAfterViewInit(): void {
    console.log('only after THIS EVENT "wheel" is usable!!');
    // Call the spin function whenever and wherever you want after the AfterViewInit Event
    // this.wheel.spin();
  }

  before() {
    console.log('b4');
  }

  after() {
    console.log('done');
  }
}
