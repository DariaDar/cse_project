$(document).ready(function(){
    $(".physical_person").hide();
    $(".physical_button").click(function () {
        $(this).next().slideToggle('slow');
    });

});

$(document).ready(function(){
    $(".gov_person").hide();
    $(".gov_button").click(function () {
        $(this).next().slideToggle('slow');
    });

});

// validation example for Login form
$("#btnLogin").click(function(event) {

    var form = $("#loginForm");

    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    // if validation passed form
    // would post to the server here

    form.addClass('was-validated');
});
