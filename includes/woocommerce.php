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