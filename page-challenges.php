<?php 
    $title = get_field('page_title');
    $featuredImage = get_field('featured_image');
    $problem = get_field('problem_text');
    $solution = get_field('solution_text');
    /* Template Name: Challenges Page Type */
    get_header();
?>

<main id="content" class="challenges-page">
    <div class="hero module-flush">
        <div class="main-info">
            <div class="inner">
                <h1 class="title breakpoint-animate"><?php echo $title ?></h1>

                <div class="share-bar-wrapper">
                    <?php include(realpath(dirname(__FILE__)."/components/share-bar.php")); ?>
                </div>
            </div>
        </div>

        <div class="featured-img">
            <?php echo imageTag($featuredImage, '', '100%, (min-width: 992px) 76.8rem'); ?>
        </div>
    </div>

    <div class="module-padded problem">
        <div class="text-inner">
            <h2 data-animation-effect="moduleFadeIn" data-animation-trigger="scroll">The Problem:</h2>

            <p data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="copy"><?php echo $problem ?></p>
        </div>
    </div>

    <div class="module-padded solution">
        <div data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="text-inner">
            <?php echo $solution ?>
        </div>
    </div>

    <?php include('components/components.php'); ?>
    
</main>

<?php get_footer(); ?>