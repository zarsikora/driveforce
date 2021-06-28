<?php

function loadMoreComments()
{
    $offset = $_POST['offset'];
    $perPage = $_POST['perPage'];
    $postID = $_POST['postID'];

    $args = array(
        'post_id' => $postID,
        'offset' => $offset,
        'number' => $perPage,
        'status' => 'approve'
    );

    $comments_query = new WP_Comment_Query($args);
    $comments = $comments_query->comments;

    if(count($comments))
    {
        $html = '';

        foreach($comments as $comment)
        {
            ob_start();

            wc_get_template(
                'single-product/review.php',
                array(
                    'comment' => $comment,
                    'args'    => array(
                        'orderby' => 'DESC'
                    )
                )
            );

            $html .= ob_get_clean();
        }

        echo $html;
    }
    else
    {
        //echo 'No comments found';
    }

    wp_die();
}
add_action('wp_ajax_nopriv_load_more_comments', 'loadMoreComments');
add_action('wp_ajax_load_more_comments', 'loadMoreComments');