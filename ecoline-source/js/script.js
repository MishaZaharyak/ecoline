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

    $(slider).on('init', function(e, slick) {

      setItemHeight(this);
      const slideToshow = slick.options.slidesToShow;
      const slideCount = slick.slideCount;

      if (slideCount <= slideToshow) {
        $(arrows).css('display', 'none')
      } else {
        $(arrows).css('display', 'block')
      }
    })
  }) 

  let slickOptions = {
      autoplay:false,
      arrows: true,
      autoplaySpeed:3000, 
      speed:800, 
      slidesToShow:3,
      slidesToScroll:1,
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
            breakpoint: 993,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
          }
        ]
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
            breakpoint: 1300,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
          }, 
          {
            breakpoint: 993,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
          }
        ]
    })
  })


  $('.image-slider').each(function() {
    $(this).slick({
        ...slickOptions,
        slidesToShow: 1,
        dots: false,
        arrows: false,
        fade: true,
    })
  })   
  
  $('.review-slider').each(function() {
    $(this).slick({
      ...slickOptions,
        slidesToShow: 1,
        dots: false,
        vertical: true,
        verticalSwiping: true,
        prevArrow: $(this).parent().find('.slick-new-prev'),
        nextArrow: $(this).parent().find('.slick-new-next'), 
    })
  })

  $('.responsive').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1300,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
        }
  
    }, {
        breakpoint: 800,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 2,
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    }]
  })
});

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

$(window).on('resize', function() {
  $('.slider').each(function() {
    $(this).slick('resize');
  })
});
