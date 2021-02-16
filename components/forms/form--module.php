<?php
$introTitle = get_sub_field('introductory_title');
$introCopy = get_sub_field('introductory_copy');
$image = get_sub_field('image');
?>


<div class="module-flush form-module" id="contact">
    <div class="row">
        <div class="copy col-lg-6">
            <?php if($introTitle && $introCopy): ?>
                <div class="inner">
                    <div class="copy desktop">
                        <h1><?php echo $introTitle ?></h1>
                        <?php echo $introCopy ?>
                    </div>

                    <?php include (realpath(dirname(__FILE__)."/form--contact.php")); ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="image col-lg-6">
            <?php echo imageTag($image, '', '', '', false) ?>
        </div>
    </div>
</div>

<div id="form-success-pane">
    <div class="inner">
        <h1>Thanks for reaching out! We’ll get in touch soon.</h1>
        <?php echo button(get_home_url(), 'Return Home'); ?>
        <svg class="logo" viewbox="0 0 39.96 31.039">
            <use xlink:href="#footer-logo"></use>
        </svg>
    </div>
</div>