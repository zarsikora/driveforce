<footer id="footer">
    <div class="inner">
        <div class="logo">
            <a class="logo-link" href="<?php echo home_url(); ?>" aria-label="Return to Home Page">
            
            <svg class="logo" viewBox="0 0 39.96 31.039">
                <use href="#footer-logo"></use>
            </svg>
            </a>
        </div>
        <?php
            $footerMenu = wp_get_menu_array('footer-menu'); 

            echo '<div class="menu-footer-menu-container">';
            echo '<ul id="menu-footer-menu" class="menu">';

            foreach ($footerMenu as $k => $v) {
                $current = ($v['title'] == get_the_title()) ? 'current' : '';
                
                echo '<li id="menu-item-' . $v['ID'] . '" class="menu-item menu-item-' . $v['ID'] . ' ' . $current .'">';
                echo '<a class="item-link" href="' . $v['url'] . '">' . $v['title'] . '</a>';
                echo '</li>';
            }

            echo '</ul>';
            echo '</div>';
        ?>
        <p class="copyright">&copy; DriveForce  <?php echo date('Y'); ?></p>
    </div>
</footer>