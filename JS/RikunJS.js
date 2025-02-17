var newDivision;
var newHomeTeam;
var newAwayTeam;

var divisionIndex;

var x;

class Team
{
    constructor(name, points, division, lohko)
    {
        this.name = name;
        this.points = points;
        this.division = division;
        this.lohko = lohko;
    }
}

class Ottelu
{
    constructor(klo, kentta, division, homeT, awayT, winner, loser)
    {
        this.klo = klo;
        this.kentta = kentta;
        this.division = division;
        this.homeT = homeT;
        this.awayT = awayT;
        this.winner = winner;
        this.loser = loser;
    }
}

var teams = [];
var showedTeams = [];
var tempTeams = [];
var winAndLoseTeams = [];
var divisions = [];
var ottelut = [];

function LoadFromExcel()
{
    //var excelTextHtml = document.getElementById("ExcelText");
    
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
            let wsOttelut = wb.Sheets['Ottelut'];
            let wsKuntoMiehet = wb.Sheets['Kunto Miehet'];
            let wsFirma = wb.Sheets['Firmasarja'];
            let wsU14J = wb.Sheets['U14 Junnut'];
            let wsU12J = wb.Sheets['U12 Junnut'];

            x = 5;
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
                
                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);
                
                
                //x++;
            }

            
            //List of home team
            for(var i = 0; i < 5; i++)
            {
                var tempStr = 'A' + x.toString();

                var desiredCell = wsKuntoMiehet[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                var lohkoCell = wsKuntoMiehet['A4'];
                var lohkoValue = (lohkoCell ? lohkoCell.v : undefined);

                teams.push(new Team(desiredValue, 0, divisionValue, lohkoValue));
                
                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);
                
                
                x++;
            }
            
            
            //List of away team
            x = 5;
            for(var i = 0; i < 5; i++)
            {
                var tempStr = 'N' + x.toString();
                var desiredCell = wsKuntoMiehet[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                var lohkoCell = wsKuntoMiehet['N4'];
                var lohkoValue = (lohkoCell ? lohkoCell.v : undefined);

                teams.push(new Team(desiredValue, 0, divisionValue, lohkoValue));
                
                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);


                x++;
            }

            // Kuntosarja Naiset:
            x = 19;
            for(var i = 0; i < 4; i++)
            {
                var tempStr = 'A' + x.toString();
                var desiredCell = worksheet[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                teams.push(new Team(desiredValue, 0, divisions[1], "Lohko"));
                
                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);


                x++;
            }

            // Firmasarja:
            x = 5;
            for(var i = 0; i < 3; i++)
            {
                var tempStr = 'A' + x.toString();
                var desiredCell = wsFirma[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                var lohkoCell = wsFirma['A4'];
                var lohkoValue = (lohkoCell ? lohkoCell.v : undefined);

                teams.push(new Team(desiredValue, 0, divisions[2], lohkoValue));
                
                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);


                x++;
            }

            x = 5;
            for(var i = 0; i < 3; i++)
            {
                var tempStr = 'N' + x.toString();
                var desiredCell = wsFirma[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                var lohkoCell = wsFirma['N4'];
                var lohkoValue = (lohkoCell ? lohkoCell.v : undefined);

                teams.push(new Team(desiredValue, 0, divisions[2], lohkoValue));
                
                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);


                x++;
            }

            // U14:
            x = 5;
            for(var i = 0; i < 5; i++)
            {
                var tempStr = 'A' + x.toString();
                var desiredCell = wsU14J[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                var lohkoCell = wsU14J['A4'];
                var lohkoValue = (lohkoCell ? lohkoCell.v : undefined);

                teams.push(new Team(desiredValue, 0, divisions[3], lohkoValue));
                
                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);


                x++;
            }

            x = 5;
            for(var i = 0; i < 5; i++)
            {
                var tempStr = 'N' + x.toString();
                var desiredCell = wsU14J[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                var lohkoCell = wsU14J['N4'];
                var lohkoValue = (lohkoCell ? lohkoCell.v : undefined);

                teams.push(new Team(desiredValue, 0, divisions[3], lohkoValue));
                
                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);


                x++;
            }

            // U12:
            x = 5;
            for(var i = 0; i < 5; i++)
            {
                var tempStr = 'A' + x.toString();
                var desiredCell = wsU12J[tempStr];
                var desiredValue = (desiredCell ? desiredCell.v : undefined);
                
                teams.push(new Team(desiredValue, 0, divisions[4], "Lohko"));
                
                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);


                x++;
            }


            x = 6;
            // Ottelut
            for(var i = 0; i < 84; i++)
            {
                var kloStr = 'A' + x.toString();
                var kloCell = wsOttelut[kloStr];
                var kloValue = (kloCell ? kloCell.v : undefined);

                var kenttaStr = 'B' + x.toString();
                var kenttaCell = wsOttelut[kenttaStr];
                var kenttaValue = (kenttaCell ? kenttaCell.v : undefined);

                var divisionStr = 'C' + x.toString();
                var divisionCell = wsOttelut[divisionStr];
                var divisionValue = (divisionCell ? divisionCell.v : undefined);

                var homeStr = 'E' + x.toString();
                var homeCell = wsOttelut[homeStr];
                var homeValue = (homeCell ? homeCell.v : undefined);

                var awayStr = 'G' + x.toString();
                var awayCell = wsOttelut[awayStr];
                var awayValue = (awayCell ? awayCell.v : undefined);

                var winStr = 'H' + x.toString();
                var winCell = wsOttelut[winStr];
                var winValue = (winCell ? winCell.v : undefined);

                var loseStr = 'I' + x.toString();
                var loseCell = wsOttelut[loseStr];
                var loseValue = (loseCell ? loseCell.v : undefined);
                

                //ottelut.push(new Ottelu(kloValue, kenttaValue, divisionValue, homeValue, awayValue, winValue, loseValue));
                ottelut.push(new Ottelu(kloValue, kenttaValue, divisionValue, homeValue, awayValue, winValue, loseValue));

                // var text = document.createTextNode(desiredValue);
                // excelTextHtml.appendChild(text);
                
                x++;
            }

            //DebugPrintOttelut(ottelut);
            //PrintShit();

            // var htmlstr = XLSX.write(wb,{sheet:"Sarjat", type:"binary",bookType:'html'});
            // console.log(htmlstr);
            // var text = document.createTextNode(htmlstr);
            // excelTextHtml.appendChild(text);

        }
    }
    
    request.send();
}

