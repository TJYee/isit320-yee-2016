var servers = ['http://127.0.0.1:5984',
    'http://192.168.2.19:5984',
    'http://10.0.0.9:5984',
    'http://35.165.139.71:5984'
];
var serverIndex = 3;
var serverUrl = servers[serverIndex];
console.log('Middleware attaching to database on: ', serverUrl);

module.exports.serverUrl = serverUrl;
module.exports.dbName = 'game_data_yee';
