<?php
get_header();

$title = get_the_title();
$link = get_the_permalink();
$id = get_the_ID();
$featuredImage = get_field('featured_image');
$excerpt = get_field('excerpt');
$categories = get_the_category();
$date = get_the_date();
$authorName = get_field('author_name');
$authorTitle = get_field('author_title');
$content = get_post_field('post_content');
?>

<main id="content" class="article-single">

    <div class="module-wrapper">
        <div class="hero article module-padded">
            <div class="inner">
                <h1 class="breakpoint-animate" data-splitting="chars"><?php echo $title ?></h1>

                <div class="share-bar-wrapper">
                    <?php include(realpath(dirname(__FILE__)."/components/share-bar.php")); ?>
                </div>
            </div>
        </div>
    </div>

    <div class="module-wrapper">
        <div class="post-content module-padded">
            <div class="inner">
                <div class="featured-img">
                    <?php echo imageTag($featuredImage, '', '100%, (min-width: 992px) 76.8rem'); ?>
                </div>

                <div class="copy">
                    <?php echo apply_filters('the_content', $content); ?>

                    <?php include(realpath(dirname(__FILE__)."/components/share-bar.php")); ?>
                </div>
            </div>
        </div>
    </div>

    <?php include('components/waitlist--single-post.php'); ?>

    <?php include('components/grids/grid--article.php'); ?>
</main>

<?php get_footer(); ?>