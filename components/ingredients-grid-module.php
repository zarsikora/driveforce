<?php
$header = get_sub_field('header');
$items = get_sub_field('grid_items');
?>

<div class="module-wrapper ingredients-grid-module">
    <div class="module-padded">
        <div class="row">
            <div class="col-lg-3">
                <p class="header"><?php echo $header ?></p>
            </div>
            <div class="col-lg-8 offset-lg-1">
                <div class="row">
                    <?php
                    foreach($items as $item) : ?>
                        <div class="col-lg-6 copy">
                            <?php if($item['icon']) : ?>
                                <?php echo imageTag($item['icon'], null, null, null, false, null, 40); ?>
                            <?php else : ?>
                                <svg width="50" viewBox="0 0 48.522 38.906">
                                    <use href="#stamina-icon"></use>
                                </svg>
                            <?php endif; ?>
                            <p class="subheader"><?php echo $item['item_header'] ?></p>
                            <p><?php echo $item['item_text'] ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</div>
