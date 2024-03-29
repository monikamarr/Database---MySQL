// Get the objects we need to modify
let addVendorForm = document.getElementById('add-vendor-form-ajax');

// Modify the objects we need
addVendorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVendorName = document.getElementById("input-vendorName");
    let inputVendorAddress = document.getElementById("input-vendorAddress");
    

    // Get the values from the form fields
    let vendorNameValue = inputVendorName.value;
    let vendorAddressValue = inputVendorAddress.value;


    // Put our data we want to send in a javascript object
    let data = {
        vendorName: vendorNameValue,
        vendorAddress: vendorAddressValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-vendor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputVendorName.value = '';
            inputVendorAddress.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input. Http Status = " + xhttp.stat)
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// vendors_table
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("vendors-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("tr");
    let idVendorCell = document.createElement("td");
    let vendorNameCell = document.createElement("td");
    let vendorAddressCell = document.createElement("td");

    // Fill the cells with correct data
    idVendorCell.innerText = newRow.idVendor;
    vendorNameCell.innerText = newRow.vendorName;
    vendorAddressCell.innerText = newRow.vendorAddress;

    // Add the cells to the row 
    row.appendChild(idVendorCell);
    row.appendChild(vendorNameCell);
    row.appendChild(vendorAddressCell);
    

    // Add a custom row attribute so the deleteRow function can find a newly added row
    // row.setAttribute('data-value', newRow.idVendor);  ???????

    // Add the row to the table
    currentTable.appendChild(row);

        // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-vendorAddress-update");
    
    let option = document.createElement("option");
    option.text = newRow.vendorName + ' ' +  newRow.vendorAddress;
    option.value = newRow.idVendor;
    selectMenu.add(option);
    // End of new step 8 code.
}
