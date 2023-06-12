// app.js

/*
    SETUP
*/
//database

const express = require('express');   // We are using the express library for the web server
const app     = express();            // We need to instantiate an express object to interact with the server in our code
const db = require('./database/db-connector')
const PORT        = 35489;                 // Set a port number at the top so it's easy to change in the future


const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


app.use(express.json())
app.use(express.urlencoded({extended: true}))  //lines 8-10 added because of step 5 github
app.use(express.static('public'))

/*
    ROUTES
*/


// -------------------------------- GET ------------------------------------


// app.get('/', function(req, res)
// {
//     res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
// });                                         // will process this file, before sending the finished HTML to the client.

//GET Index page
app.get('/', function(req, res)
    {  
            res.render('index');                  // Render the index.hbs file, and also send the renderer
    });                                                         // received back from the query

//GET Employees Page
app.get('/employees', function(req, res)
    {  
        let query1 = "SELECT * FROM Employees;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('employees', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


    //GET CUSTOMER TABLE FUNCTION
app.get('/customers', function(req, res)
{  
    let query1 = "SELECT * FROM Customers;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


//GET Product Page
app.get('/products', function(req, res)
    {  
        let query1 = "SELECT * FROM CUSTOMERS;";
        
        if (req.query.pname === undefined)
        {
            query1 = "SELECT * FROM Products;";
        }

        else
        {
            query1 = `SELECT * FROM Products WHERE productName LIKE "${req.query.pname}%"`
        }

                                                       // an object where 'data' is equal to the 'rows' we
    });   

//GET Vendors Page
app.get('/vendors', function(req, res)
    {  
        let query1 = "SELECT * FROM Vendors;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('vendors', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });  

//GET Employees Page
app.get('/salesInvoices', function(req, res)
    {  
        let query1 = "SELECT * FROM SalesInvoices;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('salesInvoices', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query
app.get('/salesInvoice', function(req, res){
    let query1 = `SELECT
                SalesInvoices.idSalesInvoice,
                SalesInvoices.orderQuantity,
                SalesInvoices.salesDate,
                Products.productName,
                Products.retailPrice,
                Customers.firstName,
                Customers.lastName,
                Employees.idEmployee
                FROM
                    SalesInvoices
                INNER JOIN
                    Products ON SalesInvoices.productName = Products.productName
                INNER JOIN
                    Products ON SalesInvoices.retailPrice = Products.retailPrice
                INNER JOIN
                    Customers ON SalesInvoices.firstName = Customers.firstName
                INNER JOIN
                    Customers ON SalesInvoices.lastName = Customers.lastName
                INNER JOIN
                    Employees ON SalesInvoices.idEmployee = Employees.idEmployee
                ORDER BY
                    SalesInvoices.salesDate DESC;`;

    
    
        db.pool.query(query1, (error, rows, fields) => {

            // db.pool.query(query3, (error, rows, fields) => {
            //     let orders = rows;
            //     console.log(orders)
                return res.render('salesInvoices', {data: rows})
            })
        }) 

// -------------------------------- POST ------------------------------------

//AJAX ADD Employee FUNCTION
app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;



    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (firstName, lastName, email, phoneNumber) VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.phoneNumber}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



//AJAX ADD customer FUNCTION
app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (firstName, lastName, address) VALUES ('${data.firstName}', '${data.lastName}','${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

//AJAX ADD Product FUNCTION
app.post('/add-product-ajax', function(req, res) {
    //capture data
    let data = req.body;

    //if null, set value to 'NULL'
    // let locationName = parseInt(data.locationName);
    // if (isNaN(locationName))
    // {
    //     locationName = 'NULL'
    // }

    //query
    query1 = `INSERT INTO Products (productName, wholesalePrice, retailPrice) VALUES 
    ('${data.productName}', '${data.wholesalePrice}', '${data.retailPrice}')`;

    db.pool.query(query1, function(error, rows, fields){
        //Check whether our insert query worked or not, if it worked, let's update the data being displayed
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            // If there was no error, perform a SELECT * on Products - this way can send all the valus back
            //this basically "updates" the table for display
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function(error, rows, fields){
                //if our query2 had an error, send error message 400
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                // if it succeeded, let's send all the data back to be displayed
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-salesInvoice-ajax', function (req, res) {
    let data = req.body;

    let query = `INSERT INTO SalesInvoice (
        orderQuantity,
        productName,
        salesDate,
        retailPrice,
        firstName,
        lastName,
        idEmployee
    ) VALUES (
        '${data['input-orderQuantity']}',
        '${data['input-productName']}',
        '${data['input-salesDate']}',
        '${data['input-retailPrice']}',
        '${data['input-firstName']}',
        '${data['input-lastName']}',
        '${data['input-idEmployee']}'
    )`;

    db.pool.query(query, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let newRow = rows[rows.length - 1];
            res.send(JSON.stringify(newRow));
        }
    });
});



// AJAX UPDATE VENDOR FUNCTION
app.put('/update-vendor-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
  
    // Create the query and run it on the database
    query1 = `UPDATE Vendors SET vendorAddress = '${data.vendorAddress}' WHERE idVendor = '${data.idVendor}'`;
    db.pool.query(query1, function(error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        // If there was no error, perform a SELECT * on Vendors to get the updated row
        query2 = `SELECT * FROM Vendors WHERE idVendor = '${data.idVendor}'`;
        db.pool.query(query2, function(error, rows, fields) {
          // If there was an error on the second query, send a 400
          if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
          } else {
            res.send(rows);
          }
        });
      }
    });
  });
  


//AJAX ADD customer FUNCTION
app.post('/add-salesInvoice-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO SalesInvoices (orderQuantity, productPrice, salesDate) VALUES ('${data.orderQuantity}', '${data.productPrice}','${data.salesDate}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM SalesInvoices;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let idEmployee = parseInt(data.idEmployee);
    // let deleteProductSales = `DELETE FROM ProductSales WHERE idEmployee = ?`;
    let deleteEmployee= `DELETE FROM Employees WHERE idEmployee = '${idEmployee}'`;
    let deleteProductSales = `DELETE FROM SalesInvoices WHERE idEmployee = '${idEmployee}'`;
    console.log("Employee ID = ",idEmployee)
    console.log("data is ", data)
  
          // Run the 1st query
          db.pool.query(deleteProductSales, [idEmployee], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteEmployee, [idEmployee], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                           
                          res.sendStatus(204);
                      }
                  })
              }
        }
        );
    });
app.delete('/delete-sale-ajax/', function(req, res, next) {
    let data = req.body;
    let idSalesInvoice = parseInt(data.idSalesInvoice);
    
    let deleteSale = `DELETE FROM SalesInvoices WHERE idSalesInvoice = ?`;
    
    // Run the query to delete the sale
    db.pool.query(deleteSale, [idSalesInvoice], function(error, rows, fields) {
        if (error) {
        console.log(error);
        res.sendStatus(400);
        } else {
        res.sendStatus(204);
        }
    });
    });
      

// ------------------------------- UPDATE -----------------------------------

app.put('/update-vendor-ajax', function(req,res,next){
    let data = req.body;
  
    let vendor = data.idVendor;
    let vendorAddress = data.vendorAddress;
  
    let updateVendor = `UPDATE Vendors SET vendorAddress = ? WHERE Vendors.idVendor = ?`;
    let selectAddress = `SELECT * FROM Vendors WHERE idVendor = ?`
  
          // Run the 1st query
          db.pool.query(updateVendor, [selectAddress, vendor], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectAddress, [vendorAddress], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
