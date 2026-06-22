import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SchemeService } from '../../core/services/scheme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-schemes',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './schemes.html',
  styleUrls: ['./schemes.css']
})
export class SchemesComponent implements OnInit {

  schemes: any[] = [];

  newScheme = {
    name: '',
    price: 0,
    durationInMonths: 1,
    features: '',
    status: 'Active'
  };

  showForm = false;

  constructor(
    private schemeService: SchemeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSchemes();
  }

  loadSchemes() {
    this.schemeService.getSchemes().subscribe((res: any) => {
      this.schemes = res;
      this.cdr.detectChanges();
    });
  }

  addScheme() {
    const payload = {
      ...this.newScheme,
      features: this.newScheme.features.split(',') // convert string to array
    };

    this.schemeService.addScheme(payload).subscribe(() => {
      this.loadSchemes();
      this.resetForm();
      this.showForm = false;
      this.cdr.detectChanges();
    });
  }

  deleteScheme(id: string) {
    this.schemeService.deleteScheme(id).subscribe(() => {
      this.loadSchemes();
      this.cdr.detectChanges();
    });
  }

  resetForm() {
    this.newScheme = {
      name: '',
      price: 0,
      durationInMonths: 1,
      features: '',
      status: 'Active'
    };
  }
}