<?php //TODO: Should redo this without creating a custom $item object and instead just using the wc product functions to access the right data.
      // This will make it more reusable without needing to keep remaking this custom object ?>
<div class="cart-drawer-product" data-cart-item-key="<?php echo $item['cartItemKey']; ?>">
    <div class="product-info">
        <div class="image">
            <?php echo $item['image'] ?>
        </div>
        <div>
            <p class="product-name">
                <?php echo $item['productName'] ?>
            </p>
            <div class="quantity">
                <input type="number" min="0" max="10" value="<?php echo $item['quantity']; ?>" />
            </div>
        </div>
    </div>
    <div class="product-total">
        <a class="cart-drawer-remove-product" href="#">
            <svg width="16" height="16" viewBox="0 0 16 16">
                <use href="#trash-icon"></use>
            </svg>
        </a>
        <p class="product-price"><?php echo $item['price']; ?></p>
    </div>
    <div class="product-subscribe">
        <p>
            <strong>Subscribe & Save 20%</strong><br />
            Monthly Subscription; Change or cancel any time
        </p>
        <label>
            <input type="checkbox" <?php if($item['purchaseType']){ echo 'checked'; }?> />
            <span class="subscribe-toggle"></span>
        </label>
    </div>
</div>