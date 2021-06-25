<?php

include './logger.php';

$timestamp = './txt/.timestamp.txt';
$file = './txt/.state.txt';

class response {}

$r = new response;

$body = json_decode( file_get_contents('php://input'), true);

$state = $body['state'];

LOGGER($state);

file_put_contents( $timestamp, time() );
// file_put_contents( $mod,  )
// write state
file_put_contents( $file, $state );

$r = (object)['state' => $state ];
$r->success = true;

echo json_encode( $r );

