<?php 
    $image = get_field('modal_image', 'option');
    $title = get_field('modal_title', 'option');
    $copy = get_field('modal_copy', 'option');
?>

<div class="modal fade" id="waitlistModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

        <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>

            <div class="form-module" id="modal-waitList">
                <div class="module-padded">
                    <div class="row">
                        <div class="img col-md-6">
                            <?php echo imageTag($image, '', '', '', false); ?>
                        </div>

                        <div class="form col-md-6">
                            <div class="copy">
                                <h2><?php echo $title ?></h2>
                                <p><?php echo $copy ?></p>
                            </div>

                            <?php include (realpath(dirname(__FILE__)."/forms/form--waitlist.php")); ?>
                        </div>

                        <div class="tag">
                            <span>Hitting the course <span class="sage">Spring 2021</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  </div>
</div>