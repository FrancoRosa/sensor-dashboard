# curl https://api.particle.io/v1/devices/e00fce68f3974f341ff3b687/CLI \
#        -d arg="device-check" \
#        -d access_token=8e0a8e4609b38c332b873829ada9016ac71529b6


# curl "https://api.particle.io/v1/devices/e00fce6823b53c12e7449dbc?access_token=8e0a8e4609b38c332b873829ada9016ac71529b6"


# curl https://api.particle.io/v1/devices/e00fce68f3974f341ff3b687/ping \
#        -X PUT \
#        -d access_token=8e0a8e4609b38c332b873829ada9016ac71529b6 && \

# curl https://api.particle.io/v1/devices/e00fce684b6abc057a7212ec/ping \
#        -X PUT \
#        -d access_token=8e0a8e4609b38c332b873829ada9016ac71529b6  && \

# curl https://api.particle.io/v1/devices/e00fce689f6c3fe5309c9816/ping \
#        -X PUT \
#        -d access_token=8e0a8e4609b38c332b873829ada9016ac71529b6  && \

# curl https://api.particle.io/v1/devices/e00fce68cd8ec3607180b696/ping \
#        -X PUT \
#        -d access_token=8e0a8e4609b38c332b873829ada9016ac71529b6  && \

# curl https://api.particle.io/v1/devices/e00fce6823b53c12e7449dbc/ping \
#        -X PUT \
#        -d access_token=8e0a8e4609b38c332b873829ada9016ac71529b6  && \

# curl https://api.particle.io/v1/devices/e00fce68fbaff8280babc8e9/ping \
#        -X PUT \
#        -d access_token=8e0a8e4609b38c332b873829ada9016ac71529b6  && \


# curl -X POST -d '{ "data": "e00fce68f3974f341ff3b687,946598400,0.000000,0.000000,8.91,9.52,9.61,9.65,0.00,0.00,0.00,0.00,0.00,0.00,23.0,58.4,352,413,330,300,4047" }' http://localhost:8765
curl -X POST -H "Content-Type: application/json" -d '{"data": "e00fce68f3974f341ff3b687,946598400,0.000000,0.000000,8.91,9.52,9.61,9.65,0.00,0.00,0.00,0.00,0.00,0.00,23.0,58.4,352,413,330,300,4047"}' http://localhost:8765
