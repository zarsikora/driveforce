<?php
    $introHeader = get_sub_field('intro_header');
    $introCopy = get_sub_field('intro_copy');
    $introIcon = get_sub_field('intro_icon');
    $blockHeader = get_sub_field('block_header');
    $blockImage = get_sub_field('block_image');
?>

<div class="module-wrapper ingredients-module">
    <div class="module-padded row">
        <div class="intro col-lg-5">
            <?php if($introHeader): ?>
                <h2><?php echo $introHeader ?></h2>
            <?php endif; ?>

            <?php if($introCopy): ?>
                <p><?php echo $introCopy ?></p>
            <?php endif; ?>

            <?php if($introIcon): ?>
                <?php echo imageTag($introIcon, '', '', '', false) ?>
            <?php endif; ?>
        </div>

        <div class="ingredients col-lg-6 offset-lg-1">
            <div class="block">
                <?php if($blockHeader): ?>
                    <h3><?php echo $blockHeader ?></h3>
                <?php endif; ?>

                <ul>
                    <li><span class="check">✓</span> Real Ingredients</li>
                    <li><span class="check">✓</span> Real Results</li>
                    <li><span class="check">✓</span> No Sugar Added</li>
                    <li><span class="check">✓</span> No Caffeine</li>
                </ul>

                <?php echo button('#', 'Read All Ingredients', 'thin-btn') ?>

                <?php if($blockImage): ?>
                    <?php echo imageTag($blockImage, 'block-image'); ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>