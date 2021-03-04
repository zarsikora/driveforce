<?php
$introTitle = get_sub_field('title');
$introCopy = get_sub_field('copy');
$image = get_sub_field('image');
$hasOverflow = get_sub_field('has_overflow');
?>

<div class="module-wrapper form-module <?php if($hasOverflow) echo ' has-overflow'?>" id="waitList">
    <div class="module-padded">
        <div class="row">
            <div data-animation-effect="scrollUpBlur" data-animation-trigger="scroll" class="img col-md-6">
                <?php echo imageTag($image); ?>
            </div>

            <div class="form col-md-6">
                <div class="copy">
                    <h2 data-animation-effect="splitSlideUpWord" data-animation-trigger="scroll" data-splitting="chars"><?php echo $introTitle ?></h2>
                    <p data-animation-effect="moduleFadeIn" data-animation-trigger="scroll"><?php echo $introCopy ?></p>
                </div>

                <?php include (realpath(dirname(__FILE__)."/form--waitlist.php")); ?>
            </div>

            <div class="tag">
                <span>Hitting the course <span class="sage">Spring 2021</span></span>
            </div>
        </div>
    </div>

    <img class="waitlist-curve" src="http://staging.driveforce.golf/wp-content/uploads/2021/01/waitlist-curve.svg" />
</div>

<!-- <div id="form-success-pane">
    <div class="inner">
        <h1>Thanks for reaching out! We’ll get in touch soon.</h1>
        <?php //echo button(get_home_url(), 'Return Home'); ?>
        <svg class="logo" viewbox="0 0 95.803 101.04">
            <use xlink:href="#footer-badge"></use>
        </svg>
    </div>
</div> -->