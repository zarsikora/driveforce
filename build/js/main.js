//LET ME USE THE $ FOR JQUERY
window.$ = window.jQuery = jQuery;

//Init splitting js
let splitting = new Splitting();

//Init Simplebar
if($('#contact.form-module').length)
{
    new SimpleBar(document.getElementById('contact'), { autoHide: false });
}

//Run mobile check and if on mobile, add mobile class to HTML tag.
let mounted = false;
mobilecheck = () => {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

let mobileDetected = mobilecheck(); 

if(mobileDetected == true){
    $("html").addClass("mobile");
};

//Initialize lazyloading.
let blazy = new Blazy({
    offset: 1000
});

//Add device agent specific classes.
let deviceAgent = navigator.userAgent.toLowerCase();

if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
    $("html").addClass("ios");
    $("html").addClass("mobile");
}
if (navigator.userAgent.search("MSIE") >= 0) {
    $("html").addClass("ie");
}
else if (navigator.userAgent.search("Chrome") >= 0) {
    $("html").addClass("chrome");
}
else if (navigator.userAgent.search("Firefox") >= 0) {
    $("html").addClass("firefox");
}
else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
    $("html").addClass("safari");
}
else if (navigator.userAgent.search("Opera") >= 0) {
    $("html").addClass("opera");
}

// Detect request animation frame
let scroll = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    // IE Fallback, you can even fallback to onscroll
    function(callback){ window.setTimeout(callback, 1000/60) };


// let winsize;
// const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
// calcWinsize();
// // and recalculate on resize
// window.addEventListener('resize', calcWinsize);


/**
 * Quantity integer input on PDP
 */
$('.product-info .quantity, .product .quantity').each(function ()
{
    const updateOnClick = $(this).parents('.cart-drawer').length;

    $('<div class="quantity-nav"><a href="#" class="quantity-button quantity-up">+</a><a href="#" class="quantity-button quantity-down">-</a></div>').insertAfter($('input', $(this)));

    let spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = (input.attr('max')) ? input.attr('max') : 100;

    btnUp.click(function (e)
    {
        e.preventDefault();

        let oldValue = parseFloat(input.val());
        const cartItemKey = spinner.parents('.cart-drawer-product').attr('data-cart-item-key');

        if (oldValue >= max) {
            var newVal = oldValue;
        } else {
            var newVal = oldValue + 1;
        }

        input.val(newVal);
        input.trigger("change");

        if (updateOnClick)
        {
            if(!newVal)
            {
                removeFromCart(spinner.parents('.cart-drawer-product'), cartItemKey);
                return;
            }

            updateQuantity(cartItemKey, newVal);
        }
    });

    btnDown.click(function(e)
    {
        e.preventDefault();

        var oldValue = parseFloat(input.val());
        const cartItemKey = spinner.parents('.cart-drawer-product').attr('data-cart-item-key');

        if (oldValue <= min) {
            var newVal = oldValue;
        } else {
            var newVal = oldValue - 1;
        }

        input.val(newVal);
        input.trigger("change");

        if(updateOnClick)
        {
            if(!newVal)
            {
                removeFromCart(spinner.parents('.cart-drawer-product'), cartItemKey);
                return;
            }

            updateQuantity(cartItemKey, newVal);
        }
    });
});

function removeFromCart(product, cartItemKey)
{
    $.ajax({
        url: localizedVars.ajaxurl,
        method: 'post',
        dataType: 'json',
        data: {
            action: 'df_remove_product_from_cart',
            cartItemKey: cartItemKey
        },
        success: function(data)
        {
            console.log(data);

            product.remove();

            updateCartDrawerTotal(data.data.cartTotals);
        },
        error: function(error)
        {
            console.log(error);
        }
    })
}

function updateQuantity(cartItemKey, quantity)
{
    $.ajax({
        url: localizedVars.ajaxurl,
        method: 'post',
        dataType: 'json',
        data: {
            action: 'df_update_cart_item_quantity',
            cartItemKey: cartItemKey,
            quantity: quantity
        },
        success: function(data)
        {
            console.log(data);

            updateCartDrawerTotal(data.data.cartTotals);
        },
        error: function(error)
        {
            console.log(error);
        }
    })
}

/**
 * Cart Drawer
 */

const cartDrawerButton = $('.open-cart-drawer');
cartDrawerButton.on('click', function(e)
{
    e.preventDefault();

    $('body').addClass('cart-drawer-open');
});