function GetTeamDivisionByName(theName)
{
    for(var i = 0; i < teams.length; i++)
    {
        if(teams[i].name == theName)
        {
            return teams[i].division;
        }
    }
}

function GetTeamByName(theName)
{
    for(var i = 0; i < teams.length; i++)
    {
        if(teams[i].name == theName)
        {
            return teams[i];
        }
    }
}

function CheckIfListContainsTeamName(a, b)
{
    var contains = false;
    for(var i = 0; i < a.length; i++)
    {
        if(a[i].name == b)
        {
            contains = true;
            i = a.length;
        }
    }
    return contains;
}

function PrintShit()
{    
    for(var i = 0; i < 5; i++)
    {
        // console.log(divisions[i]);
        newDivisionName = divisions[i];
        document.getElementById("division").options[i] = new Option(newDivisionName, newDivisionName); //(i+1).toString());
    }
    $('#division').formSelect();
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
    // console.log(a.division + "|" + b);
    return (a.division == b);
}

function CheckLohko(a, b)
{
    //console.log(a.lohko);
    return(a.lohko == b);
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
    $('#homeTeam').formSelect();
    document.getElementById("awayTeam").selectedIndex = 1;
    $('#awayTeam').formSelect();
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

    $('#winTeam').formSelect();
    $('#loseTeam').formSelect();

    winAndLoseTeams.push($('#homeTeam').val());
    winAndLoseTeams.push($('#awayTeam').val());
}

function ChangeWinTeam(theValue)
{
    //console.log(theValue);
    if((document.getElementById("winTeam").selectedIndex == document.getElementById("loseTeam").selectedIndex) && document.getElementById("winTeam").selectedIndex == 0)
    {
        document.getElementById("loseTeam").options.selectedIndex = 1;
        $('#loseTeam').formSelect();
    }
    else if((document.getElementById("winTeam").selectedIndex == document.getElementById("loseTeam").selectedIndex) && document.getElementById("winTeam").selectedIndex == 1)
    {
        document.getElementById("loseTeam").options.selectedIndex = 0;
        $('#loseTeam').formSelect();
    }
}

