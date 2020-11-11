<?php
$image = get_sub_field('image');
$video = get_sub_field('video');
$header = get_sub_field('header');
$copy = get_sub_field('copy');
// $hasButton = get_sub_field('has_button');
// $button = get_sub_field('button');
// $text = $button['text'];
// $link = $button['link'];

?>

<div class="jumbotron hero home-hero section module-flush">
    <!-- TODO: if image-based hero, configure here. Otherwise, remove. -->
    <?php if($image): ?>
        <?php echo imageTag($image, "hero-img", '100vw', null, false); ?>
    <?php endif; ?>
    <!-- TODO: if video option, configure here. Otherwise, remove. -->
    <?php if($video): ?>
        <video alt="<?php echo $video['alt']?>" autoplay muted loop playsinline>
            <source src="<?php echo $video['url'] ?>" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    <?php endif; ?>

    <div class="inner">
        <div class="text-container">
            <div class="row">
                <div class="col-lg-9">
                    <h1><?php echo $header ?></h1>

                    <div class="copy"><?php echo $copy ?></div>
                </div>
            </div>
        </div>

        <!-- TODO: if asset-based hero, configure here. Otherwise, remove. -->
        <!-- <div class="primary-hero-asset-container">
            <img class="primary-hero-asset" id="primary-hero-1" alt="" src=""/>
        </div> -->
    </div> 
</div>
