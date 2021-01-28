
export class ExtractDbDataProps {
  constructor(processFn, sql, errMsg) {
    this.processFn = processFn;
    this.sql = sql;
    this.errMsg = errMsg;
  }
}
