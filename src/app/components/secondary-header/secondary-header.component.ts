import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'secondary-header',
  templateUrl: './secondary-header.component.html',
  styleUrls: ['./secondary-header.component.scss'],
})
export class SecondaryHeaderComponent implements OnInit {
  @Input()
  tickets: number = 5;

  @Input()
  roles!: string[];
  constructor() {}

  ngOnInit(): void {}
}
