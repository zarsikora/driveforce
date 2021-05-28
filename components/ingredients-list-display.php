<?php
    // figure out how many list items to put in each col
    $listItemCount = count(get_sub_field('ingredients'));
    $listItemPerCol = ceil(($listItemCount / 3));
    $colCounter = 0;
    $totalCounter = 0;
?>

<div class="module-wrapper ingredients-list-display dark-bg">
    <div class="module-padded">
        <div class="row">
            <div class="list-wrapper col-lg-6">
                <?php if(have_rows('ingredients')): ?>
                    <ul class="row">
                        <?php $firstItem = true; ?>
                        <?php while(have_rows('ingredients')): the_row(); ?>
                            <?php
                            $name = get_sub_field('name');
                            $slug = preg_replace('#[ -]+#', '-', $name);
                            $description = get_sub_field('description');
                            ?>

                            <?php if($colCounter == 0) echo '<div class="col-lg-4">' ?>

                            <li data-ingredient="<?php echo $slug ?>" class="ingredient-list-item <?php if($firstItem) echo 'active' ?>">
                                <?php echo $name ?>
                            </li>
                            <?php $firstItem = false; ?>
                            <?php $colCounter++ ?>
                            <?php $totalCounter++ ?>

                            <?php if($colCounter == $listItemPerCol || $totalCounter == $listItemCount): ?>
                                <?php $colCounter = 0 ?>
                                </div> <!-- closes .col-lg-4 <?php echo $colCounter ?> -->
                            <?php endif; ?>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>

            <div class="description-wrapper col-lg-6">
                <?php if(have_rows('ingredients')): ?>
                    <ul>
                        <?php $firstItem = true; ?>
                        <?php while(have_rows('ingredients')): the_row(); ?>
                            <?php
                            $name = get_sub_field('name');
                            $slug = preg_replace('#[ -]+#', '-', $name);
                            $description = get_sub_field('description');
                            ?>
                            <li data-ingredient="<?php echo $slug ?>" class="ingredient-description-item <?php if($firstItem) echo 'active' ?>">
                                <h3><?php echo $name ; ?></h3>
                                <p><?php echo $description ?></p>
                            </li>
                            <?php $firstItem = false; ?>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
