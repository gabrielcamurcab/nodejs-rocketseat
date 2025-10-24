// Representação de um espaço na memória do PC. Usado pra transitar dados rapidamente.
// Guarda em binário, o que torna mais performático

const buf = Buffer.from("oi");

console.log(buf); // Hexadecimal
console.log(buf.toJSON()); // Decimal