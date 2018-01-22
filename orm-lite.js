const Sequelize = require('sequelize');
let connection = 'postgres://postgres:nppsjuoll@localhost:5432/postgres';

class Orm{
  constructor(connection, table){
    this.table = table;
    this.sequelize = this.initialize(connection),
    this.model = this.model(this.table);
    this.authentication = this.authentication();
  }

  initialize(connection){
    return new Sequelize(connection);
  }

  authentication(){
    this.sequelize.authenticate()
    .then(() => {
      console.log('Successfully connected to database..');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  }

  model(table){
    console.log('Creating '+ table);
    return this.sequelize.define(table, {
    	firstname: Sequelize.STRING,
    	lastname: Sequelize.STRING
    },
    {freezeTableName: true});
  }

  getAll(callback){
    this.model.sync();
    this.model.findAll().then(function(rows) {
       let data = [];
       for(let i = 0; i < rows.length; i++) {
         data.push(rows[i].dataValues);
       }
       return callback(data);
    });
  }

  findById(id, callback){
    this.model.findAll({
      where: {
        id: id
      }
    }).then(function(rows) {
       let data = [];
       for(let i = 0; i < rows.length; i++) {
         data.push(rows[i].dataValues);
       }
       return callback(data);
    });
  }
}

module.exports = Orm;