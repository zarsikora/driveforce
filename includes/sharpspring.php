<?php

function getSSCookie()
{
    if(isset($_COOKIE['__ss_tk']))
    {
        $SharpSpringTracking = $_COOKIE['__ss_tk'];
        $SharpSpringTracking = str_replace('|', '_', $SharpSpringTracking);
        return $SharpSpringTracking;
    }

    return '';
}

function getParams($method, $f)
{
    $SSCookie = getSSCookie();

    if($method == 'createLeads')
    {
        return array(
            'objects' => array(
                array(
                    'firstName' => $f['first-name'],
                    'lastName' => $f['last-name'],
                    'emailAddress' => $f['email'],
                    'trackingID' => $SSCookie,
                    'isContact' => 1,
                    'signup_method_605f8759a02df' => $f['signup-type']
                )
            )
        );
    }

    if($method == 'updateLeads')
    {
        return array(
            'objects' => array(
                array(
                    'id' => $f['id'],
                    'signup_method_605f8759a02df' => $f['signup_method']
                )
            )
        );
    }

    if($method == 'deleteLeads')
    {

    }

    if($method == 'getLead')
    {

    }

    if($method == 'getLeads')
    {

    }
}

function sharpspring_request()
{
    $fields = $_POST['fields'];

    if(!$fields)
    {
        echo json_encode($fields);
        wp_die();
    }

    $method = $_POST['method'];
    $params = getParams($method, $fields);
    $requestID = session_id();
    $accountID = getenv('SS_ACCOUNT_ID');
    $secretKey = getenv('SS_SECRET_KEY');
    $data = array(
        'method' => $method,
        'params' => $params,
        'id' => $requestID,
    );

    $queryString = http_build_query(array('accountID' => $accountID, 'secretKey' => $secretKey));
    $url = "http://api.sharpspring.com/pubapi/v1/?$queryString";

    $data = json_encode($data);
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data),
        'Expect: '
    ));

    $result = curl_exec($ch);

    curl_close($ch);

    echo json_encode($result);
    wp_die();
}
add_action('wp_ajax_sharpspring_request', 'sharpspring_request');
add_action('wp_ajax_nopriv_sharpspring_request', 'sharpspring_request');
?>