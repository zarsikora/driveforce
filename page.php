<?php 
    if(is_shop()){
        $classes = "shop-page";
    }
?>

<?php get_header(); ?>
<main id="content" <?php echo 'class="' . $classes . '"' ?>>
    <?php 
            the_content();
            include('components/components.php'); 
    ?>
</main>
<?php get_footer(); ?>