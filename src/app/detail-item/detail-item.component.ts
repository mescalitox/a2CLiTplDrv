import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css']
})
export class DetailItemComponent implements OnInit {

  @Input() item: any;

  @Output() onClickEdit: EventEmitter<any> = new EventEmitter();
  @Output() onClickRemove: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.onClickEdit.emit(this.item);
    console.warn("onEdit");
  }

  onRemove() {
    this.onClickRemove.emit(this.item);
    console.warn("onRemove");
  }

}
