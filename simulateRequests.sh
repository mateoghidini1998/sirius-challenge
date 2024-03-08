#!/bin/bash

# Script parameters
host=$1
port=$2
# Products urls list
productUrls=("http://www.amazon.com/gp/product/B00VVOCSOU" "https://www.amazon.com/TCL-Class-Full-1080p-Smart/dp/B0B232FKLB/" "https://www.amazon.com/RCA-Class-720P-Smart-RTR3261-CA/dp/B07DCDNHZQ/" "https://www.amazon.com/Roku-Select-RokuTV-Picture-Customizable/dp/B0CLFQD1SN/" "https://www.amazon.com/Philips-Universal-Panasonic-Streaming-SRP3249B/dp/B084XXXNVK")

# Function to excecute the CURL request.
makeRequest() {
    url=$1
    curl -X POST -H "Content-Type: application/json" -d "{\"url\": \"${url}\"}" "http://${host}:${port}/api/products/wordcloud"
}

# Excecute all request at the same time
export -f makeRequest
for url in "${productUrls[@]}"; do
    makeRequest "$url" &
done

# Wait untill all the requests are done
wait
