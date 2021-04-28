import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'stringTrim'
})

export class StringTrimPipe implements PipeTransform {
  transform(string: string) {
    return string.trim()
  }
}
