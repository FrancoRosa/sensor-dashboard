from requests import post
url = 'http://localhost:5001/decon7-admin/us-central1'
url = 'http://us-central1-decon7-admin.cloudfunctions.net'

measurement = {
    "id": "hate dis",
    "notification": {
        "message": "NO drops",
        "timestamp": 169000000
    },
    "reservoirs": [0, 1, 0, 4],
    "last_measurement": {
        "values": [0, 1, 1, 8],
        "timestamp": 1766600000
    },
}
records = {
    'id': "1",
    'records': [
        ['2021-01-01', 1, 2, 3, 4],
        ['2021-01-03', 5, 6, 7, 8],
        ['2021-01-07', 9, 10, 11, 12],
    ]
}

r = post(url+'/measurements', json=measurement)
# r = post(url+'/records', json=records)
print(r.text)
