<?php

$args = array(
    'orderby'  => 'name',
);
$products = wc_get_products( $args );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div class="grid product module-padded">
    <ul class="row products columns-<?php echo esc_attr( wc_get_loop_prop( 'columns' ) ); ?>">

        <!-- if you need to add more vars: http://man.hubwiz.com/docset/WooCommerce.docset/Contents/Resources/Documents/class-WC_Product_Simple.html -->
        <?php foreach($products as $product): ?>
            <?php 
            $title = $product->get_title();
            $image = $product->get_image();
            $price = $product->get_price();
            $link = $product->get_permalink(); 
            $sale = $product->is_on_sale(); 
            ?>

            <div class="card product col-md-4">
                <?php //print_r($product);?>
                <a class="card-link" href="<?php echo $link; ?>" title="<?php echo $title; ?>" aria-label="View Product: <?php echo $title; ?>"></a>
                <div class="card-body">

                    <div class="img-wrapper">
                        <div class="inner">
                            <?php echo $image ?>
                        </div>
                    </div>

                    <div class="text-wrapper">
                        <h3 class="header"><?php echo $title ?></h3>
                        <div class="meta-info">
                            <p>$<?php echo $price ?></p>
                        </div>
                    </div>
                </div> 
            </div>

        <?php endforeach; ?>