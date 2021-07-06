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

// Get cart data
function getCartData()
{
    try {
        return $.ajax({
            url: localized_vars.ajaxurl,
            method: 'post',
            dataType: 'json',
            async: false,
            data: {
                action: 'df_get_cart_data'
            },
            error: function(err)
            {
                console.log(err);
            }
        })
    }
    catch(err) {
        console.log(err);
    }
}

function updateCartDrawer(notificationMessage)
{
    $cart = getCartData();

    $cart.done(function(data)
    {
        if(data)
        {
            // Update cart icon counter
            const totalText = $('#header .open-cart-drawer .cart-total .total');
            if(totalText.length) totalText.text(data.cart_count);
            if(!totalText.length) $('<span class="cart-total"><span class="total">'+ data.cart_count +'</span></span>').appendTo($('#header .open-cart-drawer'));

            // Update products

            // Update totals

            // Success modal message
            if(notificationMessage)
            {
                notificationModal.showModal(notificationMessage);
            }
        }
    })
}