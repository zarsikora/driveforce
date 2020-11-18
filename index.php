<?php get_header(); ?>
<main id="content">
    <?php 
        if(is_shop()) 
        {
            include('woocommerce/archive-product.php');
        } 

        elseif(is_product()) 
        {
            include('woocommerce/single-product.php');
        } 

        else 
        {
            include('components/components.php'); 
        }
    ?>
</main>
<?php get_footer(); ?>