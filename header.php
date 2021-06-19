<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no" />
        <title>DriveForce</title>

        <?php wp_head(); ?>

        <?php $templateDir = get_bloginfo('template_directory'); ?>

        <!-- TODO: Add GTM ID to Options Page in Back End Sidebar -->
        <?php 
            $gtmId = get_field('google_tag_manager_id', 'option'); 
            $initGtm = get_field('init_gtm', 'option');
        ?>

        <?php if($gtmId && $initGtm): ?>
            <!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-<?php echo $gtmId ?>');</script>
            <!-- End Google Tag Manager -->
        <?php endif; ?>

        <!-- Favicons -->
        <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $templateDir ?>/assets/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $templateDir ?>/assets/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $templateDir ?>/assets/favicon/favicon-16x16.png">
        <link rel="mask-icon" href="<?php echo $templateDir ?>/assets/favicon/safari-pinned-tab.svg" color="#dc4443">
        <meta name="msapplication-TileColor" content="#dc4443">
        <meta name="theme-color" content="#ffffff">

        <!-- TODO: Add Bugherd Script to Options Page in Back End Sidebar -->
        <?php 
            $bugherdScript = get_field('bugherd_script_tag', 'option'); 
            $initBugherd = get_field('init_bugherd', 'option');

            if($bugherdScript && $initBugherd):
                echo $bugherdScript;
            endif; 
        ?>

    </head>

    <?php
    $backgroundColor = get_field('page_background_color');
    $headerColor = get_field('header_background_color');
    ?>

    <body <?php body_class(array('background-'.$backgroundColor)); ?> data-barba="wrapper" data-loadhome="<?php echo is_front_page(); ?>">

        <?php if($gtmId && $initGtm): ?>
            <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-<?php echo $gtmId ?>"
                            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->
        <?php endif; ?>

        <?php
        include('main-svg.svg');
        include('components/cart-drawer.php');
        ?>

        <div id="wrapper">

            <?php
            include('components/modal--waitlist.php'); ?>

            <?php include('components/nav/nav-pane.php'); ?>

            <?php include('components/banner.php'); ?>

            <header id="header" class="background-color-<?php echo $headerColor ?>" role="navigation">
                <div id="navscroll-container" class="navscroll-container">

                    <!-- Desktop -->
                    <div class="nav" id="flyout-menu">
                        <div class="link-wrapper">
                            <a class="nav-link" href="<?php echo get_site_url(); ?>/product/df-18">Shop</a>
                            <a class="nav-link" href="<?php echo get_site_url(); ?>/ingredients">Ingredients</a>
                            <a class="nav-link" href="<?php echo get_site_url(); ?>/our-story">Our Story</a>
                        </div>

                        <div class="header-logo">
                            <a class="header-link" href="<?php echo home_url(); ?>" aria-label="Return to Home Page">
                                <svg class="logo" viewbox='0 0 201.662 35.534'>
                                    <use href="#header-logo"></use>
                                </svg>
                            </a>
                        </div>

                        <div class="link-wrapper">
                            <a class="nav-link" href="<?php echo get_site_url(); ?>/learn">Learn</a>
                            <a class="nav-link" href="<?php echo get_site_url(); ?>/my-account/orders">Account</a>
                            <a class="open-cart-drawer nav-link" href="<?php echo get_site_url(); ?>/cart">
                                <svg class="cart" viewBox="0 0 27.644 22.64">
                                    <use xlink:href="#cart"></use>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Mobile -->
                    <div class="mobile-nav">
                        <div class="mobile-controls">
                            <button class="hamburger-control" name="menu-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="flyout-menu">
                                <svg aria-hidden="true" class="open active" viewBox="0 0 39 24">
                                    <use href="#hamburger-icon"></use>
                                </svg>

                                <svg aria-hidden="true" class="close" viewbox="0 0 29.604 29.604" width="18" height="18">
                                    <use href="#mobile-close"></use>
                                </svg>
                            </button>
                        </div>

                        <div class="header-logo">
                            <a class="header-link" href="<?php echo home_url(); ?>" aria-label="Return to Home Page">
                                <svg class="logo" viewbox='0 0 201.662 35.534'>
                                    <use href="#header-logo"></use>
                                </svg>
                            </a>
                        </div>

                        <a class="open-cart-drawer nav-link" href="<?php echo get_site_url(); ?>/cart">
                            <svg class="cart" viewBox="0 0 27.644 22.64">
                                <use xlink:href="#cart"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </header>

        <div id="container">