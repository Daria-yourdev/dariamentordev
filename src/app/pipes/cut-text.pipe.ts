import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'cutText',
    standalone: true
})
export class TwentySymbolMaxPipe implements PipeTransform {
    transform(text: string): string {
        return text.length > 17 ? text.substring(0, 17) + '...' : text;
    }
}