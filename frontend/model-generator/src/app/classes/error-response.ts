
export class ErrorResponse {

  public systemMessage!: string;
  public message!: string;

  constructor(init?: Partial<ErrorResponse>) {
    if (init) {
      this.systemMessage = init.systemMessage || '';
      this.message = init.message || '';
    }
  }

}
