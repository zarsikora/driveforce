<?php
    $header = get_sub_field('header');
    $centered = get_sub_field('centered_text');
    $image = get_sub_field('image');
?>

<div class="jumbotron hero tertiary module-flush">

    <div class="inner">
        <div class="text-container <?php if($centered) echo ' align-center'?>">
            <div class="row">
                <div class="<?php echo $centered ? ' col-md-12' : 'col-md-6'?>">
                    <h1><?php echo $header ?></h1>
                    <?php if($image) echo imageTag($image, '', '', '', false) ?>
                </div>
            </div>
        </div>
    </div>
</div>