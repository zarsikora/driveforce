<?php

function imageTag($imageObject, $classes = null, $sizes = null, $srcset = null, $lazyload = true, $width = null, $height = null)
{
    if(gettype($imageObject) == 'array')
    {
        $id = $imageObject['ID'];
        if(!$srcset) $srcset = wp_get_attachment_image_srcset($id, 'full');
        if(!$sizes) $sizes = wp_get_attachment_image_sizes($id, 'full');
        $altText = $imageObject['alt'];
        if($imageObject['width']) { $width = $imageObject['width']; }
        if($imageObject['height']) { $height = $imageObject['height']; }
        $src = $imageObject['url'];

        if($lazyload) return '<img class="b-lazy '. $classes .'" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="'. $src .'" alt="'. $altText .'" sizes="'. $sizes .'" data-srcset="'. $srcset .'" width="'. $width .'" height="'. $height .'" />';

        return '<img class="'. $classes .'" src="'. $src .'" alt="'. $altText .'" sizes="'. $sizes .'" srcset="'. $srcset .'" width="'. $width .'" height="'. $height .'" />';
    }

    if(gettype($imageObject) == 'string')
    {
        $altText = '';
        $src = $imageObject;

        return '<img class="'. $classes .'" src="'. $src .'" alt="'. $altText .'" sizes="'. $sizes .'" srcset="'. $srcset .'" width="'. $width .'" height="'. $height .'" />';
    }
}

?>