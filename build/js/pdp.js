window.$ = window.jQuery = jQuery;

const df18AddBundleToCartButton = $('.df18_add_bundle_to_cart');

if(df18AddBundleToCartButton.length)
{
    const df18BundleSelect = $('.bundle-select');

    df18AddBundleToCartButton.on('click', function(e)
    {
        const selectedBundle = $('option:selected', df18BundleSelect);
        const bundleID = selectedBundle.data('id');
        const quantity = $('.quantity input.qty').val();

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
                if(!data) console.log('there was a problem adding the item to your cart');

                // Update cart drawer

                // Update cart icon count
            },
            error: function(error)
            {
                console.log(error);
            }
        })
    });
}