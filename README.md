# bamazon

The project was to use Node JS to create an Amazon-like storefront with the MySQL. The app will take in orders from customers and deplete stock from the store's inventory. I also programed this app to track product with low inventory and add new product to the table.

## Getting Started

Clone down repo.

Run command 'npm install' in Terminal or GitBash


## First Part

- will ask customers the ID of the product they would like to buy.
- how many units of the product they would like to buy.
- will check if the store has enough of the product to meet the customer's request.
- will show the customer the total cost of their purchase.

## demo1
![demo](demo.gif)

## Second Part

 Will ask the manager to choose from the following list:

- List a set of menu options:
- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product
    If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

    If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

    If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

    If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

## demo2
![demo](demo.gif)

## Built With

* [Javascript](https://www.javascript.com/) - programming language
* [Node.js](https://nodejs.org/en/) - javascript runtime

## NPM Packages

* [mysql](https://www.npmjs.com/package/mysql)
* [cli-table](https://www.npmjs.com/package/cli-table)
* [inquirer](https://www.npmjs.com/package/inquirer)

## Prerequisites

 -Node.js 

 -Download the latest version of Node https://nodejs.org/en/

## Built With

Visual Studio - Text Editor

## Author :key:
* **Sara Khosravi** - [saranasr83](https://github.com/saranasr83)