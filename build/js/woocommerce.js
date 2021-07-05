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