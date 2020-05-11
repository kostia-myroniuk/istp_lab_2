import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manufacturer } from './manufacturer';
import { Category } from './category';
import { Item } from './item';


@Injectable()
export class DataService {

    private manufacturerUrl = "/api/manufacturers";
    private categoryUrl = '/api/categories';
    private itemUrl = 'api/items';

    constructor(private http: HttpClient) {
    }

    // Manufacturers
    getManufacturers() {
        return this.http.get(this.manufacturerUrl);
    }

    getManufacturer(id: number) {
        return this.http.get(this.manufacturerUrl + '/' + id);
    }

    createManufacturer(manufacturer: Manufacturer) {
        return this.http.post(this.manufacturerUrl, manufacturer, { observe: 'response' });
    }

    updateManufacturer(manufacturer: Manufacturer) {

        return this.http.put(this.manufacturerUrl + '/' + manufacturer?.id, manufacturer, { observe : 'response' });
    }

    deleteManufacturer(id: number) {
        return this.http.delete(this.manufacturerUrl + '/' + id);
    }

    // Categories
    getCategories() {
        return this.http.get(this.categoryUrl);
    }

    getCategory(id: number) {
        return this.http.get(this.categoryUrl + '/' + id);
    }

    createCategory(category: Category) {
        return this.http.post(this.categoryUrl, category, { observe: 'response' });
    }

    updateCategory(category: Category) {
        return this.http.put(this.categoryUrl + '/' + category?.id, category, { observe: 'response' });
    }

    deleteCategory(id: number) {
        return this.http.delete(this.categoryUrl + '/' + id);
    }

    // Items
    getItems() {
        return this.http.get(this.itemUrl);
    }

    getItem(id: number) {
        return this.http.get(this.itemUrl + '/' + id);
    }

    createItem(item: Item) {
        return this.http.post(this.itemUrl, item, { observe: 'response' });
    }

    updateItem(item: Item) {
        return this.http.put(this.itemUrl + '/' + item?.id, item, { observe: 'response' });
    }

    deleteItem(id: number) {
        return this.http.delete(this.itemUrl + '/' + id);
    }
}