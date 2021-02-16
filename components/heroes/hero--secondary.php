<?php
    $image = get_sub_field('image');
    $header = get_sub_field('header');
    $copy = get_sub_field('copy');
    $shareBar = get_sub_field('show_share_bar');
?>

<div class="jumbotron hero secondary module-flush">
    <div class="inner">
        <div class="row">
            <div class="text-container col-md-6">
                <div class="text-inner">
                    <h1 class="secondary-title breakpoint-animate" data-splitting="chars"><?php echo $header ?></h1>
                    <p class="subtitle fadeUp"><?php echo $copy ?></p>

                    <?php if($shareBar): ?>
                        <div class="share-bar-wrapper fadeUp">
                            <?php include(realpath(dirname(__FILE__)."/../share-bar.php")); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <div class="img-container col-md-6">
                <?php if($image): ?>
                    <?php echo imageTag($image, "hero-img", '', null, false); ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>