import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  logInfo(message: any) {
    console.info(message);
  }
}
