window.$ = window.jQuery = jQuery;

var _ss = _ss || [];
_ss.push(['_setDomain', 'https://koi-3QNE6LJPAE.marketingautomation.services/net']);
_ss.push(['_setAccount', 'KOI-4DT9NRPKF6']);
_ss.push(['_trackPageView']);
window._pa = window._pa || {};
(function() {
    var ss = document.createElement('script');
    ss.type = 'text/javascript'; ss.async = true;
    ss.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'koi-3QNE6LJPAE.marketingautomation.services/client/ss.js?ver=2.4.0';
    var scr = document.getElementsByTagName('script')[0];
    scr.parentNode.insertBefore(ss, scr);
})();

// let fieldsArr = {
//     'company': "heretic",
//     'email': "dev@heretic.agency",
//     'first-name': "devn",
//     'funding': "Self-funded",
//     'industry': "dev",
//     'last-name': "riley",
//     'launch': "Pre-launch",
//     'location': "salem",
//     'offering': "Product",
//     'referral': "rick",
//     'referred': "Yes",
//     'scope': "tewt"
// }

// sharpspringAJAXRequest('createLeads', fieldsArr);

document.addEventListener('wpcf7mailsent', function(event)
{
    let formID = event.detail.contactFormId;
    let fields = event.detail.inputs;
    let fieldsArr = {};
    let method = '';

    for(let i = 0; i < fields.length; i++)
    {
        fieldsArr[fields[i].name] = fields[i].value;
    }

    // Waitlist
    if(formID == 5)
    {
        fieldsArr['signup-type'] =  'Waitlist';
        method = 'createLeads';
    }

    // Contact Us
    if(formID == 164)
    {
        fieldsArr['signup-type'] =  'Contact Form';
        method = 'createLeads';
    }

    sharpspringAJAXRequest(method, fieldsArr);
}, false);

function sharpspringAJAXRequest(method, fields = null)
{
    $.ajax({
        type: 'POST',
        url: localizedVars.ajaxurl,
        dataType: 'json',
        data: {
            action: 'sharpspring_request',
            method: method,
            fields: fields
        },
        success: function(data)
        {
            let json = JSON.parse(data);

            if(json.error.length)
            {
                console.log(json.error[0].message);
                return;
            }

            console.log('success', json);
        },
        error: function(err)
        {
            console.log('error', err);
        }
    });
}

function sharpspringTransaction()
{
    // _ss.push(['_setTransaction', {
    //     'transactionID': '<?php echo $order->get_order_number(); ?>',
    //     'storeName': 'Store Name',
    //     'total': '<?php echo $order->get_total(); ?>',
    //     'tax': '<?php echo $order->get_total_tax(); ?>',
    //     'shipping': '<?php echo $order->get_total_shipping(); ?>',
    //     'city': '<?php echo $billing['city']; ?>',
    //     'state': '<?php echo $billing['state']; ?>',
    //     'zipcode': '<?php echo $billing['postcode']; ?>',
    //     'country': '<?php echo $billing['country']; ?>',
    //
    //     'firstName': '<?php echo $billing['first_name']; ?>', // optional parameter
    //     'lastName': '<?php echo $billing['last_name']; ?>', // optional parameter
    //     'emailAddress': '<?php echo $billing['email']; ?>' // optional parameter
    // }]);
    //
    // _ss.push(['_addTransactionItem', {
    //     'transactionID': '<?php echo $order->get_order_number(); ?>',
    //     'itemCode': '<?php echo $product_sku; ?>',
    //     'productName': '<?php echo $product['name']; ?>',
    //     'category': 'General',
    //     'price': '<?php echo $product['line_total']; ?>',
    //     'quantity': '<?php echo $product['qty']; ?>'
    // }]);
    //
    // _ss.push(['_completeTransaction', {
    //     'transactionID': '<?php echo $order->get_order_number(); ?>'
    // }]);
}
//add_action( 'woocommerce_thankyou', 'sharpspringTransaction' );