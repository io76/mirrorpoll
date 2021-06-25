<?php

$r = (object)[ 'success' => true ];

$state = file_get_contents('./txt/.state.txt');

$body = json_decode( file_get_contents('php://input'), true);

$modified = file_get_contents('./txt/.timestamp.txt');

$r->state = '';
$r->modified = $modified;

if( $modified !== $body['modified'] ){
	$r->state = $state;
}

if( !$state ){
	$r->success = false;
}


echo json_encode( $r );

