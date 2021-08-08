<?php
$fullWidth = get_sub_field('full_width');
$backgroundColor = get_sub_field('background_color');
$backgroundClass = ($backgroundColor === 'green') ? 'dark-bg' : (($backgroundColor === 'cream') ? 'color-bg' : (($backgroundColor === 'white') ? 'white-bg' : ''));
$moduleHeader = get_sub_field('module_header');
$items = get_sub_field('items');
?>

<div class="fiftyfifty module-wrapper <?php if($fullWidth){ echo 'full-width'; } echo ' ' . $backgroundClass; ?>">
    <div class="module-padded">

        <?php if($moduleHeader): ?>
            <h2 data-animation-effect="moduleFadeIn" data-animation-trigger="scroll" class="module-header"><?php echo $moduleHeader; ?></h2>
        <?php endif; ?>

        <div class="inner">
            <?php
            if($items)
            {
                foreach($items as $item) {
                    $image = $item['image'];
                    $header = $item['header'];
                    $copy = $item['copy']; ?>

                    <div class="item">
                        <div class="row align-items-center">
                            <div class="image-container col-md-6 col-lg-6" data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint">
                                <?php echo imageTag($image, '', '41.6%, (min-width: 992px) 33.3%', '', false); ?>
                            </div>

                            <div class="text-container col-md-6 col-xl-5 offset-xl-1">
                                <div class="text-inner" data-animation-effect="moduleFadeIn" data-animation-trigger="breakpoint">
                                    <?php if($header): ?>
                                        <h3><?php echo $header ?></h3>
                                    <?php endif; ?>

                                    <?php if($copy): ?>
                                        <p class="copy"><?php echo $copy ?></p>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>

                <?php }
            }
            ?>
        </div>

    </div>
</div>

<?php
unset($fullWidth);
unset($backgroundColor);
unset($backgroundClass);
unset($moduleHeader);
unset($items);
?>