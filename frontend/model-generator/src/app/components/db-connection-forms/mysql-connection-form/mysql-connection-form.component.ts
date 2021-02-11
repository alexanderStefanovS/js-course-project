import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MySQLConnectionData } from 'src/app/classes/mysql-connection-data';

@Component({
  selector: 'app-mysql-connection-form',
  templateUrl: './mysql-connection-form.component.html',
  styleUrls: ['./mysql-connection-form.component.css']
})
export class MysqlConnectionFormComponent implements OnInit, AfterViewInit {

  public isFormValid: boolean = false;

  @Input() mySqlConnectionData: MySQLConnectionData = new MySQLConnectionData({});;
  @Output() validEmitter = new EventEmitter();
  @ViewChild('mySqlForm', { static: true }) mySqlForm: NgForm | undefined;

  constructor() { }

  ngOnInit(): void {
    this.validEmitter.emit(this.isFormValid);
    this.mySqlForm?.valueChanges?.subscribe(
      () => {
        if (this.mySqlForm?.valid !== this.isFormValid) {
          this.isFormValid = !!this.mySqlForm?.valid;
          this.validEmitter.emit(this.isFormValid);
        }
      }
    )
  }

  ngAfterViewInit(): void {
  }

}
