import { createDeepCopy } from "../functions/create-deep-copy";
import { TableColumn } from "./table-column";

export class Table {

  public tableName!: string;
  public columns: TableColumn[] = [];

  public isChecked = false;

  constructor(init: Partial<Table>) {
    if (init) {
      this.tableName = init.tableName || '';
      this.columns = init.columns ? createDeepCopy(init.columns, TableColumn) : [];
    }
  }

}