const closeCartDrawer = $('.close-cart-drawer');
closeCartDrawer.on('click', function(e)
{
    e.preventDefault();

    $('body').removeClass('cart-drawer-open');
});


/**
 * Read more reviews button scroll
 */
$('.read-reviews-link').on('click', (e) =>
{
    e.preventDefault();

    let header = $('.main-header-wrapper');
    let comments = $('#comments');

    $("html, body").animate({scrollTop: (comments.offset().top - (header.outerHeight() + 30))}, 750);
});


/**
 * Write a review button toggle
 */

let writeReviewBtn = $('.write-review-button');
if(writeReviewBtn.length)
{
    let reviewForm = $('#review_form');
    writeReviewBtn.on('click', (e) => {
        e.preventDefault();

        reviewForm.show();
        writeReviewBtn.hide();
    })
}


/**
 * Load more reviews
 */

let loadMoreReviewBtn = $('.load-more-reviews');
if(loadMoreReviewBtn.length)
{
    let loadingGif = $('.loading-gif');
    let commentList = $('#comments .commentlist');
    let totalReviews = commentList.attr('data-total');
    let reviewsPerPage = commentList.attr('data-per-page');
    let totalPages = Math.ceil(totalReviews / reviewsPerPage);
    let currentPage = 1;
    let offset;

    loadMoreReviewBtn.on('click', (e) =>
    {
        e.preventDefault();

        loadingGif.removeClass('d-none');

        offset = parseInt(commentList.attr('data-current-page')) * reviewsPerPage;

        $.ajax({
            url: ajaxurl,
            type: 'post',
            data: {
                action: 'load_more_comments',
                offset: offset,
                perPage: reviewsPerPage,
                postID: postID
            },
            dataType: 'html',
            success: (data) =>
            {
                loadingGif.addClass('d-none');

                currentPage = parseInt(commentList.attr('data-current-page')) + 1;

                commentList.attr('data-current-page', currentPage);
                commentList.append(data);

                if(currentPage == totalPages)
                {
                    loadMoreReviewBtn.hide();
                }
            },
            error: (error) => {
                console.log(error);
            }
        });
    })
}


// ANIMATION SCROLL HANDLER - request animation frame
let windowHeight = $(window).height();
let lastPosition = -1; // storing last scroll position which updates on throttled scroll listener - nothing takes place before it is changed
// let slideUps; I dont think we need this
let scrollArray = [];
let interval = 100;
let start = Date.now()/1000;

let posCheck = setInterval(() => {
    if(((Date.now()/1000) - start) > 2) {
        clearInterval(posCheck);
    }
    getScrollModules();
}, interval);

function getScrollModules()
{
    scrollArray = []; // reset array
    scrollElems = $('[data-animation-effect]'); // find new modules

    // Setup array of elements and starting Y positions
    scrollElems.each(function(i)
    {
        let ele = $(scrollElems)[i];
        let height = $(ele).height();

        scrollArray.push({ // no longer looking for value every time on scroll
            ele: ele,
            startY: $(ele).offset().top,
            height: height,
            type: $(ele).attr('data-animation-effect'),
            trigger : $(ele).attr('data-animation-trigger'),
            breakpointHit : false
        });
    });
}

//Re-fetch Scroll Modules on every Resize
window.addEventListener("resize", function(){
    getScrollModules();
});

