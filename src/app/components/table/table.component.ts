import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { OnInit } from '@angular/core'; 

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule, FormComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  elements: any = []; // This will hold the data for the table
  selectedItem: any; // Holds the selected item
  passedData: any; // Holds the passed data

  constructor(private dataService: DataService, private router: Router) {
    // Load data from service on initialization
    this.dataService.getElements().subscribe(data => {
      this.elements = data;
    });
    //Retrive the data passed via navigation state
   const navigation = this.router.getCurrentNavigation()
   this.passedData = navigation?.extras.state?.['data']
    console.log(this.passedData, 'alsd;kfj;aslkdf')
  }

  ngOnInit(): void {
    
  }

  


  // Method to select an item and pass it to the child
  selectItem(item: any): void {
    this.selectedItem = item;
  }

  // Handle event from the child component when the item is added or updated
  onItemUpdated(updatedItem: any): void {
    const index = this.elements.findIndex((item: { id: any; }) => item.id === updatedItem.id);
    if (index !== -1) {
      this.elements[index] = updatedItem; // Update the item if it exists
    } else {
      this.elements.push(updatedItem); // Add new item if it doesn't exist
    }
    this.dataService.updateElement(updatedItem); // Update the data service with new element
  }
}
