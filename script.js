let apiResponse = []

async function fetchData(){
    return await fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then (async function(response){
        console.log(response)
         apiResponse =await response.json()
     })
     
 
 }
        
 
 function addRow(data, tableRef) {
   
     // Insert a cell in the row at index 0
     for (let i=0; i<data.length; i++) {
       // Insert a row at the end of the table
       let newRow = tableRef.insertRow(-1);
       
       for (let k=0; k < data[i].length; k++) {
           let cell = newRow.insertCell(k);
           if(k == 3){
            var img = document.createElement('img');
            img.src = data[i][k]
            img.width = 100
            cell.appendChild(img)

           }
            else {
                cell.appendChild(document.createTextNode(data[i][k]));

            }

       }
     }
   }
   
   
   // Call addRow() with the table's ID
   function listToString(list) {
       let string = "";
       for (let i=0; i < list.length; i++) {
           string += list[i] + ", ";
       }
       return string;
   }
   
  async function main(page){
      let pageSize = 50;
      let to = pageSize * page;
      let from = to - pageSize + 1;

      if (!apiResponse.length){
        await fetchData() 
      }

      
     console.log(apiResponse)
     response = apiResponse.slice(from, to + 1)
     console.log(response)
     
 
   let data = response.map(x => {
       return [x.brand,x.name,x.price,x.image_link,x.product_link,x.description] // Add characters later
   })
   
   let tableRef = document.getElementById("make-up-table");
   for (let i=1; i<tableRef.rows.length; i++){
       tableRef.deleteRow(i)
       
   } 
   addRow(data, tableRef);   
   }
   
   main(1)
 
 
 
    
 
