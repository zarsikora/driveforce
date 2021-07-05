<?php
//function plugin_republic_add_cart_item_data($cart_item_data, $product_id, $variation_id)
//{
//    $activeScheme = $_POST['purchaseType'];
//
//    if(!$activeScheme) return $cart_item_data;
//
//    $cart_item_data['wcsatt_data']['active_subscription_scheme'] = $activeScheme;
//
//    return $cart_item_data;
//}
//add_filter('woocommerce_add_cart_item_data', 'plugin_republic_add_cart_item_data', 10, 3);

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

function fast_checkout()
{
    global $woocommerce;

    $prodID = $_POST['prodID'];

    $woocommerce->cart->add_to_cart($prodID, 1);

    echo json_encode($woocommerce->cart);
    wp_die();
}
add_action('wp_ajax_fast_checkout', 'fast_checkout');
add_action('wp_ajax_nopriv_fast_checkout', 'fast_checkout');