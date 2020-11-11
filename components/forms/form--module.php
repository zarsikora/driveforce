<?php
$introTitle = get_sub_field('introductory_title');
$introCopy = get_sub_field('introductory_copy');
?>

<div class="module-wrapper form-module dark" data-color="dark">
    <div class="module-padded">
        <div class="row">
            <div class="copy col-lg-5 offset-lg-1 ">
                <?php if($introCopy && $introTitle): ?>

                    <div class="copy mobile" id="accordion">
                        <div class="card">
                            <div class="inner">
                                <div class="card-header" id="contact-copy-title">
                                    <h3>
                                        <button class="question question-button collapsed" data-toggle="collapse" data-target="#contact-copy-body" aria-expanded="false" aria-controls="contact-copy-body">
                                            <?php echo $introTitle ?>

                                            <svg class="plus" viewBox="0 0 69 69">
                                                <defs><style>.plus-a{fill:#fff;}</style></defs>
                                                <rect class="plus-a" width="69" height="8" transform="translate(0 30.5)"/>
                                                <rect class="plus-a rotates" width="69" height="8" transform="translate(38.5) rotate(90)"/>
                                            </svg>
                                        </button>
                                    </h3>
                                </div>

                                <div id="contact-copy-body" class="card-body collapse" aria-labelledby="contact-copy-title" data-parent="#accordion">
                                    <div class="inner">
                                        <?php echo $introCopy ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="copy desktop">
                        <h3><?php echo $introTitle ?></h3>
                        <?php echo $introCopy ?>
                    </div>
                <?php endif; ?>
            </div>

            <div class="form col-lg-5 offset-xl-1">
                <?php include (realpath(dirname(__FILE__)."/form--contact.php")); ?>
            </div>
        </div>
    </div>
</div>

<div id="form-success-pane">
    <div class="inner">
        <h1>Thanks for reaching out! We’ll get in touch soon.</h1>
        <?php echo button(get_home_url(), 'Return Home'); ?>
        <svg class="logo" viewbox="0 0 95.803 101.04">
            <use xlink:href="#footer-badge"></use>
        </svg>
    </div>
</div>