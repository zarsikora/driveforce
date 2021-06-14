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

function validateForm(fieldsArray)
{
    let errors = {};
    const rules = {
        required: ['first-name', 'last-name', 'email'],
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    };

    for(const property in fieldsArray)
    {
        // Required
        if(rules.required.indexOf(property) > -1)
        {
            if(!fieldsArray[property].length) errors[property] = property.replace('-', ' ') + ' is a required field';
        }

        // Valid email
        if(property === 'email')
        {
            if(!rules.email.test(fieldsArray[property])) errors[property] = 'invalid email address';
        }
    }

    return errors;
}

function getFormFieldsArray(form = null, fields = null)
{
    if(!fields) { fields = form.serializeArray(); }
    let fieldsArr = {};

    for(let i = 0; i < fields.length; i++)
    {
        fieldsArr[fields[i].name] = fields[i].value;
    }

    console.log(fieldsArr);

    return fieldsArr;
}

$('form input').on('keyup', function(e)
{
    const form = $(this).parents('form');
    const submit = $('button[type=submit]', form);
    const fieldsArray = getFormFieldsArray(form);
    const errors = validateForm(fieldsArray);

    let disabled = Object.keys(errors).length === 0;

    submit.prop('disabled', !disabled);
});

document.addEventListener( 'wpcf7submit', function(event)
{
    const inputs = event.detail.inputs;
    let fieldsArr = getFormFieldsArray(null, inputs);
        fieldsArr['signup-type'] = 'Contact Form';
    const method = 'createLeads';
    const errors = validateForm(fieldsArr);

    if(Object.keys(errors).length)
    {
        console.log('there was an error');
        return;
    }

    sharpspringAJAXRequest(method, fieldsArr, $(this));
});

$('form').on('submit', function(e)
{
    if($(this).hasClass('sharpspring-waitlist'))
    {
        e.preventDefault();

        // Disable submit button so it can't be submitted again
        $('button[type=submit]', $(this)).prop('disabled', true).hide();
        $('.form-loading', $(this)).show();

        let fieldsArr = getFormFieldsArray($(this));
            //fieldsArr['signup-type'] =  'Waitlist';
        let method = 'createLeads';
        let errors = validateForm(fieldsArr);

        if(Object.keys(errors).length)
        {
            console.log('there was an error');
            return;
        }

        sharpspringAJAXRequest(method, fieldsArr, $(this));
    }
});

async function sharpspringAJAXRequest(method, fields = null, form)
{
    const _form = form;

    const ajaxResults = await $.ajax({
        type: 'POST',
        url: localized_vars.ajaxurl,
        dataType: 'json',
        data: {
            action: 'sharpspring_request',
            method: method,
            fields: fields
        },
        success: function(data)
        {
            let json = JSON.parse(data);

            if(typeof _form == undefined) return;

            let formMessage = $('.form-message', _form);

            $('.form-loading', _form).hide();

            if(json.error.length)
            {
                formMessage.html('<p>' + json.error[0].message + '</p>');
                return;
            }

            formMessage.html('<p>You\'ve been added to the waitlist!</p>');
        },
        error: function(error)
        {
            console.log(error);
        }
    });

    const ajaxResultsJSON = JSON.parse(ajaxResults);

    console.log(ajaxResultsJSON);

    if(method == 'createLeads' && !ajaxResultsJSON.error.length)
    {
        $.ajax({
            type: 'POST',
            url: localized_vars.ajaxurl,
            dataType: 'json',
            data: {
                action: 'sharpspring_request',
                method: 'updateLeads',
                fields: {
                    'id': ajaxResultsJSON['result']['creates'][0]['id'],
                    'signup_method': 'Waitlist'
                }
            },
            success: function(data)
            {
                console.log(data);
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    }
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