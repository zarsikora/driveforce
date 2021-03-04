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
                <div class="sticky-logo">
                    <a class="header-link" href="<?php echo home_url(); ?>" aria-label="Return to Home Page">
                        <svg id="square-logo" viewBox="0 0 104 104">
                            <g transform="translate(1584 -11825)">
                                <rect class="square-a" width="104" height="104" transform="translate(-1584 11825)"/>
                                <g transform="translate(-5509.671 11633.155)">
                                    <g transform="translate(3952.656 224.181)">
                                        <path class="square-b" d="M3963.185,224.736c-2.949-.7-6.465-.539-9.443-.539h-1.063s-.023,4.838-.023,6.322h5.59c4.444,0,9.045,1.726,11.57,6.129a12.934,12.934,0,0,1-.6,14.6c-2.451,3.589-5.7,4.935-10.021,5.272l-.245.016V238.648h-6.207v23.977l6.739-.006c.093,0,.183,0,.272-.007a19.148,19.148,0,0,0,17.922-15.837A19.365,19.365,0,0,0,3963.185,224.736Z" transform="translate(-3952.656 -224.181)"/>
                                        <path class="square-b" d="M4182.479,224.208h-.037a17.141,17.141,0,0,0-17.085,17.121h6.375a10.76,10.76,0,0,1,10.711-10.747v0h4.229v-6.379Z" transform="translate(-4135.871 -224.204)"/>
                                        <path class="square-b" d="M4165.935,353.333V356.3h6.375v-2.965a14.223,14.223,0,0,1,14.207-14.207h.717v-6.375h-.717A20.6,20.6,0,0,0,4165.935,353.333Z" transform="translate(-4136.369 -317.701)"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </a>
                </div>

                <div id="navscroll-container">
                    <div class="header-logo">
                        <a class="header-link" href="<?php echo home_url(); ?>" aria-label="Return to Home Page">
                            <svg class="logo" viewbox='0 0 201.662 35.534'>
                                <use href="#header-logo"></use>
                            </svg>
                        </a>
                    </div>

                    <div class="nav-right">
                        <?php include 'components/nav/flyout-menu.php'; ?>

                        <!-- V1 Waitlist Button -->
                        <?php echo button('#', 'Join the Waitlist', 'header-waitlist-btn', '#waitList'); ?>
                    </div>

                    <div class="mobile-controls" data-hover="scale">
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
                </div>
            </header>

            <!-- TODO: If custom cursor, enable here -->
            <?php //include('components/custom-cursor.php'); ?>

        <div id="container" data-barba="container" data-barba-namespace="<?php echo $post->post_name; ?>">
        <!-- TODO: If scroll indicator, enable here -->
        <?php //include('components/scroll-indicator.php'); ?>

