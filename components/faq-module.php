<div class="module-wrapper faq">
    <div class="module-padded faq" id="accordion">
        <?php if( have_rows('faq') ): ?>
                <?php $counter = 1 ?>
                <?php while( have_rows('faq') ) : the_row(); ?>
                   <?php
                        $question = get_sub_field('question');
                        $answer = get_sub_field('answer');
                   ?>

                    <div class="card">
                        <div class="inner">
                            <div class="card-header" id="heading-<?php echo $counter ?>">
                                <h2 class="mb-0">
                                    <button class="question question-button collapsed" data-toggle="collapse" data-target="#collapse-<?php echo $counter ?>" aria-expanded="false" aria-controls="collapse-<?php echo $counter ?>">
                                        <?php echo $question ?>

                                        <svg class="plus" viewBox="0 0 69 69">
                                            <defs><style>.plus-a{fill:#000;}</style></defs>
                                            <rect class="plus-a" width="69" height="8" transform="translate(0 30.5)"/>
                                            <rect class="plus-a rotates" width="69" height="8" transform="translate(38.5) rotate(90)"/>
                                        </svg>
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse-<?php echo $counter ?>" class="card-body collapse" aria-labelledby="heading-<?php echo $counter ?>" data-parent="#accordion">
                                <div class="inner">
                                    <p class="copy"><?php echo $answer ?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php $counter = $counter + 1 ?>
                <?php endwhile; ?>
        <?php endif; ?>
    </div>
</div>