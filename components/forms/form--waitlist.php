<div id="form-wrapper">
    <form autocomplete="off" action="" method="post" id="sharpspring-waitlist" class="sharpspring-waitlist" novalidate>
        <?php if($mcTagName) : ?>
            <input type="hidden" name="mailchimp_tag_name" value="<?php echo $mcTagName ?>" />
        <?php endif; ?>

        <div class="field-group">
            <label class="sr-only">First Name</label>
            <input class="form-control" type="text" name="first-name" value="" placeholder="First Name*" />
        </div>
        <div class="field-group">
            <label class="sr-only">Last Name</label>
            <input class="form-control" type="text" name="last-name" value="" placeholder="Last Name*" />
        </div>
        <div class="field-group last-field">
            <label class="sr-only">Email</label>
            <input class="form-control" type="text" name="email" value="" placeholder="Email*" />
        </div>
        <p class="required">* All fields are required</p>
        <button disabled class="btn small" type="submit">
            <div class="btn-hover-mask"></div>
            <span>Sign Up</span>
        </button>
        <img class="form-loading" src="<?php echo get_bloginfo('url') ?>/wp-content/uploads/2021/01/loading-gif.gif" alt="loading" />
        <div class="form-message"></div>
    </form>
</div>