<?php

    $header = get_sub_field('header');
    $accentImage = get_sub_field('accent_image');

?>

<div class="module-wrapper dark-bg endorsement-slider">
    <div class="module-padded">
        <?php if($header): ?>
            <h2 data-animation-effect="splitSlideUpWord" data-animation-trigger="breakpoint" data-splitting="chars"><?php echo $header ?></h2>
        <?php endif; ?>
    </div>
</div>