function ChangeLoseTeam(theValue)
{
    // console.log(theValue);
    if((document.getElementById("winTeam").selectedIndex == document.getElementById("loseTeam").selectedIndex) && document.getElementById("loseTeam").selectedIndex == 0)
    {
        document.getElementById("winTeam").options.selectedIndex = 1;
        $('#winTeam').formSelect();
    }
    else if((document.getElementById("winTeam").selectedIndex == document.getElementById("loseTeam").selectedIndex) && document.getElementById("loseTeam").selectedIndex == 1)
    {
        document.getElementById("winTeam").options.selectedIndex = 0;
        $('#winTeam').formSelect();
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

function LoadPlayersToTemp(divisionName, lohkoName)
{
    tempTeams.length = 0;

    for(var i = 0; i < teams.length; i++)
    {
        if(CheckTeamName(teams[i], divisionName))
        {
            if(CheckLohko(teams[i], lohkoName))
            {
                tempTeams.push(teams[i]);
            }
        }
    }   
}

function LoadPlayers(whichLohkoID, divisionName, lohkoName)
{
    showedTeams.length = 0;

    for(var i = 0; i < teams.length; i++)
    {
        if(CheckTeamName(teams[i], divisionName))
        {
            if(CheckLohko(teams[i], lohkoName))
            {
                showedTeams.push(teams[i]);
            }
        }
    }   

    //DebugPrint(showedTeams);

    var tempString = "";

    $("#"+whichLohkoID).empty();

    for(var i = 0; i < showedTeams.length; i++)
    {
        $("#"+whichLohkoID).append("<li>" + showedTeams[i].name + "</li>");
    }
    
    // var text = document.createTextNode(tempString);
    // whereToPutText.appendChild(text);
}

function DebugPrint(arrr)
{
    for(var i = 0; i < arrr.length; i++)
    {
        console.log(arrr[i].name);
    }
}

function DebugPrintOttelut(arrr)
{
    for(var i = 0; i < arrr.length; i++)
    {
        console.log(arrr[i].homeT);
    }
}

function LoadOttelut(whichLohkoID, divisionName, lohkoName)
{
    var showedOttelut = [];

    for(var i = 0; i < ottelut.length; i++)
    {
        // If division matches and team lohko
        if(ottelut[i].division == divisionName)
        {
            showedOttelut.push(ottelut[i]);
        }
    }
    
    for(var i = 0; i < showedOttelut.length; i++)
    {
        // If showedottelut home or away team is not in temp players list, pop
        if(!CheckIfListContainsTeamName(tempTeams, showedOttelut[i].homeT) || !CheckIfListContainsTeamName(tempTeams, showedOttelut[i].awayT))
        {
            showedOttelut.splice(i, 1);
        }
    }

    //DebugPrint(showedTeams);

    $("#"+whichLohkoID).empty();

    $("#"+whichLohkoID).append("<li>" + "Aika " + " " + "Kenttä" + " " 
        + "Koti" + " " + "Vieras" + "     " + "</li>");
    for(var i = 0; i < showedOttelut.length; i++)
    {
        $("#"+whichLohkoID).append("<li>" + showedOttelut[i].klo + " " + showedOttelut[i].kentta + " " 
        + showedOttelut[i].homeT + " VS " + showedOttelut[i].awayT + "     " + "</li>");
    }
    
    // var text = document.createTextNode(tempString);
    // whereToPutText.appendChild(text);
}

$(document).ready(function(){
    LoadFromExcel();
    $("#leagueTitle").text("☻");

    $('#division').change(function(){
        ChangeDivision($(this).val());
        ChangeTeam();
        DebugPrint(ottelut);
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

    // Kuntosarja Miehet A
    $('#kuntosarjaMiehetA-lohkoJoukkueetBtn').click(function(){
        $("#leagueTitle").text(divisions[0]);
        LoadPlayers('kuntosarjaMiehetA-lohkoJoukkueetText', divisions[0], "LOHKO A");
    })

    $('#openKuntosarjaMiehetBtn').click(function(){
        $("#leagueTitle").text(divisions[0]);
        LoadPlayers('kuntosarjaMiehetA-lohkoJoukkueetText', divisions[0], "LOHKO A");
    })

    $('#kuntosarjaMiehetA-lohkoOttelutBtn').click(function(){
        LoadPlayersToTemp(divisions[0], "LOHKO A");
        LoadOttelut('kuntosarjaMiehetA-lohkoOttelutText', divisions[0], "LOHKO A");
    })

    // KuntoSarja Miehet B
    $('#kuntosarjaMiehetB-lohkoJoukkueetBtn').click(function(){
        $("#leagueTitle").text(divisions[0]);
        LoadPlayers('kuntosarjaMiehetB-lohkoJoukkueetText', divisions[0], "LOHKO B");
    })

    $('#openKuntosarjaMiehetBtn').click(function(){
        $("#leagueTitle").text(divisions[0]);
        LoadPlayers('kuntosarjaMiehetB-lohkoJoukkueetText', divisions[0], "LOHKO B");
    })

    $('#kuntosarjaMiehetB-lohkoOttelutBtn').click(function(){
        LoadPlayersToTemp(divisions[0], "LOHKO B");
        LoadOttelut('kuntosarjaMiehetB-lohkoOttelutText', divisions[0], "LOHKO B");
    })
    
     // Kuntosarja Naiset
     $('#kuntosarjaNaisetA-lohkoJoukkueetBtn').click(function(){
        $("#leagueTitle").text(divisions[1]);
        LoadPlayers('kuntosarjaNaisetA-lohkoJoukkueetText', divisions[1], "Lohko");
    })

    $('#openKuntosarjaNaisetBtn').click(function(){
        $("#leagueTitle").text(divisions[1]);
        LoadPlayers('kuntosarjaNaisetA-lohkoJoukkueetText', divisions[1], "Lohko");
    })

    $('#kuntosarjaNaisetA-lohkoOttelutBtn').click(function(){
        LoadPlayersToTemp(divisions[1], "Lohko");
        LoadOttelut('kuntosarjaNaisetA-lohkoOttelutText', divisions[1], "Lohko");
    })

    // Firma A
    $('#firmasarjaA-lohkoJoukkueetBtn').click(function(){
        $("#leagueTitle").text(divisions[2]);
        LoadPlayers('firmasarjaA-lohkoJoukkueetText', divisions[2], "LOHKO A");
    })

    $('#openFirmasarjaBtn').click(function(){
        $("#leagueTitle").text(divisions[2]);
        LoadPlayers('firmasarjaA-lohkoJoukkueetText', divisions[2], "LOHKO A");
    })

    $('#firmasarjaA-lohkoOttelutBtn').click(function(){
        LoadPlayersToTemp(divisions[2], "LOHKO A");
        LoadOttelut('firmasarjaA-lohkoOttelutText', divisions[2], "LOHKO A");
    })

    // Firma B
    $('#firmasarjaB-lohkoJoukkueetBtn').click(function(){
        $("#leagueTitle").text(divisions[2]);
        LoadPlayers('firmasarjaB-lohkoJoukkueetText', divisions[2], "LOHKO B");
    })

    $('#openFirmasarjaBtn').click(function(){
        $("#leagueTitle").text(divisions[2]);
        LoadPlayers('firmasarjaB-lohkoJoukkueetText', divisions[2], "LOHKO B");
    })

    $('#firmasarjaB-lohkoOttelutBtn').click(function(){
        LoadPlayersToTemp(divisions[2], "LOHKO B");
        LoadOttelut('firmasarjaB-lohkoOttelutText', divisions[2], "LOHKO B");
    })

    // U14 A
    $('#u14A-lohkoJoukkueetBtn').click(function(){
        $("#leagueTitle").text(divisions[3]);
        LoadPlayers('u14A-lohkoJoukkueetText', divisions[3], "LOHKO A");
    })

    $('#openU14Btn').click(function(){
        $("#leagueTitle").text(divisions[3]);
        LoadPlayers('u14A-lohkoJoukkueetText', divisions[3], "LOHKO A");
    })

    $('#u14A-lohkoOttelutBtn').click(function(){
        LoadPlayersToTemp(divisions[3], "LOHKO A");
        LoadOttelut('u14A-lohkoOttelutText', "Junnut U14", "LOHKO A");
    })

    // U14 B
    $('#u14B-lohkoJoukkueetBtn').click(function(){
        $("#leagueTitle").text(divisions[3]);
        LoadPlayers('u14B-lohkoJoukkueetText', divisions[3], "LOHKO B");
    })

    $('#openU14Btn').click(function(){
        $("#leagueTitle").text(divisions[3]);
        LoadPlayers('u14B-lohkoJoukkueetText', divisions[3], "LOHKO B");
    })

    $('#u14B-lohkoOttelutBtn').click(function(){
        LoadPlayersToTemp(divisions[3], "LOHKO B");
        LoadOttelut('u14B-lohkoOttelutText', "Junnut U14", "LOHKO B");
    })

    // U12
    $('#u12A-lohkoJoukkueetBtn').click(function(){
        $("#leagueTitle").text(divisions[4]);
        LoadPlayers('u12A-lohkoJoukkueetText', divisions[4], "Lohko");
    })

    $('#openU12Btn').click(function(){
        $("#leagueTitle").text(divisions[4]);
        LoadPlayers('u12A-lohkoJoukkueetText', divisions[4], "Lohko");
    })

    $('#u12A-lohkoOttelutBtn').click(function(){
        LoadPlayersToTemp(divisions[2], "LOHKO B");
        LoadOttelut('u12A-lohkoOttelutText', "Junnut U12", "Lohko");
    })
});