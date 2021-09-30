/*
** Sticky Nav
 */

let isContact = document.getElementById('contact'),
    header = $('#header'),
    promoBannerActive = $('body').hasClass('promo-banner-active'),
    lastScrollY = 0,
    scrollDirection = 0,
    navHasAnimated = false;

navScroll = () =>
{
    let scrollY = (window.scrollY < 0) ? 0 : window.scrollY;
    let diff = lastScrollY - scrollY;

    scrollDirection = diff / Math.abs(diff);
    lastScrollY = scrollY;

    if(diff !== 0)
    {
        navAnimate(scrollY);
    }

    window.requestAnimationFrame(navScroll);
}

navAnimate = (scrollY) =>
{
    if($(document.body).hasClass('mobile-nav-active')) return;

    // hit top of page
    if(scrollY <= 50)
    {
        $('body').removeClass('sticky-header');
    }
    else
    {
        // scrolling up and not at top of page
        if(scrollDirection > 0)
        {
            // Allow header to be revealed
            $('body').removeClass('header-hidden');

            // Reveal header when scrolling up and not yet near the top
            if(scrollY > header.height()) $('body').addClass('sticky-header');
        }
        // scrolling down
        else
        {
            $('body').removeClass('sticky-header');

            if(scrollY > header.height()) $('body').addClass('header-hidden');
        }
    }
}

if(!isContact)
{
    window.requestAnimationFrame(navScroll)
}