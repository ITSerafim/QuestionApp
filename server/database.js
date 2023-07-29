const db = require("./db.instanse.js");

class Database {
  /**
   *
   * @param {{tableName: string, tableColumns: any}[]} tableConfigs
   *
   */
  init(tableConfigs) {
    return (
      this.#createTable() +
      " " +
      tableConfigs[0].tableName +
      " " +
      `(${this.#createTableColumns(tableConfigs[0].tableColumns)})`
    );
  }

  #createTable() {
    return `CREATE TABLE IF NOT EXIST`;
  }

  #createTableColumns(tableColumns) {
    let query = "";
    tableColumns.forEach((tableColumn) => {
      query += tableColumn.name;
      query += " ";
      query += tableColumn.type;
      query += " ";

      tableColumn.primaryKey && (query = `${query} "PRIMARY KEY"`);
      query += " ";
      tableColumn.autoIncrement && (query += `${query} AUTOINCREMENT`);
    });

    return query;
  }
}

module.exports = new Database();
