const api = {
    base_url: 'http://localhost/api_vinhos/',
    resource: 'wines/',
    methods: {
        post: 'insert/',
        get: 'list/',
        put: 'update/',
        delete: 'delete/'
    },
    headers: { 
        'Content-Type': 'application/json'
    }
}

export default api;