<?php 

$header = get_sub_field('header');
$mainImage = get_sub_field('main_image');
$button = get_sub_field('button');

?>

<div class="module-wrapper color-bg product-intro-module">
    <div class="module-padded">
        <?php if($header): ?>
            <h2 data-animation-effect="splitSlideUpWord" data-animation-trigger="breakpoint" data-splitting="chars"><?php echo $header ?></h2>
        <?php endif; ?>

        <?php if($mainImage): ?>
            <div class="image-wrapper row justify-content-center">
                <div class="col-md-12">
                    <?php echo imageTag($mainImage, '', '', '', false); ?>
                </div>
            </div>
        <?php endif; ?>
    
        <?php if(have_rows('product_data')): ?>

            <div class="product-data row">
                <?php while(have_rows('product_data')): the_row(); ?>
                    <?php 
                        $icon = get_sub_field('icon');
                        $title = get_sub_field('title');
                        $copy = get_sub_field('copy');
                    ?>

                    <div data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="data-block col-md-4">
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