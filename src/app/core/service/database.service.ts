import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseName: string = 'contatos.db';
  db: SQLiteObject

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter) { }

  async openDatabase() {
    try {
      this.db = await this.sqlite.create({ name: this.databaseName, location: 'default' });
      await this.createDatabase();
    } catch (error) {
      console.error('Ocorreu um erro ao criar o banco de dados', error);
    }
  }

  private async createDatabase() {
    const sqlCreateDatabase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDatabase);
    return result ? true : false;
  }

  private getCreateTable() {
    const sqls = [];
    sqls.push('CREATE TABLE IF NOT EXISTS contacts (id integer primary key AUTOINCREMENT, name varchar(100));');
    return sqls.join('\n');
  }

  executeSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }

  executeSQLWithTransaction(sqlStatements: any[]) {
    return this.db.transaction((tx) => {
      sqlStatements.forEach((sqlStatement: any) => {
        tx.executeSql(sqlStatement.sql, sqlStatement.data);
      });
    });
  }
}
