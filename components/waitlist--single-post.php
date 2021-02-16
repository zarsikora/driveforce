<?php 
    $image = get_field('image');
    $header = get_field('header');
    $copy = get_field('copy');
    $button = get_field('waitlist_button');
?>

<div class="rte fiftyfifty module-flush img-left">
    <div class="row align-items-center">
        <div class="image-container col-md-6" data-animation-effect="moduleFadeIn" data-animation-trigger="scroll">
            <div class="image-inner">
                <?php echo imageTag($image); ?>
            </div>
        </div>

        <div class="text-container col-md-6">
            <div class="text-inner">
                <?php if($header): ?>
                    <h2 data-animation-effect="moduleFadeIn" data-animation-trigger="scroll"><?php echo $header ?></h2>
                <?php endif; ?>

                <?php if($copy): ?>
                    <p class="copy" data-animation-effect="moduleFadeIn" data-animation-trigger="scroll"><?php echo $copy ?></p>
                <?php endif; ?>

                <?php if($button): ?>
                    <button type="button" class="btn" data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" data-toggle="modal" data-target="#waitlistModal">
                        <span>Join the Waitlist</span>
                    </button>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>