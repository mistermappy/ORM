/*const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:nppsjuoll@localhost:5432/postgres')

let TestUser = sequelize.define('test_user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	}
});



  let sayHello = function(req, res, next){
			console.log('it works..');
			next()
  }

  let initialize = function(req, res, next){
			  sequelize.authenticate()
			  		   .then(()=>{
			 			console.log('connection to database successful!');
			 	});
			 next();
    }
			  /*.then(TestUser.sync()
			  	.then(()=>{
			  		TestUser.create({
			  			firstName: 'Jackson',
			  			lastName: 'Pollock0'
			  		});
			  		TestUser.create({
			  			firstName: 'Sylvia',
			  			lastName: 'Plath'
			  		});
			  		TestUser.create({
			  			firstName: 'Danaerys',
			  			lastName: 'Targaryen'
			  		})
			  	}))

   let getAll = function(req, res, next){
   			initialize();
			TestUser.findAll()
					 .then(function(rows){
					 	for(let i=0; i<rows.length; i++){
					 		let columnData = rows[i].dataValues;
					 		let firstName = columnData.firstName;
					 		let lastName = columnData.lastName;
					 		console.log(columnData, firstName, lastName)
					 	}
					 })
			next();
	}

app.use(sayHello);
app.use(initialize);
app.use(getAll);

app.get('/', function(req, res){
	res.send(200);
})

app.listen(port, function(){
	console.log(`listening on port ${port}`)
})*/

let express = require('express');
let app = express();
let port = process.env.PORT || 3001;
let orm = require('./orm-lite');
let connection = 'postgres://postgres:nppsjuoll@localhost:5432/postgres';
let Users = new orm(connection, process.argv[2] || 'test_users');

let getAll = function(req, res, next){
	Users.getAll(function(data){
	 	console.log(data);
  	});
	next();
}

let getByID = function(req, res, next){
	Users.findById(process.argv[3] || 1, function(data){
		console.log(data);
  	});
	next();
}

app.use(getAll);
app.use(getByID);

app.get('*', function(req, res) {
    res.send("Successfully logged data on console.");
});

app.listen(port, function () {
    console.log("App is listening on port " + port);
});