<?php
    $header = get_sub_field('header');
    $accentImage = get_sub_field('accent_image');

    if(get_sub_field('slides')){
        $slideCount = count( get_sub_field( 'slides' ) );
    }
?>

<!-- go over how this is supposed to move and why splide isnt working -->

<div class="module-wrapper dark-bg endorsement-slider">
    <div class="module-padded">
        <?php if($header): ?>
            <h2 data-animation-effect="splitSlideUpWord" data-animation-trigger="breakpoint" data-splitting="chars"><?php echo $header ?></h2>
        <?php endif; ?>

        <?php if(have_rows('slides')): ?>
            <div id="slider">
                    <ul class="slides">
                        <?php while(have_rows('slides')): the_row(); ?>
                            <?php
                            $image = get_sub_field('image');
                            $name = get_sub_field('name');
                            $title = get_sub_field('title');
                            $product = get_sub_field('product');
                            $quote = get_sub_field('quote');
                            ?>

                            <li class="slide">
                                <div class="details">
                                    <?php if($name): ?>
                                        <h3><?php echo $name ?></h3>
                                    <?php endif; ?>

                                    <?php if($title): ?>
                                        <p class="title"><?php echo $title ?></p>
                                    <?php endif; ?>

                                    <?php if($product): ?>
                                        <p class="product"><?php echo $product ?></p>
                                    <?php endif; ?>

                                    <?php if($quote): ?>
                                        <p class="quote"><?php echo $quote ?></p>
                                    <?php endif; ?>
                                </div>

                                <?php echo imageTag($image, 'accent-image', '', '', false); ?>
                            </li>
                        <?php endwhile ?>
                    </ul>

                    <div class="slider-nav">
                        <?php for($i === 0; $i < $slideCount; $i++ ): ?>
                            <button></button>
                        <?php endfor; ?>
                    </div>
            </div>
        <?php endif; ?>
    </div>
</div>