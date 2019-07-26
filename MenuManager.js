$(document).ready(function () {
    $('#miestenKuntosarjaSisalto').hide();
    $('#naistenKuntosarjaSisalto').hide();
    $('#firmasarjaSisalto').hide();
    $('#u14aSisalto').hide();
    $('#u12Sisalto').hide();
});
$(document).ready(function () {
    $('.tabs').tabs();
});
$(document).ready(function () {
    $('#openKuntosarjaMiehetBtn').on('click', function () {
        $('#naistenKuntosarjaSisalto').hide();
        $('#firmasarjaSisalto').hide();
        $('#u14aSisalto').hide();
        $('#u12Sisalto').hide();
        $('#miestenKuntosarjaSisalto').show(1000);
    });
});

$(document).ready(function () {
    $('#openKuntosarjaNaisetBtn').on('click', function () {
        $('#miestenKuntosarjaSisalto').hide();
        $('#firmasarjaSisalto').hide();
        $('#u14aSisalto').hide();
        $('#u12Sisalto').hide();
        $('#naistenKuntosarjaSisalto').show(1000);
    });
});

$(document).ready(function () {
    $('#openFirmasarjaBtn').on('click', function () {
        $('#miestenKuntosarjaSisalto').hide();
        $('#naistenKuntosarjaSisalto').hide();
        $('#u14aSisalto').hide();
        $('#u12Sisalto').hide();
        $('#firmasarjaSisalto').show(1000);
    });
});

$(document).ready(function () {
    $('#openU14Btn').on('click', function () {
        $('#miestenKuntosarjaSisalto').hide();
        $('#naistenKuntosarjaSisalto').hide();
        $('#firmasarjaSisalto').hide();
        $('#u12Sisalto').hide();
        $('#u14aSisalto').show(1000);
    });
});

$(document).ready(function () {
    $('#openU12Btn').on('click', function () {
        $('#miestenKuntosarjaSisalto').hide();
        $('#naistenKuntosarjaSisalto').hide();
        $('#firmasarjaSisalto').hide();
        $('#u14aSisalto').hide();
        $('#u12Sisalto').show(1000);
    });
});
