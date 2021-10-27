const Service = require('node-windows').Service

const svc = new Service({
    name: 'Neervet',
    description: "Neervet Animal Clinic",
    script: "src\\app.js"
});

svc.on('install', function(){
    svc.start();
});

svc.install();