<div class="nav" id="flyout-menu">
    <?php
    $mainMenu = wp_get_menu_array('main-menu');

    if ($mainMenu) {
        $pageTitle = get_the_title();

        echo '<div class="menu-main-menu-container">';
        echo '<ul id="menu-main-menu" class="menu">';

        foreach ($mainMenu as $k => $v) {
            $current = ($v['title'] == get_the_title()) ? 'current' : '';
            $childrenCount = count($v['children']);
            if($childrenCount !== 0){
                $childrenClass = 'has-children';
            }

            echo '<li id="menu-item-' . $v['ID'] . '" class="menu-item menu-item-' . $v['ID'] . ' ' . $current . $childrenClass .'">';
            echo '<a class="item-link" href="' . $v['url'] . '">' . $v['title'] . '</a>'; 
            //echo '<a class="item-link" href="#">' . $v['title'] . '</a>'; FOR WHEN PARENT ITEM SHOULDNT HAVE LINK 

            if($childrenCount) {

                echo '<ul class="sub-menu">';

                foreach($v['children'] as $k2 => $v2)
                {
                    $icon = get_field('icon', $v2['ID']);
                    $subtext = get_field('subtext', $v2['ID']);
                    $class = ($icon && $subtext) ? 'has-subtext' : '';

                    echo '<li class="menu-item '. $class .'">';
                    echo '<a href="'. $v2['url'] .'">';
                    if($icon) echo '<img src="'. $icon['url'] .'" class="menu-item-icon" alt="'. $icon['alt'] .'" />';
                    echo $v2['title'] .'</a>';
                    if($subtext) echo '<span class="subtext">'. $subtext .'</span>';
                    echo '</li>';
                }

                echo '</ul>';
            }

            echo '</li>';
        }

        echo '</ul>';
        echo '</div>';
    }

    ?>
</div>