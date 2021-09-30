<?php
    $introHeader = get_sub_field('intro_header');
    $introCopy = get_sub_field('intro_copy');
    $introIcon = get_sub_field('intro_icon');
    $blockHeader = get_sub_field('block_header');
    $blockImage = get_sub_field('block_image');
    $listItems = get_sub_field('list_items');
    $button = get_sub_field('button');
    $ingredientsModal = get_sub_field('ingredients_modal');
?>

<div class="module-wrapper ingredients-module">
    <div class="module-padded row align-items-center">
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
            <div class="row">
                <div class="col-xl-8">
                    <div class="block">
                        <?php if($blockHeader): ?>
                            <h3><?php echo $blockHeader ?></h3>
                        <?php endif; ?>

                        <?php if(!$listItems) : ?>
                            <ul>
                                <li>Real Ingredients</li>
                                <li>Real Results</li>
                                <li>No Sugar Added</li>
                                <li>No Caffeine</li>
                            </ul>
                        <?php else : ?>
                            <?php echo $listItems; ?>
                        <?php endif; ?>

                        <?php
                        if($ingredientsModal) { ?>
                            <button class="btn thin-btn" data-micromodal-trigger="modal-ingredients">Read All Ingredients</button>
                        <?php } elseif($button) {
                            echo button($button['url'], $button['title'], 'thin-btn', '', '');
                        } ?>
                    </div>
                </div>
                <div class="col-lg-4">
                    <?php if($blockImage): ?>
                        <?php echo imageTag($blockImage, 'block-image'); ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>