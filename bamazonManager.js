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
    managerMenu()
})

function managerMenu() {
    inquirer.prompt([
        {
            name: "managerChoice",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }
    ]).then(function (answer) {
        switch (answer.managerChoice) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                checkInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            default:
                connection.end();
        }
    })
}

function availableProducts() {
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
        managerMenu();
    })
}

// If a manager selects View Products for Sale, the app should list every 
//available item: the item IDs, names, prices, and quantities.
function viewProducts() {
    console.log("**************************************************")
    availableProducts();
}

// If a manager selects View Low Inventory, then it should list all items with an 
//inventory count lower than five.
function checkInventory() {
    console.log("**************************************************")
    connection.query("select * from products", function (err, res) {

        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'In Stock']
            , colWidths: [10, 12, 15, 10, 12]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for (var i = 0; i < res.length; i++) {
            if (res[i].Stock_quantity < 10) {

                table.push(
                    [res[i].Item_id, res[i].Product_name, res[i].Department_name, res[i].Price, res[i].Stock_quantity]
                );
            }
        }
        console.log(table.toString());
        managerMenu();
    })
}
// If a manager selects Add to Inventory, your app should display a prompt 
//that will let the manager "add more" of any item currently in the store.
function addToInventory(res) {
    inquirer.prompt([
        {
            name: "addToItemId",
            type: "input",
            message: "Which product do you want to add to (enter the ID)?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log("\nInvalid Input. Please try again!")
            }
        },
        {
            name: "quantityOfItem",
            type: "input",
            message: "How many of that product would you like to add to inventory?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log("\nInvalid Input. Please try again!")
            }
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products where ?",
            {
                Item_id: answer.addToItemId
                
            }, function (err, res) {

                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            Stock_quantity: parseInt(res[0].Stock_quantity) + parseInt(answer.quantityOfItem)
                        },
                        {
                            Item_id: answer.addToItemId
                        }
                    ],
                    function (err) {
                        if (err) {
                            console.log("err", err);
                            throw err;
                        } else {
                            console.log(res[0].Product_name + " products updated!\n");
                            managerMenu();
                        }

                    }
                )
            })

    })
}

// If a manager selects Add New Product, it should allow the manager to add 
//a completely new product to the store.
function addNewProduct() {
    inquirer.prompt([
        {
            name: "productName",
            type: "input",
            message: "What is the name of the product you would like to add?"
        },
        {
            name: "department",
            type: "list",
            message: "Which department does this product fall into?",
            choices: ["electronic", "outdoor", "shoe", "sport", "accessories", "makeup"]
        },
        {
            name: "price",
            type: "input",
            message: "how much does it cost?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log("\nInvalid Input. Please try again!")
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many do we have?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log("\nInvalid Input. Please try again!")
            }
        }

    ]).then(function (answer) {
        //console.log(answer);
        connection.query("INSERT INTO products SET ?",
            {
                Product_name: answer.productName,
                Department_name: answer.department,
                Price: answer.price,
                Stock_quantity: answer.quantity

            },
            function (err, res) {
                if (err) {
                    throw err;
                } else {
                    console.log(res.affectedRows + " product inserted!\n");

                    managerMenu();
                }
            }
        )
    })
}