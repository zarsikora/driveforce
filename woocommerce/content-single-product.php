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

<div class="benefits-module">
    <div class="row">
        <div class="col-lg-4">
            <p class="header">Play your back nine as strong as your front.</p>
            <svg viewBox="0 0 125.5 174.24">
                <use href="#poles"></use>
            </svg>
        </div>
        <div class="col-lg-4 col-xl-3 offset-xl-2">
            <div class="copy-box green">
                <p class="subheader">Benefits on the course:</p>
                <ul>
                    <li>Enhances focus & concentration</li>
                    <li>Reduces fatigue & mental stress</li>
                    <li>Improves muscle & exercise performance</li>
                    <li>Sustains hydration</li>
                </ul>
            </div>
        </div>
        <div class="col-lg-4 col-xl-3">
            <div class="copy-box">
                <p class="subheader">Benefits off the course:</p>
                <ul>
                    <li>Supports cardiovascular system & heart health</li>
                    <li>Supports healthy immune system</li>
                    <li>Decreases recovery time</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<svg class="dotted-line" viewBox="0 0 1166 20">
    <use href="#dotted-line"></use>
</svg>

<div class="ingredients-module">
    <div class="row">
        <div class="col-lg-3">
            <p class="header">What's in<br /> DF-18?</p>
        </div>
        <div class="col-lg-8 offset-lg-1">
            <div class="row">
                <div class="col-lg-6 copy">
                    <svg width="50" viewBox="0 0 48.522 38.906">
                        <use href="#stamina-icon"></use>
                    </svg>
                    <p class="subheader">Blood Flow Matrix</p>
                    <p>A collection of nutrients and co-factors working synergistically to improve blood flow giving you mental clarity, focus, and stamina during the critical moments in your game.</p>
                </div>
                <div class="col-lg-6 copy">
                    <svg width="50" viewBox="0 0 48.522 38.906">
                        <use href="#stamina-icon"></use>
                    </svg>
                    <p class="subheader">Fluid Balancers</p>
                    <p>A highly effective combination that hyper hydrates you so that your body can better manage heat stress and the physical endurance necessary for a successful 4-6 hours in the sun.</p>
                </div>
                <div class="col-lg-6 copy">
                    <svg width="50" viewBox="0 0 48.522 38.906">
                        <use href="#stamina-icon"></use>
                    </svg>
                    <p class="subheader">Mental Drivers</p>
                    <p>A small selection of high ROI nootropics [or micronutrients] [or nootropic compounds] which improve focus, motor function, to help your mind stay focused and the body cope under pressure in the moments that matter most on the course.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="ingredients-list">
    <div class="accordion" id="ingredientsAccordion">

        <div class="accordion-item">
            <h2 class="accordion-header" id="accordionHeadingOne">
                <button
                    class="accordion-button"
                    type="button"
                    data-toggle="collapse"
                    data-target="#accordionCollapseOne"
                    aria-expanded="true"
                    aria-controls="accordionCollapseOne">
                    See Full Ingredients List:
                </button>
            </h2>
            <div
                id="accordionCollapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="accordionHeadingOne"
                data-parent="#ingredientsAccordion">
                <div class="accordion-body">
                    <p>Nitro Rocket® Arugula Extract, Natural Flavors, Calcium Beta-Hydroxybutyrate, Citric Acid, Pink Salt, MagnesiumGlycinate, Potassium Chloride, Agmatine Sulfate, Taurine, HydroMax® Glycerol Powder, N-Acetyl-Tyrosine, Ashwagandha, N-Actylcysteine, Malic Acid, Vegetable Juice (Color), L-Theanine, Theobromine, Vitamin C, Sucralose, Acesulfame Potassium, Zinc Citrate, Pantothenic acid (Calcium Pantothenate), Riboflavin, Choline Citrate, Thiamin HCL, Folic Acid, Methylcobalamin, Biotin</p>
                </div>
            </div>
        </div>

        <div class="accordion-item">
            <h2 class="accordion-header" id="accordionHeadingTwo">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#accordionCollapseTwo"
                    aria-expanded="false"
                    aria-controls="accordionCollapseTwo">
                    How to use:
                </button>
            </h2>
            <div
                id="accordionCollapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="accordionHeadingTwo"
                data-parent="#ingredientsAccordion">
                <div class="accordion-body">
                    <p>Pour, Shake, Perform Start your pre-round routine with a pack of DF-18. Tear open one stick and shake into at least 16oz of cold water or your favorite smoothie. For best performance results, drink daily or before any round you play.</p>
                </div>
            </div>
        </div>

    </div>
</div>

<div class="quote-module">
    <div class="row align-items-center">
        <div class="col-lg-6 copy">
            <p class="header">Back nine blowups happen all the time, we’ve all been there. Our ‘faults’ add up but truth be told, it’s not always the players fault. I’ve been looking for years for something to solve for this. I’ve finally found it.”</p>
            <p>— Adam Kolloff, New England PGA Teacher of the Year</p>
        </div>
        <div class="col-lg-5 offset-lg-1">
            <?php echo imageTag('http://localhost:10008/wp-content/uploads/2021/05/Mask-Group-47@2x.png', '', '','', ''); ?>
        </div>
    </div>
</div>

<div class="full-image-with-copy-box">
    <div class="row">
        <div class="col-lg-12 image">
            <?php echo imageTag('http://localhost:10008/wp-content/uploads/2021/05/72373c506c372e7cb87e1867354f6144@2x.png', '', '', '', ''); ?>
        </div>
        <div class="col-lg-4 copy">
            <div class="copy-box green">
                <p class="subheader">Make your water work harder for you.</p>
                <p>Start with what makes sense: water. Then add a single serving of DF-18 to maximize your performance, health, and time on the course, every time.</p>
            </div>
        </div>
    </div>
</div>

<div class="copy-image">
    <div class="row align-items-center">
        <div class="col-lg-6">
            <p class="header">Maximize your investment on the course.</p>
            <p>We invest countless hours training, working on our swing, honing our skills, and countless dollars on equipment each year to play our absolute best. These are all crucial, but it’s all for not if you’re not giving your body what it needs to stay focused, hydrated, and energized.</p>
        </div>
        <div class="col-lg-3 offset-lg-2">
            <svg viewBox="0 0 282.773 278.057">
                <use href="#golf-bag-icon"></use>
            </svg>
        </div>
    </div>
</div>

<svg class="dotted-line" viewBox="0 0 1166 20">
    <use href="#dotted-line"></use>
</svg>

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
