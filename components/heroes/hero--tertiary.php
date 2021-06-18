<?php
    $header = get_sub_field('header');
    $copy = get_sub_field('copy');
    $image = get_sub_field('image');
?>

<div class="jumbotron hero tertiary module-flush">
    <div class="inner">
        <div class="text-container">
            <div class="row">

                <div class="col-md-8 offset-md-2">
                    <h1 class="text-center"><?php echo $header ?></h1>
                    <?php if($copy): ?>
                        <div class="copy"><?php echo $copy ?></div>
                    <?php endif; ?>

                    <?php if($image) echo imageTag($image, '', '', '', false) ?>
                </div>

            </div>
        </div>
    </div>
</div>