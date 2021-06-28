<?php
$image = get_sub_field('image');
$hasGraphic = get_sub_field('has_curve_graphic');
$header = get_sub_field('header');
$copy = get_sub_field('copy');
$waitlistButton = get_sub_field('waitlist_button');

$button = get_sub_field('button');
if($button) {
    $buttonText = $button['title'];
    $buttonURL = $button['url'];
}

$link = get_sub_field('text_link');
if($link) {
    $linkText = $link['title'];
    $linkURL = $link['url'];
}

?>

<div class="jumbotron hero home-hero section module-flush">
    <div class="inner">
        <div class="row">
            <div class="col-md-6 col-lg-5">

                <div class="text-container">
                    <h1 class="title breakpoint-animate" data-splitting="chars"><?php echo $header ?></h1>

                    <?php if ($image) : ?>
                        <div class="image-container mobile">
                            <?php echo imageTag($image, "", "", null, false); ?>
                        </div>
                    <?php endif; ?>

                    <div class="copy"><?php echo apply_filters('the_content', $copy) ?></div>

                    <?php if($button) { ?>
                    <div class="btns-wrapper">
                        <?php echo button($buttonURL, $buttonText); ?>
                    </div>
                    <?php } ?>

                    <div class="logos desktop">
                        <svg class="is-logo" viewbox="0 0 61.122 61.122">
                            <use href="#is-logo"></use>
                        </svg>

                        <svg class="ngf-logo" viewbox="0 0 101.688 42.408">
                            <use href="#ngf-logo"></use>
                        </svg>
                    </div>
                </div>
            </div>

            <?php if ($image) : ?>
                <div class="col-md-6 col-lg-7">
                    <div class="image-container desktop">
                        <?php echo imageTag($image, "", "", null, false); ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>

        <div class="bottom">
            <?php if($link) { ?>
                <a class="link" href="<?php echo $linkURL; ?>"><?php echo $linkText; ?></a>
            <?php } ?>
        </div>
    </div>
    <?php if ($hasGraphic) : ?>
        <img class="primary-hero-curve" aria-hidden="true" alt="decorative curve" src="<?php echo get_bloginfo('url') ?>/wp-content/uploads/2021/05/curve-new.svg" />
    <?php endif; ?>
</div>