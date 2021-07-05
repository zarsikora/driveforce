window.$ = window.jQuery = jQuery;

const df18AddBundleToCartButton = $('.df18_add_bundle_to_cart');

if(df18AddBundleToCartButton.length)
{
    const df18BundleSelect = $('.bundle-select');

    df18AddBundleToCartButton.on('click touch', function(e)
    {
        const selectedBundle = $('option:selected', df18BundleSelect);
        const bundleID = selectedBundle.data('id');
        const quantity = $('.quantity input.qty').val();

        const _this = $(this);

        // Disable button so it can't be mashed
        _this.prop('disabled', true);

        $.ajax({
            url: localized_vars.ajaxurl,
            type: 'post',
            dataType: 'json',
            data: {
                action: 'df_add_product_to_cart',
                productID: bundleID,
                quantity: quantity
            },
            success: function(data)
            {
                _this.prop('disabled', false);

                if(!data) console.log('there was a problem adding the item to your cart');

                // Update cart drawer
                const cartData = getCartData();

                cartData.done(function(data)
                {
                    if(data)
                    {
                        const totalText = $('#header .open-cart-drawer .cart-total .total');

                        if(totalText.length) totalText.text(data.cart_count);
                        if(!totalText.length) $('<span class="cart-total"><span class="total">'+ data.cart_count +'</span></span>').appendTo($('#header .open-cart-drawer'));

                        // Success modal message
                        notificationModal.showModal('DF-18 has been added to your cart!');
                    }
                });
            },
            error: function(error)
            {
                console.log(error);
            }
        })
    });
}