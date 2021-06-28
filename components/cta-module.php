<?php
    $header = get_sub_field('header');
    $btnText = get_sub_field('button_text');
    $btnLink = get_sub_field('button_link');

?>

<div class="module-wrapper dark-bg cta-module">

    <svg data-animation-effect data-animation-trigger="breakpoint" class="dots-left" width="320" height="124" viewBox="0 0 320 124">
        <use href="#horizontal-dots"></use>
    </svg>

    <svg data-animation-effect data-animation-trigger="breakpoint" class="dots-right" width="320" height="124" viewBox="0 0 320 124">
        <use href="#horizontal-dots"></use>
    </svg>

    <div class="module-padded">
        <svg class="logo" viewBox="0 0 82 82">
            <use xlink:href="#square-logo"></use>
        </svg>

        <?php if($header): ?>
            <h2><?php echo $header ?></h2>
        <?php endif; ?>

        <?php if($btnText && $btnLink): ?>
            <?php echo button($btnLink, $btnText) ?>
        <?php endif; ?>
    </div>
</div>