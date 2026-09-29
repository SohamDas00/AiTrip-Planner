$body = @{ textQuery = "Louvre Museum, Paris" } | ConvertTo-Json
$headers = @{
    "Content-Type" = "application/json"
    "X-Goog-Api-Key" = "AIzaSyDBpeHsvfDoy51O_zcBVzVCuVtYwP_6Iug"
    "X-Goog-FieldMask" = "places.id,places.displayName,places.photos"
}
$res = Invoke-RestMethod -Uri "https://places.googleapis.com/v1/places:searchText" -Method Post -Headers $headers -Body $body
$res | ConvertTo-Json -Depth 6 | Out-File -FilePath "ps_result.json" -Encoding utf8
