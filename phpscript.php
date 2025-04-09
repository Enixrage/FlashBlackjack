<?php

error_reporting(E_ALL);  // Show all errors
ini_set('display_errors', 1);  // Display errors on the page

require 'vendor/autoload.php'; // This loads the AWS SDK for PHP

use Aws\S3\S3Client;
use Aws\Exception\AwsException;

// Initialize the S3 client
$s3Client = new S3Client([
    'region'  => 'us-east-1', // Change to your S3 region
    'version' => 'latest',
]);

// S3 bucket and object key
$bucket = 'cis4004bucket';
$key = 'blackjack.png';

try {
    // Get the image from S3
    $result = $s3Client->getObject([
        'Bucket' => $bucket,
        'Key'    => $key
    ]);

    // Set the appropriate content type (image)
    header('Content-Type: ' . $result['ContentType']);

    // Output the image to the browser
    echo $result['Body'];

} catch (AwsException $e) {
    // If an error occurs, output the error message
    echo "Error fetching image: " . $e->getMessage();
}
?>

