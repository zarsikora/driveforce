<?php get_header(); ?>
<main id="content">
    <?php 
        //WOOCOMMERCE TEMPLATES
        if(is_shop()) 
        {
            include (realpath(dirname(__FILE__)."/../../plugins/woocommerce/templates/archive-product.php"));
            //include('woocommerce/archive-product.php');
        } 

        elseif(is_product()) 
        {
            include('woocommerce/single-product.php');
        } 

        elseif(is_cart())
        {
            include('woocommerce/cart/cart.php');
        }

        elseif(is_checkout())
        {
            include('woocommerce/checkout/form-checkout.php');
        }

        //MODULAR COMPONENT TEMPLATE
        else 
        {
            include('components/components.php'); 
        }
    ?>
</main>
<?php get_footer(); ?>