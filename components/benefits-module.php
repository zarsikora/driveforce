<?php
$header = get_sub_field('header');
$greenBoxHeader = get_sub_field('green_box_header');
$greenBoxList = get_sub_field('green_box_list');
$whiteBoxHeader = get_sub_field('white_box_header');
$whiteBoxList = get_sub_field('white_box_list');
?>

<div class="benefits-module">
    <div class="row">
        <div class="col-lg-4">
            <?php if($header){ ?><p class="header"><?php echo $header ?></p><?php } ?>
            <svg viewBox="0 0 125.5 174.24">
                <use href="#poles"></use>
            </svg>
        </div>
        <div class="col-lg-4 col-xl-4">
            <div class="copy-box green">
                <p class="subheader"><?php echo $greenBoxHeader ?></p>
                <?php echo $greenBoxList ?>
            </div>
        </div>
        <div class="col-lg-4 col-xl-4">
            <div class="copy-box">
                <p class="subheader"><?php echo $whiteBoxHeader ?></p>
                <?php echo $whiteBoxList ?>
            </div>
        </div>
    </div>
</div>