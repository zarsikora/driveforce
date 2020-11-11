<?php 
// LOAD IN HOMEMADE FUNCTIONS
include('includes/button.php');
include('includes/image-tag.php');

// SET UP BASIC NAV MENUS IN BACK END
function bones_menu_setup() {
    register_nav_menus( array(
            'main-menu' => esc_html__( 'Main Menu' ),
            'nav-pane-menu' => esc_html__( 'Nav Pane Menu' ),
            'footer-menu' => esc_html__('Footer Menu')
        )
    );
}
add_action( 'after_setup_theme', 'bones_menu_setup' );

//PREVENT DUPLICATE JQUERY LOAD
function remove_jquery_migrate($scripts)
{
    if (!is_admin() && isset( $scripts->registered['jquery']))
    {
        $script = $scripts->registered['jquery'];

        if($script->deps)
        {
            $script->deps = array_diff( $script->deps, array('jquery-migrate'));
        }
    }
}
add_action( 'wp_default_scripts', 'remove_jquery_migrate' );

//LOAD SCRIPTS 
function bones_load_scripts() {
    wp_enqueue_style( 'main-stylesheet', get_stylesheet_uri(), '', time() );

    wp_deregister_script( 'wp-embed' );

    wp_enqueue_script( 'main-scripts', get_bloginfo('url') . '/wp-content/themes/bones/bundle.js', '', time(), false);

    //AJAX PARAMS FOR LOADMORE
    global $wp_query;
    wp_localize_script( 'alarad-script', 'loadmore_params', array(
        'ajaxurl' => admin_url('admin-ajax.php'), // WordPress AJAX
        'posts' => $wp_query->query_vars, // everything about your loop is here
        'current_page' => get_query_var( 'paged' ) ? get_query_var('paged') : 1,
        'max_page' => $wp_query->max_num_pages
    ) );

    $pageComponents = get_field('components');

    if($pageComponents)
    {
        foreach($pageComponents as $p)
        {
            if($p['acf_fc_layout'] == 'contact_form_module')
            {
                wpcf7_enqueue_scripts();
            }
        }
    }
}
add_action( 'wp_enqueue_scripts', 'bones_load_scripts' );


//GET BLOG POSTS FOR AJAX
function getBlogPosts(){
    $counter = $_POST['pageCounter'];
    $postsPerPage = 10;
    $html = '';


    $blogArgs = array(
      'posts_per_page' => $postsPerPage,
      'offset' =>   ($postsPerPage * $counter)
    );
    $blogQuery = new WP_Query($blogArgs);
    $totalPosts = $blogQuery->found_posts;
    $returnObject = [
        'total' => $totalPosts
    ];

    if($blogQuery->posts):
        foreach($blogQuery->posts as $p):
            ob_start();

            $title = $p->post_title;
            $id = $p->ID;
            $date = get_the_date('', $id);
            $image = get_field('featured_image', $id);
            $link = get_the_permalink($id);
            $author = get_field('author_name', $id);
            $readTime = get_field('read_time', $id);

            ?>

            <!-- TODO - change to include card file that passes the data -->
            <div class="card-container col-md-6">
                <div class="card blog-article">
                    <a class="card-link" href="<?php echo $link; ?>" title="<?php echo $title; ?>" aria-label="Read Full Article: <?php echo $title; ?>"></a>
                    <div class="card-body">

                        <div class="img-wrapper">
                            <div class="inner">
                                <?php echo imageTag($image,'','','',false); ?>
                            </div>
                        </div>

                        <div class="text-wrapper">
                            <h3 class="header"><?php echo $title ?></h3>
                            <div class="meta-info">
                                <?php if($author){ ?><p class="date"><?php echo $author ?></p><?php } ?>
                                <?php if($date){ ?><p class="date"><?php echo $date ?></p><?php } ?>
                                <?php if($readTime){ ?><p class="date"><?php echo $readTime ?> min read</p><?php } ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <?php

            $html .= ob_get_clean();
        endforeach;
        $returnObject['html'] = $html;
    endif;

    echo(json_encode($returnObject));

    wp_die();
}
add_action('wp_ajax_nopriv_get_blog_posts', 'getBlogPosts');
add_action('wp_ajax_get_blog_posts', 'getBlogPosts');


// DEFER SCRIPTS
function bones_defer_scripts( $tag, $handle, $src )
{
    $defer = array(
        'main-scripts'
    );

    if ( in_array( $handle, $defer ) ) {
        return '<script src="' . $src . '" defer="defer" type="text/javascript"></script>' . "\n";
    }

    return $tag;
}
add_filter( 'script_loader_tag', 'bones_defer_scripts', 10, 3 );

// ALLOW SVG UPLOADS
function bones_mime_types($mimes) {
    $mimes['svg'] = 'image/svg';
    return $mimes;
}
add_filter('upload_mimes', 'bones_mime_types');

//Add acf options page to admin panel!
if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Theme Options',
		'menu_title'	=> 'Theme Options',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
	));
	
}

//Get menu function
function wp_get_menu_array($current_menu) {
    $array_menu = wp_get_nav_menu_items($current_menu);
    $menu = array();
    foreach ($array_menu as $m) {
        if (empty($m->menu_item_parent)) {
            $menu[$m->ID] = array();
            $menu[$m->ID]['ID'] = $m->ID;
            $menu[$m->ID]['title'] = $m->title;
            $menu[$m->ID]['url'] = $m->url;
            $menu[$m->ID]['children'] = array();
        }
    }
    $submenu = array();
    foreach ($array_menu as $m) {
        if ($m->menu_item_parent) {
            $submenu[$m->ID] = array();
            $submenu[$m->ID]['ID'] = $m->ID;
            $submenu[$m->ID]['title'] = $m->title;
            $submenu[$m->ID]['url'] = $m->url;
            $menu[$m->menu_item_parent]['children'][$m->ID] = $submenu[$m->ID];
        }
    }
    return $menu;
    }

?>