<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
?>

<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>
    <div class="row">

        <div class="col-xl-6">
            <?php
            /**
             * Hook: woocommerce_before_single_product_summary.
             *
             * @hooked woocommerce_show_product_sale_flash - 10
             * @hooked woocommerce_show_product_images - 20
             */
            do_action( 'woocommerce_before_single_product_summary' );
            ?>
        </div>

        <div class="col-xl-5 offset-xl-1">
            <div class="summary entry-summary">
                <?php

                add_action('woocommerce_single_product_summary', function() { ?>
                    <div class="variant-price">
                        $29.95
                    </div>
                <?php });

                /**
                 * Hook: woocommerce_single_product_summary.
                 *
                 * @hooked woocommerce_template_single_title - 5
                 * @hooked woocommerce_template_single_rating - 10
                 * @hooked woocommerce_template_single_price - 10
                 * @hooked woocommerce_template_single_excerpt - 20
                 * @hooked woocommerce_template_single_add_to_cart - 30
                 * @hooked woocommerce_template_single_meta - 40
                 * @hooked woocommerce_template_single_sharing - 50
                 * @hooked WC_Structured_Data::generate_product_data() - 60
                 *
                 * // want to do woocommerce_product_description_tab()
                 */

                remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
                remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );

                add_action('woocommerce_single_product_summary', 'woocommerce_product_description_tab', 6);

                do_action( 'woocommerce_single_product_summary' );
                ?>

                <ul class="product-checklist">
                    <li>✓ No Sugar Added</li>
                    <li>✓ No Caffeine</li>
                    <li>✓ Informed Sport Certified</li>
                    <li>✓ Developed for and by Professional Golfers</li>
                </ul>
            </div>

            <?php
            /**
             * Hook: woocommerce_after_single_product_summary.
             *
             * @hooked woocommerce_output_product_data_tabs - 10
             * @hooked woocommerce_upsell_display - 15
             * @hooked woocommerce_output_related_products - 20
             */
            remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10);
            do_action( 'woocommerce_after_single_product_summary' );
            ?>
        </div>

    </div>
</div>

<?php include(__DIR__ . '/../components/components.php'); ?>

<div class="reviews-module">
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="product-reviews-wrapper">

                <?php
                add_filter('comments_template_query_args', function($args)
                {
                    $args['order'] = 'DESC';
                    return $args;
                });

                $reviews = array(
                    /* translators: %s: reviews count */
                    'title'    => 'Review',
                    'priority' => 30,
                    'callback' => 'comments_template',
                );

                call_user_func( $reviews['callback'] );
                ?>

            </div>
        </div>
    </div>
</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>