function animationWizard(timestamp)
{
    getScrollModules();

    /*
     * Easing Functions - inspired from http://gizma.com/easing/
     * only considering the t value for the range [0, 1] => [0, 1]
     */
    EasingFunctions = {
        // no easing, no acceleration
        linear: t => t,
        // accelerating from zero velocity
        easeInQuad: t => t*t,
        // decelerating to zero velocity
        easeOutQuad: t => t*(2-t),
        // acceleration until halfway, then deceleration
        easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
        // accelerating from zero velocity
        easeInCubic: t => t*t*t,
        // decelerating to zero velocity
        easeOutCubic: t => (--t)*t*t+1,
        // acceleration until halfway, then deceleration
        easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
        // accelerating from zero velocity
        easeInQuart: t => t*t*t*t,
        // decelerating to zero velocity
        easeOutQuart: t => 1-(--t)*t*t*t,
        // acceleration until halfway, then deceleration
        easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
        // accelerating from zero velocity
        easeInQuint: t => t*t*t*t*t,
        // decelerating to zero velocity
        easeOutQuint: t => 1+(--t)*t*t*t*t,
        // acceleration until halfway, then deceleration
        easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
    }

    function isElementInViewport(ele)
    {
        let offset = mobileDetected ? .35 : .35;
        let topViewport = window.pageYOffset;
        let bottomViewport = topViewport + windowHeight;
        let positionData = {inViewport: false, vertPosPercent: 0};
        let vertPosPercent = (bottomViewport - ele.startY) / (windowHeight * offset);
        let vertParallaxPercent = ((bottomViewport - ele.startY) / (windowHeight + ele.height));

        if(vertPosPercent < 0) vertPosPercent = 0;
        if(vertPosPercent > 1) vertPosPercent = 1;

        if(vertParallaxPercent < 0) vertParallaxPercent = 0;
        if(vertParallaxPercent > 1) vertParallaxPercent = 1;

        positionData.vertPosPercent = vertPosPercent;
        positionData.vertParallaxPercent = vertParallaxPercent;

        if(vertPosPercent >= 0 || vertPosPercent <= 1) positionData.inViewport = true;

        return positionData;
    }

    function elementHitBreakpoint(ele)
    {
        let topViewport = window.pageYOffset;
        let bottomViewport = topViewport + windowHeight;

        if($('body').hasClass('home')){
            return ((ele.startY - bottomViewport) < 0);
        } else {
            return ((ele.startY - (bottomViewport - (windowHeight * 0.1))) < 0);
        }
    }

    function loop()
    {
        // Avoid calculations if not needed
        if (lastPosition == window.pageYOffset && !$('body').hasClass('home')) // check position
        {
            //console.log('stop loop');
            scroll(loop);
            return false; // stops loop after firing once
        }

        lastPosition = window.pageYOffset; //update position

        // Loop through the elements so we can choose to animate or not
        for(let i = 0; i < scrollArray.length; i++)
        {
            let ele = scrollArray[i];
            let positionData = isElementInViewport(ele);
            let vertPosPercent = positionData.vertPosPercent;
            let vertParallaxPercent = positionData.vertParallaxPercent;
            let animationType = ele.trigger;
            let breakpointHit = ele.breakpointHit;

            if (animationType === 'breakpoint' && !breakpointHit) {
                let breakpoint = elementHitBreakpoint(ele);

                if (breakpoint) {
                    // Set breakpoint flag so we know this has animated already
                    ele.breakpointHit = true;

                    //special breakpoint for splitting elements
                    if(ele.type == 'splitSlideUpWord'){
                        let words = $(ele.ele).find('.word');
                        
                        for(let i = 0; i <= words.length; i++){
                            setTimeout(function(){
                                let chars = $(words[i]).find('.char');
                                $(chars).addClass('active');
                            }, 20 * i);
                        }

                    } else {
                        $(ele.ele).addClass('active');

                        //remove data attr once animation is complete
                        setTimeout(function(){
                            $( ele.ele ).removeAttr('data-animation-effect'); 
                            $( ele.ele ).removeAttr('data-animation-trigger');
                            console.log('done!');
                        }, 500);
                    }
                }
            } else if (animationType === 'scroll') {
                if(positionData.inViewport)
                {
                    let easedPercent = EasingFunctions.easeInOutQuad(vertPosPercent);
                    let easedParallaxPercent = EasingFunctions.easeOutQuad(vertParallaxPercent);

                    // All modules only fade in on mobile
                    if(mobileDetected)
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent
                        });

                        continue;
                    }

                    if(ele.type == 'parallax')
                    {
                        $(ele.ele).css({
                            transform: 'translateY(' + (50 - (50 * easedParallaxPercent)) + '%)'
                        });
                    }

                    if(ele.type == 'lateralParallax')
                    {
                        $(ele.ele).css({
                            transform: 'translateX(' + (100 - (100 * easedParallaxPercent)) + '%)'
                        });
                    }

                    if(ele.type == 'slideLeft')
                    {
                        $(ele.ele).css({
                            transform: 'translateX(-' + (0 + (25 * vertPosPercent)) + '%)'
                        });
                    }

                    if(ele.type == 'slideRight')
                    {
                        $(ele.ele).css({
                            transform: 'translateX(' + (150 + (25 * vertPosPercent)) + '%)'
                        });
                    }

                    if(ele.type == 'moduleSlideUp')
                    {
                        $(ele.ele).css({
                            transform: 'scale('+ (.85 + (0.15 * vertPosPercent)) +')',
                            opacity: vertPosPercent
                        });
                    }

                    if(ele.type == 'splitSlideUpChar'){
                        let chars = $(ele.ele).find('.char');

                        for(let i = 0; i <= chars.length; i++){
                            setTimeout(function(){
                                $(chars[i]).css({
                                    transform: 'translate3d(0,' + (100 - (easedPercent * 100)) + '%, 0)'
                                });
                            }, 20 * i);
                        }
                    }

                    if(ele.type == 'splitSlideUpWord'){
                        let words = $(ele.ele).find('.word');
                        
                        for(let i = 0; i <= words.length; i++){
                            setTimeout(function(){
                                let chars = $(words[i]).find('.char');
                                $(chars).css({
                                    transform: 'translate3d(0,' + (100 - (easedPercent * 100)) + '%, 0)'
                                });
                            }, 20 * i);
                        }
                    }

                    if(ele.type == 'moduleFadeIn')
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent
                        });
                    }

                    if(ele.type == 'moduleSlideFromLeft')
                    {
                        let easedPercent = EasingFunctions.easeInQuad(vertPosPercent);
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d('+ (-100 + (easedPercent * 100)) +'%,0,0)'
                        })
                    }

                    if(ele.type == 'moduleSlideFromRight')
                    {
                        let easedPercent = EasingFunctions.easeInQuad(vertPosPercent);
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d('+ (100 - (easedPercent * 100)) +'%,0,0)'
                        })
                    }

                    if(ele.type == 'moduleSlideFromTop')
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d(0,'+ (-100 + (easedPercent * 100)) +'%, 0)'
                        })
                    }

                    if(ele.type == 'moduleSlideFromBottom')
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d(0,' + (100 - (easedPercent * 100)) + '%, 0)'
                        })
                    }

                    if(ele.type == 'scrollUpBlur')
                    {
                        $(ele.ele).css({
                            transform: 'translate3d(0,' + (10 - (easedPercent * 10)) + '%, 0)',
                            filter: 'blur(' + (10 - (easedPercent * 10)) + 'px)'
                        });
                    }

                    if(ele.type == 'blurIn')
                    {
                        $(ele.ele).css({
                            filter: 'blur(' + (10 - (easedPercent * 10)) + 'px)'
                        });
                    }

                    if(ele.type == 'moduleDriftUp')
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d(0,' + (50 - (easedPercent * 50)) + '%, 0)'
                        })
                    }
                }
            }
        }

        scroll( loop );
    }

    // Call the loop for the first time
    loop();
};
let myHandler = scroll(animationWizard);

