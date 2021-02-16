<?php 
    $image = get_sub_field('image');
    $title = get_sub_field('title');
    $copy = get_sub_field('copy');
?>

<div class="card icon-text">
    <div class="card-body">
        <div class="image-wrapper">
            <?php echo imageTag($image, '', '', '', false); ?>
        </div>

        <div class="text-wrapper">
            <p class="card-header"><?php echo $title ?></p>

            <p class="copy"><?php echo $copy ?></p>
        </div>
    </div>
</div>