<?php
    $disclaimer = get_field('disclaimer_text', 'options');
?>

    <footer id="footer">
            <div class="top">
                <div class="inner">
                    <div class="upper-nav row">

                        <div class="logo col col-md-3 col-lg-2">
                            <a class="logo-link" href="<?php echo home_url(); ?>" aria-label="Return to Home Page">
                                <svg class="logo" viewBox="0 0 104 104">
                                    <use href="#square-logo"></use>
                                </svg>
                            </a>
                        </div>

                        <?php
                        $footerMenu1 = wp_get_menu_array('footer-menu-1');
                        $footerMenu2 = wp_get_menu_array('footer-menu-2');
                        $footerMenu3 = wp_get_menu_array('footer-menu-3');
                        ?>

                        <?php
                        if ($footerMenu1) {
                            $term = get_term_by('slug', 'footer-menu-1', 'nav_menu');
                            $menu_id = $term->term_id;
                            $header1 = get_field('footer_menu_header', 'term_'.$menu_id);
                            ?>
                            <ul class="submenu col-md-3 col-lg-2">
                                <li class="title"><?php echo $header1 ?></li>
                                <?php
                                $menuCounter = 1;
                                foreach ($footerMenu1 as $k => $v) { ?>

                                    <li id="menu-item=<?php echo $v['ID'] ?>">
                                        <a href="<?php echo $v['url'] ?>">
                                            <?php echo $v['title']; ?>
                                        </a>
                                    </li>

                                <?php
                                    $menuCounter++;
                                } ?>
                            </ul>
                        <?php } ?>

                        <?php
                        if ($footerMenu2) {
                            $term = get_term_by('slug', 'footer-menu-2', 'nav_menu');
                            $menu_id = $term->term_id;
                            $header2 = get_field('footer_menu_header', 'term_'.$menu_id);
                            ?>
                            <ul class="submenu col-md-3 col-lg-2">
                                <li class="title"><?php echo $header2 ?></li>
                                <?php
                                $menuCounter = 1;
                                foreach ($footerMenu2 as $k => $v) { ?>

                                    <li id="menu-item=<?php echo $v['ID'] ?>">
                                        <a href="<?php echo $v['url'] ?>">
                                            <?php echo $v['title']; ?>
                                        </a>
                                    </li>

                                    <?php
                                    $menuCounter++;
                                } ?>
                            </ul>
                        <?php } ?>

                        <?php
                        if ($footerMenu3) {
                            $term = get_term_by('slug', 'footer-menu-3', 'nav_menu');
                            $menu_id = $term->term_id;
                            $header3 = get_field('footer_menu_header', 'term_'.$menu_id);
                            ?>
                            <ul class="submenu col-md-3 col-lg-2">
                                <li class="title"><?php echo $header3 ?></li>
                                <?php
                                $menuCounter = 1;
                                foreach ($footerMenu3 as $k => $v) { ?>

                                    <li id="menu-item=<?php echo $v['ID'] ?>">
                                        <a href="<?php echo $v['url'] ?>">
                                            <?php echo $v['title']; ?>
                                        </a>
                                    </li>

                                    <?php
                                    $menuCounter++;
                                } ?>
                            </ul>
                        <?php } ?>

                        <div class="newsletter col-lg-4">
                            <h4>DriveForce Newsletter Signup</h4>
                            <p>DF-18 is the first nutrition solution created for the players physical and mental needs on and off the course.</p>

                            <div id="form-wrapper">
                                <?php include (realpath(dirname(__FILE__)."/../components/forms/form--waitlist.php")); ?>
                            </div>
                        </div>
                    </div>

                    <?php if($disclaimer): ?>
                        <div class="disclaimer">
                            <p><?php echo $disclaimer ?></p>
                        </div>
                    <?php endif; ?>

                    <div class="lower-nav row">
                        <ul class="submenu">
                            <li>
                                <a href="<?php bloginfo('url') ?>/privacy-policy">Privacy Policy</a>
                            </li>

                            <li>
                                <a href="<?php bloginfo('url') ?>/terms-of-service">Terms of Service</a>
                            </li>

                            <li>
                                <a href="<?php bloginfo('url') ?>/shipping-and-returns">Shipping & Returns</a>
                            </li>
                        </ul>

                        <p class="copyright">
                            108 Union Wharf Boston MA 02109<br />
                            <a href="mailto:info@driveforce.golf">info@driveforce.golf</a><br />
                            <span class="sm">&copy; DriveForce  <?php echo date('Y'); ?></span>
                        </p>
                    </div>
                </div>
            </div>
    </footer>