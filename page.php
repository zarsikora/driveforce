<?php get_header(); ?>
<main id="content">
    <?php 
    if(is_shop()) {
        include('woocommerce/archive-product.php');
    } else {
        include('components/components.php'); 
    }
    ?>
</main>
<?php get_footer(); ?>