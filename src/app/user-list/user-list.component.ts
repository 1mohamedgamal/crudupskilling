import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Users } from '../users';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  Users: Users[] = [];
  searchTerm: string = ''; // Search term variable

  // Pagination settings
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 2; // Number of items per page
  constructor(private _UserService: UsersService, private route: Router) {}

  ngOnInit(): void {
    this.GetAllUsers();
  }
  getPages(): number[] {
    const totalPages = Math.ceil(this.Users.length / this.itemsPerPage);
    return Array(totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  GetAllUsers() {
    this._UserService.getAllUsers().subscribe({
      next: (user: any) => {
        this.Users = user.data;
        console.log(user);
      },
    });
  }
  deleteUser(id: string) {
    this._UserService.deleteUser(id).subscribe((data) => {
      alert('user deleted ');
      this.GetAllUsers();
    });
  }

  updateUser(userId: string) {
    this.route.navigate(['/user/' + userId]);
  }
}
