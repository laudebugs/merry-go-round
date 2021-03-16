import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'secondary-header',
  templateUrl: './secondary-header.component.html',
  styleUrls: ['./secondary-header.component.scss'],
})
export class SecondaryHeaderComponent implements OnInit {
  selected: string = 'users';
  @Input()
  tickets: number = 5;
  constructor() {}

  ngOnInit(): void {}
}
