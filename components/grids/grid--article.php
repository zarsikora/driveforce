<?php

    //ARTICLES PAGE
    if(get_the_id() == 196) 
    {  
        $blogPage = true;

        $args = array(
            'posts_per_page' => 6,
        );
        $posts = get_posts($args);
    }

    // OTHER PAGES WITH GRID OF TWO
    else {
        if(get_sub_field('blog_posts')){
            $postPicker = get_sub_field('blog_posts');
        } elseif(get_field('related_posts')){
            $postPicker = get_field('related_posts');
        }
        
        if($postPicker){
            $posts = $postPicker;

        } else {
            $args = array(
                'posts_per_page' => 2,
            );
            $posts = get_posts($args);
        }
        
        $postsLink = get_permalink(196); 
    }
?>

    <?php if ($posts): ?>
        <div class="module-wrapper moduleFadeIn grid-article">
            <div class="grid article module-padded">
                <div class="row">
                    <?php foreach($posts as $post): ?>
                        <?php setup_postdata($post); ?>
                        <div class="card-container col-md-6" data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint">
                            <?php include (realpath(dirname(__FILE__)."/../cards/card--article.php")); ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <?php if($posts && $postsLink): ?>
                <a class="browse-all" href="<?php echo $postsLink ?>" aria-label="Browse All Articles">Browse All Articles</a>
            <?php endif; ?>
        </div>
    <?php endif; ?>
        
<?php wp_reset_postdata(); ?>
