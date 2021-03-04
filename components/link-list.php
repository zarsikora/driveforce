<?php 
    $header = get_sub_field('header');
    $image = get_sub_field('image');
?>

<div class="module-flush list-module">
    <div class="row">
        <div class="img-wrapper col-lg-6">
            <?php echo imageTag($image); ?>
        </div>

        <div class="text-wrapper col-lg-6">
            <div class="inner">
                <?php if($header): ?>
                    <h3 data-animation-effect="splitSlideUpWord" data-animation-trigger="scroll" data-splitting="chars"><?php echo $header ?></h3>
                <?php endif; ?>

                <?php if(have_rows('list_items')): ?>
                    <div class="btn-wrapper">
                        <?php while(have_rows('list_items')): the_row(); ?>
                            <?php 
                                $listItem = get_sub_field('link');
                                if($listItem){
                                    $link = $listItem['url'];
                                    $title = $listItem['title'];
                                }
                            ?>

                            <a data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint" class="btn" href="<?php echo($link) ?>">
                                <div class="btn-hover-mask"></div>
                                <span>
                                    <?php echo($title);?>
                                </span>
                            </a>
                        <?php endwhile; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>