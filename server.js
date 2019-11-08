const express = require('express');
const fs = require('fs');
const profiles = JSON.parse(fs.readFileSync('./profiles.json'));
const dataSet = generateData(profiles, 500);
const app = express();



app.get('/api/profiles', (req, res) => {
    res.send(dataSet);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

function generateData(origin, times){
    let tmp = [];
    for (let i = 0; i < times; i++) {
        tmp = Array.prototype.concat(tmp, origin);
    }
    return tmp;
}
