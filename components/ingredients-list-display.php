<div class="module-wrapper ingredients-list-display dark-bg">
    <div class="module-padded">
        <div class="row">
            <div class="list-wrapper col-lg-6">
                <?php if(have_rows('ingredients')): ?>
                    <ul>
                        <?php $counter = 0 ?>
                        <?php while(have_rows('ingredients')): the_row(); ?>
                            <?php
                            $name = get_sub_field('name');
                            $slug = urlencode ($name);
                            $description = get_sub_field('description');
                            ?>
                            <li data-ingredient="<?php echo $slug ?>" class="ingredient-list-item <?php if($counter === 0) echo 'active' ?>">
                                <?php echo $name ?>
                            </li>
                            <?php $counter++ ?>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>

            <div class="description-wrapper col-lg-6">
                <?php if(have_rows('ingredients')): ?>
                    <ul>
                        <?php $counter = 0 ?>
                        <?php while(have_rows('ingredients')): the_row(); ?>
                            <?php
                            $name = get_sub_field('name');
                            $slug = urlencode ($name);
                            $description = get_sub_field('description');
                            ?>
                            <li data-ingredient="<?php echo $slug ?>" class="ingredient-description-item <?php if($counter === 0) echo 'active' ?>">
                                <h3><?php echo $name ; ?></h3>
                                <p><?php echo $description ?></p>
                            </li>
                            <?php $counter++ ?>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
