export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export class MyError {
  status: number;
  message: string | string[];
  name: string;
  data: object | null;
  statusText: string;

  constructor(status:number, message: string | string[]){
    this.status=status
    this.message=message
  }
}