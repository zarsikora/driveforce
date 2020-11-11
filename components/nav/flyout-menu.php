<div class="nav" id="flyout-menu">
    <?php
    $mainMenu = wp_get_menu_array('main-menu');

    if ($mainMenu) {
        $pageTitle = get_the_title();

        echo '<div class="menu-main-menu-container">';
        echo '<ul id="menu-main-menu" class="menu">';

        foreach ($mainMenu as $k => $v) {
            $current = ($v['title'] == get_the_title()) ? 'current' : '';

            echo '<li id="menu-item=' . $v['ID'] . '" class="menu-item menu-item-' . $v['ID'] . ' ' . $current . '">';
            echo '<a class="item-link" href="' . $v['url'] . '">' . $v['title'] . '</a>';
            echo '</li>';
        }

        echo '</ul>';
        echo '</div>';
    }

    ?>
</div>