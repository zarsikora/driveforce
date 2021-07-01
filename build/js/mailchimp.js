window.$ = window.jQuery = jQuery;

// Tracking cookie?

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
    const errors = validateForm(fieldsArr);

    if(Object.keys(errors).length)
    {
        console.log('there was an error');
        return;
    }

    mailchimpAJAXRequest(fieldsArr, $(this));
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
        let errors = validateForm(fieldsArr);

        if(Object.keys(errors).length)
        {
            console.log('there was an error');
            return;
        }

        mailchimpAJAXRequest(fieldsArr, $(this));
    }
});

async function mailchimpAJAXRequest(fields = null, form)
{
    const _form = form;

    console.log(fields);

    $.ajax({
        type: 'POST',
        url: localized_vars.ajaxurl,
        dataType: 'json',
        data: {
            action: 'mailchimp_add_member_to_list',
            fields: fields
        },
        success: function(data)
        {
            console.log(data);

            if(typeof _form == undefined) return;

            let formMessage = $('.form-message', _form);

            $('.form-loading', _form).hide();

            formMessage.html('<p>You\'ve been added to our newsletter!</p>');
        },
        error: function(error)
        {
            console.log(error);
        }
    });
}