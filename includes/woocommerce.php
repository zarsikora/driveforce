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
    // TODO: Don't hardcode product id
    $productID = wp_get_environment_type() == 'local' ? 581 : (wp_get_environment_type() == 'staging') ? 1434 : 1433;
    $bundles = wc_pb_get_bundled_product_map($productID);
    $bundleID = $_POST['productID'];
    $quantity = $_POST['quantity'];
    $bundledItemID = array_search(strval($bundleID), $bundles);
    $bundledItem = wc_pb_get_bundled_item($bundledItemID);
    $bundledItemCount = $bundledItem->item_data['quantity_default'];

//    echo json_encode($bundledItemCount);
//    wp_die();

    $product = WC_PB()->cart->add_bundle_to_cart($bundleID, $quantity, [
        $bundledItemID => [
            'product_id' => $productID,
            'quantity' => $bundledItemCount
        ]
    ]);

    echo json_encode($product);
    wp_die();
}
add_action('wp_ajax_df_add_product_to_cart', 'df_add_product_to_cart');
add_action('wp_ajax_nopriv_df_add_product_to_cart', 'df_add_product_to_cart');

function df_get_cart_data()
{
    $df18ID = wp_get_environment_type() == 'local' ? 581 : (wp_get_environment_type() == 'staging') ? 1434 : 1433;

    $cartItems = WC()->cart->get_cart();
    $cartTotals = WC()->cart->get_totals();
    $totalItems = WC()->cart->get_cart_contents_count();
    $cartProducts = [];
    $cartDrawerProductsHTML = '';

    foreach(WC()->cart->get_cart() as $cart_item_key => $cart_item)
    {
        $data = $cart_item['data'];
        $item = WC()->cart->get_cart_item($cart_item_key);
        $productID = $cart_item['product_id'];

        // Manually hide cart bundle item that represents the unit product
        if($productID == $df18ID) continue;

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