window.$ = window.jQuery = jQuery;

const cartDrawerButton = $('.open-cart-drawer');

$('body').on('mouseenter', '.cart-drawer-overlay', function(e)
{
    if($('body').hasClass('cart-drawer-closeable')) {
        $('body').removeClass('cart-drawer-open cart-drawer-closeable');
    }
});

cartDrawerButton.on('click', function(e)
{
    e.preventDefault();

    $('body').addClass('cart-drawer-open');

    setTimeout(function()
    {
        $('body').addClass('cart-drawer-closeable');
    }, 500);
});

const closeCartDrawer = $('.close-cart-drawer');

closeCartDrawer.on('click', function(e)
{
    e.preventDefault();

    $('body').removeClass('cart-drawer-open cart-drawer-closeable');
});

const removeProductButtons = $('.cart-drawer-remove-product');

$('.cart-drawer').on('click', '.cart-drawer-remove-product', function(e)
{
    console.log('remove');
    const _this = $(e.target);
    const cartItemKey = _this.parents('.cart-drawer-product').attr('data-cart-item-key');

    $.ajax({
        url: localized_vars.ajaxurl,
        method: 'post',
        dataType: 'json',
        data: {
            action: 'df_remove_product_from_cart',
            cartItemKey: cartItemKey
        },
        success: function(data)
        {
            const cartTotals = data.data.cartTotals;

            // Remove html
            _this.parents('.cart-drawer-product').remove();

            updateCartDrawerTotal(cartTotals);

            // If no products, display empty cart message
            if(cartTotals.total == 0)
            {
                $('.cart-drawer-inner').removeClass('has-items');
            }
        },
        error: function(error)
        {
            console.log(error);
        }
    });

    e.preventDefault();
});

const subscriptionToggles = $('.cart-drawer-product .subscribe-toggle');

$('.cart-drawer').on('click', '.cart-drawer-product .subscribe-toggle', function(e)
{
    const toggle = $(e.target).siblings('input');
    const product = toggle.parents('.cart-drawer-product');
    const cartItemKey = product.attr('data-cart-item-key');
    const purchaseType = !toggle.is(':checked') ? '1_month' : '';

    $.ajax({
        url: localized_vars.ajaxurl,
        method: 'post',
        dataType: 'json',
        data: {
            action: 'df_update_cart_item',
            cart_item_key: cartItemKey,
            purchase_type: purchaseType
        },
        success: function(data)
        {
            console.log(data);
            const cartTotals = data.data.cartTotals;

            // Update cart item data key
            product.attr('data-cart-item-key', data.data.newKey);

            // Update item price
            $('.product-price', product).text(data.data.price);

            // Update totals
            updateCartDrawerTotal(cartTotals);
        },
        error: function(error)
        {
            console.log(error);
        }
    });
});

function updateCartDrawerTotal(totals = [])
{
    $('.cart-drawer-totals .cart-subtotal').text('$' + totals.subtotal);
}