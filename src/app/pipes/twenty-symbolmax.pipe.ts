import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'twenty_symbolmax',
    standalone: true
})
export class TwentySymbolMaxPipe implements PipeTransform {
    transform(text: string): string {
        if (text.length > 20) {
            return text.substring(0, 20) + '...'
        } else {
            return text;
        }
    }

}