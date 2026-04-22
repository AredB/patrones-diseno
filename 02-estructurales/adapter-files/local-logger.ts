import { COLORS } from "../../helpers/colors.ts";

export class LocalLogger {
  constructor(private file: string) {}

  writeLog(mesg: string): void {
    console.log(`[${this.file} Log] ${mesg}`);
  }

  writeError(mesg: string): void {
    console.log(`[${this.file} Error] %c${mesg}`, COLORS.red);
  }

  writeWarning(mesg: string): void {
    console.log(`[${this.file} Warning] %c${mesg}`, COLORS.yellow);
  }
}
