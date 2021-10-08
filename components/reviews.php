<?php
$backgroundColor = get_sub_field('background_color');
$backgroundClass = ($backgroundColor === 'green') ? 'dark-bg' : (($backgroundColor === 'cream') ? 'color-bg' : (($backgroundColor === 'white') ? 'white-bg' : ''));
$header = get_sub_field('header');
$reviews = get_sub_field('reviews');
?>

<div class="module-wrapper reviews-component <?php echo $backgroundClass ?>">
    <div class="module-padded">
        <h2 class="text-center"><?php echo $header ?></h2>

        <div class="reviews">
            <div class="row">
                <?php foreach($reviews as $review) : ?>
                    <div class="col-lg-4">
                        <div>
                            <div class="quote">
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.82 58.75"><path d="M8.22,58.75l-7-10.38c6.66-4.5,11.56-10.38,13.13-17C5.68,30.94,0,25.65,0,17.23,0,6.85,9,0,19.39,0,32.31,0,38,10.18,38,20.56,38,35.64,24.28,53.46,8.22,58.75Zm54.84,0L56,48.37c6.66-4.5,11.55-10.38,13.12-17-8.62-.39-14.3-5.68-14.3-14.1C54.83,6.85,63.84,0,74.22,0c12.92,0,18.6,10.18,18.6,20.56C92.82,35.64,79.12,53.46,63.06,58.75Z"/></svg>
                            </div>
                            <?php echo $review['review']; ?>
                        </div>
                        <p class="byline"><?php echo $review['byline'] ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="text-center">
            <?php echo button(get_bloginfo('url').'/product/df-18#reviews', 'More verified testimonials', 'small'); ?>
        </div>
    </div>
</div>