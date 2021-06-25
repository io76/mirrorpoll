<?php

function LOGGER( $msg ){

	$logfile = 'txt/.log.txt';

	file_put_contents( $logfile, $msg . PHP_EOL, FILE_APPEND | LOCK_EX );

	if( filesize( $logfile ) > 10000 ){
		file_put_contents( $logfile, 'truncating' . PHP_EOL );
	}

}

