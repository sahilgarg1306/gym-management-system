import { Component, inject, OnInit , ChangeDetectorRef} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import { Route, RouterLink } from '@angular/router';
import { Member } from './members.model';
import { MemberService } from '../../core/services/member.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink,DatePipe],
  templateUrl: './members.html',
  styleUrl: './members.css'
})
export class MembersComponent implements OnInit {

  private fb = inject(FormBuilder);
  private memberService = inject(MemberService);
  private cdr = inject(ChangeDetectorRef);

  showForm = false;
  isEditMode = false;
  searchText='';

  members: Member[] = [];
  filteredMembers: Member[]=[];

  selectedMemberId = '';

  ngOnInit(): void {
    this.loadMembers();
  }

  memberForm = this.fb.group({
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
    gender: ['Male', Validators.required],
    address: ['', Validators.required],
    joiningDate: ['', Validators.required],
    plan: ['Gold', Validators.required],
    status: ['Active']
  });

  loadMembers() {
    // console.log("Inside load members");
    this.memberService
      .getMembers()
      .subscribe({

        next: (data) => {
          // console.log('Members Loaded', data);
          this.members = [...data];
          this.filteredMembers = [...data];
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  searchMembers(){
    // console.log("I am here")
    const search = this.searchText.toLowerCase();

    this.filteredMembers = this.members.filter(member =>

      member.name.toLowerCase().includes(search) ||

      member.phone.includes(search) ||

      member.email.toLowerCase().includes(search) ||

      member.plan.toLowerCase().includes(search)

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

  renewMembership(id: string) {

  this.memberService
      .renewMembership(id)
      .subscribe(() => {

        this.loadMembers();
        this.cdr.detectChanges();
      });

}

  addMember() {

    if (this.memberForm.invalid) {

      this.memberForm.markAllAsTouched();

      return;
    }

    const member = this.memberForm.value as Member;

    if (this.isEditMode) {

      this.memberService
        .updateMember(
          this.selectedMemberId,
          member
        )
        .subscribe({

          next: () => {

            this.loadMembers();

            this.resetForm();

          },

          error: (err) => {

            console.error(err);

          }

        });

    } else {

      this.memberService
        .addMember(member)
        .subscribe({

          next: () => {

            this.loadMembers();

            this.resetForm();

          },

          error: (err) => {

            console.error(err);

          }

        });

    }

  }

  editMember(index: number) {

    const member = this.members[index];

    this.selectedMemberId = member._id!;

    this.memberForm.patchValue({

      name: member.name,
      email: member.email,
      phone: member.phone,
      age: member.age,
      gender: member.gender,
      address: member.address,
      joiningDate: member.joiningDate,
      plan: member.plan,
      status: member.status

    });

    this.showForm = true;

    this.isEditMode = true;
  }

  resetForm() {

    this.memberForm.reset({

      gender: 'Male',
      plan: 'Gold',
      status: 'Active'

    });

    this.showForm = false;

    this.isEditMode = false;

    this.selectedMemberId = '';

  }

}