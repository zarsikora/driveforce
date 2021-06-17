<?php
$environment = wp_get_environment_type();
$variantIDs = array(640, 641, 642); ?>

<div class="fast-checkout">

    <div class="fast-checkout-mobile-bar">
        <div class="arrow">
            <svg class="caret" width="20" viewBox="0 0 38.536 24.218">
                <use href="#caret"></use>
            </svg>
        </div>

        <div class="purchase">
            <div>
                <span class="product">DF-18 Pro 30 Pack</span><br />
                <!--<span class="subscription">Monthly Subscription</span>-->

            </div>
            <div class="button">
                <?php echo button('', 'Fast Checkout', 'fast-checkout-submit', null); ?>
            </div>
        </div>
    </div>

    <div class="fast-checkout-build-order">
        <div class="row">

            <div class="col col-lg-12 header">
                <svg class="logo" width="100" viewbox='0 0 201.662 35.534'>
                    <use href="#header-logo"></use>
                </svg>
                <a class="close" href="">Close</a>
            </div>

            <div class="col-lg-6 col-xl-5 fast-checkout-variant-select">
                <p class="build-order-header">Build Your Order</p>

                <div class="mobile">
                    <?php echo button('', 'DF-18: PRO 30 PACK', 'selected', null, 'data-variant-id="'. $variantIDs[0] .'"'); ?>
                    <?php echo button('', 'DF-18: amateur 20 pack', '', null, 'data-variant-id="'. $variantIDs[1] .'"'); ?>
                    <?php echo button('', 'DF-18: WEEKEND WARRIOR 10 PACK', '', null, 'data-variant-id="'. $variantIDs[2] .'"'); ?>
                </div>

                <div class="desktop">

                    <div class="select">
                        <div class="selected-option" data-variant-id="<?php echo $variantIDs[0] ?>">
                            <div>
                                <span class="selected-product">DF-18 Pro 30 Pack</span>
                                <!-- <span class="selected-type">Monthly subscription</span>-->
                            </div>
                            <svg viewBox="0 0 16.279 10.853">
                                <use href="#thick-caret"></use>
                            </svg>
                        </div>
                        <div class="dropdown">
                            <a href="#" data-variant-id="<?php echo $variantIDs[0] ?>">PRO30 PACK</a>
                            <a href="#" data-variant-id="<?php echo $variantIDs[1] ?>">AM20 PACK</a>
                            <a href="#" data-variant-id="<?php echo $variantIDs[2] ?>">WW10 PACK</a>
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

                    <div class="col-lg-12 col-xl-7 offset-xl-5 fast-checkout-purchase-option option2">
                        <div class="option-text">
                            <p>Subtotal</p>
                            <p class="sm">Shipping calculated at checkout</p>
                        </div>
                        <div>
                            <p class="price">
                                <span class="regular-price">$120</span>
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