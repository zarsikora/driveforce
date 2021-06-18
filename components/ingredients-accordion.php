<?php
$items = get_sub_field('items');
?>

<div class="ingredients-list-accordion">
    <div class="accordion" id="ingredientsAccordion">

        <?php
        $counter = 0;
        foreach($items as $item) : ?>

            <div class="accordion-item">
                <h2 class="accordion-header" id="accordionHeading<?php echo $counter ?>">
                    <button
                        class="accordion-button"
                        type="button"
                        data-toggle="collapse"
                        data-target="#accordionCollapse<?php echo $counter ?>"
                        aria-expanded="false"
                        aria-controls="accordionCollapse<?php echo $counter ?>">
                        <?php echo $item['header'] ?>
                    </button>
                </h2>
                <div
                    id="accordionCollapse<?php echo $counter ?>"
                    class="accordion-collapse collapse"
                    aria-labelledby="accordionHeading<?php echo $counter ?>"
                    data-parent="#ingredientsAccordion">
                    <div class="accordion-body">
                        <?php echo $item['copy'] ?>
                    </div>
                </div>
            </div>

        <?php
        $counter++;
        endforeach;
        ?>

    </div>
</div>