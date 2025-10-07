export const swaggerFile = {
  swagger: '2.0',
  info: {
    title: 'Minha API',
    description: 'Documentação gerada automaticamente',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor local'
    }
  ],
  basePath: '/',
  schemes: ['http'],
  paths: {
    '/healthz': {
      get: {
        description: '',
        responses: {
          default: {
            description: ''
          }
        }
      }
    },
    '/': {
      get: {
        description: '',
        responses: {
          default: {
            description: ''
          }
        }
      }
    },
    '/api/auth/sign-in': {
      post: {
        description: '',
        responses: {
          default: {
            description: ''
          }
        }
      }
    },
    '/v1/auth/sign-up': {
      post: {
        description: '',
        responses: {
          default: {
            description: ''
          }
        }
      }
    },
    '/api/users': {
      get: {
        description: '',
        responses: {
          default: {
            description: ''
          }
        }
      }
    },
    '/api/users/me': {
      get: {
        description: '',
        responses: {
          default: {
            description: ''
          }
        }
      }
    },
    '/users/admin': {
      get: {
        description: '',
        parameters: [
          {
            name: 'authorization',
            in: 'header',
            type: 'string'
          }
        ],
        responses: {
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        }
      }
    },
    '/api/payments': {
      get: {
        description: '',
        parameters: [
          {
            name: 'authorization',
            in: 'header',
            type: 'string'
          }
        ],
        responses: {
          default: {
            description: ''
          }
        }
      }
    },
    '/api/referrals': {
      get: {
        description: '',
        parameters: [
          {
            name: 'authorization',
            in: 'header',
            type: 'string'
          }
        ],
        responses: {
          default: {
            description: ''
          }
        }
      }
    },
    '/api/attendances': {
      get: {
        description: '',
        parameters: [
          {
            name: 'authorization',
            in: 'header',
            type: 'string'
          }
        ],
        responses: {
          default: {
            description: ''
          }
        }
      }
    },
    '/api/commissions': {
      get: {
        description: '',
        parameters: [
          {
            name: 'authorization',
            in: 'header',
            type: 'string'
          }
        ],
        responses: {
          default: {
            description: ''
          }
        }
      }
    }
  }
}
