
export class ErrorResponse {
  constructor(systemMessage, message) {
    this.systemMessage = systemMessage ? systemMessage : '';
    this.message = message ? message : '';
  }
}
