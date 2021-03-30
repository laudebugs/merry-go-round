import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss'],
})
export class PaletteComponent implements OnInit {
  palette = 'merry';
  paletteFormControl: FormControl;
  constructor(private fb: FormBuilder) {
    this.paletteFormControl = new FormControl('merry');
  }

  ngOnInit(): void {
    let palette = localStorage.getItem('palette');
    if (palette !== null) {
      this.palette = palette;
    }
  }
  changeFn(event: any) {
    this.palette = event;
    localStorage.setItem('palette', event);
  }
}
