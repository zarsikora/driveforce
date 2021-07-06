<?php

function df_get_product_object()
{
    $bundleID = $_POST['bundleID'];
    $product = wc_get_product($bundleID);

    $returnObj = array(
        'product' => json_decode($product)
    );

    echo json_encode($returnObj);
    wp_die();
}
add_action('wp_ajax_df_get_product_object', 'df_get_product_object');
add_action('wp_ajax_nopriv_df_get_product_object', 'df_get_product_object');

function df_add_product_to_cart()
{
    $productID = $_POST['productID'];
    $quantity = $_POST['quantity'];

    $product = WC()->cart->add_to_cart($productID, $quantity, '', '', '');

    echo json_encode($product);
    wp_die();
}
add_action('wp_ajax_df_add_product_to_cart', 'df_add_product_to_cart');
add_action('wp_ajax_nopriv_df_add_product_to_cart', 'df_add_product_to_cart');

function df_get_cart_data()
{
    $cartItems = WC()->cart->get_cart();
    $cartTotals = WC()->cart->get_totals();
    $totalItems = WC()->cart->get_cart_contents_count();
    $cartProducts = [];
    $cartDrawerProductsHTML = '';

    foreach(WC()->cart->get_cart() as $cart_item_key => $cart_item)
    {
        $data = $cart_item['data'];
        $item = WC()->cart->get_cart_item($cart_item_key);

        $cartProducts[] = array(
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

    ob_start();

    foreach($cartProducts as $item)
    {
        include(__DIR__ . '/../components/cart-drawer-product.php');
    }

    $cartDrawerProductsHTML .= ob_get_contents();
    ob_end_clean();

    echo json_encode([
        'cart_count' => $totalItems,
        'cart_items' => $cartItems,
        'cart_totals' => $cartTotals,
        'cart_contents' => $cartContents,
        'cart_drawer_products_html' => $cartDrawerProductsHTML
    ]);
    wp_die();
}
add_action('wp_ajax_df_get_cart_data', 'df_get_cart_data');
add_action('wp_ajax_nopriv_df_get_cart_data', 'df_get_cart_data');