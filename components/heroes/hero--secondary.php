<?php
    // $assetGroup = get_sub_field('asset_group');
    $image = get_sub_field('image');
    $centeredText = get_sub_field('centered_text');
    $header = get_sub_field('header');
    $copy = get_sub_field('copy');
?>

<div class="jumbotron hero secondary module-flush <?php if($centeredText == true) echo ' centered-text'; ?>">
    <!-- TODO: if image-based hero, configure here. Otherwise, remove. -->
    <?php if($image): ?>
            <?php echo imageTag($image, "hero-img", '100vw', null, false); ?>
    <?php endif; ?>

    <div class="inner">
        <!-- TODO: if there are asset groups to choose from, configure here. Otherwise, remove. -->
        <?php //if($assetGroup == 'a'):?>
            <!-- <img class="secondary-hero-asset left" id="hero-a1" alt="" src="<?php echo get_site_url() ?>/wp-content/uploads/2020/10/secondary-hero-a1.png"/> -->
        <?php //endif; ?>

        <div class="text-container">
            <div class="row">
                <div class="col-md-9">
                    <h1><?php echo $header ?></h1>

                    <?php echo $copy ?>
                </div>
            </div>
        </div>
    </div>
</div>