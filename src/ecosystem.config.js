module.exports = {
    apps: [
        {
            name: 'tic-tac-toe',
            script: 'npx',
            args: 'serve -s build -l 80 -n',
            interpreter: 'none',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
