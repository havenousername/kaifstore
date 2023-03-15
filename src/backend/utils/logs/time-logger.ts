import { ConsoleLogger } from '@nestjs/common';

export class TimeLogger extends ConsoleLogger {
  protected start: number | null = null;
  protected end: number | null = null;
  public startTime(message: any): void {
    this.start = new Date().getTime();
    this.log(`${message}. Started at ${this.start}`);
  }

  public endTime(message: any): void {
    this.end = new Date().getTime();
    if (!this.start) {
      this.start = this.end;
    }
    this.log(`${message}. Ended in ${this.end - this.start} ms`);
  }
}
