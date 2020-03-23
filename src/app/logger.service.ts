import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoggerService {

  private logs: Array<Log> = new Array();
  public logChanged$ = new BehaviorSubject<Array<Log>>(this.logs);

  constructor() { 
    // super();
    // console = this;
  }

  public error(component: string, fn: string, message: string, severity: LogSeverity = 'error'){
    this.logs.push({
      component: component,
      fn: fn,
      message: message,
      severity: severity,
      date: new Date()
    })

    return message;
  }

  public log(component: string, fn: string, message: string, severity: LogSeverity = 'log'){
    // const caller = arguments.callee.caller.toString();
    this.logs.push({
      component: component,
      fn: fn,
      message: message,
      severity: severity,
      date: new Date()
    })

    return message;
  }

  public clear() {
    this.logs = [];
    this.logChanged$.next(this.logs);
  }

}

interface Log {
  message: string;
  component: string;
  fn: string;
  severity: LogSeverity;
  date: Date;
}

type LogSeverity = 'log' | 'warn' | 'error';