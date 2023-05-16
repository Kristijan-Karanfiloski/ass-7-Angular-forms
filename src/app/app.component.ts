import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  projectStatus: string[] = ['Stable', 'Critical', 'Finished'];
  // forbiddenTxt: string = 'Test';

  ngOnInit() {
    this.myForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, this.validator.bind(this)],
        this.forbiddenTextString
        // this.forbiddenTextString
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.myForm.statusChanges.subscribe((status) => console.log(status));
  }

  onSubmit() {
    console.log(this.myForm);

    this.myForm.reset();
  }

  validator(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { validator: true };
    }
    return null;
  }

  forbiddenTextString(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Testproject') {
          resolve({ validator: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
