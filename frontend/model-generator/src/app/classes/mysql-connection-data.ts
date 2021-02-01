import { ConnectionData } from "./connection-data";

export class MySQLConnectionData implements ConnectionData {

  public host!: string;
  public user!: string;
  public password!: string;
  public database!: string;

  constructor(init: Partial<MySQLConnectionData>) {
    if (init) {
      this.host = init.host || '';
      this.user = init.user || '';
      this.password = init.password || '';
      this.database = init.database || '';
    }
  }

}
