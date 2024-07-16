jQuery(document).ready(function( $ ) {

  // Preloader
  $(window).on('load', function() {
    $('#preloader').delay(100).fadeOut('slow', function() {
      $(this).remove();
    });
  });

  // Hero rotating texts
  $("#hero .rotating").Morphext({
    animation: "flipInX",
    separator: ",",
    speed: 3000
  });
  
  // Initiate the wowjs
  new WOW().init();
  
  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });
  
  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
      $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
      $('body').append( $mobile_nav );
      $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars" style="color: #ccc;"></i></button>' );
      $('body').append( '<div id="mobile-body-overly"></div>' );
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
      
      $(document).on('click', '.menu-has-children i', function(e){
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });
      
      $(document).on('click', '#mobile-nav-toggle', function(e){
          $('body').toggleClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });
      
      $(document).click(function (e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
             if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }
  
  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length) {
              
              var top_space = 0;
              
              if( $('#header').length ) {
                top_space = $('#header').outerHeight();
              }
              
              $('html, body').animate({
                  scrollTop: target.offset().top - top_space
              }, 1500, 'easeInOutExpo');

              if ( $(this).parents('.nav-menu').length ) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
              }

              if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
              
              return false;
          }
      }
  });
  
  // Back to top button
  $(window).scroll(function() {

      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
      
  });
  
  $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
  });

  // Counting Effect
  function countUp() {
    $('.count').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-target');
      $({
        countNum: $this.text()
      }).animate({
        countNum: countTo
      },
      {
        duration: 3000,
        easing: 'swing',
        step: function() {
          $this.text(Math.floor(this.countNum) + '+');
        },
        complete: function() {
          $this.text(this.countNum + '+');
        }
      });
    });
  }

  // Trigger the counting effect when the #stats section is in view
  $(window).on('scroll', function() {
    var hT = $('#about').offset().top,
      hH = $('#about').outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
    if (wS >= (hT + hH - wH)) {
      countUp();
      $(window).off('scroll');
    }
  });

  //Count nr. of square classes
  var countSquare = $('.square').length;
          
  //For each Square found add BG image
  for (i = 0; i < countSquare; i++) {
    var firstImage = $('.square').eq([i]);
    var secondImage = $('.square2').eq([i]);

    var getImage = firstImage.attr('data-image');
    var getImage2 = secondImage.attr('data-image');

    firstImage.css('background-image', 'url(' + getImage + ')');
    secondImage.css('background-image', 'url(' + getImage2 + ')');
  }

});

// Membership Slider
$(document).ready(function(){
  $('.customer-logos').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1200,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      touchMove: true,
      swipe: true,
      responsive: [{
          breakpoint: 768,
          settings: {
              slidesToShow: 4
          }
      }, {
          breakpoint: 520,
          settings: {
              slidesToShow: 3
          }
      }]
  });
});

// Supplies Tooltip Corousel 
document.addEventListener("DOMContentLoaded", function () {
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach(item => {
      item.addEventListener('mouseenter', function (e) {
          const images = this.getAttribute('data-images').split(',');
          const texts = this.getAttribute('data-texts').split(',');
          const tooltip = document.getElementById('carousel-tooltip');
          const imageElement = tooltip.querySelector('img');
          const textElement = tooltip.querySelector('.carousel-text');

          let currentIndex = 0;

          function updateTooltip() {
              imageElement.src = images[currentIndex];
              textElement.textContent = texts[currentIndex];
              currentIndex = (currentIndex + 1) % images.length;
          }

          updateTooltip();
          const interval = setInterval(updateTooltip, 1500);

          const rect = this.getBoundingClientRect();
          tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`;
          tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`;
          tooltip.style.display = 'block';
          tooltip.style.opacity = 1;

          this.addEventListener('mouseleave', function () {
              clearInterval(interval);
              tooltip.style.display = 'none';
              tooltip.style.opacity = 0;
          });
      });
  });
});

// Side Bar Contact Section
document.addEventListener('DOMContentLoaded', (event) => {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closebtn = document.getElementById('closebtn');
  const sidebarcontent = document.getElementById("side-content");
  const page = document.querySelectorAll("section");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  
  function blur(event){
    event.style.filter = "blur(2px)";
    event.style.transition = "filter 0.5s ease";
  }

  menuToggle.addEventListener('click', function () {
    sidebar.style.width = '450px';
    sidebar.style.padding = "50px";
    page.forEach(blur);
    header.style.filter = "blur(2px)";
    header.style.transition = "filter 0.5s ease";
    footer.style.filter = "blur(2px)";
    footer.style.transition = "filter 0.5s ease";
  });

  closebtn.addEventListener('click', function () {
    sidebar.style.width = '0';
    sidebar.style.padding = "0";
    page.forEach(function(event){
      event.style.filter = "none";
    })
    header.style.filter = "none";
    footer.style.filter = "none";
  });

  // Close the sidebar if the user clicks outside of it
  window.addEventListener('click', function (e) {
    if (e.target == sidebar) {
      sidebar.style.width = '0';
    }
  });
});

