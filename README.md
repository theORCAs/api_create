# Jimbo's Illegal Deli

Jimbo’s Illegal Deli (JID) is an online marketplace that brings together suppliers of black market items such as ivory and irresponsibly-sourced caviar and not-very-morally-good customers. You’ll find that JID has a limited inventory (20 items – `inventory.json`) and a small, but loyal customer base (5 customers – `deli_customer.json`). 

Jimbo uses a pretty outdated and manual system. He heard about APIs and wants to build his own APIs that will allow him to `GET/POST/PUT/DELETE/PATCH` objects in both the inventory and the customer json files. You have been hired to help him with this. 

Set-up: Clone the github repo: https://github.com/patrickreich/api_create onto your computer. In it, you’ll find the 2 json files, and an `index.js` file. For now, we are imagining that the json files are databases stored on a server somewhere (rather than text files on your computer that you update). `Index.js` is the main script which you will run, but you can make as many separate files as you like in the folder to help you. The chosen listening port is `8080`. You will need node installed on your computer and the `express` package in node. You can use whatever extra packages you need. 

You can check everything is running smoothly if you run the `node index` command in your terminal, which will run the application. Then type in `localhost:8080` in your browser, you should see `“Hello World”` pop up. For non-GET request testing, you can use any REST client like Insomnia, Postman, etc.

Now, what does Jimbo’s Deli need from you?

1.	Create an API endpoint that will allow you to retrieve the `first_name`, `last_name` and `email` of each customer from the database.
2.	As you can see, the `last_transactions` are not ordered for the customers, please make an endpoint that retrieves, orders and then writes these transactions in the right order to the database. 
3.	Create an endpoint that can add orders (update both databases).


Instructions: There have been 2 new orders, please update all respective fields in both databases:

··* a.	Customer with `id = 4` (probably a Colombian chef) has gone and made a purchase of `12 dolphins` and `4 truffles`
··* b.	Customer with `id = 1` (probably Dan Bilzerian’s long-lost cousin) has bought `1 helicopter`, `5 AK47s`, `3 cocaines`  
4.	Due to COVID-19, all suppliers that were dealing in `Yuan Renminbi` have decided to switch to `Euro`. No one actually knows why, they just sorta decided to. But anyway, write a script that will retrieve the right objects, update and write them back to the database.
5.	Lastly, for this year, we are adding a new item to our menu, it’s `hand_sanitizer`. It’ll be supplied by the same exact supplier as `toilet_paper`. We’ll order `500`, with a `10.00` price tag. Color will be `green`, hex: `#302`.

Thank you very much for your help. You have 1 week to complete the task. 
