
export class PostgreConnectionData {
  constructor(data) {
    this.host = data.host;
    this.user = data.user;
    this.password = data.password;
    this.database = data.database;
  }
}
