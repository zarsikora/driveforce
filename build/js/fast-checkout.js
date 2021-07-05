window.$ = window.jQuery = jQuery;

const environment = localized_vars['environment'];
const variantIDs = [640, 641, 642];
const fastCheckout = $('.fast-checkout');
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

    // Update selected product name and type
    function updateSelectedOption(bundle)
    {
        $('.fast-checkout-variant-select .selected-product').text(bundle.name);
        $('.fast-checkout-purchase-option.option2 .regular-price').text('$' + bundle.price);
    }

    // Get product object
    function getProductObject(bundleID)
    {
        try {
            // Get product object
            return $.ajax({
                url: localized_vars.ajaxurl,
                method: 'post',
                dataType: 'json',
                async: false,
                data: {
                    action: 'df_get_product_object',
                    bundleID: bundleID
                },
                error: function(err)
                {
                    console.log(err);
                }
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    // Close dropdown on mousemove
    $('body').on('mousemove', function(e)
    {
        if(!selectDropdownOpen) return;

        if(!$(e.target).parents('.fast-checkout-variant-select .select').length && !$(e.target).hasClass('select'))
        {
            $('.fast-checkout-variant-select .dropdown').removeClass('active');
            selectDropdownOpen = false;
        }
    });

    // Mobile close button handler
    fastCheckoutMobileClose.on('click', function(e)
    {
        e.preventDefault();

        $('body').removeClass('fast-checkout-mobile-open');
    });

    // Mobile open button handler
    fastCheckoutMobileOpen.on('click', function(e)
    {
        e.preventDefault();

        $('body').toggleClass('fast-checkout-mobile-open')
    });

    // Select option click handler
    fastCheckoutSelect.on('click', function(e)
    {
        e.preventDefault();

        $(this).nextAll('.dropdown').addClass('active');
        selectDropdownOpen = true;
    });

    // Select option click handler
    fastCheckoutSelectOptions.on('click', function(e)
    {
        e.preventDefault();

        // Close dropdown
        $(this).parents('.dropdown').removeClass('active');
        selectDropdownOpen = false;

        // Update selected variant id
        fastCheckoutSelect.attr('data-bundle-id', $(this).attr('data-bundle-id'));

        // Get variant object
        let prodData = getProductObject($(this).attr('data-bundle-id'));

        prodData.always(function(bundle)
        {
            const prod = bundle.product;

            $('.fast-checkout-purchase-option.option2 .regular-price').text('$' + prod.price);

            updateSelectedOption(prod);
        });
    });

    // Mobile bundle selection click handler
    fastCheckoutMobileButtons.on('click', function(e)
    {
        e.preventDefault();

        fastCheckoutMobileButtons.removeClass('selected');

        $(this).addClass('selected');

        // Update selected variant id
        fastCheckoutSelect.attr('data-bundle-id', $(this).attr('data-bundle-id'));

        // Updated selected name
        let name = $(this).text();
        $('.fast-checkout-mobile-bar .purchase .product').text(name);

        // Update subtotal
        let prodData = getProductObject($(this).attr('data-bundle-id'));

        prodData.always(function(data)
        {
            const prod = data.product;

            $('.fast-checkout-purchase-option.option2 .regular-price').text('$' + prod.price);
        });
    });

    // Purchase type change handler
    fastCheckoutPurchaseType.on('change', function()
    {
        const purchaseType = ($(this).val() === '1_month') ? 'Monthly Subscription' : 'One-time purchase';

        $('.fast-checkout-mobile-bar .purchase .subscription').text(purchaseType);
        $('.fast-checkout-variant-select .selected-type').text(purchaseType);
    });

    // Proceed to checkout handler
    fastCheckoutSubmit.on('click', function(e)
    {
        e.preventDefault();

        const prodID = fastCheckoutSelect.data('bundle-id');

        $.ajax({
            url: localized_vars.ajaxurl,
            method: 'post',
            dataType: 'json',
            data: {
                action: 'fast_checkout',
                prodID: prodID
            },
            success: function(data)
            {
                window.location = '/checkout';
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    });

    // Open fast checkout on scroll
    if($('body').is('.home, .single-product'))
    {
        const triggerElement = $('body').hasClass('home') ? $('.product-intro-module .btn') : $('.benefits-module');

        if(triggerElement.length)
        {
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
}