// src/app/components/form/form.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnChanges, OnInit {
  @Input() selectedItem: any; // Input from parent (TableComponent)
  @Output() itemUpdated = new EventEmitter<any>(); // Emit event to parent when item is updated

  form: FormGroup;
  passedData: any;
  routerSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.form = this.fb.group({
      name: '',
      symbol: '',
      weight: '',
    });

    //Retrive the data passed via navigation state
   const navigation = this.router.getCurrentNavigation()
   this.passedData = navigation?.extras.state?.['data']
   console.log(this.passedData, 'asdf;jlkaseyrti365')
  }

  ngOnInit(): void {
    if (this.selectedItem) {
      this.form.patchValue(this.selectedItem);
      // this.routerSubscription = this.router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd) {
      //     const navigation = this.router.getCurrentNavigation();
      //     this.passedData = navigation?.extras.state?.['data'];
      //   }
      // });
    }
  }

  // Listen for changes to the selectedItem input property
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem'] && this.selectedItem) {
      this.form.patchValue(this.selectedItem);
    } else if (changes['selectedItem'] && !this.selectedItem) {
      this.form.reset(); // Reset for adding new item
    }
  }

  onSubmit(): void {
    if (this.form.valid) {  // Check if form is valid before emitting
      const updatedItem = {
        ...this.form.value,
        id: this.selectedItem ? this.selectedItem.id : Date.now(), // Generate ID for new items
      };

      this.itemUpdated.emit(updatedItem);// Emit the updated item back to the parent component
      this.dataService.addElement(updatedItem)
      this.router.navigate(['/table'],{
        state: {data: this.passedData}
      })
    }
  }
}

