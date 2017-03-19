import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
  stack: string[] = [];

  log(message: string) {
    this.stack.push(message);
  }

  clean() {
    this.stack = [];
  }
}