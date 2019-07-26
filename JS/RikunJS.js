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
var showedTeams = [];
var winAndLoseTeams = [];
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
            divisionValue = divisionValue.substring(0, divisionValue.length - 1);      
            
            
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

            // Kuntosarja Naiset:
            x = 19;
            for(var i = 0; i < 4; i++)
            {
                var tempStr = 'A' + x.toString();
                var desiredCell = worksheet[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                teams.push(new Team(desiredValue, 0, divisions[1]));
                
                var text = document.createTextNode(desiredValue);
                excelTextHtml.appendChild(text);


                x++;
            }

            // Firmasarja:
            x = 25;
            for(var i = 0; i < 6; i++)
            {
                var tempStr = 'A' + x.toString();
                var desiredCell = worksheet[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                teams.push(new Team(desiredValue, 0, divisions[2]));
                
                var text = document.createTextNode(desiredValue);
                excelTextHtml.appendChild(text);


                x++;
            }

            // U14:
            x = 6;
            for(var i = 0; i < 11; i++)
            {
                var tempStr = 'C' + x.toString();
                var desiredCell = worksheet[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                teams.push(new Team(desiredValue, 0, divisions[3]));
                
                var text = document.createTextNode(desiredValue);
                excelTextHtml.appendChild(text);


                x++;
            }

            // U12:
            x = 19;
            for(var i = 0; i < 5; i++)
            {
                var tempStr = 'C' + x.toString();
                var desiredCell = worksheet[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                teams.push(new Team(desiredValue, 0, divisions[4]));
                
                var text = document.createTextNode(desiredValue);
                excelTextHtml.appendChild(text);


                x++;
            }
            

            PrintShit();

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
        // console.log(divisions[i]);
        newDivisionName = divisions[i];
        document.getElementById("division").options[i] = new Option(newDivisionName, newDivisionName); //(i+1).toString());
    }
    for(var i = 0; i < 5; i++)
    {
        // console.log(teams[i].name);
        newTeamName = teams[i].name;
        document.getElementById("homeTeam").options[i] = new Option(newTeamName, newTeamName); //(i+1).toString());
    }
    var j = 0;
    for(var i = 5; i < 10; i++)
    {
        // console.log(teams[i].name);
        newAwayName = teams[i].name;
        document.getElementById("awayTeam").options[j] = new Option(newAwayName, newAwayName);// (i+1).toString());
        j++;
    }

    ChangeTeam();
}

function CheckTeamName(a, b)
{
    console.log(a.division + "|" + b);
    return (a.division == b);
}

function RemoveOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function ChangeDivision(condition)
{
    showedTeams.length = 0;

    for(var i = 0; i < teams.length; i++)
    {
        if(CheckTeamName(teams[i], condition))
        {
            showedTeams.push(teams[i]);
        }
    }

    RemoveOptions(document.getElementById("homeTeam"));
    RemoveOptions(document.getElementById("awayTeam"));

    for(var i = 0; i < showedTeams.length; i++)
    {
        // console.log(teams[i].name);
        newTeamName = showedTeams[i].name;
        document.getElementById("homeTeam").options[i] = new Option(newTeamName, newTeamName); //(i+1).toString());
    }
    for(var i = 0; i < showedTeams.length; i++)
    {
        // console.log(teams[i].name);
        newAwayName = showedTeams[i].name;
        document.getElementById("awayTeam").options[i] = new Option(newAwayName, newAwayName);// (i+1).toString());
    }
    document.getElementById("awayTeam").selectedIndex = 1;
}

function ChangeTeam()
{
    winAndLoseTeams = [];
    RemoveOptions(document.getElementById("winTeam"));
    RemoveOptions(document.getElementById("loseTeam"));

    document.getElementById("winTeam").options[0] = new Option($('#homeTeam').val(), $('#homeTeam').val());
    document.getElementById("winTeam").options[1] = new Option($('#awayTeam').val(), $('#awayTeam').val());

    document.getElementById("loseTeam").options[0] = new Option($('#homeTeam').val(), $('#homeTeam').val());
    document.getElementById("loseTeam").options[1] = new Option($('#awayTeam').val(), $('#awayTeam').val());
    document.getElementById("loseTeam").selectedIndex = 1;

    winAndLoseTeams.push($('#homeTeam').val());
    winAndLoseTeams.push($('#awayTeam').val());
}

function ChangeWinTeam(theValue)
{
    console.log(theValue);
    if((document.getElementById("winTeam").selectedIndex == document.getElementById("loseTeam").selectedIndex) && document.getElementById("winTeam").selectedIndex == 0)
    {
        document.getElementById("loseTeam").options.selectedIndex = 1;
    }
    else if((document.getElementById("winTeam").selectedIndex == document.getElementById("loseTeam").selectedIndex) && document.getElementById("winTeam").selectedIndex == 1)
    {
        document.getElementById("loseTeam").options.selectedIndex = 0;
    }
}

function ChangeLoseTeam(theValue)
{
    console.log(theValue);
    if((document.getElementById("winTeam").selectedIndex == document.getElementById("loseTeam").selectedIndex) && document.getElementById("loseTeam").selectedIndex == 0)
    {
        document.getElementById("winTeam").options.selectedIndex = 1;
    }
    else if((document.getElementById("winTeam").selectedIndex == document.getElementById("loseTeam").selectedIndex) && document.getElementById("loseTeam").selectedIndex == 1)
    {
        document.getElementById("winTeam").options.selectedIndex = 0;
    }
}

function SaveToExcel()
{
    //jsonString = JSON.stringify(jsonString, ['name', 'points', 'division']);

    // var data = [{"Joukkue":"KTP-basket", "Pisteet":"2"},
    // {"Joukkue":"Karhut", "Pisteet":"1"},
    // {"Joukkue":"Kakka", "Pisteet":"69"}
    // ];

    // var tieto = [{"Joukkue":}]

    if(typeof XLSX == 'undefined')
    {
        XLSX = require('xlsx');
    }

    var jsonString = [];

    for(var i = 0; i < teams.length; i++)
    {
        jsonString.push({"name": teams[i].name.toString(), "points": teams[i].points.toString(), "division": teams[i].division.toString()});
    }

    var ws = XLSX.utils.json_to_sheet(jsonString);

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Matsit");

    XLSX.writeFile(wb, "Uh.xlsx");
    
}


$(document).ready(function(){
    $('#division').change(function(){
        ChangeDivision($(this).val());
        ChangeTeam();
    });

    $('#homeTeam').change(function(){
        ChangeTeam();
    });

    $('#awayTeam').change(function(){
        ChangeTeam();
    });

    $('#winTeam').change(function(){
        ChangeWinTeam($(this).val());
    });

    $('#loseTeam').change(function(){
        ChangeLoseTeam($(this).val());
    });

    
});