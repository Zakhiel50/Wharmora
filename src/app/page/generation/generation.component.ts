import { Component, Inject } from '@angular/core';
import { ManageDataService } from '../../services/manage-data.service';
import { Data } from '../../../utils/models/data.type';

@Component({
  selector: 'app-generation',
  standalone: true,
  imports: [],
  templateUrl: './generation.component.html',
  styleUrl: './generation.component.css'
})
export class GenerationComponent {

  constructor(private dataService: ManageDataService) {}

  ngOnInit(): void {
    const data = this.dataService.loadData();
    console.log('Loaded data:', data);
    if (data) {
    }
  }
    childData: any
}
