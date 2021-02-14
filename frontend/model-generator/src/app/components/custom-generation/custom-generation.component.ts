import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/classes/table';
import { TableColumn } from 'src/app/classes/table-column';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-custom-generation',
  templateUrl: './custom-generation.component.html',
  styleUrls: ['./custom-generation.component.css']
})
export class CustomGenerationComponent implements OnInit {

  public readonly DATA_TYPES_URL = 'export-models/data-types';

  public dataTypes: string[] = [];
  public selectedDataType!: string;
  public fieldName!: string;
  public className!: string;
  public classes: Table[] = [];
  public selectedClass!: Table;

  constructor(
    private baseService: BaseService
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
    this.classes.push(new Table({tableName: this.className}));
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

  isGenrateButtonDisabled() {

  }

  onGenerateFiles() {

  }

  addFieldName() {
    this.selectedClass?.columns.push(new TableColumn({columnName: this.fieldName, dataType: this.selectedDataType}));
  }

  removeField(field: string) {
    const columns = this.selectedClass?.columns.filter(column => column.columnName !== field);
    this.selectedClass.columns = columns;
  }

}
