<?php
    $type = get_sub_field('type');
    $bgColor = get_sub_field('bg_color');
    $arrow = get_sub_field('arrow_graphic');
    $header = get_sub_field('header');
    $copy = get_sub_field('copy');
    $hasGraphic = get_sub_field('has_graphic');
?>


<div class="module-wrapper rte <?php echo ' ' . $bgColor . '-bg'?>">
    <div class="module-padded rte <?php echo $type; ?> <?php if($hasGraphic) echo ' has-graphic'; ?>">
        <div class="text-container <?php echo ' ' . $bgColor . '-bg'?>">
            <?php if($header): ?>
                <h2 data-animation-effect="splitSlideUpWord" data-animation-trigger="breakpoint" data-splitting="chars"><?php echo $header; ?></h2>
            <?php endif; ?>

            <?php if($copy): ?>
                <div class="copy" data-animation-effect="moduleFadeIn" data-animation-trigger="scroll"><?php echo $copy ?></div>
            <?php endif; ?>
        </div>

        <?php if(have_rows('grid_items')): ?>
            <?php 
            $gridCount = 0;
            $items = get_sub_field('grid_items');
            if (is_array($items)) {
                $gridCount = count($items);
                $colWidth = 12 / $gridCount;
            }
            
            ?>

            <div class="grid">
                <div class="row">
                    <?php while(have_rows('grid_items')): the_row(); ?>
                        <div class="card-container col-md-6" data-animation-effect="moduleFadeIn" data-animation-trigger="scroll">
                            <?php include (realpath(dirname(__FILE__)."/../cards/card--icon-text.php")); ?>
                        </div>
                    <?php endwhile; ?>
                </div>
            </div>
        <?php endif; ?>

        <?php if($type === 'grid' && $hasGraphic): ?>
            <img aria-hidden="true" alt="decorative curve" data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="rte-graphic" src="http://staging.driveforce.golf/wp-content/uploads/2021/01/rte-graphic.png"/>
        <?php endif; ?>

        <?php if($arrow): ?>
            <svg data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint" class="rte-arrow" viewBox="0 0 38.536 24.218">
                <use href="#caret"></use>
            </svg>
        <?php endif; ?>
    </div>
</div>