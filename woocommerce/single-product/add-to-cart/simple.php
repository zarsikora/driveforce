<?php
/**
 * Simple product add to cart
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/add-to-cart/simple.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

if ( ! $product->is_purchasable() ) {
	return;
}

echo wc_get_stock_html( $product ); // WPCS: XSS ok.

remove_action( 'woocommerce_before_add_to_cart_quantity', 'wp_echo_qty_front_add_cart' );

if ( $product->is_in_stock() ) : ?>

    <?php
    $bundles = new WP_Query([
        'order' => 'ASC',
        'orderby' => 'id',
        'posts_per_page' => -1,
        'post_type' => 'product',
        'tax_query' => [
            [
                'taxonomy' => 'product_type',
                'field' => 'slug',
                'terms' => 'bundle'
            ]
        ]
    ]);

    $bundleSelectHTML = '';

    if($bundles->post_count)
    {
        foreach($bundles->posts as $bundle)
        {
            $bundleSelectHTML .= '<option name="" data-id="'. $bundle->ID.'">'. $bundle->post_title .'</option>';
        }
        ?>

        <select class="bundle-select">
            <?php echo $bundleSelectHTML; ?>
        </select>

    <?php }  ?>

    <?php do_action( 'woocommerce_before_add_to_cart_form' ); ?>

    <!-- Add bundles from simple product -->
    <?php if( $product->get_ID() === 581) : ?>

        <?php
        do_action( 'woocommerce_before_add_to_cart_quantity' );
        woocommerce_quantity_input(
            array(
                'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
                'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
                'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(), // WPCS: CSRF ok, input var ok.
            )
        );
        do_action( 'woocommerce_after_add_to_cart_quantity' );
        ?>

        <button class="df18_add_bundle_to_cart btn thin-btn"><?php echo esc_html( $product->single_add_to_cart_text() ); ?></button>

    <?php endif; ?>

    <!-- Normal add to cart -->
    <?php if( $product->get_ID() !== 581) : ?>

        <form class="cart" action="" method="post" enctype='multipart/form-data'>

            <?php do_action( 'woocommerce_before_add_to_cart_button' ); ?>

            <?php
            do_action( 'woocommerce_before_add_to_cart_quantity' );

            woocommerce_quantity_input(
                array(
                    'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
                    'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
                    'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(), // WPCS: CSRF ok, input var ok.
                )
            );

            do_action( 'woocommerce_after_add_to_cart_quantity' );
            ?>

            <button type="submit" name="add-to-cart" value="<?php echo esc_attr( $product->get_id() ); ?>" class="single_add_to_cart_button btn thin-btn"><?php echo esc_html( $product->single_add_to_cart_text() ); ?></button>

            <?php do_action( 'woocommerce_after_add_to_cart_button' ); ?>

        </form>

    <?php endif; ?>

	<?php do_action( 'woocommerce_after_add_to_cart_form' ); ?>

<?php endif; ?>
