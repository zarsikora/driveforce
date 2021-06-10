<?php
function df_get_cart_totals()
{
    $cartTotals = WC()->cart->get_totals();
    wp_send_json_success(['cartTotals' => $cartTotals]);
    wp_die();
}
add_action('wp_ajax_df_get_cart_price', 'df_get_cart_price');
add_action('wp_ajax_nopriv_df_get_cart_price', 'df_get_cart_price');

function df_update_cart_item_quantity()
{
    $cartItemKey = $_POST['cartItemKey'];
    $quantity = $_POST['quantity'];

    $setQuantity = WC()->cart->set_quantity($cartItemKey, $quantity);
    $cartTotals = WC()->cart->get_totals();

    wp_send_json_success(['setQuantity' => $setQuantity, 'cartTotals' => $cartTotals]);
    wp_die();
}
add_action('wp_ajax_df_update_cart_item_quantity', 'df_update_cart_item_quantity');
add_action('wp_ajax_nopriv_df_update_cart_item_quantity', 'df_update_cart_item_quantity');

function df_remove_product_from_cart()
{
    $cartItemKey = $_POST['cartItemKey'];

    if($cartItemKey)
    {
        $remove = WC()->cart->remove_cart_item($cartItemKey);

        wp_send_json_success([
            'cartItemKey' => $cartItemKey,
            'removed' => $remove,
            'cartTotal' => WC()->cart->get_cart_contents_total(),
            'cartSubtotal' => WC()->cart->get_cart_subtotal(),
            'cartTotals' => WC()->cart->get_totals()
        ]);
        wp_die();
    }

    wp_send_json_error('Invalid Cart Item Key');
    wp_die();
}
add_action('wp_ajax_df_remove_product_from_cart', 'df_remove_product_from_cart');
add_action('wp_ajax_nopriv_df_remove_product_from_cart', 'df_remove_product_from_cart');

function df_update_cart_item()
{
    if(!WC()->cart->is_empty())
    {
        $purchaseType = (isset($_POST['purchase_type']))? $_POST['purchase_type'] : '';
        $cart_item_key = (isset($_POST['cart_item_key'])) ? $_POST['cart_item_key'] : '';
        $cart_item = WC()->cart->cart_contents[$cart_item_key];

        // Remove original item
        $removeItem = WC()->cart->remove_cart_item($cart_item_key);

        // Add new duplicate of item
        $addItem = WC()->cart->add_to_cart($cart_item['product_id'], $cart_item['quantity'], $cart_item['variation_id'], $cart_item['variation'], [
            'wcsatt_data' => [
                'active_subscription_scheme' => $purchaseType
            ]
        ]);

        WC()->cart->set_session();

        $newCartItem = WC()->cart->cart_contents[$addItem];
        $data = $newCartItem['data'];
        $price = '$'.number_format((float)$data->get_price(), 2, '.', '');
        $newTotal = '$'.number_format((float)WC()->cart->get_total(), 2, '.', '');

        wp_send_json_success([
            'cartTotals' => WC()->cart->get_totals(),
            'price' => $price,
            'newKey' => $addItem,
            'oldKey' => $cart_item_key
        ]);
    }

    wp_die();
}
add_action('wp_ajax_df_update_cart_item', 'df_update_cart_item');
add_action('wp_ajax_nopriv_df_update_cart_item', 'df_update_cart_item');
?>