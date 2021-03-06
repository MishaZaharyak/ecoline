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

$(window).scroll(function() {
  // fixed menu 
  fixedMenu();
})

$(document).ready(function() {
  // fixed menu 
  fixedMenu();

  // menu humburger button amination handler
  $('#nav-icon3').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('open');

    const fullWidthMenu = $('.fullWidthMenu');
    const menu = $('.topMenu');
    const topmenuNav = $(menu).find('.navigation');

    if ($(this).hasClass('open')) {
      $(menu).addClass('white');
      
      if ($(topmenuNav).length) $(topmenuNav).addClass('hide');

      $(fullWidthMenu).removeClass('hide').addClass('show');

      setTimeout(function() {

        if ($(fullWidthMenu).hasClass('show')) {
          $(fullWidthMenu).addClass('show-active');
        }
      }, 100)

    } else if (!$(this).hasClass('open')) {
      $(menu).removeClass('white');
      if ($(topmenuNav).length) $(topmenuNav).removeClass('hide');

      $(fullWidthMenu).removeClass('show-active');

      setTimeout(function() {

        if (!$(fullWidthMenu).hasClass('show-active')) {
          $(fullWidthMenu).removeClass('show').addClass('hide');
        }
        
      }, 500)
    }
  });

  // hide slider arrows
  var arrows = $('.arrows');

  if (arrows) {
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
  
        } else if (slideCount > slideToshow && windowWidth < 581) {
          $(arrows).css('display', 'none')
  
        } else {
          $(arrows).css('display', 'block')
        }
      })
    }) 
  }

  // sliders sections list animatins
  $('.fullWidthMenu .animate-li').each(function() {
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

  const slider =  $('.slider');

  if (slider.length) {
    $(slider).each(function() {
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
      }).on('afterChange', function(e) {
        e.stopPropagation();
      });
    })
  }

  const outerSlider =  $('.outerSlider');

  if (outerSlider.length) {
    $(outerSlider).each(function() {
      let liList;

      $(this).on('init', function(e, slick) {
        e.preventDefault();
        liList = $(slick.$slider).closest('.main-parent').find('.sliderNav li[data-index]');
      })

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
      }).on('beforeChange', function(e, slick, cur, next) {
        e.preventDefault();
        if ($(slick.$slider).hasClass('outerSlider')) {
          liList.each(function() {
            $(this).removeClass('active')
          });
  
          $(liList[next]).addClass('active');
        }
      });
    });

    $('.sliderNav li[data-index]').each(function() {
      $(this).on('click', function(e) {
        e.preventDefault();
        var slideno = $(this).data('index');
        const slider =  $(this).closest('.section-with-slider').find('.outerSlider').eq(0);
        $(slider).slick('slickGoTo', slideno - 1)
      });
    })
  }

  const clientSlider = $('.clients-slider');

  if (clientSlider.length) {
    
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
  }

  const imageSlider = $('.image-slider');

  if (imageSlider.length) {
    $(imageSlider).each(function() {
      let liList;

      $(this).on('init', function(e, slick) {
        e.preventDefault();
        liList = $(slick.$slider).closest('.main-parent').find('.animate-li li[data-index]');
      })

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
          initialSlide: 1,
      }).on('beforeChange', function(e, slick, cur, next) {
        e.preventDefault();
        if ($(slick.$slider).hasClass('image-slider')) {
          liList.each(function() {
            $(this).removeClass('active')
          });
  
          $(liList[next]).addClass('active');
        }
      });
    });  

    $('.image-slider-section li[data-index]').click(function(e) {
      e.preventDefault();
      var slideno = $(this).data('index');
      $('.image-slider-section .image-slider').slick('slickGoTo', slideno - 1);
    });
  }

  const reviewSlider = $('.review-slider');

  if (reviewSlider.length) {
    $(reviewSlider).each(function() {
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
  }

  const textImageSlider = $('.text-image-slider');

  if (textImageSlider.length) {
    $(textImageSlider).each(function() {
      $(this).slick({
        ...slickOptions,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: $(this).parent().find('.slick-new-prev'),
          nextArrow: $(this).parent().find('.slick-new-next'), 
          appendDots: $(this).parent().find('.dots-cont'),
          responsive: [
            {
              breakpoint: 769,
              settings: {
                appendDots: $(this)
              }
            },
            {
              breakpoint: 601,
              settings: {
                appendDots: $(this),
                arrows: false
              }
            }
          ]
      })
    })
  }

  // "read more" seo article
  readMore( $('.page-article'), 5);
});

function readMore(jObj, lineNum) {
  if ( isNaN(lineNum) ) {
    lineNum = 5;
  }
  var go = new ReadMore (jObj, lineNum);
}

function ReadMore(_jObj, lineNum) { 
  var jObj = _jObj;
  var textMinHeight = ''+ (parseInt(jObj.children('.hidden-text').css('line-height'),10)*lineNum) +'px';
  var textMaxHeight = ''+jObj.children('.hidden-text').css('height');

  jObj.children('.hidden-text').css('height', ''+ textMaxHeight);
  jObj.children('.hidden-text').css( 'transition', 'height .5s');
  jObj.children('.hidden-text').css('height', ''+ textMinHeight);

  jObj.find('.read-more').click ( function() {

    if (jObj.children('.hidden-text').css('height') === textMinHeight) {
      jObj.children('.hidden-text').css('height', ''+textMaxHeight);
      jObj.find('.read-more').addClass('active');

    } else {
      jObj.children('.hidden-text').css('height', ''+textMinHeight);
      jObj.find('.read-more').removeClass('active');
    }
  });

}

// navigation menu toggle active class
$(document).on('click', '.navigation a', e => {
  $('.navigation a').each((i, el) => $(el).parent().removeClass('active'))
  $(e.target).parent().addClass('active')
});

// toggle active class in full width menu
$(document).on('click', '.fullWidthMenu .mainNav a', e => {
  $('.fullWidthMenu .mainNav a').each((i, el) => $(el).parent().removeClass('active'))
  $(e.target).parent().addClass('active')
});

// reset active link when click on brand
$('.navbar-brand').on('click', function(e) {
  $('.navigation a').each((i, el) => $(el).parent().removeClass('active'))
})

// pagination active page
$(document).on('click', '.pagination a:not(.nav-arrow)', function(e) {
  $('.pagination a').each(function(i, el) {
    $(el).parent().removeClass('active')
  })
  $(e.target).parent().addClass('active')
});