//HERO H1 ANIMATION CALL 
function animateHomeHeroHeader(){
    let heroHeader = $('.hero h1.title');
    heroHeader.css({'opacity' : '1'});

    if($(heroHeader).hasClass('breakpoint-animate')){
        let words = $(heroHeader).find('.word');


        // desktop
        if(window.innerWidth >= '768'){
            console.log('animating desktop');

            gsap.to('.primary-hero-curve', {duration: .8, opacity: 1, delay: 0, ease: "power4.inOut"}); 

            setTimeout(function(){
                $('.home-hero .image-container').addClass('animate');
            }, 500);

            // gsap.to('.home-hero .image-container', {duration: .8, opacity: 1, delay: .5, translateY: 0, ease: "expo.out"}); 

            setTimeout(function(){
                for(let i = 0; i <= words.length; i++){
                    setTimeout(function(){
                        let word = words[i];
                        $(word).addClass('active');
                    }, 80 * i); 
                }

                gsap.to('.home-hero .copy', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .btns-wrapper', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .logos.desktop', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .tag', {duration: .7, translateX: 0, delay: .7, ease: "power2.inOut"});
            }, 700);
        } else {
            gsap.to('.primary-hero-curve', {duration: .8, opacity: 1, delay: 0, ease: "pwer4.inOut"}); 
            gsap.to('.home-hero .image-container', {duration: 1.5, opacity: 1, delay: .5, translateY: 0, ease: "expo.out"});
                
            setTimeout(function(){
                for(let i = 0; i <= words.length; i++){
                    setTimeout(function(){
                        let word = words[i];
                        $(word).addClass('active');
                    }, 80 * i);
                }

                gsap.to('.home-hero .btn.mobile-waitlist', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .logos.mobile', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .copy', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .link.mobile', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .tag', {duration: .7, translateX: 0, delay: .7, ease: "power2.inOut"});
            }, 700);
        }
    }
}

if($('.home-hero')){
    setTimeout(function(){
        animateHomeHeroHeader(); 
    }, 0);
}

//SECONDARY HERO ANIMATION CALLS
function animateSecondaryHero(){
    let heroHeader = $('.hero h1.secondary-title');
    heroHeader.css({'opacity' : '1'});
    
    if($(heroHeader).hasClass('breakpoint-animate')){
        let words = $(heroHeader).find('.word');

        for(let i = 0; i <= words.length; i++){
            setTimeout(function(){
                let word = words[i];
                $(word).addClass('active');
            }, 80 * i);
        }

        gsap.to('.secondary.hero p.subtitle', {duration: .8, opacity: 1, delay: .7, ease: "power4.inOut"});
        gsap.to('.secondary.hero .share-bar-wrapper', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
    }
}

if($('.hero.secondary')){
    animateSecondaryHero();
}

//BLOG POST HERO ANIMATION CALL
function animateArticleHero(){
    let heroHeader = $('.hero h1');

    if($(heroHeader).hasClass('breakpoint-animate')){
        gsap.to(heroHeader, {duration: 1.2, opacity: 1, delay: .4, translateY: 0, ease: "power4.inOut"});

        gsap.to('.hero .share-bar-wrapper', {duration: 1.2, opacity: 1, delay: .6, translateY: 0, ease: "power4.inOut"});
        
        if($('.post-content .featured-img')){
            gsap.to('.featured-img', {duration: .5, opacity: 1, delay: .6, ease: "power4.inOut"});
        }

        gsap.to('.post-content .copy', {duration: 1.2, opacity: 1, delay: 1, translateY: 0, ease: "power4.inOut"});
    }
}

if($('.hero.article').length){
    animateArticleHero();
}

//CHALLENGES SINGLE HERO ANIMATION 
function animateChallengesHero(){
    let heroHeader = $('.hero h1');

    if($(heroHeader).hasClass('breakpoint-animate')){
        gsap.to(heroHeader, {duration: 1.2, opacity: 1, delay: .4, translateY: 0, ease: "power4.inOut"});
        
        gsap.to('.hero .share-bar-wrapper', {duration: 1.2, opacity: 1, delay: .6, translateY: 0, ease: "power4.inOut"});
    }    
}

if($('.challenges-page .hero').length){
    animateChallengesHero();
}

//Navigational control.
navToggle = () => {
    $('#header').toggleClass('nav-active');
    $('.hamburger-control svg').toggleClass('active');
    $('#nav-pane').toggleClass('active');
    $('.nav').toggleClass('active');
    $('.hero-img').toggleClass('mobile-nav-active');
    $('.nav-drawer-asset').toggleClass('active');

    if($('.hamburger-control').attr('aria-expanded') == 'false'){
        $(".hamburger-control").attr("aria-expanded","true");
    } else {
        $(".hamburger-control").attr("aria-expanded","false");
    }

    if(!$('body').hasClass('mobile-nav-active')){
        $('body').toggleClass('mobile-nav-active');
    } else {
        setTimeout(function(){
            $('body').toggleClass('mobile-nav-active');
        }, 450);
    }
}
navClose = () => {
    if($('#nav-pane').hasClass('active')){
        $('#header').removeClass('nav-active');
        $('.hamburger-control svg').toggleClass('active');
        $('#nav-pane').removeClass('active');
        $('.nav').removeClass('active');
        $('body').removeClass('mobile-nav-active');
        $('.hero-img').removeClass('mobile-nav-active');
        $(".hamburger-control").attr("aria-expanded","false");
    }
}
$('.mobile-controls').on('click', function(){
    navToggle();
});

//Nav appears on scroll up.
let scrollThrottle = 250,
throttled = false,
lastScrollY = 0,
scrollDirection = 0,
ticking = false;

navScroll = () =>
{
let scrollY = (window.scrollY < 0) ? 0 : window.scrollY;
let diff = lastScrollY - scrollY;

scrollDirection = diff / Math.abs(diff);
lastScrollY = scrollY;

requestTick(scrollY);
}

requestTick = (scrollY) =>
{

if(!ticking)
{
    scroll(function(){navAnimate(scrollY)});

    ticking = true;
}
}

//STICKY LOGO ON SCROLL WITH BANNER

let navHasAnimated = false;

navAnimate = (scrollY) =>
{
if(!$(document.body).hasClass('mobile-nav-active'))
{
    if(scrollY === 0)
    {
        if($('#navscroll-container').hasClass('scrollVisible'))
        {
            $('#navscroll-container').removeClass('scrollVisible readyOut');
        }
    }
    else
    {
        if(scrollDirection > 0)
        {
            if(!$('#navscroll-container').hasClass('scrollVisible'))
            {
                $('#navscroll-container').removeClass('readyOut').addClass('readyIn');

                setTimeout(function()
                {
                    $('#navscroll-container').addClass('scrollVisible');
                    $('#navscroll-container').removeClass('readyIn');
                }, 0);
            }
        }
        else
        {
            if(scrollY > 142 && !navHasAnimated){
                $('#navscroll-container').addClass('readyOut');
                navHasAnimated = true;
            }

            if($('#navscroll-container').hasClass('scrollVisible'))
            {
                $('#navscroll-container').addClass('readyOut');

                setTimeout(function()
                {
                    $('#navscroll-container').removeClass('scrollVisible'); 
                }, 300);
            }

        }
    }

    ticking = false;
}
}

let isContact = document.getElementById('contact');

if(!isContact){
    window.addEventListener('scroll', navScroll, false);
}

//Barba page transition functions. 
verticalTransition = (data, dir) => {

    if(dir === 'up'){
        let tl = gsap.timeline({onComplete: () => {
            $(data.current.container).css({'opacity' : '0'});
        }});

        $('#footer').css({'opacity' : '0'});
        tl.to('#animation-pane-vertical', {duration: .8, scaleY: 1, transformOrigin: 'bottom', ease: Power2.easeInOut });
        tl.to('#animation-pane-asset', {duration: .2, opacity: 1, delay: 0, ease: Power2.easeIn});

    }

    if(dir === 'down'){
        let tl = gsap.timeline({onComplete: () => {
            $('#footer').css({'opacity' : '1'});
        }});

        //move pane to top of viewport
        tl.to('#animation-pane-asset', {duration: .2, opacity: 0, delay: 1, ease: Power2.easeIn});
        tl.to('#animation-pane-vertical', {duration: .4, scaleY: 0, transformOrigin: 'top', delay: .2, ease: Power2.easeInOut});
    }
}

//BLOG LOAD MORE
function blogLoadMore() {
    let pageCounter = 1;
    let button = $('#more_posts'),
        data = {
            'action': 'get_blog_posts', //defined in functions file, don't need to include wp_ajax part
            'pageCounter' : pageCounter
        };

    $.ajax({
        url : loadmore_params.ajaxurl, // AJAX handler
        data : data,
        dataType: 'json',
        type : 'POST',
        beforeSend : function ( xhr ) {
            $('#more_posts').addClass('active');
        },
        success : function( data ){
            if( data ) {
                let totalPosts = data.total;

                $('.grid.article .row').append(data.html);
                $('#more_posts').removeClass('active');

                let postCount = $('.card.article').length;

                if ( postCount == totalPosts ){
                    button.remove(); // if out of posts, remove the button
                }
            } else {
                button.remove();
            }
            pageCounter++;
        }
    });
}

//if we are on the blog grid page and button exists
if(document.getElementById('more_posts')){
    $('#more_posts').on('click', function(e){
        e.preventDefault();
        blogLoadMore();
    });
}


//FORM SUCCESS TRANSITION ANIMATION
function formSuccessTransition(){
    var tl = gsap.timeline();

    //slide pane up
    tl.to('#form-success-pane', {duration: .7, scaleY: 1, transformOrigin: 'bottom', ease: Power2.easeIn});
    //scroll up!
    $("html, body").animate({ scrollTop: 0 }, "slow");
    //fade in inner matter
    tl.to('#form-success-pane .inner h1', {duration: .5, opacity: 1, delay: .3, ease: Power2.easeIn});
    tl.to('#form-success-pane .inner .btn', {duration: .5, opacity: 1, ease: Power2.easeIn});
    tl.to('#form-success-pane .inner .logo', {duration: .5, opacity: 1, ease: Power2.easeIn});
}

// SCROLL TO ANCHOR FUNC
function scrollToAnchor(e){
    let scrollTo = $(e.target).attr('data-scrollTo');
    if(scrollTo){
        let scrollTarget = $(scrollTo);
        let offsetTop = $(scrollTarget).offset().top;
        let adjustedOffset = offsetTop;

        $("html, body").animate({ scrollTop: adjustedOffset }, 700, 'easeOutCubic');
    }
}


// WAITLIST MODAL FUNCTION
let headerBtn = $('#header .header-waitlist-btn');

$(headerBtn).on('click', function(e){
    e.preventDefault();
    let waitlist = document.getElementById('waitList');

    //if there is a form on this page scroll to it
    if(waitlist){
        scrollToAnchor(e);
    } else {
        $("#waitlistModal").modal();
    }
});

//NAV PANE MODAL FUNCTION 
let paneBtn = $('#nav-pane .pane-waitlist-btn')

$(paneBtn).on('click', function(e){
    let waitlist = document.getElementById('waitList');
    e.preventDefault();
    navClose();

    //if there is a form on this page scroll to it
    if(waitlist){
        scrollToAnchor(e);
    } else {
        $("#waitlistModal").modal();
    }
});

//HERO WAITLIST BTN FUNCTION
let heroBtn = $('.desktop-waitlist.btn');

$(heroBtn).on('click', function(e){
    let waitlist = document.getElementById('waitList');
    e.preventDefault();

    if(waitlist){
        scrollToAnchor(e);
    } else {
        $("#waitlistModal").modal();
    }
});

// ENDORSEMENT SLIDER
let sliderBtn = $('.slider-nav-btn');

if(sliderBtn)
{
    let images = $('.accent-image');
    let details = $('.details-block');

    $(sliderBtn).on('click', function(e)
    {
        let slideIndex = $(e.target).data('slide');

        // Disable current active elements
        $(sliderBtn).removeClass('active');
        $(images).removeClass('active');
        $(details).removeClass('active');

        // Activate elements
        $(e.target).addClass('active');
        $('img.accent-image[data-slide="'+ slideIndex +'"]').addClass('active');
        $('.details-block[data-slide="'+ slideIndex +'"]').addClass('active');
    });
}

let ingredientsDisplay = $(".ingredients-list-display");
// INGREDIENTS LIST DISPLAY CLICK HANDLER - MOBILE
if(ingredientsDisplay){
    let ingredientListSelect = $("#ingredients");
    let ingredientDescriptions = $(".ingredient-description-item");

    ingredientListSelect.on("change", function(e){
        let value = $(e.target).val();

        ingredientDescriptions.removeClass('active');
        for(let i = 0; i < ingredientDescriptions.length; i++){
            let descriptionData = $(ingredientDescriptions[i]).data('ingredient');
            if(descriptionData === value){
                $(ingredientDescriptions[i]).addClass('active');
            }
        }
    });
}

// INGREDIENTS LIST DISPLAY CLICK HANDLER - DESKTOP

if(ingredientsDisplay){
    let ingredientListItems = $(".ingredient-list-item");
    let ingredientDescriptions = $(".ingredient-description-item");

    ingredientListItems.on("click", function(e){
        let data = $(e.target).data('ingredient');

        ingredientListItems.removeClass('active');
        ingredientDescriptions.removeClass('active');
        $(e.target).addClass('active');

        for(let i = 0; i < ingredientDescriptions.length; i++){
            let descriptionData = $(ingredientDescriptions[i]).data('ingredient');
            if(descriptionData === data){
                $(ingredientDescriptions[i]).addClass('active');
            }
        }
    });
}


//
//
// FUNCTIONS THAT REQUIRE RE-INIT WITH BARBA
//
//

// FORM - CHANGE BODY TO SUCCESS MESSAGE ON SUCCESSFUL SUBMIT
class formSubmit {
    constructor() {
        if(document.formSubmitCallback){
            document.removeEventListener('wpcf7mailsent', document.formSubmitCallback);
        }

        if($(document.body).hasClass('page-id-224')){
            document.formSubmitCallback = this.formSubmit.bind(this);
            document.addEventListener('wpcf7mailsent', document.formSubmitCallback);
        }
    }

    formSubmit(){
        formSuccessTransition();
    }
}
new formSubmit;

//JQUERY EASING 
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});