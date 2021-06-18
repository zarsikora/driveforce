<?php
$quote = get_sub_field('quote');
$byline = get_sub_field('byline');
$image = get_sub_field('image');
?>

<div class="quote-module">
    <div class="row align-items-center">
        <div class="col-lg-5 offset-lg-1 copy">
            <p class="header"><?php echo $quote ?></p>
            <p><?php echo $byline ?></p>
        </div>
        <div class="col-lg-4 offset-lg-1">
            <?php echo imageTag($image, '', '','', ''); ?>
        </div>
    </div>
</div>