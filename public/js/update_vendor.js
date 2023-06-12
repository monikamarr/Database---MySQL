
// Get the objects we need to modify
let updateVendorForm = document.getElementById('update-vendor-form-ajax');

// Modify the objects we need
updateVendorForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVendorName = document.getElementById("input-vendorName");
    let inputVendorAddress = document.getElementById("input-address-update");

    // Get the values from the form fields
    let vendorNameValue = inputVendorName.value;
    let vendorAddressValue = inputVendorAddress.value;
    
  

    // Put our data we want to send in a javascript object
    let data = {
        vendorName: vendorNameValue,
        vendorAddress: vendorAddressValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-vendor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, vendorNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, idVendor){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("vendors-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idVendor) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].vendorAddress; 
       }
    }
}
// function updateRow(data, idVendor) {
//     let parsedData = JSON.parse(data);
  
//     let table = document.getElementById("vendors-table");
  
//     for (let i = 0; i < table.rows.length; i++) {
//       let row = table.rows[i];
//       let vendorId = row.getAttribute("data-value");
  
//       if (vendorId == idVendor) {
//         // Update the vendor's address in the table
//         let addressCell = row.cells[2];
//         addressCell.innerText = parsedData[0].vendorAddress;
//         break;
//       }
//     }
//   }
  
