<?php
    $type = get_sub_field('type');
    $mainHeader = get_sub_field('main_header');

    if($type === 'single'){
        $imageRight = get_sub_field('image_right');
        $image = get_sub_field('image');
        $header = get_sub_field('header');
        $copy = get_sub_field('copy');
    } elseif($type === 'multi') {
        $imageRight = get_sub_field('first_image_right');
    }
    
?>

<?php if($type === 'single'): ?>
    <style>
        .image-container .item {
            --image: url(<?php echo($image['url']); ?>);
        }
    </style>  
<?php endif; ?>


    <div class="rte fiftyfifty module-flush <?php if($type === 'multi') echo 'type-multi '?> <?php if($type === 'multi') echo ($imageRight) ? 'first-img-right' : 'first-img-left'?> <?php if($type === 'single') echo ($imageRight) ? ' img-right ' : ' img-left'?>">
        <?php if($type === 'multi' && $mainHeader): ?>
            <h2 data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="main-header"><?php echo $mainHeader; ?></h2>
        <?php endif; ?>

        <?php if($type === 'multi'): ?>
            <div class="inner">
            <?php $counter = 1;?>
            <?php if(have_rows('fiftyfifty_block')): ?>
                <?php while(have_rows('fiftyfifty_block')): the_row(); ?>
                    <?php 
                        $image = get_sub_field('image');
                        $header = get_sub_field('header');
                        $copy = get_sub_field('copy');
                    ?>

                    <div class="row align-items-center">
                        <div class="image-container col-md-4 col-lg-6" data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint">
                            <?php echo imageTag($image, '', '41.6%, (min-width: 992px) 33.3%', '', false); ?>
                        </div>

                        <div class="text-container col-md-8 col-lg-6">
                            <div class="text-inner" data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint">
                                <?php if($header): ?>
                                    <h3><?php echo $header ?></h3>
                                <?php endif; ?>

                                <?php if($copy): ?>
                                    <p class="copy"><?php echo $copy ?></p>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                    <?php $counter++ ?>
                <?php endwhile; ?>
                </div>
            <?php endif; ?>
        <?php else: ?>
            <div class="row align-items-center">
                <div class="image-container col-md-4 col-lg-6">
                    <div class="image-inner">
                        <?php echo imageTag($image, '', '41.6%, (min-width: 992px) 33.3%', '', false); ?>
                    </div>
                </div>

                <div class="text-container col-md-8 col-lg-6">
                    <div class="text-inner" data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint">
                        <?php if($header): ?>
                            <h3><?php echo $header ?></h3>
                        <?php endif; ?>

                        <?php if($copy): ?>
                            <div class="large-copy"><?php echo $copy ?></div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>