<?php

$type = get_sub_field('type');

if($type == 'icon') include 'grid--icon.php';
if($type == 'article') include 'grid--article.php';


?>