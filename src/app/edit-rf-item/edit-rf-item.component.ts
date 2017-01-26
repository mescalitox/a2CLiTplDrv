import { UsernameValidator } from './../shared/username-validator';
import { UserManagerService } from './../shared/user-manager.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

//import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';



//reactive form ou model driven form
@Component({
  selector: 'app-edit-rf-item',
  templateUrl: './edit-rf-item.component.html',
  styleUrls: ['./edit-rf-item.component.css']
})
export class EditRfItemComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Output() validSubmit: EventEmitter<any> = new EventEmitter();

  private editRfForm: FormGroup;

  private nameFc = new FormControl("", Validators.required, this.usernameTakenObs);

  constructor(private fb: FormBuilder, private userManagerService: UserManagerService) {

    this.editRfForm = new FormGroup({
      name: this.nameFc,
      codename: new FormControl('', [Validators.required, Validators.minLength(3), this.forbiddenNameValidator(/JA/i)])
    }, this.specialValidator, (fg: FormGroup) => this.usernameTakenServ(fg)/*this.usernameTakenServ.bind(this)*/);

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

  /** A hero's name can't match the given regular expression */
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const name = control.value;
      const no = nameRe.test(name);
      return no ? { 'forbiddenName': { name } } : null;
    };
  }

  /**assynchrone */
  usernameTaken(control: AbstractControl): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "David") {
          resolve({ "usernameTaken": true })
        } else {
          resolve(null);
        };

      }, 1000);
    });

  }

  usernameTakenObs(control: AbstractControl): Observable<any> {
    return new Observable(observer => {
      if (control.value === "David") {
        observer.next({ "usernameTakenObs": true });
      } else {
        observer.next(null);
      }
    }).debounceTime(500).distinctUntilChanged().first()
  }

  /**assynchrone avec requete DB*/
  usernameTakenServ(fg: FormGroup): Promise<any> {
    if (fg.get('name').untouched && fg.get('codename').untouched) {
      return new Promise((resolve, reject) => resolve(null));
    } else {
      let nameValue = fg.get('name').value;
      let codenameValue = fg.get('codename').value;

      console.warn("test" + nameValue + " " + codenameValue + " = " + (nameValue === codenameValue));
      // console.warn(this.userManagerService);
      // return new Promise((resolve, reject) => resolve(name === codename ? { 'identiques2': true } : null));
      return this.userManagerService.search(nameValue, codenameValue, this.item.id).then(user => {
        if (user != null && Array.isArray(user) && user.length > 0) {
          return { "usernameTakenServ": true }
        } else {
          return null;
        }
      });
    }
  }


  ngOnChanges() {
    // todo ?
    console.warn("changes");
    console.warn(this.editRfForm);
    this.editRfForm.reset({ name: this.item.name, codename: this.item.codename });
  }

  onCancel() {
    this.editRfForm.reset({ name: this.item.name, codename: this.item.codename });
  }

  onSubmit() {
    // let majItem = this.editRfForm.value;
    // majItem.id = this.item.id;
    // console.log(majItem);
    console.log(this.editRfForm.value);   // {name: 'valeur...', codename: 'valeur...'}
    console.log(this.editRfForm.status);  // 'VALID'
    console.log("model-based form submitted");
    this.userManagerService.save(this.item.id, this.editRfForm.value).then(majItem => {
      //action sur la résolution de la promise
      console.warn("submit effectué");
      console.warn(majItem);
      //emission de l'item mis a jour
      this.validSubmit.emit(majItem)
    });
  }

}
