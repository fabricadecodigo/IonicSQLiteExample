import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ProductProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into products (name, price, duedate, active, category_id) values (?, ?, ?, ?, ?)';
        let data = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update products set name = ?, price = ?, duedate = ?, active = ?, category_id = ? where id = ?';
        let data = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id, product.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from products where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from products where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let product = new Product();
              product.id = item.id;
              product.name = item.name;
              product.price = item.price;
              product.duedate = item.duedate;
              product.active = item.active;
              product.category_id = item.category_id;

              return product;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(active: boolean, name: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT p.*, c.name as category_name FROM products p inner join categories c on p.category_id = c.id where p.active = ?';
        var data: any[] = [active ? 1 : 0];

        // filtrando pelo nome
        if (name) {
          sql += ' and p.name like ?'
          data.push('%' + name + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let products: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var product = data.rows.item(i);
                products.push(product);
              }
              return products;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Product {
  id: number;
  name: string;
  price: number;
  duedate: Date;
  active: boolean;
  category_id: number;
}
