<?php
$header = get_sub_field('header');
$copy = get_sub_field('copy');
$image = get_sub_field('image');
?>

<div class="full-image-with-copy-box">
    <div class="row">
        <div class="col-lg-12 image">
            <?php echo imageTag($image, '', '', '', ''); ?>
        </div>
        <div class="col-lg-4 copy">
            <div class="copy-box green">
                <p class="subheader"><?php echo $header ?></p>
                <p><?php echo $copy ?></p>
            </div>
        </div>
    </div>
</div>