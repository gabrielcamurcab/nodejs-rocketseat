// Netflix & Spotify

// Importação de Clientes via CSV
// 1GB - 1.000.000
// POST /upload import.csv
// Internet: 10mb/s

// Sem stream = 100s -> Inserção no Banco de Dados

// 10mb -> 1000 linhas -> Inserção no Banco de Dados

// Readable Stream (Cliente envia) / Writable Stream (Servidor envia

// No node, cada porta de entrada/saída é necessariamente uma stream

// process.stdin
//    .pipe(process.stdout); // Entrada e saída primária de dados

import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStrem extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i)); // Buffer não aceita números

                this.push(buf); // Não pode ser um tipo primitivo
            }
        }, 1000); // Envia um chunk a cada segundo
    }
}

class MultiplyByTenStream extends Writable {
    _write (chunk, encoding, callback) { // Stream de escrita não retorna nada. Ela apenas processa o dado.
        console.log(Number(chunk.toString()) * 10);
        callback();
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        callback(null, Buffer.from(String(transformed)));
    }
}

// new OneToHundredStrem()
//    .pipe(process.stdout); // Canaliza o retorno pra saída primária (Terminal)

new OneToHundredStrem() // Readable
    .pipe(new InverseNumberStream()) // Transform
    .pipe(new MultiplyByTenStream()); // Writable - Canaliza o retorno pra stream de escrita