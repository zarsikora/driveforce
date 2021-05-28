<?php
/**
 * Review Comments Template
 *
 * Closing li is left out on purpose!.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/review.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 2.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}
?>

<li>
    <div id="comment-" class="comment_container">
        <?php woocommerce_review_display_gravatar($comment); ?>
        <div class="comment-text">
            <?php
            //woocommerce_review_display_rating();
            $rating = intval( get_comment_meta( $comment->comment_ID, 'rating', true ) );

            if ( $rating && wc_review_ratings_enabled() ) {
                echo wc_get_rating_html( $rating );
            }

            //woocommerce_review_display_meta()
            $verified = wc_review_is_from_verified_owner( $comment->comment_ID );

            if ( '0' === $comment->comment_approved ) { ?>

                <p class="meta">
                    <em class="woocommerce-review__awaiting-approval">
                        <?php esc_html_e( 'Your review is awaiting approval', 'woocommerce' ); ?>
                    </em>
                </p>

            <?php } else { ?>

                <p class="meta">
                    <strong class="woocommerce-review__author"><?php comment_author($comment->comment_ID); ?> </strong>
                    <span class="woocommerce-review__dash">&ndash;</span> <time class="woocommerce-review__published-date" datetime="<?php echo esc_attr( get_comment_date( 'c', $comment->comment_ID ) ); ?>"><?php echo esc_html( get_comment_date( wc_date_format(), $comment->comment_ID ) ); ?></time>
                </p>

                <?php
            }
            ?>

            <div class="description">
                <?php
                //woocommerce_review_display_comment_text()
                comment_text($comment->comment_ID);
                ?>
            </div>
        </div>
    </div>
</li>