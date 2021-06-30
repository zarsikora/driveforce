<div id="cart-drawer" class="cart-drawer">
    <?php
    $cartCount = WC()->cart->get_cart_contents_count();
    $cartSubtotal = WC()->cart->get_cart_subtotal();
    $shippingTotal = WC()->cart->get_shipping_total();
    $cartTax = WC()->cart->get_cart_contents_tax();
    $cartTotal = WC()->cart->get_total();
    $cartItems = array();

    foreach(WC()->cart->get_cart() as $cart_item_key => $cart_item)
    {
        $data = $cart_item['data'];
        $item = WC()->cart->get_cart_item($cart_item_key);

        $cartItems[] = array(
            'cartItemKey' => $cart_item_key,
            'productName' => $data->get_name(),
            'productID' => $cart_item['product_id'],
            'image' => $data->get_image(),
            'quantity' => $cart_item['quantity'],
            'price' => '$'.number_format((float)$data->get_price(), 2, '.', ''),
            'subtotal' => WC()->cart->get_product_subtotal($data, $cart_item['quantity']),
            'permalink' => $data->get_permalink($cart_item),
            'purchaseType' => $item['wcsatt_data']['active_subscription_scheme']
        );
    }
    ?>
    <div class="cart-drawer-inner <?php if($cartItems){ echo 'has-items'; }?>">
        <div class="cart-drawer-header">
            <svg width="28" viewBox="0 0 27.644 22.64">
                <use href="#cart"></use>
            </svg>
            <p>Cart</p>
            <a class="close-cart-drawer" href="#">
                <svg width="17" viewBox="0 0 16.256 16.256">
                    <use href="#cart-close"></use>
                </svg>
            </a>
        </div>
        <div class="cart-drawer-scroll">

            <div class="cart-drawer-empty">
                <p>Your cart is currently empty.</p>
                <?php echo button(get_bloginfo('url').'/product/df-18', 'Shop DF-18', 'btn thin-btn', '', ''); ?>
            </div>

            <div class="cart-drawer-products">

                <?php foreach($cartItems as $item) { ?>

                    <div class="cart-drawer-product" data-cart-item-key="<?php echo $item['cartItemKey']; ?>">
                        <div class="product-info">
                            <div class="image">
                                <?php echo $item['image'] ?>
                            </div>
                            <div>
                                <p class="product-name">
                                    <?php echo $item['productName'] ?>
                                </p>
                                <div class="quantity">
                                    <input type="number" min="0" max="10" value="<?php echo $item['quantity']; ?>" />
                                </div>
                            </div>
                        </div>
                        <div class="product-total">
                            <a class="cart-drawer-remove-product" href="#">
                                <svg width="16" height="16" viewBox="0 0 16 16">
                                    <use href="#trash-icon"></use>
                                </svg>
                            </a>
                            <p class="product-price"><?php echo $item['price']; ?></p>
                        </div>
                        <div class="product-subscribe">
                            <p>
                                <strong>Subscribe & Save 20%</strong><br />
                                Monthly Subscription; Change or cancel any time
                            </p>
                            <label>
                                <input type="checkbox" <?php if($item['purchaseType']){ echo 'checked'; }?> />
                                <span class="subscribe-toggle"></span>
                            </label>
                        </div>
                    </div>

                <?php } ?>
            </div>

            <div class="cart-drawer-totals">
                <dl>
                    <dt>Subtotal</dt>
                    <dd class="cart-subtotal"><?php echo $cartSubtotal ?></dd>

                    <dt>Shipping</dt>
                    <dd class="cart-shipping">$<?php echo number_format((float)$shippingTotal, 2, '.', ''); ?></dd>
                </dl>
            </div>
        </div>
    </div>

    <div class="cart-drawer-checkout">
        <?php echo button(get_bloginfo('url') . '/checkout', 'Secure Checkout', '', null, ''); ?>
        <span class="tax-note">Tax calculated at checkout</span>
    </div>
</div>
<div class="cart-drawer-overlay"></div>