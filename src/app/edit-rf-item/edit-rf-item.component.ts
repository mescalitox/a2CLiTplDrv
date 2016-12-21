import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import 'rxjs/add/operator/filter';

//reactive form ou model driven form
@Component({
  selector: 'app-edit-rf-item',
  templateUrl: './edit-rf-item.component.html',
  styleUrls: ['./edit-rf-item.component.css']
})
export class EditRfItemComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Output() onClickCancel: EventEmitter<any> = new EventEmitter();

  private editRfForm: FormGroup;

  private nameFc = new FormControl("", Validators.required);

  constructor(private fb: FormBuilder) {

    this.editRfForm = new FormGroup({
      name: this.nameFc,
      codename: new FormControl('', [Validators.required, Validators.minLength(3)])
    }, this.specialValidator);

  }

  ngOnInit() {
    console.warn('init');

    //todo ???
    // this.editRfForm.valueChanges
    //   .map((value) => {
    //     value.name = value.name.toUpperCase();
    //     return value;
    //   })
    //   .filter((value) => this.editRfForm.valid)
    //   .subscribe((value) => {
    //     console.log("Model Driven Form valid value: vm = ", JSON.stringify(value));
    //   });
  }

  //name et codename égaux
  specialValidator(g: FormGroup) {
    let valid = g.get('name').value != '' && g.get('name').value === g.get('codename').value ? { 'identiques': true } : null;
    return valid;
  }

  ngOnChanges() {
    // todo ?
    console.warn("changes");
    console.warn(this.editRfForm);
    this.editRfForm.reset({ name: this.item.name, codename: this.item.codename });
  }

  onCancel() {
    this.editRfForm.reset({ name: this.item.name, codename: this.item.codename });
    //this.onClickCancel.emit(this.item);
  }

  onSubmit() {
    console.log(this.editRfForm.value);   // {name: 'valeur...', codename: 'valeur...'}
    console.log(this.editRfForm.status);  // 'VALID'
    console.log("model-based form submitted");
    console.log(this.editRfForm);
  }

}
