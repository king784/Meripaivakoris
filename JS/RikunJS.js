var newDivision;
var newHomeTeam;
var newAwayTeam;

var divisionIndex;

var x;

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
var divisions = [];

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

        reader.onload = function(e)
        {


            var data = new Uint8Array(reader.result);
            var wb = XLSX.read(data,{type:'array'});

            let worksheet = wb.Sheets['Sarjat'];

            x = 6;
            var divisionCell = worksheet['A5'];

            var divisionValue = (divisionCell ? divisionCell.v : undefined);      
            
            
            //List of divisions
            for(var i = 0; i < 5; i++)
            {
                var tempStr = ['A5', 'A18', 'A24', 'C5', 'C18'];

                var desiredCell = worksheet[tempStr[i]];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                desiredValue = desiredValue.substring(0, desiredValue.length - 1);

                //divisions = [worksheet['A5'], worksheet['A18']];
                //divisions = ["adda", "baa"];
                //console.log(divisions);

                tempStr[i] = divisionIndex;
                
                divisions.push(desiredValue);
                
                var text = document.createTextNode(desiredValue);
                excelTextHtml.appendChild(text);
                
                
                //x++;
            }

            
            //List of home team
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
            
            
            //List of away team
            //x = 11;
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
    for(var i = 0; i < 5; i++)
    {
        console.log(divisions[i]);
        newDivisionName = divisions[i];
        document.getElementById("division").options[i] = new Option(newDivisionName, "1");
    }
    for(var i = 0; i < 5; i++)
    {
        console.log(teams[i].name);
        newTeamName = teams[i].name;
        document.getElementById("homeTeam").options[i] = new Option(newTeamName, "1");
    }
    var j = 0;
    for(var i = 5; i < 10; i++)
    {
        console.log(teams[i].name);
        newAwayName = teams[i].name;
        document.getElementById("awayTeam").options[j] = new Option(newAwayName, "1");
        j++;
    }


}
