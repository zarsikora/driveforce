window.$ = window.jQuery = jQuery;

const df18AddBundleToCartButton = $('.df18_add_bundle_to_cart');

if(df18AddBundleToCartButton.length)
{
    const df18BundleSelect = $('.bundle-select');
    const priceDiv = $('.summary .bundle-price');
    const bundleNameDiv  = $('.product-bundle-name');

    // Update bundle price on select
    df18BundleSelect.on('change', function(e)
    {
        const price = $('option:selected', $(this)).data('price');
        const bundleName = $('option:selected', $(this)).data('bundle-name');

        priceDiv.text(price);
        bundleNameDiv.text(bundleName);
    });

    df18AddBundleToCartButton.on('click touch', function(e)
    {
        const selectedBundle = $('option:selected', df18BundleSelect);
        const bundleID = selectedBundle.data('id');
        const quantity = $('.quantity input.qty').val();
        const prodType = selectedBundle.data('type');
        const _this = $(this);

        // Disable button so it can't be mashed
        _this.prop('disabled', true);

        $.ajax({
            url: localized_vars.ajaxurl,
            type: 'post',
            dataType: 'json',
            data: {
                action: 'df_add_product_to_cart',
                prodID: bundleID,
                quantity: quantity,
                prodType: prodType
            },
            success: function(data)
            {
                _this.prop('disabled', false);

                console.log(data);

                if(!data)
                {
                    console.log('there was a problem adding the item to your cart');
                    return;
                }

                const cartData = getCartData();

                cartData.done(function(data)
                {
                    if(data)
                    {
                        updateCartDrawer('DF-18 has been added to your cart!');

                        const productObject = getProductObject(bundleID);

                        productObject.done(function(prod)
                        {
                            console.log(prod);

                            if(!prod) return;

                            dataLayer.push({ecommerce: null});
                            dataLayer.push({
                                'event': 'add_to_cart',
                                'ecommerce': {
                                    'value': parseFloat(prod['product']['price'] * quantity),
                                    'currency': 'USD',
                                    'items': [
                                        {
                                            item_id: prod['product']['id'],
                                            item_name: prod['product']['name'],
                                            currency: 'USD',
                                            price: parseFloat(prod['product']['price']),
                                            quantity: parseInt(quantity)
                                        }
                                    ]
                                }
                            });
                        });
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