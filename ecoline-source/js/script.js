function fixedMenu() {
  const windowScroll = window.scrollY;
  const menu = document.querySelector('.topMenu')
  const topOfMenu = menu.offsetTop;

  (windowScroll > topOfMenu) ? menu.classList.add('fixedNav') : menu.classList.remove('fixedNav');
}

function setItemHeight(slider) {
  const slids = $(slider).find('.slide');

  if (!slids.length) return;

  let maxHeight = [];

  $(slids).each(function() {
    const content = $(this).find('.content');

    if (content.length) {
      maxHeight.push($(content).get(0).offsetHeight);
    } else {
      maxHeight.push(this.offsetHeight);
    }    
  })

  maxHeight = Math.max(...maxHeight);
  $(slids).each(function() {
    const content = $(this).find('.content');

    if (content.length) {
      $(content).height(maxHeight);
    } else {
      $(this).height(maxHeight)
    }
  })
}

// smooth scroll
$(document).on("click","a[target=_self]", function(event) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({scrollTop: target.offset().top}, 2000);
    }
});

// fixed menu 
$(window).scroll(function() {
  fixedMenu();
})

$(document).ready(function() {
  // fixed menu 
  fixedMenu();

  // hide slider arrows
  $('.arrows').each(function() {
    const slider =$(this).siblings('.slider, .clients-slider, .image-slider');
    const arrows = $(this);

    const windowWidth = window.innerWidth;

    $(slider).on('init', function(e, slick) {

      setItemHeight(this);
      const slideToshow = slick.options.slidesToShow;
      const slideCount = slick.slideCount;

      if (slideCount <= slideToshow) {
        $(arrows).css('display', 'none')
      } else {
        if (windowWidth > 580) {
          $(arrows).css('display', 'block')
        } else {
          $(arrows).css('display', 'none')
        }
      }
    })
  }) 

  // sliders sections list animatins
  $('.animate-li').each(function() {
    let liList = $(this).find('.big-text');

    if (liList.length <= 0) liList = $(this).find('li');

    $(liList).each(function() {

      $(this).on('click', function() {
        $(liList).each(function() {
          $(this).removeClass('active');
        })
        $(this).addClass('active');
      })
    })
  })

  let slickOptions = {
      autoplay:false,
      arrows: true,
      autoplaySpeed:3000, 
      speed:800, 
      slidesToShow:3,
      slidesToScroll:3,
      pauseOnHover:false,
      dots: true,
      infinite: true,
      cssEase: 'linear',
      adaptiveHeight: true,
  }

  $('.slider').each(function() {
    $(this).slick({
        ...slickOptions,
        prevArrow: $(this).parent().find('.slick-new-prev'),
        nextArrow: $(this).parent().find('.slick-new-next'),
        responsive: [
          {
            breakpoint: 1300,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
          }, 
          {
            breakpoint: 581,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false
            }
          }
        ]
      });
  })

  $('.outerSlider').each(function() {
    $(this).slick({
        ...slickOptions,
        dots: false,
        arrows: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: false,
        draggable: false,
        swipe: false,
        touchMove: false,
    });
  });

  $('.sliderNav li[data-index]').each(function() {
    $(this).on('click', function(e) {
      e.preventDefault();
      var slideno = $(this).data('index');
      const slider =  $(this).closest('.section-with-slider').find('.outerSlider').eq(0);
      $(slider).slick('slickGoTo', slideno - 1);
    });
  })

  $('.clients-slider').each(function() {
    $(this).slick({
        ...slickOptions,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: $(this).parent().find('.slick-new-prev'),
        nextArrow: $(this).parent().find('.slick-new-next'),   
        responsive: [
          {
            breakpoint: 1301,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
          }, 
          {
            breakpoint: 1101,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
          },
          {
            breakpoint: 993,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
          },
          {
            breakpoint: 901,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
          },
          {
            breakpoint: 581,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false
            }
          }
        ]
    })
  });


  $('.image-slider').each(function() {
    $(this).slick({
        ...slickOptions,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        fade: true,
        accessibility: false,
        draggable: false,
        swipe: false,
        touchMove: false,
    })
  });  

  $('.image-slider-section li[data-index]').click(function(e) {
    e.preventDefault();
    var slideno = $(this).data('index');
    $('.image-slider-section .image-slider').slick('slickGoTo', slideno - 1);
  });
  
  $('.review-slider').each(function() {
    $(this).slick({
      ...slickOptions,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        vertical: true,
        verticalSwiping: true,
        prevArrow: $(this).parent().find('.slick-new-prev'),
        nextArrow: $(this).parent().find('.slick-new-next'), 
    })
  })
});
