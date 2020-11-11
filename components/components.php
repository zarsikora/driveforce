<?php

if(have_rows('components')) :
    while(have_rows('components')):
        the_row();

        switch(get_row_layout()){
            // HERO
            case 'hero' :
            include('heroes/hero.php');
            break;

            //GRID
            case 'grid' :
                include('grids/grid.php');
            break;

            // FORM MODULE
            case 'contact_form_module' :
                include('forms/form--module.php');
            break;
        }
    endwhile;
endif;

?>