function SaveToExcel()
{
    var data = [{"Joukkue":"KTP-basket", "Pisteet":"2"},
    {"Joukkue":"Karhut", "Pisteet":"1"},
    {"Joukkue":"Kakka", "Pisteet":"69"}
    ];

    if(typeof XLSX == 'undefined')
    {
        XLSX = require('xlsx');
    }

    var ws = XLSX.utils.json_to_sheet(data);

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Matsit");

    XLSX.writeFile(wb, "JepaJee.xlsx");
}
