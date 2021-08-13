<?php
$introTitle = get_sub_field('title');
$introCopy = get_sub_field('copy');
$image = get_sub_field('image');
$hasOverflow = get_sub_field('has_overflow');
?>

<div class="module-wrapper form-module <?php if($hasOverflow) echo ' has-overflow'?>" id="waitList">
    <div class="module-padded">
        <div class="row">
            <div class="img col-md-4 col-lg-6">
                <?php echo imageTag($image); ?>
            </div>

            <div class="form col-md-8 col-lg-6">
                <div class="copy">
                    <h2 data-animation-effect="splitSlideUpWord" data-animation-trigger="breakpoint" data-splitting="chars"><?php echo $introTitle ?></h2>
                    <p data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint"><?php echo $introCopy ?></p>
                </div>

                <?php include (realpath(dirname(__FILE__)."/form--waitlist.php")); ?>
            </div>
        </div>
    </div>
</div>