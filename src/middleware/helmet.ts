import helmet from 'helmet'; // segurança - https://helmetjs.github.io/

export default helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self' 'unsafe-inline' 'unsafe-eval' 'nonce-rAnd0m123'", 'localhost', 'https://cdnjs.cloudflare.com'], // permite acesso aos docs
        },
    },
});

