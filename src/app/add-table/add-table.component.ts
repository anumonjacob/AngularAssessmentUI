import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TableService } from '../Service/table.service';
import { table } from '../Models/table';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent {

  @ViewChild('TableData') tableData!: NgForm;
  constructor(private tableService: TableService, private router: Router) { }
  newTable: table = {
    name: '',
    type: '',
    premium: false,
    description: '',
    comment: '',
    id:'00000000-0000-0000-0000-000000000000'

  }

  resetForm() {
    this.tableData.resetForm();
    this.newTable = {
      name: '',
      type: '',
      premium: false,
      description: '',
      comment: '',
      id: '00000000-0000-0000-0000-000000000000'
    };
  }

  addTable() {

    if (this.tableData.valid) {
      
      if (!this.newTable.description) {
        this.newTable.description = this.newTable.name;
      }
      if(this.newTable.premium == false) {
        this.newTable.premium = 0
      }
      if(this.newTable.premium == true) {
        this.newTable.premium = 1
      }
      if (this.newTable && this.newTable.id) {
        delete this.newTable.id;
      }
      this.tableService.addTable(this.newTable).subscribe({
        next: (res) => {
          alert("Table Added Successfully")
          this.resetForm();
        },
        error: (e) => {
          alert("Error in Adding New Table")
          this.resetForm();
        }
      })

    }
    else {
      alert("please Enter Required Fields")
    }

  }

}
