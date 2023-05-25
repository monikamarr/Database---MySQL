function deletePerson(idEmployee) {
    let link = '/delete-employee-ajax/';
    let data = {
      id: idEmployee
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(idEmployee);
      }
    });
  }
  
  function deleteRow(idEmployee){
      let table = document.getElementById("employees-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == idEmployee) {
              table.deleteRow(i);
              break;
         }
      }
  }