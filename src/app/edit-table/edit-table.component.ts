import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { table } from '../Models/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../Service/table.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  @ViewChild('TableData') tableData!: NgForm;
  dropdownOptions: string[] = ["Coverage", "Form", "Policy", "Risk", "Schedule"];
  id: any
  newTable: table = {
    name: '',
    type: '',
    premium: false,
    description: '',
    comment: '',
    id: '00000000-0000-0000-0000-000000000000'

  }
  constructor(private tableService: TableService, private router: Router, private route: ActivatedRoute) { }

  capitalizeFirstLetter(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  getTableData(id:any) {
    this.tableService.getTableById(id).subscribe({
      next: (res) => {
        this.newTable = res
        this.newTable.type = this.capitalizeFirstLetter(this.newTable.type);
        if (this.newTable.type && !this.dropdownOptions.includes(this.newTable.type)) {
          this.dropdownOptions.push(this.newTable.type);
        }

      },
      error: (e) => {
        alert("Error In Getting Data")
        this.router.navigate(['/'])
      }
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getTableData(this.id)
  }

  updateTable() {

    if (this.tableData.valid) {

      if (!this.newTable.description) {
        this.newTable.description = this.newTable.name;
      }
      if (this.newTable.premium == false) {
        this.newTable.premium = 0
      }
      if (this.newTable.premium == true) {
        this.newTable.premium = 1
      }
      this.tableService.editTable(this.newTable).subscribe({
        next: (res) => {
          alert("Table Updated Successfully")
          this.getTableData(this.newTable.id);
          this.router.navigate(['/']);
        },
        error: (e) => {
          alert("Error in Adding New Table")
          this.getTableData(this.newTable.id);
        }
      })

    }
    else {
      alert("please Enter Required Fields")
    }

  }

}
