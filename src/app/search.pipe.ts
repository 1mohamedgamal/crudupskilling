import { Pipe, PipeTransform } from '@angular/core';
import { Users } from './users';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(users: Users[], searchTerm: string): Users[] {
    return users.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

