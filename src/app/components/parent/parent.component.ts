import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  tableData: any = []
  constructor(private dataService: DataService, private router: Router ){
    this.dataService.getElements().subscribe(data =>{
      this.tableData = data
    })
    console.log(this.tableData, 'sdja;sdlkfj;lkasjdf;lkajs;dlfkja')
  }

  goToTable(){
    this.router.navigate(['/table'],{
      state: {data: this.tableData}
    })
  }

  goToForm(){
    this.router.navigate(['/form'], {
      state: {data: this.tableData}
    })
  }

}
