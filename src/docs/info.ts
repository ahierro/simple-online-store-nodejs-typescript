export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Store API',
            version: '1.0.0',
            description: 'CRUD for Products and Carts',
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/docs/*.yml']
}