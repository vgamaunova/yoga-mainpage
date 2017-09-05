//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/owl.carousel/dist/owl.carousel.js






$(document).ready(function(){
    //initialisation carousel
    $(".about-carousel, .prices-carousel").owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
        });
    //animation scroll
    $('.navigation-link').on('click', function (){
        var id  = $(this).attr('href'),
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
        $('.navigation-item').removeClass('active');
        $(this).closest('.navigation-item').addClass('active');
        if($(window).width() < 770){
            closeNav();
        }
    } )
    //open top navigation
    var menuOpen = $('.navigation-button');
    var menuClose = $('.navigation-button-close');
    var navigationList =  $('.navigation-wrapper');
    //open top navigation
    function openNav() {
        navigationList.fadeIn();
        menuOpen.fadeOut();
        menuClose.fadeIn();
    }
    menuOpen.on('click', function (){
        openNav()
    } )
    //close top navigation
    function closeNav() {
        navigationList.fadeOut();
        menuOpen.fadeIn();
        menuClose.fadeOut();
    }
    menuClose.on('click', function (){
        closeNav()
    } )
    // validation form
    function validationForm() {

        var nameReg = /^[A-Za-z]+$/;
        var numberReg =  /^[0-9]+$/;

        var telephone = $('#phone').val();
        var name = $('#name').val();

        var inputVal = new Array(name, telephone);
        var inputMessage = new Array("name", "telephone number");

        var nameMessage = $('#nameLabel');
        var phoneMessage = $('#nameLabel');

        if(inputVal[0] == ""){
            nameMessage.after('<span class="error"> Please enter your ' + inputMessage[0] + '</span>');
        }
        else if(!nameReg.test(name)){
            nameMessage.after('<span class="error"> Letters only</span>');
        }

        if(inputVal[1] == ""){
            phoneMessage.after('<span class="error"> Please enter your ' + inputMessage[1] + '</span>');
        }
        else if(!numberReg.test(telephone)){
            phoneMessage.after('<span class="error"> Numbers only</span>');
        }
        return false
    }
    $('#contact-form-submit').submit(function(){
        validationForm();
    })
});