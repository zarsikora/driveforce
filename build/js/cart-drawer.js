window.$ = window.jQuery = jQuery;

const removeProductButtons = $('.cart-drawer-remove-product');

if(removeProductButtons.length)
{
    removeProductButtons.on('click', function(e)
    {
        const _this = $(e.target);
        const cartItemKey = _this.parents('.cart-drawer-product').attr('data-cart-item-key');

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

                // Remove html
                _this.parents('.cart-drawer-product').remove();

                // Update totals

                // If no products, display empty cart message
            },
            error: function(error)
            {
                console.log(error);
            }
        });

        e.preventDefault();
    });
}

const subscriptionToggles = $('.cart-drawer-product .subscribe-toggle');

if(subscriptionToggles.length)
{
    subscriptionToggles.on('click', function(e)
    {
        const toggle = $(e.target).siblings('input');
        const product = toggle.parents('.cart-drawer-product');
        const cartItemKey = product.attr('data-cart-item-key');
        const purchaseType = !toggle.is(':checked') ? '1_month' : '';

        $.ajax({
            url: localizedVars.ajaxurl,
            method: 'post',
            dataType: 'json',
            data: {
                action: 'df_update_cart_item',
                cart_item_key: cartItemKey,
                purchase_type: purchaseType
            },
            success: function(data)
            {
                console.log('success');
                console.log(data);

                // Update cart item data key
                product.attr('data-cart-item-key', data.data.newKey);

                // Update item price
                // console.log($('.product-price', product));
                $('.product-price', product).text(data.data.price);

                // Update totals
                $('.cart-drawer-totals .cart-subtotal').text('$' + data.data.newTotal.subtotal);
                $('.cart-drawer-totals .cart-total').text('$' + data.data.newTotal.total);
            },
            error: function(error)
            {
                console.log('error');
                console.log(error);
            }
        });
    });
}