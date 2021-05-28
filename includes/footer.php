<?php
    $disclaimer = get_field('disclaimer_text', 'options');
?>


    <footer id="footer">
            <div class="top">
                <div class="inner">
                    <div class="upper-nav row">
                        <div class="logo col-lg-2">
                            <a class="logo-link" href="<?php echo home_url(); ?>" aria-label="Return to Home Page">
                                <svg class="logo" viewBox="0 0 39.96 31.039">
                                    <use href="#footer-logo"></use>
                                </svg>
                            </a>
                        </div>

                        <ul class="submenu col-lg-2">
                            <li class="title">Shop</li>
                            <li>
                                <a href="">DF-18</a>
                            </li>
                            <li>
                                <a href="">My Account</a>
                            </li>
                        </ul>

                        <ul class="submenu col-lg-2">
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

                        <ul class="submenu col-lg-2">
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
                                <div id="mc_embed_signup">
                                    <div id="form-fields-wrapper">
                                        <form action="" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" novalidate="novalidate">
                                            <div class="mc-field-group form-group">
                                                <p id="EMAIL-label" style="font-size: 0">Email Address:</p>
                                                <input type="email" value="" name="EMAIL" class="required email form-control mce_inline_error" placeholder="Email Address" id="mce-EMAIL" aria-required="true" aria-invalid="true">
                                            <div id="mce-responses" class="clear">
                                                <div class="response" id="mce-error-response" style="display:none"></div>
                                                <div class="response" id="mce-success-response" style="display:none"></div>
                                            </div>

                                            <div style="position: absolute; left: -5000px;" aria-hidden="true">
                                                <input type="text" name="b_4dadd4bf5d57121d0fa219ea9_c9a7c97a57" tabindex="-1" value="">
                                            </div>
                                            <div class="clear">
                                                <button type="submit" name="subscribe" id="mc-embedded-subscribe" class="button btn thin-btn">
                                                    <span>SEND</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
                                <script type="text/javascript">
                                    (function($) {
                                        window.fnames = new Array();
                                        window.ftypes = new Array();
                                        fnames[1]='FNAME';
                                        ftypes[1]='text';
                                        fnames[2]='LNAME';
                                        ftypes[2]='text';
                                        fnames[0]='EMAIL';
                                        ftypes[0]='email';
                                    }(jQuery));
                                    var $mcj = jQuery.noConflict(true);
                                </script>

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

            <div class="bottom">

            </div>
    </footer>