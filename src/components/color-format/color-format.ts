import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the ColorFormatComponent component.
 *
 * This component is used to properly format and display numbers
 *   +ve numbers ---> Green color
 *   -ve numbers ---> Red color, wrapped in parenthesis
 *   0           ---> Blue color
 */
@Component({
  selector: 'color-format',
  templateUrl: 'color-format.html'
})
export class ColorFormatComponent implements OnInit {

  @Input() data: any
  @Input() showCurrency: boolean

  absoluteValue: number

  constructor() {

  }

  ngOnInit() {
    this.data = parseFloat(this.data)
    this.absoluteValue = Math.abs(this.data)
  }

}
