<?php
$image = get_sub_field('image');
$hasGraphic = get_sub_field('has_curve_graphic');
$header = get_sub_field('header');
$copy = get_sub_field('copy');
$waitlistButton = get_sub_field('waitlist_button');
$hasLink = get_sub_field('has_link');
$link = get_sub_field('link');
$text = $link['title'];
$url = $link['url'];

?>

<div class="jumbotron hero home-hero section module-flush">
    <div class="inner">
        <div class="row">
            <div class="col-md-5">
                <div class="text-container">
                    <h1 class="title breakpoint-animate" data-splitting="chars"><?php echo $header ?></h1>

                    <!-- MOBILE WAITLIST BTN --> 
                    <?php if($waitlistButton): ?>
                        <?php echo(button('#', 'Join the Waitlist', 'mobile-waitlist', '#waitList')); ?>
                    <?php endif; ?>

                    <!-- MOBILE LOGOS --> 
                    <div class="logos mobile">
                        <svg class="is-logo" viewbox="0 0 61.122 61.122">
                            <use href="#is-logo"></use>
                        </svg>

                        <svg class="ngf-logo" viewbox="0 0 101.688 42.408">
                            <use href="#ngf-logo"></use>
                        </svg>
                    </div>

                    <div class="copy"><?php echo apply_filters('the_content', $copy) ?></div>

                    <?php if($waitlistButton): ?>
                        <div class="btns-wrapper">
                            <?php if($waitlistButton): ?>
                                <?php echo(button('#', 'Join the Waitlist', 'desktop-waitlist', '#waitList')); ?>
                            <?php endif; ?>

                            <?php if($hasLink): ?>
                                <a class="link desktop" href="<?php echo $url ?>"><?php echo $text ?></a>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <?php if($image): ?>
                <div class="col-md-6 offset-md-1">
                    <div class="image-container">
                        <?php echo imageTag($image, "", "", null, false); ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>

        <div class="bottom">
            <div class="logos desktop">
                <svg class="is-logo" viewbox="0 0 61.122 61.122">
                    <use href="#is-logo"></use>
                </svg>

                <svg class="ngf-logo" viewbox="0 0 101.688 42.408">
                    <use href="#ngf-logo"></use>
                </svg>
            </div>

            <?php if($hasLink): ?>
                <a class="link mobile" href="<?php echo $url ?>"><?php echo $text ?></a>
            <?php endif; ?>

            <div class="tag">
                <span>Hitting the course <span class="sage">Spring 2021</span></span>
            </div>
        </div>
    </div> 
    <?php if($hasGraphic): ?>
        <img class="primary-hero-curve" aria-hidden="true" alt="decorative curve" src="http://staging.driveforce.golf/wp-content/uploads/2021/01/primary-hero-arc.svg" />
    <?php endif; ?>
</div>
