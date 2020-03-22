import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, searchKey: string): any {
    if(!items) return [];
    if(!searchText) return items;
    if(!searchKey) return items;

    searchText = searchText.toLowerCase();

    let foundItems = items.filter(item => item[searchKey].toLowerCase().indexOf(searchText) > -1);
    return foundItems;
  }

}