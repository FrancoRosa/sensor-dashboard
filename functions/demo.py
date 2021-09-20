from requests import post
url = 'http://localhost:5001/decon7-admin/us-central1/measurements'
# url = 'http://us-central1-decon7-admin.cloudfunctions.net/measurements'

measurement = {
    "id": "4",
    "notification": {
        "message": "Last drop",
        "timestamp": 16900000
    },
    "reservoirs": [0, 1, 0, 4],
    "last_measurement": {
        "values": [1, 1, 1, 8],
        "timestamp": 168000000
    },
}

r = post(url, json=measurement)
print(r.text)
