class Team
{
    constructor(name, points)
    {
        this.name = name;
        this.points = points;
    }
}

function LoadFromExcel()
{
    var excelTextHtml = document.getElementById("ExcelText");

    var request = new XMLHttpRequest();
    request.open('GET', "MeriPaivaKoris.xlsx", true);
    request.responseType = 'blob';
    request.onload = function() 
    {
        var reader = new FileReader();
        // reader.readAsDataURL(request.response);
        reader.readAsArrayBuffer(request.response);

        reader.onload = function(e)
        {
            var data = new Uint8Array(reader.result);
            var wb = XLSX.read(data,{type:'array'});

            var worksheet = wb.Sheets['Sarjat'];

            var x = 6;
            for(var i = 0; i < 9; i++)
            {
                var tempStr = 'A' + x.toString();
                var desiredCell = worksheet[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);

                var text = document.createTextNode(desiredValue);
                excelTextHtml.appendChild(text);

                x++;
            }

            // var htmlstr = XLSX.write(wb,{sheet:"Sarjat", type:"binary",bookType:'html'});
            // console.log(htmlstr);
            // var text = document.createTextNode(htmlstr);
            // excelTextHtml.appendChild(text);
        }
    }
    request.send();
}
