export class SuccessResponse {
  data: object;
  message: string;
  statusCode: number;
  constructor(data: object, message = 'success', status = 201) {
    this.data = data;
    this.message = message;
    this.statusCode = status;
  }
}
export class SuccessArrayResponse {
  data: object[];
  message: string;
  statusCode: number;
  constructor(data: object[], message = 'success', status = 201) {
    this.data = data;
    this.message = message;
    this.statusCode = status;
  }
}
