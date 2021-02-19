<?php 
    $title = get_sub_field('title');
    $image = get_sub_field('image');
    $facebook = get_field('facebook', 'option'); 
    $twitter = get_field('twitter', 'option'); 
    $linkedin = get_field('linkedin', 'option'); 
    $pinterest = get_field('pinterest', 'option');
?>

<div class="module-flush share-module">
    <div class="row">
        <div class="image-wrapper col-lg-6">
            <?php echo imageTag($image); ?>
        </div>

        <div class="text-wrapper col-lg-6">
            <h2 data-animation-effect="splitSlideUpWord" data-animation-trigger="scroll" data-splitting="chars"><?php echo $title ?></h2>

                <ul class="social-sharing">
                    <li data-animation-effect="moduleFadeIn" data-animation-trigger="scroll">
                        <a class="btn share-btn facebook" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo get_permalink(); ?>" aria-label="Share on Facebook">
                            <div class="btn-hover-mask"></div>
                            <svg aria-hidden="true" class="fb" viewbox="0 0 12 24">
                                <use xlink:href="#fb-icon"></use>
                            </svg>
                            <span>Share on Facebook</span>
                        </a>
                    </li>

                    <li data-animation-effect="moduleFadeIn" data-animation-trigger="scroll">
                        <a class="btn share-btn twitter" target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo get_permalink(); ?>&text=Check%20out%20Driveforce" aria-label="Share on Twitter">
                            <div class="btn-hover-mask"></div>
                            <svg aria-hidden="true" class="twitter" viewbox="0 0 16 16">
                                <use xlink:href="#twitter-icon"></use>
                            </svg>
                            <span>Share on Twitter</span>
                        </a>
                    </li>

                    <li data-animation-effect="moduleFadeIn" data-animation-trigger="scroll">
                        <a class="btn share-btn email" target="_blank" href="" aria-label="Share Via Email">
                            <div class="btn-hover-mask"></div>
                            <svg aria-hidden="true" class="email" viewbox="0 0 24 18">
                                <use xlink:href="#email-icon"></use>
                            </svg>
                            <span>Share Via Email</span>
                        </a>
                    </li>
                </ul>

        </div>
    </div>
</div>