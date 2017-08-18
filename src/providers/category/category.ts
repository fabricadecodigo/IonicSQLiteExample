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
          return data.rows;
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}
