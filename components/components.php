<?php

if(have_rows('components')) :
    while(have_rows('components')):
        the_row();

        switch(get_row_layout()){
            // HERO
            case 'hero' :
            include('heroes/hero.php');
            break;

            // CAROUSEL
            case 'carousel' : 
                include('carousel.php');
            break;

            //GRID
            case 'grid' :
                include('grids/grid.php');
            break;

            //PRODUCT INTRO
            case 'product_intro_module' :
                include('product-intro-module.php');
            break;

            //FULL WIDTH IMAGE
            case 'full_width_image' : 
                include('full-width-image.php');
            break;

            //FIFTY FIFTY
            case 'fiftyfifty' : 
                include('rtes/rte--fiftyfifty.php');
            break; 

            //RTE
            case 'rte' : 
                include('rtes/rte.php');
            break;

            //LIST 
            case 'link_list' :
                include('link-list.php');
            break;

            //WAITLIST MODULE
            case 'waitlist_module' : 
                include('forms/waitlist--module.php');
            break;

            //SHARE MODULE
            case 'share_module' :
                include('share-module.php');
            break;

            //FAQ ACCORDIONS
            case 'faq_module' : 
                include('faq-module.php');
            break;

            // FORM MODULE
            case 'contact_form' :
                include('forms/form--module.php');
            break;

            //ENDORSEMENT SLIDER
            case 'endorsement_slider' :
                include('endorsement-slider.php');
            break;

            //INGREDIENTS MODULE
            case 'ingredients_module' :
                include('ingredients-module.php');
            break;

            //CTA MODULE
            case 'cta_module' :
                include('cta-module.php');
            break;
        }
    endwhile;
endif;

?>