<div class="module-flush ingredients-list-display">
    <div class="row">
        <div class="list-wrapper col-lg-6">
            <?php if(have_rows('ingredients')): ?>
                <ul>
                    <?php while(have_rows('ingredients')): the_row(); ?>
                        <?php
                        $name = get_sub_field('name');
                        $slug = urlencode ($name);
                        $description = get_sub_field('description');
                        ?>
                        <li data-ingredient="<?php echo $slug ?>">
                            <p><?php echo $name ?></p>
                        </li>
                    <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
        </div>

        <div class="description-wrapper col-lg-6">
            <?php if(have_rows('ingredients')): ?>
                <ul>
                    <?php while(have_rows('ingredients')): the_row(); ?>
                        <?php
                        $name = get_sub_field('name');
                        $slug = urlencode ($name);
                        $description = get_sub_field('description');
                        ?>
                        <li data-ingredient="<?php echo $slug ?>">
                            <h3><?php echo $name ; ?></h3>
                            <p><?php echo $description ?></p>
                        </li>
                    <?php endwhile; ?>
                </ul>
            <?php endif; ?>
        </div>
    </div>
</div>