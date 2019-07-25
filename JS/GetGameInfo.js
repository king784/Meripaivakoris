window.onload = function(){
    setInfo();
}

function setInfo(){
    
    //document.querySelector('#homeTeam').value = "3";
    
}

function getDataFromExcel(){
    console.log("Täällä");

    var textFromExcel = document.getElementById("jotain");

    var request = new XMLHttpRequest;
    request.open("GET", )
    
    $('#input-excel').change(function(e){

        var reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = function(e){
            var data = new Uint8Array(reader.result);
            var wb = XLSX.read(data, {type:'array'});
            
            var htmlstr = XLSX.write(wb, {sheet: "sheet n1", type:"binary", bookType:"html"});
            $('#wrapper')[0].innerHTML += htmlstr;
        }
    })
}