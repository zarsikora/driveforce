<?php 

$header = get_sub_field('header');
$intro = get_sub_field('intro_copy');
$mainImage = get_sub_field('main_image');
$button = get_sub_field('button');
$bottomText = get_sub_field('bottom_text');

?>

<div class="module-wrapper color-bg product-intro-module">
    <div class="module-padded">
        <?php if($header): ?>
            <h2 data-animation-effect="splitSlideUpWord" data-animation-trigger="breakpoint" data-splitting="chars"><?php echo $header ?></h2>
            <p class="intro-copy" data-animation-effect="splitSlideUpWord" data-animation-trigger="breakpoint" data-splitting="chars"><?php echo $intro ?></p>
        <?php endif; ?>

        <div class="product-container row">
            <?php if(have_rows('certifications')) : ?>
                <div class="product-certs col-lg-4">
                    <?php while(have_rows('certifications')): the_row(); ?>
                        <?php
                            $logo = get_sub_field('logo');
                            $name = get_sub_field('name');
                            $description = get_sub_field('description');
                        ?>

                    <div data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="cert-block">
                        <?php if($logo): ?>
                            <?php echo imageTag($logo, '', '', '', false); ?>
                        <?php endif; ?>

                        <?php if($name): ?>
                            <h3><?php echo $name ?></h3>
                        <?php endif; ?>

                        <?php if($description): ?>
                            <p><?php echo $description ?></p>
                        <?php endif; ?>
                    </div>
                    <?php endwhile; ?>
                </div>
            <?php endif; ?>

            <?php if($mainImage): ?>
                <div class="image-wrapper col-lg-4">
                        <?php echo imageTag($mainImage, '', '', '', false); ?>
                </div>
            <?php endif; ?>

            <?php if(have_rows('product_data')): ?>
                <div class="product-data col-lg-4">
                    <?php while(have_rows('product_data')): the_row(); ?>
                        <?php
                        $icon = get_sub_field('icon');
                        $title = get_sub_field('title');
                        $copy = get_sub_field('copy');
                        ?>

                        <div data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="data-block">
                            <?php if($icon): ?>
                                <?php echo imageTag($icon, '', '', '', false); ?>
                            <?php endif; ?>

                            <?php if($title): ?>
                                <h3><?php echo $title ?></h3>
                            <?php endif; ?>

                            <?php if($copy): ?>
                                <p><?php echo $copy ?></p>
                            <?php endif; ?>
                        </div>
                    <?php endwhile; ?>
                </div>
            <?php endif; ?>
        </div>

        <?php if($bottomText): ?>
            <h2 class="bottom-text" data-animation-effect="splitSlideUpWord" data-animation-trigger="breakpoint" data-splitting="chars"><?php echo $bottomText ?></h2>
        <?php endif; ?>

        <?php if($button): ?>
            <?php
                $text = $button['title'];
                $url = $button['url'];
            ?>
            <div data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="btn-wrapper">
                <?php echo button($url, $text); ?>
            </div>
        <?php endif; ?>
    </div>
</div>