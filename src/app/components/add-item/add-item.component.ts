import { IItem } from './../../models/IItem';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item: IItem = {
    title: '',
    description: ''
  }

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  resetForm(): void {
    this.item = {
      title: '',
      description: ''
    }
  }

  onSubmit() {
    this.itemService.addItem(this.item);
    this.resetForm();
  }

}
