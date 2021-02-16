<?php
    $link = get_the_permalink();
    $title = get_the_title();
    $excerpt = get_field('excerpt');
    $trimmedExcerpt = wp_trim_words( $excerpt, 15, '...' );
    if($isArticles) $date = get_the_date();
    $image = get_field('featured_image');
    $id = $post->ID;
?>

<div class="card article">
    <a class="card-link" href="<?php echo $link; ?>" title="<?php echo $title; ?>" aria-label="Read Full Article: <?php echo $title; ?>"></a>
    <div class="card-body">

        <div class="img-wrapper">
            <?php echo imageTag($image); ?>
        </div>

        <div class="text-wrapper">
            <h3 class="header card-header"><?php echo $title ?></h3>
            <?php if($date){ ?><p class="date"><?php echo $date ?></p><?php } ?>
            <p class="card-text">
                <?php echo $trimmedExcerpt; ?>
            </p>

            <a href="<?php echo $link ?>" class="read-more" aria-label="Read Full Article">
            <span>Read More</span>
        </a>
        </div>
    </div>
</div>