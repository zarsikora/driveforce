        </div> <!-- #container -->

        <?php if(get_the_ID() !== 224): ?>
            <?php include('includes/footer.php'); ?>
        <?php endif; ?>

        </div>

        <?php include ('components/fast-checkout.php'); ?>

        <!-- Ingredients image modal -->
        <div class="modal micromodal-slide" id="modal-ingredients" aria-hidden="true">
            <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-ingredients-title">
                    <header class="modal__header">
                        <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                    </header>
                    <main class="modal__content" id="modal-ingredients-content">
                        <img src="<?php echo get_bloginfo('url') ?>/wp-content/uploads/2021/06/DriveForce-DF-18-Ingredients.png" />
                    </main>
                </div>
            </div>
        </div>

        <!-- Notification Modal -->
        <?php include('components/notification-modal.php'); ?>

        <?php wp_footer(); ?>

    </body>

</html>