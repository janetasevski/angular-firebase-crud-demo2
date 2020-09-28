import { IItem } from './../../models/IItem';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: IItem[];
  editState: boolean = false;
  itemToEdit: IItem;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    })
  }

  deleteItem(item: IItem) {
    this.itemService.deleteItem(item.id);
  }

  editItem(item: IItem) {
    this.editState = true;
    this.itemToEdit = item;
  }

  updateItem(item: IItem) {
    this.itemService.updateItem(item);
    this.editState = false;
    this.itemToEdit = undefined;
  }

}
