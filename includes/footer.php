<?php
    $disclaimer = get_field('disclaimer_text', 'options');
?>


    <footer id="footer">
            <div class="top">
                <div class="inner">
                    <div class="upper-nav row">

                        <div class="logo col-md-3 col-lg-2">
                            <a class="logo-link" href="<?php echo home_url(); ?>" aria-label="Return to Home Page">
                                <svg class="logo" viewBox="0 0 104 104">
                                    <use href="#square-logo"></use>
                                </svg>
                            </a>
                        </div>

                        <ul class="submenu col-md-3 col-lg-2">
                            <li class="title">Shop</li>
                            <li>
                                <a href="">DF-18</a>
                            </li>
                            <li>
                                <a href="">My Account</a>
                            </li>
                        </ul>

                        <ul class="submenu col-md-3 col-lg-2">
                            <li class="title">Learn</li>
                            <li>
                                <a href="">Ingredients</a>
                            </li>
                            <li>
                                <a href="">Articles</a>
                            </li>
                            <li>
                                <a href="">FAQs</a>
                            </li>
                        </ul>

                        <ul class="submenu col-md-3 col-lg-2">
                            <li class="title">About</li>
                            <li>
                                <a href="">Our Story</a>
                            </li>
                            <li>
                                <a href="">Wholesale Inquiries</a>
                            </li>
                            <li>
                                <a href="">Contact Us</a>
                            </li>
                            <li>
                                <a href="">Press Inquiries</a>
                            </li>
                        </ul>

                        <div class="newsletter col-lg-4">
                            <h4>DriveForce Newsletter Signup</h4>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>

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
                                <a href="">Privacy</a>
                            </li>

                            <li>
                                <a href="">Terms & Conditions</a>
                            </li>

                            <li>
                                <a href="">Legal Disclosure</a>
                            </li>
                        </ul>

                        <p class="copyright">&copy; DriveForce  <?php echo date('Y'); ?></p>
                    </div>
                </div>
            </div>
    </footer>