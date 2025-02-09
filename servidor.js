const http = require('node:http');
const url = require('url');

function collatzSequence(n) {
    let sequence = [];
    while (n !== 1) {
        sequence.push(n);
        n = n % 2 === 0 ? n / 2 : 3 * n + 1;
    }
    sequence.push(1);
    return sequence;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/collatz') {
        let num = parseInt(parsedUrl.query.numero);
        if (isNaN(num) || num <= 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Debe proporcionar un número entero positivo." }));
            return;
        }
        
        let result = collatzSequence(num);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ numero: num, secuencia: result }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
