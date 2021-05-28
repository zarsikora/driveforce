<div class="module-flush image-grid">
    <?php if(have_rows('images')): ?>
        <div class="row">
            <?php while(have_rows('images')): the_row(); ?>
                <?php $image = get_sub_field('image'); ?>
                <div class="col-md-2 image">
                    <?php echo imageTag($image); ?>
                </div>
            <?php endwhile; ?>
        </div>
    <?php endif; ?>
</div>