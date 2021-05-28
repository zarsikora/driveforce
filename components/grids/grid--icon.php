<?php
if(get_sub_field('cards')){
    $cardCount = count( get_sub_field( 'cards' ) );
}
$header = get_sub_field('header');
?>

<div class="grid image module-wrapper <?php if($darkBg) echo "dark-bg" ?> <?php if($precedesCta) echo " precedes-cta" ?> <?php if($viewMore) echo 'view-more' ?>">
    <div class="module-padded">
        <div class="row">
            <?php if($header):?>
                <h2><?php echo $header ?></h2>
            <?php endif; ?>

            <div class="col-md-12">
                <div class="row">
                    <?php for($i = 0; $i <= ($cardCount - 1); $i++):
                            $cards = get_sub_field('cards');
                            $card = $cards[$i];
                            $graphic = $card['graphic'];
                    ?>

                     <div class="card-container col-6 col-md-3" data-scroll-effect="moduleFadeIn">
                         <?php include (realpath(dirname(__FILE__)."/../cards/card--icon.php")); ?>
                     </div>
                     <?php unset($cards); endfor; ?>
                </div>
            </div>
        </div>
    </div>
</div>