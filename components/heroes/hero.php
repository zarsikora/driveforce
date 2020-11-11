<?php

$type = get_sub_field('type');

if($type == 'primary') include 'hero--primary.php';
if($type == 'secondary') include 'hero--secondary.php';
if($type == 'tertiary') include 'hero--tertiary.php';

?>