import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.css']
})
export class UiButtonComponent implements OnInit {

  @Input() level: number;

  @Input() icon: string;

  @Input() isDisabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
