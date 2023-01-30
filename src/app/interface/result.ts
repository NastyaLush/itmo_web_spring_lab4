import {Conclusion} from "../enum/Conclusion";

export interface Result{
  x: number;
  y: number;
  r: number;
  result: Conclusion;
  date: Date;
  script_time: Number;
}