// Card Flipper
// mtree.js
// Requires jquery.js and velocity.js (optional but recommended).
// Copy the below function, add to your JS, and simply add a list <ul class=mtree> ... </ul>
;(function ($, window, document, undefined) {
  
  // Only apply if mtree list exists
  if($('ul.mtree').length) { 
  
    
  // Settings
  var collapsed = true; // Start with collapsed menu (only level 1 items visible)
  var close_same_level = false; // Close elements on same level when opening new node.
  var duration = 400; // Animation duration should be tweaked according to easing.
  var listAnim = true; // Animate separate list items on open/close element (velocity.js only).
  var easing = 'easeOutQuart'; // Velocity.js only, defaults to 'swing' with jquery animation.
    
  
  // Set initial styles 
  $('.mtree ul').css({'overflow':'hidden', 'height': (collapsed) ? 0 : 'auto', 'display': (collapsed) ? 'none' : 'block' });
  
  // Get node elements, and add classes for styling
  var node = $('.mtree li:has(ul)');  
  node.each(function(index, val) {
    $(this).children(':first-child').css('cursor', 'pointer')
    $(this).addClass('mtree-node mtree-' + ((collapsed) ? 'closed' : 'open'));
    $(this).children('ul').addClass('mtree-level-' + ($(this).parentsUntil($('ul.mtree'), 'ul').length + 1));
  });
  
  // Set mtree-active class on list items for last opened element
  $('.mtree li > *:first-child').on('click.mtree-active', function(e){
    if($(this).parent().hasClass('mtree-closed')) {
      $('.mtree-active').not($(this).parent()).removeClass('mtree-active');
      $(this).parent().addClass('mtree-active');
    } else if($(this).parent().hasClass('mtree-open')){
      $(this).parent().removeClass('mtree-active'); 
    } else {
      $('.mtree-active').not($(this).parent()).removeClass('mtree-active');
      $(this).parent().toggleClass('mtree-active'); 
    }
  });

  // Set node click elements, preferably <a> but node links can be <span> also
  node.children(':first-child').on('click.mtree', function(e){
    
    // element vars
    var el = $(this).parent().children('ul').first();
    var isOpen = $(this).parent().hasClass('mtree-open');
    
    // close other elements on same level if opening 
    if((close_same_level || $('.csl').hasClass('active')) && !isOpen) {
      var close_items = $(this).closest('ul').children('.mtree-open').not($(this).parent()).children('ul');
      
      // Velocity.js
      if($.Velocity) {
        close_items.velocity({
          height: 0
        }, {
          duration: duration,
          easing: easing,
          display: 'none',
          delay: 100,
          complete: function(){
            setNodeClass($(this).parent(), true)
          }
        });
        
      // jQuery fallback
      } else {
        close_items.delay(100).slideToggle(duration, function(){
          setNodeClass($(this).parent(), true);
        });
      }
    }
    
    // force auto height of element so actual height can be extracted
    el.css({'height': 'auto'}); 
    
    // listAnim: animate child elements when opening
    if(!isOpen && $.Velocity && listAnim) el.find(' > li, li.mtree-open > ul > li').css({'opacity':0}).velocity('stop').velocity('list');
    
    // Velocity.js animate element
    if($.Velocity) {
      el.velocity('stop').velocity({
        //translateZ: 0, // optional hardware-acceleration is automatic on mobile
        height: isOpen ? [0, el.outerHeight()] : [el.outerHeight(), 0]
      },{
        queue: false,
        duration: duration,
        easing: easing,
        display: isOpen ? 'none' : 'block',
        begin: setNodeClass($(this).parent(), isOpen),
        complete: function(){
          if(!isOpen) $(this).css('height', 'auto');
        }
      });
    
    // jQuery fallback animate element
    } else {
      setNodeClass($(this).parent(), isOpen);
      el.slideToggle(duration);
    }
    
    // We can't have nodes as links unfortunately
    e.preventDefault();
  });
  
  // Function for updating node class
  function setNodeClass(el, isOpen) {
    if(isOpen) {
      el.removeClass('mtree-open').addClass('mtree-closed');
    } else {
      el.removeClass('mtree-closed').addClass('mtree-open');
    }
  }
  
  // List animation sequence
  if($.Velocity && listAnim) {
    $.Velocity.Sequences.list = function (element, options, index, size) {
      $.Velocity.animate(element, { 
        opacity: [1,0],
        translateY: [0, -(index+1)]
      }, {
        delay: index*(duration/size/2),
        duration: duration,
        easing: easing
      });
    };
  }
    
    // Fade in mtree after classes are added.
    // Useful if you have set collapsed = true or applied styles that change the structure so the menu doesn't jump between states after the function executes.
    if($('.mtree').css('opacity') == 0) {
      if($.Velocity) {
        $('.mtree').css('opacity', 1).children().css('opacity', 0).velocity('list');
      } else {
        $('.mtree').show(200);
      }
    }
  }
}(jQuery, this, this.document));