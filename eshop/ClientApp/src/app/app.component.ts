import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Manufacturer } from './manufacturer';
import { Category } from './category';
import { Item } from './item';
import { HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnInit {

    manufacturer: Manufacturer = new Manufacturer();
    manufacturers: Manufacturer[];
    tableMode: boolean = true;

    categories: Category[];
    category: Category = new Category();
    selectedCategory: Category = new Category();
    categoryTableMode: boolean = true;

    item: Item = new Item();
    items: Item[];
    itemTableMode: boolean = true;

    itemMode: boolean = true;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadManufacturers();
        this.loadCategories();
        this.loadItems();
    }

    loadManufacturers() {
        this.dataService.getManufacturers()
            .subscribe((data: Manufacturer[]) => this.manufacturers = data);
    }

    loadCategories() {
        this.dataService.getCategories()
            .subscribe((data: Category[]) => this.categories = data);
    }

    loadItems() {
        this.dataService.getItems()
            .subscribe((data: Item[]) => this.items = data);
    }

    selectCategory(c: Category) {
        if (!this.item?.id) {
            this.selectedCategory = c
        }
    }

    unselectCategory() {
        if (!this.item?.id) {
            this.selectedCategory = new Category();
        }
    }

    save() {
        if (this.manufacturer.id == null) {
            this.dataService.createManufacturer(this.manufacturer)
                .subscribe(
                    (data: HttpResponse<Manufacturer>) => {
                        this.manufacturers.push(data.body);
                    },
                    (error: HttpErrorResponse) => {
                        alert(`${error.error}`)
                    }
                );
        } else {
            this.dataService.updateManufacturer(this.manufacturer)
                .subscribe(
                    () => { this.loadManufacturers() },
                    error => { this.loadManufacturers(); alert(`${error.error}`) }
                );
        }
        this.cancel();
    }

    editManufacturer(p: Manufacturer) {
        this.manufacturer = p;
    }

    cancel() {
        this.manufacturer = new Manufacturer();
        this.tableMode = true;
        this.loadManufacturers();
    }

    delete(p: Manufacturer) {
        this.dataService.deleteManufacturer(p.id)
            .subscribe(data => this.loadManufacturers());
    }

    add() {
        this.cancel();
        this.tableMode = false;
    }

    itemSave() {
        if (this.item.id == null) {
            this.dataService.createItem(this.item)
                .subscribe(
                    (data: HttpResponse<Item>) => {
                        this.items.push(data.body);
                    },
                    (error: HttpErrorResponse) => {
                        alert(`${error.error}`);
                    }
                );
        }
        else {
            this.dataService.updateItem(this.item)
                .subscribe(
                    () => {
                        this.loadItems()
                    },
                    error => {
                        this.loadItems();
                        alert(`${error.error}`);
                    }
                );
        }
        this.itemCancel();
    }

    itemCancel() {
        this.item = new Item();
        this.itemTableMode = true;
        this.loadItems();
    }

    itemEdit(i: Item) {
        this.item = i;
    }

    itemAdd() {
        this.itemCancel();
        this.itemTableMode = false;
    }

    itemDelete(i: Item) {
        this.dataService.deleteItem(i.id)
            .subscribe(data => this.loadItems());
    }


    categorySave() {
        if (this.category.id == null) {
            this.dataService.createCategory(this.category)
                .subscribe(
                    (data: HttpResponse<Category>) => {
                        this.categories.push(data.body);
                    },
                    (error: HttpErrorResponse) => {
                        alert(`${error.error}`);
                    }
                );
        }
        else {
            this.dataService.updateCategory(this.category)
                .subscribe(
                    () => {
                        this.loadCategories()
                    },
                    error => {
                        this.loadCategories();
                        alert(`${error.error}`);
                    }
                );
        }
        this.categoryCancel();
    }

    categoryCancel() {
        this.category = new Category();
        this.categoryTableMode = true;
        this.loadCategories();
    }

    categoryEdit(c: Category) {
        this.category = c;
    }

    categoryAdd() {
        this.categoryCancel();
        this.categoryTableMode = false;
    }

    categoryDelete(c: Category) {
        this.dataService.deleteCategory(c.id)
            .subscribe(
                data => {
                    this.loadCategories();
                    this.selectedCategory = new Category();
                }
            );
    }

    turnItemMode() {
        this.itemMode = true;
        this.cancel();
    }
    turnManufacturerMode() {
        this.itemMode = false;
        this.categoryCancel();
        this.itemCancel();
    }

    findItemCategory(i: Item) {
        for (let c of this.categories) {
            if (i.categoryId == c.id) {
                return c.name;
            }
        }
        return "";
    }

    findItemManufacturer(i: Item) {
        for (let m of this.manufacturers) {
            if (i.manufacturerId == m.id) {
                return m.name;
            }
        }
        return "";
    }
}