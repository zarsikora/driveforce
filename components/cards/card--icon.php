<?php
if(!$cards)
{
    $cards = get_sub_field('cards');
    $currentRow = $cards[$i];
    $graphic = $currentRow['graphic'];
}
?>

<div class="card icon">
    <div class="card-body">
        <div class="image-wrapper">
            <?php echo imageTag($graphic); ?>
        </div>
    </div>
</div>