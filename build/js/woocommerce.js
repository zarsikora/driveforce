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
            console.log(data);

            // Hide empty contents
            if(data.cart_count) $('.cart-drawer-inner').addClass('has-items');

            // Update cart icon counter
            const totalText = $('#header .open-cart-drawer .cart-total .total');
            if(totalText.length) totalText.text(data.cart_count);
            if(!totalText.length) $('<span class="cart-total"><span class="total">'+ data.cart_count +'</span></span>').appendTo($('#header .open-cart-drawer'));

            // Update products
            const newElements = $(data.cart_drawer_products_html);
            $('.cart-drawer-products').empty().append(newElements);

            // Add custom quantity input to new elements
            newElements.each(function(){ console.log($(this)); new dfCustomQuantityInput($('.quantity', $(this))) });

            // Update subtotal
            $('.cart-drawer-totals .cart-subtotal').text('$' + data.cart_totals.subtotal);

            // Success modal message
            if(notificationMessage)
            {
                notificationModal.showModal(notificationMessage);
            }
        }
    })
}

function dfCustomQuantityInput(quantity)
{
    this.spinner = quantity;
    this.input = this.spinner.find('input[type="number"]');
    this.btnUp = this.spinner.find('.quantity-up');
    this.btnDown = this.spinner.find('.quantity-down');
    this.min = this.input.attr('min');
    this.max = (this.input.attr('max')) ? this.input.attr('max') : 100;

    this.updateOnClick = this.spinner.parents('.cart-drawer').length;

    this.spinner.on('click', '.quantity-up', function(e) {
        this.handleIncrease(e);
    }.bind(this));

    this.spinner.on('click', '.quantity-down', function(e) {
        this.handleDecrease(e);
    }.bind(this));

    this.insertButtons = function()
    {
        $('<div class="quantity-nav"><a href="#" class="quantity-button quantity-up">+</a><a href="#" class="quantity-button quantity-down">-</a></div>').insertAfter($('input', this.spinner));
    }

    this.handleIncrease = function(e)
    {
        e.preventDefault();

        let oldValue = parseFloat(this.input.val());
        const cartItemKey = this.spinner.parents('.cart-drawer-product').attr('data-cart-item-key');

        var newVal = (oldValue >= this.max) ? oldValue : oldValue + 1;

        this.input.val(newVal);
        this.input.trigger("change");

        if(this.updateOnClick)
        {
            if(!newVal)
            {
                removeFromCart(this.spinner.parents('.cart-drawer-product'), cartItemKey);
                return;
            }

            updateQuantity(cartItemKey, newVal);
        }
    }

    this.handleDecrease = function(e)
    {
        e.preventDefault();

        var oldValue = parseFloat(this.input.val());
        const cartItemKey = this.spinner.parents('.cart-drawer-product').attr('data-cart-item-key');

        var newVal = (oldValue <= this.min) ? oldValue : oldValue - 1;

        this.input.val(newVal);
        this.input.trigger("change");

        if(this.updateOnClick)
        {
            if(!newVal)
            {
                removeFromCart(this.spinner.parents('.cart-drawer-product'), cartItemKey);
                return;
            }

            updateQuantity(cartItemKey, newVal);
        }
    }

    this.insertButtons();
}

/**
 * Removes a product from the cart and updated visual subtotal in the cart drawer
 * If there are 0 products remaining in the cart after a removal, the empty cart message will display in the cart drawer
 * @param product
 * @param cartItemKey
 */
function removeFromCart(product, cartItemKey)
{
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
            product.remove();

            updateCartDrawerTotal(data.data.cartTotals);

            if(data.data.cartTotal == 0)
            {
                $('.cart-drawer-inner').removeClass('has-items');
            }
        },
        error: function(error)
        {
            console.log(error);
        }
    })
}

/**
 * Updates the quantity of a product in the cart drawer and updates the visual subtotal
 * @param cartItemKey
 * @param quantity
 */
function updateQuantity(cartItemKey, quantity)
{
    $.ajax({
        url: localized_vars.ajaxurl,
        method: 'post',
        dataType: 'json',
        data: {
            action: 'df_update_cart_item_quantity',
            cartItemKey: cartItemKey,
            quantity: quantity
        },
        success: function(data)
        {
            updateCartDrawerTotal(data.data.cartTotals);
        },
        error: function(error)
        {
            console.log(error);
        }
    })
}