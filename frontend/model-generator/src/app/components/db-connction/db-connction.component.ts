import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorResponse } from 'src/app/classes/error-response';
import { MySQLConnectionData } from 'src/app/classes/mysql-connection-data';
import { TestConnection } from 'src/app/classes/test-connection';
import { DatabaseTypes } from 'src/app/enums/database-types.enum';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-db-connction',
  templateUrl: './db-connction.component.html',
  styleUrls: ['./db-connction.component.css']
})
export class DbConnctionComponent implements OnInit {

  public readonly DB_TYPES_URL = 'db-connection/db-types';
  public readonly DB_TEST_URL = 'db-connection';

  public readonly DATABASE_TYPES = DatabaseTypes;

  public databaseTypes: string[] = [];
  public selecteDbType!: string;
  public dbFormModel: any;
  public isDbFormValid = false;
  public isTestSuccessful = false;
  public connErrMsg: string = '';

  @ViewChild('successSwal') private successSwal!: SwalComponent;
  @ViewChild('errorSwal') private errorSwal!: SwalComponent;

  constructor(
    private baseService: BaseService,
    private spinner: NgxSpinnerService,
    public readonly swalTargets: SwalPortalTargets
  ) { }

  ngOnInit(): void {
    this.loadDatabaseTypes();
  }

  private loadDatabaseTypes() {
    this.baseService.loadData(this.DB_TYPES_URL)
      .subscribe((dbTypes: string[]) => {
        this.databaseTypes = dbTypes;
      });
  }

  onDbTypeChange() {
    switch (this.selecteDbType) {
      case DatabaseTypes.MYSQL: this.dbFormModel = new MySQLConnectionData({});
    }
  }

  onTestConnection() {
    this.spinner.show();
    this.isTestSuccessful = false;
    const testConnection = new TestConnection(this.dbFormModel, this.selecteDbType as DatabaseTypes);

    this.baseService.submitData(this.DB_TEST_URL, testConnection)
      .subscribe(
        (test: any) => {
          this.isTestSuccessful = test === true;
          this.spinner.hide();
          this.successSwal.fire();
        }, (err: ErrorResponse) => {
          this.connErrMsg = err.message;
          this.spinner.hide();
          this.errorSwal.fire();
        }
      );
  }

  onFormValidChange(isFormValid: boolean) {
    this.isDbFormValid = isFormValid;
  }

}
