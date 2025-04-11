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

// S3 bucket name
$bucket = 'cis4004bucket';

// Check if the 'card' query parameter is set for fetching card images
if (isset($_GET['card'])) {
    $card = $_GET['card'];  // Get the card name (e.g., 'AS', '10S')

    // Check if the requested card is the face-down card (BACK)
    if ($card === 'BACK') {
        $key = 'facedowncard.png';  // Path to the face-down card image (facedowncard.png)
    } else {
        // Define the path or file naming convention for your card images in S3
        $key = "{$card}.png";  // Assuming cards are stored as 'AS.png', '10S.png', etc.
    }

    try {
        // Get the card image from S3
        $result = $s3Client->getObject([
            'Bucket' => $bucket,
            'Key'    => $key
        ]);

        // Set the appropriate content type (image)
        header('Content-Type: ' . $result['ContentType']);

        // Output the image to the browser
        echo $result['Body'];

    } catch (AwsException $e) {
        // If an error occurs (image not found), output the error message
        echo "Error fetching card image: " . $e->getMessage();
    }
} 

?>
