const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o middleware do proxy
app.use('/api', createProxyMiddleware({
    target: 'http://10.30.35.8:8080', // URL da sua API
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/rest/index/wsgetfuncionario', // reescrever o caminho
    },
}));

app.listen(PORT, () => {
    console.log(`Servidor proxy rodando na porta ${PORT}`);
});
