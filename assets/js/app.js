$(function() {


  /* Header__title fixed */

    let headerTitle = $("#header__title");
    let headerTop = headerTitle.offset().top;
    
    let scrollPos = $(window).scrollTop();
    let caseInnerPos = $(".case__inner").offset().top;


    checkScroll(headerTop, scrollPos);
    checkHeader(scrollPos, caseInnerPos);

    $(window).on("scroll resize", function() {
      
      scrollPos = $(this).scrollTop();

      checkScroll(headerTop, scrollPos);
      checkHeader(scrollPos, caseInnerPos);

    });


    /* Smooth scroll */

    $("[data-scroll]").on("click", function(event) {
      event.preventDefault();

      let blockId = $(this).data("scroll");
      let blockTop = $(blockId).offset().top;

      $("html, body").animate({

        scrollTop: blockTop

      }, 500);
    });

    /* Slick Slider */

    $('.works__slider').slick({
        slidesToShow: 1,
        fade: true,
        dots: true
      });


/* Functions */
      function checkScroll(headerTop, scrollPos) {
        if(headerTop <= scrollPos + 20) {
          headerTitle.addClass("fixed");
        } else {
          headerTitle.removeClass("fixed");
        };
      };


      function checkHeader(scrollPos, caseInnerPos) {
        if (scrollPos - caseInnerPos >= 0) {
          headerTitle.addClass("small");
          } else {
            headerTitle.removeClass("small");
          };
      };
  
});