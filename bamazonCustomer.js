var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    userMenu()
})

function userMenu() {
    inquirer.prompt([
        {
            type:"input",
            name:"productId",
            message:"Please enter the product ID that you would like to buy"
       }, {
            type:"input",
            name: "productquantity",
            message: "How many of that product are you willing to buy?"
        }]).then(function(answer){
            console.log(answer);
        })
}