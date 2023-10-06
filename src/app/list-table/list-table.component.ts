import { Component, OnInit } from '@angular/core';
import { TableService } from '../Service/table.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {


  filteredTables: any = [];
  lengthofData = 0;
  totalLength: number = 0;
  searchText: string = '';
  typeCheckbox1: boolean = false;
  typeCheckbox2: boolean = false;
  typeCheckbox3: boolean = false;
  typeCheckbox4: boolean = false;
  typeCheckbox5: boolean = false;


  page: number = 1
  tables: any
  constructor(private tableservice: TableService) { }
  ngOnInit(): void {
    this.loadForms()
  }

  async loadForms() {
    this.tableservice.getTables().subscribe({
      next: (res) => {
        this.tables = res
        console.log(this.tables)
        this.filterTables();

      },
      error: (e) => {
        alert("Error in getting Table data")

      }
    })
  }




  searchByNumber: boolean = false;
  filterTables() {
    this.filteredTables = this.tables.filter((table: any) => {
      const searchTextLower = this.searchText.toLowerCase();
      const nameMatch = !this.searchByNumber && (!this.searchText || (table.name && table.name.toLowerCase().includes(searchTextLower)) || this.matchesWildcard(table.name, searchTextLower));
      const noTypeSelected = !this.typeCheckbox1 && !this.typeCheckbox2 && !this.typeCheckbox3 && !this.typeCheckbox4 && !this.typeCheckbox5;

      if ((nameMatch) && (noTypeSelected || (this.typeCheckbox1 && table.type.toLowerCase() === 'coverage') || (this.typeCheckbox2 && table.type.toLowerCase() === 'form') || (this.typeCheckbox3 && table.type.toLowerCase() === 'policy') || (this.typeCheckbox4 && table.type.toLowerCase() === 'risk') || (this.typeCheckbox5 && table.type.toLowerCase() === 'schedule'))) {
        return true;
      }

      return false;
    });

    this.totalLength = this.filteredTables.length;
    this.page = 1;

  }

  matchesWildcard(input: string, searchText: string): boolean {
    const pattern = searchText.replace(/%/g, '.*');
    const regex = new RegExp(`^${pattern}$`, 'i');
    return regex.test(input);
  }

  clearAllCheckboxes() {
    this.typeCheckbox1 = false;
    this.typeCheckbox2 = false;
    this.typeCheckbox3 = false;
    this.typeCheckbox4 = false;
    this.typeCheckbox5 = false;
  }


  toggleAllCheckboxes() {
    this.typeCheckbox1 = true;
    this.typeCheckbox2 = true;
    this.typeCheckbox3 = true;
    this.typeCheckbox4 = true;
    this.typeCheckbox5 = true;
  }

  deleteForm(id: any) {
    const confirmDelete = confirm('Are you sure you want to delete this Table?');

    if (confirmDelete) {
      this.tableservice.deleteTable(id).subscribe({
        next: (response) => {
          alert("Form deleted successfully")


          this.loadForms()
        },
        error: (e) => {
          alert("Error In Deleting Form Page")

        }

      });
    }

  }
}
