let inputCount = 1;

document.getElementById("addRowBtn").addEventListener("click", function() {
    inputCount++;
    const inputContainer = document.getElementById("inputContainer");

    const newInputGroup = document.createElement("div");
    newInputGroup.classList.add("input-group");
    newInputGroup.innerHTML = `
        <label for="angle${inputCount}">Angle (in degrees):</label>
        <input type="number" id="angle${inputCount}" name="angle${inputCount}" step="0.01" required>
        <label for="distance${inputCount}">Distance (in meters):</label>
        <input type="number" id="distance${inputCount}" name="distance${inputCount}" step="0.01" required>
    `;
    
    inputContainer.appendChild(newInputGroup);
});

document.getElementById("traverseForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const resultDialog = document.getElementById("resultDialog");
    const dialogContent = document.getElementById("dialogContent");
    let resultHtml = "<ul>";
    let tableRows = "";

    for (let i = 1; i <= inputCount; i++) {
        const angle = parseFloat(document.getElementById(`angle${i}`).value);
        const distance = parseFloat(document.getElementById(`distance${i}`).value);

      
        const radian = angle * (Math.PI / 180); 
        const northing = distance * Math.cos(radian); 
        const easting = distance * Math.sin(radian); 

        resultHtml += `
            <li>Set ${i}: Northing: ${northing.toFixed(2)} m, Easting: ${easting.toFixed(2)} m</li>
        `;


        tableRows += `
            <tr>
                <td>${i}</td>
                <td>${angle.toFixed(2)}</td>
                <td>${distance.toFixed(2)}</td>
                <td>${northing.toFixed(2)}</td>
                <td>${easting.toFixed(2)}</td>
            </tr>
        `;
    }

    resultHtml += "</ul>";
    dialogContent.innerHTML = resultHtml;
    

    document.querySelector("#dataTable tbody").innerHTML = tableRows;


    resultDialog.showModal();
});

document.getElementById("closeDialog").addEventListener("click", function() {
    document.getElementById("resultDialog").close();
});
