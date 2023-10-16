import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UsersService } from '../users.service';
import { Users } from '../users';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  Users: Users[] = [];
  avatarPreview: string | ArrayBuffer | null | undefined;
  constructor(
    private _UserService: UsersService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  contactForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    email: new FormControl(null),
    lastName: new FormControl(null),
    phone: new FormControl(null),
    picture: new FormControl(null),
  });

  userId!: string;
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lastName: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });

    console.log(this.activatedRoute.snapshot.params['id']);

    this.userId = this.activatedRoute.snapshot.params['id'];
    if (this.userId) {
      this.getUserById(this.userId);
    }
  }

  getUserById(id: string) {
    this._UserService.getUserById(id).subscribe((user) => {
      console.log(user);
      this.contactForm.patchValue({
        firstName: user.firstName,
        email: user.email,
        lastName: user.lastName,
        phone: user.phone,
      });
    });
  }

  SubmitForm() {
    if (this.contactForm.invalid) return;

    console.log(this.contactForm.value);

    if (this.userId) {
      this._UserService
        .UpdateUser(this.contactForm.value, this.userId)
        .subscribe(
          (result) => {
            console.log(result);
            this.router.navigate(['/userlist']);
          },
          (err) => {
            alert('error occured');
          }
        );
    } else {
      this._UserService.addUser(this.contactForm.value).subscribe(
        (user) => {
          this.contactForm.reset();
          console.log(user);
          alert('added successfully');
          this.router.navigate(['/']);
        },
        (err) => {
          alert('error occured');
        }
      );
    }
  }
  handleAvatarUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Read and set the selected image as the preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
