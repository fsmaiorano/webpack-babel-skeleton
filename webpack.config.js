module.exports = {
    entry: [
        "@babel/polyfill",
        "./src/main.js" //Arquivo principal
    ],
    output: { //Arquivo de saída
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/public', //Caminho onde o servidor irá carregar
    },
    module: {
        rules: [
            // Como o webpack irá se comportar qd o usuário
            // for importar um novo arquivo js.
            // Qual o loader que ele irá utilizar.
            {
                test: /\.js$/, //Verifica se é um arquivo js
                exclude: /node_modules/, // Não irá entrar nesta pasta
                use: {
                    loader: 'babel-loader',
                }
            },
        ],
    },
}