<div id="nav-pane" data-animate="slide-in">
    <div class="inner">

        <div>
            <?php echo button(get_bloginfo('url').'/product/df-18', 'Shop DF-18', 'btn thin-btn', '', ''); ?>

            <?php
            $navMenu = wp_get_menu_array('nav-pane-menu');

            if ($navMenu) {
                echo '<ul id="nav-pane-menu" class="menu">';
                $menuCounter = 1;
                foreach ($navMenu as $k => $v) {
                    $classes .= ' menu-item menu-item-' . $v['ID'];

                    echo '<li id="menu-item=' . $v['ID'] . '" class="' . $classes . '">';
                    echo '<a href="' . $v['url'] . '">';
                    echo $v['title'];
                    echo '</a>';
                    echo '</li>';

                    $menuCounter++;
                }
                echo '</ul>';
            }
            ?>

            <p class="copyright">&copy; DriveForce  <?php echo date('Y'); ?></p>
        </div>

    </div>
</div>