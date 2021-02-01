import { DatabaseTypes } from "../enums/database-types.enum";
import { ConnectionData } from "./connection-data";

export class TestConnection {

  public connectionData: any;
  public dbType: DatabaseTypes;

  constructor(connectionData: ConnectionData, dbType: DatabaseTypes) {
    this.connectionData = connectionData;
    this.dbType = dbType;
  }

}
