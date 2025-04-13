import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'removeSlashes',
    standalone: true
})
export class RemoveSlashesPipe implements PipeTransform {
    transform(symbol: string): string {
        return symbol.replace(/-/g, '');
    }
}