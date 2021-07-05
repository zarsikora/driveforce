<?php
$environment = wp_get_environment_type();
$bundlesQuery = new WP_Query([
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
$bundles = $bundlesQuery->posts;
$firstProduct = wc_get_product($bundles[0]->ID);
?>

<div class="fast-checkout">

    <div class="fast-checkout-mobile-bar">
        <div class="arrow">
            <svg class="caret" width="20" viewBox="0 0 38.536 24.218">
                <use href="#caret"></use>
            </svg>
        </div>

        <div class="purchase">
            <div>
                <span class="product"><?php echo $bundles[0]->post_title ?></span><br />
            </div>
            <div class="button">
                <?php echo button('', 'Fast Checkout', 'fast-checkout-submit', null); ?>
            </div>
        </div>
    </div>

    <div class="fast-checkout-build-order">
        <div class="row">

            <div class="col col-lg-12 header">
                <svg class="logo" width="100" viewBox="0 0 498.2 84.73">
                    <use href="#header-logo"></use>
                </svg>
                <a class="close" href="">Close</a>
            </div>

            <div class="col-lg-6 col-xl-5 fast-checkout-variant-select">
                <p class="build-order-header">Build Your Order</p>

                <div class="mobile">
                    <?php foreach($bundles as $k => $bundle) :
                        $sel = $k ? '' : 'selected'; ?>
                        <?php echo button('', $bundle->post_title, $sel, null, 'data-bundle-id="'. $bundle->ID .'" data-bundle-name="'. $bundle->post_title .'"'); ?>
                    <?php endforeach; ?>
                </div>

                <div class="desktop">
                    <div class="select">
                        <div class="selected-option" data-bundle-id="<?php echo $bundles[0]->ID ?>">
                            <div>
                                <span class="selected-product"><?php echo $bundles[0]->post_title ?></span>
                            </div>
                            <svg viewBox="0 0 16.279 10.853">
                                <use href="#thick-caret"></use>
                            </svg>
                        </div>
                        <div class="dropdown">
                            <?php foreach($bundles as $bundle) : ?>
                                <a href="#" data-bundle-id="<?php echo $bundle->ID ?>" data-bundle-name="<?php echo $bundle->post_title ?>"><?php echo $bundle->post_title ?></a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6 col-xl-5 p-0">
                <div class="row">
                    <!--
                    <div class="col-lg-12 col-xl-6 fast-checkout-purchase-option option1">
                        <div class="option-text">
                            <p>Subscribe + Save 20%</p>
                            <p class="sm">
                                <strong>Free Shipping</strong><br />
                                Pause or cancel anytime
                            </p>
                        </div>
                        <div>
                            <p class="price">
                                <span class="subscribe-price">$96</span>
                                <span class="regular-price">$120</span>
                            </p>
                            <label>
                                <input type="radio" name="fast-checkout-purchase-type" value="1_month" checked />
                                <span class="radio"></span>
                            </label>
                        </div>
                    </div>

                    <div class="col-lg-12 col-xl-6 fast-checkout-purchase-option option2">
                        <div class="option-text">
                            <p>One-time</p>
                            <p class="sm">Shipping calculated at checkout</p>
                        </div>
                        <div>
                            <p class="price">
                                <span class="regular-price">$120</span>
                            </p>
                            <label>
                                <input type="radio" name="fast-checkout-purchase-type" value="0" />
                                <span class="radio"></span>
                            </label>
                        </div>
                    </div>
                    -->

                    <div class="col-lg-12 col-xl-10 offset-xl-2 fast-checkout-purchase-option option2">
                        <div class="option-text">
                            <p>Subtotal</p>
                            <p class="sm">Tax and shipping calculated at checkout</p>
                        </div>
                        <div>
                            <p class="price">
                                <span class="regular-price"><?php echo $firstProduct->get_price() ?></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="desktop-checkout col-xl-2">
                <?php echo button('', 'Fast Checkout', 'fast-checkout-submit', null); ?>
            </div>
        </div>
    </div>

</div>