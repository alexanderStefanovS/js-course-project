import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'src/app/classes/table';
import { TableColumn } from 'src/app/classes/table-column';
import { download } from 'src/app/functions/download';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-db-metadata',
  templateUrl: './db-metadata.component.html',
  styleUrls: ['./db-metadata.component.css']
})
export class DbMetadataComponent implements OnInit {

  public readonly GET_TABLES_URL = 'db-metadata/db';
  public readonly GET_TABLE_COLUMNS_URL = 'db-metadata/table';
  public readonly EXPORT_URL = 'export-models/from-db';

  public tables: Table[] = [];
  public selectedTable!: Table;

  constructor(
    private baseService: BaseService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadTables();
  }

  private loadTables() {
    this.baseService.loadData(this.GET_TABLES_URL, Table)
      .subscribe((tables: Table[]) => {
        this.tables = tables;
        this.selectedTable = this.tables[0];
        this.loadTableColumns();
      });
  }

  private loadTableColumns() {
    const url = `${this.GET_TABLE_COLUMNS_URL}/${this.selectedTable.tableName}`;
    this.baseService.loadData(url, TableColumn)
      .subscribe((columns: TableColumn[]) => {
        this.selectedTable.columns = columns;
      });
  }

  onClickTable(table: Table) {
    this.selectedTable = table;
    if (!this.selectedTable.columns.length) {
      this.loadTableColumns();
    }
  }

  onCheckTable(table: Table) {
    table.isChecked = !table.isChecked;
  }

  isSemicolumnNeeded(columns: TableColumn[], index: number) {
    for (let i = index + 1; i < columns.length; i++) {
      if (columns[i].isChecked) {
        return true;
      }
    }
    return false;
  }

  isGenrateButtonDisabled() {
    return this.tables.reduce((isDisabled, table) => {
      return !table.isChecked && isDisabled;
    }, true);
  }

  onGenerateFiles() {
    this.spinner.show();

    const selectedTables: Table[] = this.tables.reduce((acc: Table[], table) => {
      if (table.isChecked) {
        table.columns = table.columns.filter(column => column.isChecked);
        acc.push(table);
      }
      return acc;
    }, []);

    this.baseService.loadFile(this.EXPORT_URL, selectedTables)
      .subscribe(({archive, filename}) => {
        download(archive, filename);
        this.spinner.hide();
      });
  }

}
