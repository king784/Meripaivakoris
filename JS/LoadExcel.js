class Team
{
    constructor(name, points, division)
    {
        this.name = name;
        this.points = points;
        this.division = division;
    }
}

var teams = [];

function LoadFromExcel()
{
    var excelTextHtml = document.getElementById("ExcelText");
    
    var request = new XMLHttpRequest();
    request.open('GET', "Meripaivakoris2019uus.xlsx", true);
    request.responseType = 'blob';
    request.onload = function() 
    {
        var reader = new FileReader();
        // reader.readAsDataURL(request.response);
        reader.readAsArrayBuffer(request.response);

        reader.onreadystatechange = function() 
        {
            if(reader.readyState == 4)
            {
                console.log("jee");
                PrintShit();
            }
        }

        reader.onload = function(e)
        {
            var data = new Uint8Array(reader.result);
            var wb = XLSX.read(data,{type:'array'});

            let worksheet = wb.Sheets['Sarjat'];

            var x = 6;
            var divisionCell = worksheet['A5'];

            var divisionValue = (divisionCell ? divisionCell.v : undefined);
            

            for(var i = 0; i < 5; i++)
            {
                var tempStr = 'A' + x.toString();
                var desiredCell = worksheet[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);

                teams.push(new Team(desiredValue, 0, divisionValue));

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

function PrintShit()
{
    for(var i = 0; i < teams.length; i++)
    {
        console.log(teams[i].name);
    }
}
