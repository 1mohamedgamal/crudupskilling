import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Users } from '../users';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class UserListComponent implements OnInit {
  Users: Users[] = [];
  searchTerm: string = ''; // Search term variable

  currentPage: number = 1; // Current page number
  itemsPerPage: number = 2; // Number of items per page

  constructor(
    private _UserService: UsersService,
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

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
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // User confirmed, perform the delete operation here
        this._UserService.deleteUser(id).subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'User deleted successfully',
          });
          this.GetAllUsers();
        });
      },
      reject: (type :any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You cancel this ',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  updateUser(userId: string) {
    this.route.navigate(['/user/' + userId]);
  }
}
