<?php
$text = get_sub_field('text');
?>

<div class="module-wrapper large-text-module dark-bg">
    <div class="module-padded">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="text-container">
                    <div class="copy" data-animation-effect="moduleFadeIn" data-animation-trigger="scroll">
                        <?php echo $text ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <svg class="dotted-line" viewBox="0 0 1166 20">
        <use href="#dotted-line"></use>
    </svg>
</div>