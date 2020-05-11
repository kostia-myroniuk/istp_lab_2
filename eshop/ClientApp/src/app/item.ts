import { Category } from './category';
import { Manufacturer } from './manufacturer';

export class Item {
    constructor(
        public id?: number,
        public name?: string,
        public amount?: number,
        public price?: number,
        public categoryId?: number,
        public manufacturerId?: number,
        public category?: Category,
        public manufacturer?: Manufacturer
    ) { }
}