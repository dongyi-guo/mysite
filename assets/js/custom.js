// Custom interactivity
$(function(){
    // Back to top button
    var backBtn = $('<div id="backToTop"><i class="fa fa-arrow-up"></i></div>');
    $('body').append(backBtn);
    $(window).on('scroll', function(){
        if($(this).scrollTop() > 300){
            backBtn.fadeIn();
        } else {
            backBtn.fadeOut();
        }
    });
    backBtn.on('click', function(){
        $('html, body').animate({scrollTop:0}, 700);
    });

    // Mobile collapsible details
    if (breakpoints.active('<=small')) {
        $('.spotlights > section').each(function(){
            var ul = $(this).find('ul').first();
            if(ul.length){
                var btn = $('<button class="toggle-details">Show Details</button>');
                ul.hide();
                ul.after(btn);
                btn.on('click', function(){
                    ul.slideToggle();
                    btn.text( ul.is(':visible') ? 'Hide Details' : 'Show Details');
                });
            }
        });
    }
});
