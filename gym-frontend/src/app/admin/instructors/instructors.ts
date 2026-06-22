import { Component, inject, OnInit , ChangeDetectorRef} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import { Route, RouterLink } from '@angular/router';

import { Instructor } from './instructors.model';
import { InstructorService } from '../../core/services/instructor.service';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './instructors.html',
  styleUrl: './instructors.css'
})
export class InstructorsComponent implements OnInit {

  private fb = inject(FormBuilder);
  private instructorService = inject(InstructorService);
  private cdr = inject(ChangeDetectorRef);

  showForm = false;
  isEditMode = false;
  searchText='';

  instructors: Instructor[] = [];
  filteredInstructors: Instructor[]=[];

  selectedMemberId = '';

  ngOnInit(): void {
    this.loadInstructors();
  }

  instructorForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]
    ],
    age: [18, Validators.required],
    experience:[1,Validators.required],
    gender: ['Male', Validators.required],
    address: ['', Validators.required],
  });

  loadInstructors() {
    // console.log("Inside load members");
    this.instructorService
      .getInstructors()
      .subscribe({

        next: (data) => {
          // console.log('Members Loaded', data);
          this.instructors = [...data];
          this.filteredInstructors = [...data];
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  searchInstructors(){
    // console.log("I am here")
    const search = this.searchText.toLowerCase();

    this.filteredInstructors = this.instructors.filter(instructors =>

      instructors.name.toLowerCase().includes(search) ||

      instructors.phone.includes(search) ||

      instructors.email.toLowerCase().includes(search)

  );
  this.cdr.detectChanges();
  // console.log(this.filteredMembers);
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.resetForm();
  }

  addInstructor() {

    if (this.instructorForm.invalid) {

      this.instructorForm.markAllAsTouched();

      return;
    }

    const instructor = this.instructorForm.value as Instructor;

    if (this.isEditMode) {

      this.instructorService
        .updateInstructor(
          this.selectedMemberId,
          instructor
        )
        .subscribe({

          next: () => {

            this.loadInstructors();

            this.resetForm();
            this.cdr.detectChanges();

          },

          error: (err) => {

            console.error(err);

          }

        });

    } else {

      this.instructorService
        .addInstructor(instructor)
        .subscribe({

          next: () => {

            this.loadInstructors();

            this.resetForm();
            this.cdr.detectChanges();

          },

          error: (err) => {

            console.error(err);

          }

        });

    }

  }

  editInstructor(index: number) {

    const member = this.instructors[index];

    this.selectedMemberId = member._id!;

    this.instructorForm.patchValue({

      name: member.name,
      email: member.email,
      phone: member.phone,
      age: member.age,
      experience: member.experience,
      gender: member.gender,
      address: member.address
    });

    this.showForm = true;

    this.isEditMode = true;
    // this.cdr.detectChanges();
  }

  deleteInstructor(index: number) {

    const confirmed = confirm(
      'Are you sure you want to delete this member?'
    );

    if (!confirmed) return;

    const member = this.instructors[index];

    this.instructorService
      .deleteInstructor(member._id!)
      .subscribe({

        next: () => {

          this.loadInstructors();
          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  resetForm() {

    this.instructorForm.reset({

      gender: 'Male',

    });

    this.showForm = false;

    this.isEditMode = false;

    this.selectedMemberId = '';

  }

}