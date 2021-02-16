<?php 

$displayPromoBanner = get_field('display_promo_banner', 'option'); 
$bannerText = get_field('promo_banner_text', 'option'); 

?>

<?php if($displayPromoBanner && $bannerText): ?>
    <div class="alert alert-primary" id="promo-banner" role="alert">
        <?php echo $bannerText ?>
    </div>
<?php endif; ?>