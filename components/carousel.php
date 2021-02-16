<?php
    $slideCount = count( get_sub_field( 'slides' ) );
    $slides = get_sub_field('slides');
    $counter = 0;
?>

<div class="module-wrapper color-bg">
    <div id="profilesCarousel" class="carousel slide module-padded" data-touch="true">
        <div class="carousel-inner">
            <?php if( have_rows('slides') ): ?>
                <?php while( have_rows('slides') ) : the_row(); ?>
                        <?php
                            // Slide with photo, name, title, quote, frequency
                            $image = get_sub_field('image');
                            $name = get_sub_field('name');
                            $title = get_sub_field('title');
                            $quote = get_sub_field('quote');
                            $frequency = get_sub_field('frequency');
                        ?>

                        <div class="carousel-item profile-card <?php if($counter == 0) echo 'active'?>">
                            <div class="inner">
                                <div class="author-info">
                                    <?php if($image): ?>
                                        <div class="author-photo">
                                            <?php echo imageTag($image, '', '', '', false); ?>
                                        </div>
                                    <?php endif; ?>

                                    <div class="author-text">
                                        <h5 class="author-name"><?php echo $name ?></h5>
                                        <p class="author-details"><?php echo $title ?></p>
                                        <p class="author-frequency">Frequency: <?php echo $frequency ?></p>
                                    </div>
                                </div>

                                <div class="endorsement-quote">
                                    <p><?php echo $quote ?></p>
                                </div>
                            </div>
                        </div>
                        <?php $counter++ ?>
                <?php endwhile; ?>
            <?php endif; ?>
        </div>

        <ol class="carousel-indicators">
            <?php for($i = 0; $i <= ($slideCount - 1); $i++): ?>
                <li data-target="#profilesCarousel" aria-label="Go to slide <?php echo $i ?>" data-slide-to="<?php echo $i ?>" <?php if($i == 0) echo 'class="active"' ?>></li>
            <?php endfor; ?>
        </ol>
    </div>
</div>
