'use strict';
var theme = {
  /**
   * Theme's components/functions list
   * Comment out or delete the unnecessary component.
   * Some components have dependencies (plugins).
   */
  init: function () {
    theme.scrollButton();
    theme.accordion();
    theme.mobileMenu();
    theme.inputSearch();
    theme.loadMore();
    theme.swiperslider();
  },

  /**
   * Scroll to Top Button
   */
  scrollButton: function () {
    var $scrollTop = $('.scroll-top');
    if ($scrollTop.length) {
      var toggleScrollTop = function () {
        $(window).scrollTop() > 100 ? $scrollTop.addClass('active') : $scrollTop.removeClass('active');
      };
      $(window).on('load', toggleScrollTop);
      $(document).on('scroll', toggleScrollTop);
    }

    $("#scrolltoTop").click(function () {
      $("html").animate({ scrollTop: 0 }, "slow");
    });
  },

  /**
   * Accordion
   */
  accordion: function () {
    $(".accordion > li:first").addClass("active").find("p").slideDown();
    $('.accordion li').on('click', function () {
      var dropDown = $(this).find("p");

      $(this).closest(".accordion").find("p").not(dropDown).slideUp();

      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(this).closest(".accordion").find("li.active").removeClass("active");
        $(this).addClass("active");
      }

      dropDown.stop(false, true).slideToggle();
    });
  },

  /**
   * Mobile Menu
   */
  mobileMenu: function () {
    function popupMobileMenu() {
      if (window.matchMedia('(max-width: 1200px)').matches) {
        $('.hamberger-button').on('click', function () {
          $('.popup-mobile-menu').addClass('active');
        });

        $('.close-menu').on('click', function () {
          $('.popup-mobile-menu').removeClass('active');
          $('.popup-mobile-menu .mainmenu .has-droupdown > a').siblings('.submenu, .rn-megamenu').removeClass('active').slideUp('400');
          $('.popup-mobile-menu .mainmenu .has-droupdown > a').removeClass('open');
        });

        $('.popup-mobile-menu .mainmenu .has-droupdown > a').on('click', function (e) {
          e.preventDefault();
          $('.popup-mobile-menu .mainmenu .has-droupdown > a').not(this).siblings('.submenu, .rn-megamenu').removeClass('active').slideUp('400');
          $('.popup-mobile-menu .mainmenu .has-droupdown > a').not(this).removeClass('open');
          let $submenu = $(this).siblings('.submenu, .rn-megamenu');
          if ($submenu.hasClass('active')) {
            $submenu.removeClass('active').slideUp('400');
            $(this).removeClass('open');
          } else {
            $submenu.addClass('active').slideDown('400');
            $(this).addClass('open');
          }
        });

        $('.popup-mobile-menu').on('click', function (e) {
          if (e.target === this) {
            $('.popup-mobile-menu').removeClass('active');
            $('.popup-mobile-menu .mainmenu .has-droupdown > a').siblings('.submenu, .rn-megamenu').removeClass('active').slideUp('400');
            $('.popup-mobile-menu .mainmenu .has-droupdown > a').removeClass('open');
          }
        });
      }
    }

    popupMobileMenu();

    $(window).resize(function () {
      $('.hamberger-button').off('click');
      $('.close-menu').off('click');
      $('.popup-mobile-menu .mainmenu .has-droupdown > a').off('click');
      $('.popup-mobile-menu').off('click');

      popupMobileMenu();
    });
  },

  /**
   * Input To Search Table Data
   */
  inputSearch: function () {
    function searchTable(input, tableId) {
      var filter = input.val().toUpperCase();
      var table = $("#" + tableId);
      var tbody = table.find("tbody");
      var found = false;

      tbody.find("tr").each(function () {
        var rowFound = false;
        $(this).find("td").each(function () {
          if ($(this).text().toUpperCase().indexOf(filter) > -1) {
            rowFound = true;
            return false;
          }
        });
        if (rowFound) {
          $(this).show();
          found = true;
        } else {
          $(this).hide();
        }
      });

      table.find("#noResultsMessage").remove();

      if (!found) {
        tbody.append("<tr id='noResultsMessage'><td colspan='7'>No results match your search query</td></tr>");
      }
    }

    $("input[data-table]").on("keyup", function () {
      var input = $(this);
      var tableId = input.data("table");
      searchTable(input, tableId);
    });
  },

  /**
   * Load More Functionality
   */
  loadMore: function () {
    function setupLoadMore(buttonSelector, itemSelector, initialShow, loadMoreCount, completionText) {
      $(itemSelector).slice(0, initialShow).show();

      $(buttonSelector).on("click", function (e) {
        e.preventDefault();

        $(itemSelector + ":hidden").slice(0, loadMoreCount).slideDown();

        if ($(itemSelector + ":hidden").length == 0) {
          $(buttonSelector).text(completionText).addClass("noContent");
        }
      });
    }

    setupLoadMore("#loadMoretld", ".domaintldtr", 6, 4, "All domain TLDs loaded successfully.");
  },

  /**
   * Swiper Slider
   */
  swiperslider: function () {
    new Swiper('.testimonilas-items', {
      speed: 1000,
      loop: false,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    });
  }

};

// Initialize the theme
document.addEventListener('DOMContentLoaded', function () {
  theme.init();
});


// pricing


let currentCurrency = 'usd';
let currentDuration = 'monthly';

const priceBoxes = document.querySelectorAll('.price-box');
const currencyBtns = document.querySelectorAll('#usd, #bdt');
const durationBtns = document.querySelectorAll('#monthly, #yearly');

// Function to update all prices
function updatePrices() {
  priceBoxes.forEach(box => {
    const price = box.getAttribute(`data-${currentCurrency}-${currentDuration}`);
    const icon = currentCurrency === 'usd' ? '$' : '৳';
    const durationText = currentDuration === 'monthly' ? '/month' : '/year';
    box.innerHTML = `<h3><span class="curr-icon">${icon}</span> ${price} <span class="durection">${durationText}</span></h3>`;
  });
}

// Handle Currency Button Click
currencyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currencyBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCurrency = btn.id;
    updatePrices();
  });
});

// Handle Duration Button Click
durationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    durationBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDuration = btn.id;
    updatePrices();
  });
});

// Initial set
document.getElementById('usd').classList.add('active');
document.getElementById('monthly').classList.add('active');
updatePrices();

