import {Result} from "./result";

export interface CustomResponse{
  status:String;
  statusCode:Number;
  message:String;
  data:{results: Result[], result?: Result}
}
