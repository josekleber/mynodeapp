const app = require('./app');

const PORT = process.env.PORT || 0;

if (PORT === 0){
    console.error('Porta não definida.');
    process.exit(1);
}

const server = app.listen(PORT, ()=> {
    console.log(`Ouvindo a porta ${PORT}`);
});