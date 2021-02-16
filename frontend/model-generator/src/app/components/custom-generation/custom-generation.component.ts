import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorResponse } from 'src/app/classes/error-response';
import { Table } from 'src/app/classes/table';
import { TableColumn } from 'src/app/classes/table-column';
import { download } from 'src/app/functions/download';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-custom-generation',
  templateUrl: './custom-generation.component.html',
  styleUrls: ['./custom-generation.component.css']
})
export class CustomGenerationComponent implements OnInit {

  public readonly DATA_TYPES_URL = 'export-models/data-types';
  public readonly EXPORT_URL = 'export-models';

  public dataTypes: string[] = [];
  public selectedDataType!: string;
  public fieldName!: string;
  public className!: string;
  public classes: Table[] = [];
  public selectedClass!: Table;
  public errMsg: string = '';

  @ViewChild('successSwal') private successSwal!: SwalComponent;
  @ViewChild('errorSwal') private errorSwal!: SwalComponent;

  constructor(
    private baseService: BaseService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public readonly swalTargets: SwalPortalTargets
  ) { }

  ngOnInit(): void {
    this.loadDataTypes();
  }

  private loadDataTypes() {
    this.baseService.loadData(this.DATA_TYPES_URL)
    .subscribe((dataTypes: string[]) => {
      this.dataTypes = dataTypes;
    });
  }

  public addClassName() {
    const exists = this.classes.find(table => table.tableName === this.className);
    if (!exists) {
      this.classes.push(new Table({tableName: this.className}));
    }
  }

  public removeClassName(name: string) {
    this.classes = this.classes.filter(table => table.tableName !== name);
    if (this.selectedClass?.tableName === name) {
      this.selectedClass = new Table({});
    }
  }

  isSemicolumnNeeded(columns: TableColumn[], index: number) {
    return index !== columns.length - 1;
  }

  isGenrateButtonDisabled(): boolean {
    return !this.classes.length;
  }

  onGenerateFiles() {
    this.spinner.show();

    this.baseService.loadFile(this.EXPORT_URL, this.classes)
      .subscribe(
        ({archive, filename}) => {
          download(archive, filename);
          this.spinner.hide();
          this.successSwal.fire();
        },
        (err: ErrorResponse) => {
          this.errMsg = 'Error generating models';
          this.spinner.hide();
          this.errorSwal.fire();
        }
      );
  }

  addFieldName() {
    const exists = this.selectedClass?.columns.find(column => column.columnName === this.fieldName);
    if (!exists) {
      this.selectedClass?.columns.push(new TableColumn({columnName: this.fieldName, dataType: this.selectedDataType}));
    }
  }

  removeField(field: string) {
    const columns = this.selectedClass?.columns.filter(column => column.columnName !== field);
    this.selectedClass.columns = columns;
  }

  redirectOnError() {
    this.router.navigate(['../']);
  }

}
