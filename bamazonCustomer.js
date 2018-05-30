var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
    print()
})

function print() {
    connection.query("select * from products", function (err, res) {

        // instantiate
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'In Stock']
            , colWidths: [10, 12, 15, 10, 12]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].Item_id, res[i].Product_name, res[i].Department_name, res[i].Price, res[i].Stock_quantity]

            );
        }     

        console.log(table.toString());
        //console.log(res)
        userMenu()
    })
}

function userMenu(res) {
    inquirer.prompt([
        {
            type: "input",
            name: "productId",
            message: "Please enter the product ID that you would like to buy",

            validate: function (value) {
                if (isNaN(value) === false && value <= res.length && value > 0) {
                    return true;
                }
                console.log("The ID that you are looking for is not available. pLease Try Again!");
            }
        }, {
            type: "input",
            name: "productquantity",
            message: "How many of that product are you willing to buy?"
        }]).then(function (answer) {
            console.log(answer);
            
        })
}