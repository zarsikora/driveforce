<?php
require_once(__DIR__ . '/../vendor/autoload.php');

function mailchimp_add_member_to_list()
{
    $apiKey = getenv('MAILCHIMP_KEY');

    $mailchimp = new MailchimpMarketing\ApiClient();
    $mailchimp->setConfig(['apiKey' => $apiKey, 'server' => 'us7']);

    $fields = $_POST['fields'];

    if(!$fields)
    {
        echo json_encode($fields);
        wp_die();
    }

    $listID = 'b5d3ece7d8';
    $tags = $fields['mailchimp_tag_name'] ? [['name' => $fields['mailchimp_tag_name']]] : [];

    try {
        $response = $mailchimp->lists->setListMember($listID, md5(strtolower($fields['email'])), [
            'email_address' => $fields['email'],
            'status' => 'subscribed',
            'merge_fields' => [
                "FNAME" => $fields['first-name'],
                "LNAME" => $fields['last-name']
            ],
            'tags' => $tags
        ]);

        echo json_encode($response);
    } catch(MailchimpMarketing\ApiException $e) {
        echo $e->getMessage();
    }

    wp_die();
}
add_action('wp_ajax_mailchimp_add_member_to_list', 'mailchimp_add_member_to_list');
add_action('wp_ajax_nopriv_mailchimp_add_member_to_list', 'mailchimp_add_member_to_list');

?>