<?php

if(have_rows('components')) :
    while(have_rows('components')):
        the_row();

        switch(get_row_layout()){
            // HERO
            case 'hero' :
            include('heroes/hero.php');
            break;

            // DOTTED DIVIDER
            case 'dotted_divider' :
                include('dotted-divider.php');
            break;

            //GRID
            case 'grid' :
                include('grids/grid.php');
            break;

            // BENEFITS MODULE
            case 'benefits_module' :
                include('benefits-module.php');
            break;

            //PRODUCT INTRO
            case 'product_intro_module' :
                include('product-intro-module.php');
            break;

            //FULL WIDTH IMAGE
            case 'full_width_image' : 
                include('full-width-image.php');
            break;

            // FULL WIDTH IMAGE WITH COPY
            case 'full_width_image_with_copy' :
                include('full-width-image-with-copy.php');
            break;

            //FIFTY FIFTY
            case 'fiftyfifty' : 
                include('fiftyfifty.php');
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

            // QUOTE MODULEE
            case 'quote_module' :
                include('quote-module.php');
            break;

            // INGREDIENTS ACCORDION
            case 'ingredients_accordion' :
                include('ingredients-accordion.php');
            break;

            //INGREDIENTS MODULE
            case 'ingredients_module' :
                include('ingredients-module.php');
            break;

            //CTA MODULE
            case 'cta_module' :
                include('cta-module.php');
            break;

            //INGREDIENTS LIST DISPLAY
            case 'ingredients_list_display' :
                include('ingredients-list-display.php');
            break;

            //INGREDIENTS GRID MODULE
            case 'ingredients_grid_module' :
                include('ingredients-grid-module.php');
            break;

            //LARGE TEXT MODULE
            case 'large_text_module' :
                include('large-text-module.php');
            break;
        }
    endwhile;
endif;

?>