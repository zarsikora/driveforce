<?php 

$image = get_sub_field('image');

?>

<div class="module-flush full-width-image" >
    <?php echo imageTag($image, '', '', '', false); ?>
</div>