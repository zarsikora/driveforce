<?php

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

    echo json_encode(['cart_count' => $totalItems, 'cart_items' => $cartItems, 'cart_totals' => $cartTotals]);
    wp_die();
}
add_action('wp_ajax_df_get_cart_data', 'df_get_cart_data');
add_action('wp_ajax_nopriv_df_get_cart_data', 'df_get_cart_data');