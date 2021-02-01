
export class TableColumn {

  public columnName!: string;
  public columnKey!: string;
  public dataType!: string;

  public isChecked = true;

  constructor(init?: Partial<TableColumn>) {
    if (init) {
      this.columnName = init.columnName || '';
      this.columnKey = init.columnKey || '';
      this.dataType = init.dataType || '';
    }
  }

}
