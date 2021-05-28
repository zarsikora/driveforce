<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no" />
        <title>DriveForce</title>
        <?php wp_head(); ?>

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
        <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri()?>/assets/favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri()?>/assets/favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri()?>/assets/favicons/favicon-16x16.png">
        <link rel="manifest" href="<?php echo get_template_directory_uri()?>/assets/favicons/site.webmanifest">
        <link rel="mask-icon" href="<?php echo get_template_directory_uri()?>/assets/favicons/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#b91d47">
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

    <body <?php body_class(); ?> data-barba="wrapper" data-loadhome="<?php echo is_front_page(); ?>">

        <?php if($gtmId && $initGtm): ?>
            <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-<?php echo $gtmId ?>"
                            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->
        <?php endif; ?>

        <?php include('main-svg.svg'); ?>

        <div id="wrapper">
            <!-- Starter pane for Barba transitions -->
            <div class="animation-pane vertical" id="animation-pane-vertical">
                <img id="animation-pane-asset" alt="" src='<?php echo home_url(); ?>/wp-content/themes/bones/assets/img/logo.png'/>
            </div>

            <!-- Waitlist Modal -->
            <?php include('components/modal--waitlist.php'); ?>

            <!-- TODO: Configure Nav Pane -->
            <?php include('components/nav/nav-pane.php'); ?>

            <?php include('components/banner.php'); ?>

            <header id="header" role="navigation">
                <div id="navscroll-container">
                    <?php include 'components/nav/flyout-menu.php'; ?>

                    <div class="mobile-nav">
                        <div class="mobile-controls">
                            <button class="hamburger-control" name="menu-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="flyout-menu">
                                Toggle Mobile Nav Controls

                                <svg aria-hidden="true" class="open active" viewBox="0 0 39 24">
                                    <defs><style>.hamburger-a{fill:#081d1a;opacity:0.998;}</style></defs>
                                    <g transform="translate(-275 -71)">
                                        <rect class="hamburger-a" width="4" height="17" rx="2" transform="translate(292 71) rotate(90)"/>
                                        <rect class="hamburger-a" width="4" height="39" rx="2" transform="translate(314 81) rotate(90)"/>
                                        <rect class="hamburger-a" width="4" height="19" rx="2" transform="translate(314 91) rotate(90)"/>
                                    </g>
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

                        <svg class="logo" viewBox="0 0 27.644 22.64">
                            <use xlink:href="#cart"></use>
                        </svg>
                    </div>
                </div>
            </header>

        <div id="container" data-barba="container" data-barba-namespace="<?php echo $post->post_name; ?>">
        <!-- TODO: If scroll indicator, enable here -->
        <?php //include('components/scroll-indicator.php'); ?>

