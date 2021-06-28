<?php
    $type = get_sub_field('type');
    $fullWidth = get_sub_field('full_width');
    $mainHeader = get_sub_field('main_header');

    if($type === 'single' || $type === 'inlaid'){
        $imageRight = get_sub_field('image_right');
        $image = get_sub_field('image');
        $header = get_sub_field('header');
        $copy = get_sub_field('copy');
    } elseif($type === 'multi' || $type === 'multi-inlaid') {
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

    <div class="rte fiftyfifty module-wrapper
        <?php if($fullWidth){ echo 'full-width'; }?>
        <?php if($type === 'multi' || $type === 'multi-inlaid') echo 'type-multi '?>
        <?php if($type === 'inlaid' || $type === 'multi-inlaid') echo 'type-inlaid '?>
        <?php if($type === 'multi' || $type === 'multi-inlaid') echo ($imageRight) ? 'first-img-right' : 'first-img-left'?>
        <?php if($type === 'single' || $type === 'inlaid') echo ($imageRight) ? ' img-right ' : ' img-left'?>">

        <div class="module-padded">

            <?php if(($type === 'multi' || $type === 'multi-inlaid') && $mainHeader && !$fullWidth): ?>
                <h2 data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="main-header"><?php echo $mainHeader; ?></h2>
            <?php endif; ?>

            <?php if($type === 'multi' || $type === 'multi-inlaid'): ?>

                <div class="inner">
                    <?php
                    $counter = 1;

                    if(have_rows('fiftyfifty_block')):
                        while(have_rows('fiftyfifty_block')): the_row();
                            $image = get_sub_field('image');
                            $header = get_sub_field('header');
                            $copy = get_sub_field('copy'); ?>

                        <div class="row align-items-center">
                            <div class="image-container col-md-6 col-lg-6" data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint">
                                <?php echo imageTag($image, '', '41.6%, (min-width: 992px) 33.3%', '', false); ?>
                            </div>

                            <div class="text-container col-md-6 col-lg-5 offset-lg-1">
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
                    <?php endif; ?>
                </div>

            <?php elseif($type === 'single') : ?>

                <div class="row align-items-center">
                    <div class="image-container col-md-6">
                        <div class="image-inner">
                            <?php echo imageTag($image, '', '41.6%, (min-width: 992px) 33.3%', '', false); ?>
                        </div>
                    </div>

                    <div class="text-container col-md-6 col-lg-5 offset-lg-1">
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

            <?php elseif($type === 'inlaid'): ?>

                <div class="row inlaid-inner align-items-center">
                    <div class="image-container col-md-4 col-lg-6">
                        <div class="image-inner">
                            <?php echo imageTag($image, '', '41.6%, (min-width: 992px) 33.3%', '', false); ?>
                        </div>
                    </div>

                    <div class="text-container col-md-8 col-lg-6">
                        <div class="text-inner" data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint">
                            <?php if($header): ?>
                                <h2><?php echo $header ?></h2>
                            <?php endif; ?>

                            <?php if($copy): ?>
                                <div class="large-copy"><?php echo $copy ?></div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

            <?php endif; ?>

        </div>
    </div>