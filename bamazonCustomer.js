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
    tableOfProducts()
})

var totalPurchase = 0;

function tableOfProducts() {
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
        userMenu(res)
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
                console.log("\nThe ID that you are looking for is not available. Please Try Again!");
            }
        }, {
            type: "input",
            name: "productquantity",
            message: "How many of that product are you willing to buy?",

            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true
                }
                console.log("\nInvalid Input")
            }

        }]).then(function (answer) {
            //console.log(answer);

            if (answer.productquantity <= res[answer.productId - 1].Stock_quantity) {
                // return true;

                console.log("Great! you successfully added " + answer.productquantity + " " + res[answer.productId - 1].Product_name + " to your basket")
                totalPurchase += (res[answer.productId - 1].Price * answer.productquantity)
                
                connection.query("UPDATE products SET ? WHERE?",
                    [
                        {
                            Stock_quantity: res[answer.productId - 1].Stock_quantity - (answer.productquantity)
                        },
                        {
                            Product_name: res[answer.productId - 1].Product_name
                        }
                    ],

                );

                anotherPurchase()
            } else {
                console.log("we're sorry. Insufficient quantity!")
                anotherPurchase()
            }

        })
}

function anotherPurchase() {
    inquirer.prompt([
        {
            name: "userChoice",
            type: "list",
            message: "Would you like to place any other order?",
            choices: ["Yes", "No"]

        }
    ]).then(function (answer) {
        if (answer.userChoice === "Yes") {
            tableOfProducts();
        } else {
            console.log("Thank you for shopping at Bamazon! Your total purchase is: $", totalPurchase);
            connection.end();
        }
    })

}