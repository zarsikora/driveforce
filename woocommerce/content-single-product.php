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

	<?php
	/**
	 * Hook: woocommerce_before_single_product_summary.
	 *
	 * @hooked woocommerce_show_product_sale_flash - 10
	 * @hooked woocommerce_show_product_images - 20
	 */
	do_action( 'woocommerce_before_single_product_summary' );
	?>

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

        <ul>
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

<div class="benefits-module container">
    <div class="row">
        <div class="col-lg-6">
            <p>Play your back nine as strong as your front.</p>
            <svg></svg>
        </div>
        <div class="col-lg-3">
            <div>
                <p>Benefits on the course:</p>
                <ul>
                    <li>Enhances focus & concentration</li>
                    <li>Reduces fatigue & mental stress</li>
                    <li>Improves muscle & exercise performance</li>
                    <li>Sustains hydration</li>
                </ul>
            </div>
        </div>
        <div class="col-lg-3">
            <div>
                <p>Benefits off the course:</p>
                <ul>
                    <li>Supports cardiovascular system & heart health</li>
                    <li>Supports healthy immune system</li>
                    <li>Decreases recovery time</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-lg-4">
            <p>What's in DF-18?</p>
        </div>
        <div class="col-lg-8">
            <div class="row">
                <div class="col-lg-6">
                    <p>Blood Flow Matrix</p>
                    <p>A collection of nutrients and co-factors working synergistically to improve blood flow giving you mental clarity, focus, and stamina during the critical moments in your game.</p>
                </div>
                <div class="col-lg-6">
                    <p>Fluid Balancers</p>
                    <p>A highly effective combination that hyper hydrates you so that your body can better manage heat stress and the physical endurance necessary for a successful 4-6 hours in the sun.</p>
                </div>
                <div class="col-lg-6">
                    <p>Mental Drivers</p>
                    <p>A small selection of high ROI nootropics [or micronutrients] [or nootropic compounds] which improve focus, motor function, to help your mind stay focused and the body cope under pressure in the moments that matter most on the course.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    See Full Ingredients List:
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    Nitro Rocket® Arugula Extract, Natural Flavors, Calcium Beta-Hydroxybutyrate, Citric Acid, Pink Salt, MagnesiumGlycinate, Potassium Chloride, Agmatine Sulfate, Taurine, HydroMax® Glycerol Powder, N-Acetyl-Tyrosine, Ashwagandha, N-Actylcysteine, Malic Acid, Vegetable Juice (Color), L-Theanine, Theobromine, Vitamin C, Sucralose, Acesulfame Potassium, Zinc Citrate, Pantothenic acid (Calcium Pantothenate), Riboflavin, Choline Citrate, Thiamin HCL, Folic Acid, Methylcobalamin, Biotin
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    How to use:
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    Pour, Shake, Perform Start your pre-round routine with a pack of DF-18. Tear open one stick and shake into at least 16oz of cold water or your favorite smoothie. For best performance results, drink daily or before any round you play.
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-lg-6">
            <p>Back nine blowups happen all the time, we’ve all been there. Our ‘faults’ add up but truth be told, it’s not always the players fault. I’ve been looking for years for something to solve for this. I’ve finally found it.”</p>
            <p>— Adam Kolloff, New England PGA Teacher of the Year</p>
        </div>
        <div class="col-lg-6">
            <img src="" />
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-lg-4">
            <div>
                <p>Make your water work harder for you.</p>
                <p>Start with what makes sense: water. Then add a single serving of DF-18 to maximize your performance, health, and time on the course, every time.</p>
            </div>
        </div>
    </div>
    <img src="" />
</div>

<div class="container">
    <div class="row">
        <div class="col-lg-6">
            <p>Maximize your investment on the course.</p>
            <p>We invest countless hours training, working on our swing, honing our skills, and countless dollars on equipment each year to play our absolute best. These are all crucial, but it’s all for not if you’re not giving your body what it needs to stay focused, hydrated, and energized.</p>
        </div>
        <div class="col-lg-6">
            <svg></svg>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-lg-8 offset-lg-1">
            <div class="product-reviews-wrapper">

                <?php
                add_filter('comments_template_query_args', function($args)
                {
                    $args['order'] = 'DESC';
                    return $args;
                });

                $reviews = array(
                    /* translators: %s: reviews count */
                    'title'    => sprintf( __( 'Reviews (%d)', 'woocommerce' ), $product->get_review_count() ),
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
