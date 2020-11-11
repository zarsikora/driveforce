<footer id="footer">
    <div class="inner">
        <div class="logo">
            <a class="logo-link" href="<?php echo home_url(); ?>" aria-label="Return to Home Page">
            </a>
        </div>

        <div class="footer-menu">
            <?php wp_nav_menu( array('theme_location' => 'footer-menu') ); ?>
        </div>

        <a class="totop" id="scroll-to-top-btn">
            <svg aria-hidden="true" viewBox="0 0 16 16">
                <use xlink:href="#totop"></use>
            </svg>
        </a>
    </div>
</footer>