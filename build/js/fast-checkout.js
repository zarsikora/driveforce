window.$ = window.jQuery = jQuery;

const environment = localized_vars['environment'];

const variantIDs = [640, 641, 642];

const fastCheckout = $('.fast-checkout');
// const fastCheckoutSelect = $('select[name="fast-checkout-variant"]');
const fastCheckoutSelect = $('.fast-checkout-variant-select .selected-option');
const fastCheckoutSelectOptions = $('.fast-checkout-variant-select .dropdown a');
const fastCheckoutSubmit = $('.fast-checkout-submit');
const fastCheckoutPurchaseType = $('input[name="fast-checkout-purchase-type"]');
const fastCheckoutMobileClose = $('.fast-checkout .header .close');
const fastCheckoutMobileOpen = $('.fast-checkout-mobile-bar .arrow');
const fastCheckoutMobileButtons = $('.fast-checkout-variant-select .mobile .btn');

let selectDropdownOpen = false;

if(fastCheckoutSelect)
{
    let option1 = $('.fast-checkout-purchase-option.option1');
    let option2 = $('.fast-checkout-purchase-option.option2');

    function updateSelectedOption(variantID)
    {
        const selectedType = $('input[name="fast-checkout-purchase-type"]:checked').val();
        const type = (selectedType == '1_month') ? 'Monthly Subscription' : 'One Time Purchase';
        const product = (variantID === variantIDs[0]) ? 'DF-18 Pro 30 Pack' : (variantID === variantIDs[1]) ? 'DF-18 Amateur 20 Pack' : 'DF-18 Weekend Warrior 10 Pack';

        $('.fast-checkout-variant-select .selected-product').text(product);
        $('.fast-checkout-variant-select .selected-type').text(type);
    }

    function updatePurchaseTypes(data)
    {
        console.log(data);

        const discount = data.scheme[0].subscription_discount;
        const price = data.variation.display_price;
        const subscriptionPrice = price - ((discount / 100) * price);

        $('.subscribe-price', option1).text('$'+subscriptionPrice);
        $('.regular-price', option1).text('$'+price);
        $('.regular-price', option2).text('$'+price);
    }

    function getProductObject(variantID)
    {
        const prodID = 581; // Should this be hardcoded? For now with one product it should be fine

        // Get product object
        $.ajax({
            url: localized_vars.ajaxurl,
            method: 'post',
            dataType: 'json',
            data: {
                action: 'df_get_product_object',
                prodID: prodID,
                variationID: variantID
            },
            success: function(data)
            {
                console.log(data);

                updatePurchaseTypes(data);
                updateSelectedOption(data.variation.variation_id);
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    }

    $('body').on('mousemove', function(e)
    {
        if(!selectDropdownOpen) return;

        if(!$(e.target).parents('.fast-checkout-variant-select .select').length && !$(e.target).hasClass('select'))
        {
            $('.fast-checkout-variant-select .dropdown').removeClass('active');
            selectDropdownOpen = false;
        }
    });

    fastCheckoutMobileClose.on('click', function(e)
    {
        e.preventDefault();

        $('body').removeClass('fast-checkout-mobile-open');
    });

    fastCheckoutMobileOpen.on('click', function(e)
    {
        e.preventDefault();

        $('body').addClass('fast-checkout-mobile-open');
    });

    fastCheckoutSelect.on('click', function(e)
    {
        e.preventDefault();

        $(this).nextAll('.dropdown').addClass('active');
        selectDropdownOpen = true;
    });

    fastCheckoutSelectOptions.on('click', function(e)
    {
        e.preventDefault();

        // Close dropdown
        $(this).parents('.dropdown').removeClass('active');
        selectDropdownOpen = false;

        // Update selected variant id
        fastCheckoutSelect.attr('data-variant-id', $(this).attr('data-variant-id'));

        // Get variant object
        getProductObject($(this).attr('data-variant-id'));
    });

    fastCheckoutMobileButtons.on('click', function(e)
    {
        e.preventDefault();

        fastCheckoutMobileButtons.removeClass('selected');
        $(this).addClass('selected');

        // Update selected variant id
        fastCheckoutSelect.attr('data-variant-id', $(this).attr('data-variant-id'));

        getProductObject($(this).attr('data-variant-id'));
    });

    // Purchase type change handler
    fastCheckoutPurchaseType.on('change', function()
    {
        const purchaseType = ($(this).val() === '1_month') ? 'Monthly Subscription' : 'One-time purchase';

        $('.fast-checkout-mobile-bar .purchase .subscription').text(purchaseType);
        $('.fast-checkout-variant-select .selected-type').text(purchaseType);
    });

    // Proceed to checkout
    fastCheckoutSubmit.on('click', function(e)
    {
        e.preventDefault();

        const variantID = fastCheckoutSelect.attr('data-variant-id');
        const prodID = 581; // Should this be hardcoded? For now with one product it should be fine
        const purchaseType = $('input[name="fast-checkout-purchase-type"]:checked').val();

        $.ajax({
            url: localized_vars.ajaxurl,
            method: 'post',
            dataType: 'json',
            data: {
                action: 'fast_checkout',
                prodID: prodID,
                variantID: variantID,
                purchaseType: purchaseType
            },
            success: function(data)
            {
                console.log(data);

                window.location = '/checkout';
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    });

    if($('body').is('.home, .single-product'))
    {
        const triggerElement = $('body').hasClass('home') ? $('.product-intro-module .btn') : $('.benefits-module');
        const triggerPoint = triggerElement[0].offsetTop + triggerElement[0].offsetHeight - window.innerHeight;

        $(window).on('scroll', function(e)
        {
            if(window.pageYOffset > triggerPoint)
            {
                $('body').addClass('fast-checkout-active');
                return;
            }
            $('body').removeClass('fast-checkout-active');
        });
    }
}