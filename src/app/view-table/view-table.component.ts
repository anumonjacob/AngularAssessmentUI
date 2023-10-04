import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { table } from '../Models/table';
import { TableService } from '../Service/table.service';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent {

  newTable: table = {
    name: '',
    type: '',
    premium: false,
    description: '',
    comment: '',
    id:'00000000-0000-0000-0000-000000000000'

  }
  constructor(private tableService:TableService,private router:Router,private route:ActivatedRoute){}
  id: any
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
    this.tableService.getTableById(this.id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.newTable = res
      },
      error: (e) => {
        alert("Error in Fetching Data")

      }
    })
  }
}
