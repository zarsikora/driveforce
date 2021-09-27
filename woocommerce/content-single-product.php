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

        <div class="col-lg-6">
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

        <div class="col-lg-5 offset-lg-1">
            <div class="summary entry-summary">
                <?php
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
            remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20);
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

<?php
$preselectedProdID = $_GET['prod-id'];
$preselectedProduct = wc_get_product($preselectedProdID);
$productValue = null;

if($preselectedProduct)
{
    $productValue = $preselectedProduct->get_price();
    $productData = array(
        array(
            'item_id' => $preselectedProduct->get_id(),
            'item_name' => $preselectedProduct->get_name(),
            'price' => floatval($preselectedProduct->get_price()),
            'currency' => 'USD',
            'quantity' => 1
        )
    );
}

// TODO: Probably shouldn't hard code this in case any of the data changes in the future
// Hard code the default 30 stick pack data when preselected product is not used
if(!$preselectedProduct)
{
    $environment = wp_get_environment_type();
    $productValue = 109.99;
    $productData = array(
        array(
            'item_id' => ($environment == 'local') ? '1335' : '1434',
            'item_name' => 'Pro Pack (30 Stick Packs)',
            'price' => floatval($productValue),
            'currency' => 'USD',
            'quantity' => 1
        )
    );
}
?>

<script>
    // GTM GA4 Purchase Event
    dataLayer.push({ecommerce: null});
    dataLayer.push({
        'event': 'view_item',
        'ecommerce': {
            'value': <?php echo $productValue ?>,
            'currency': 'USD',
            'items': <?php echo json_encode($productData) ?>
        }
    });
</script>

<?php do_action( 'woocommerce_after_single_product' ); ?>
