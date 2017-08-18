import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class CategoryProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

      return db.executeSql('select * from categories', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let categories: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var category = data.rows.item(i);
              categories.push(category);
            }
            return categories;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}
