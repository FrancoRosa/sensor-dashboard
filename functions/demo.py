from requests import post
url = 'http://localhost:5001/decon7-admin/us-central1/measurements'
measurement = {
    "id": "6666",
    "notification": {
        "message": "Last drop",
        "timestamp": 16900000
    },
    "reservoirs": [0, 1, 0, 4],
    "last_measurement": {
        "values": [9, 9, 9, 9],
        "timestamp": 1700000000
    },
}

r = post(url, json=measurement)
print(r.text)
