export const CONST = {
    ep: {
        API: '/api',
        V1: '/v1',
        AUTHENTICATE: '/authenticate',
        USERS: '/users',
        BUCKETS: '/buckets',
        BUCKET_ITEMS:'/bucket-items',
        REGISTER: '/register',
        API_DOCS: '/api-docs',
        API_SWAGGER_DEF: '/swagger-definition',
        NOTIFICATIONS: '/notifications',
        UPLOAD_IMAGES: '/upload-images',
        client: {
        },
        common:{
            QUERY: '/query'
        }
    },
    TOKEN_HEADER_KEY: "x-access-token",
    ADMIN_ROLE: 'admin',
    GUEST_ROLE: 'guest',
    USER_ROLE: 'user',
    MOMENT_DATE_FORMAT: 'YYYY-MM-DD h:mm:ss a Z',
    ALEMBIC_API_Q_BACKPLANE: 'alembic-api-q-backplane',
    REQUEST_TOKEN_LOCATION: 'api-decoded-token',
    SALT_ROUNDS: 10,
    errorCodes: {
        EMAIL_TAKEN: 'EmailAlreadyTaken',
        PASSWORD_FAILED_CHECKS: 'PasswordFailedChecks',
        EMAIL_VERIFICATION_EXPIRED: 'EmailVerificationHasExpired',
        PASSWORD_RESET_TOKEN_EXPIRED: 'PasswordResetTokenExpired',
        SUPPLIER_NAME_TAKEN: 'SupplierNameTaken',
        SUPPLIER_SLUG_TAKEN: 'SupplierSlugTaken',
    },
    testing:{
        PRODUCT_ADMIN_EMAIL: "integration.product.adminRole@alembic.com",
        PRODUCT_EDITOR_EMAIL: "integration.product.editorRole@alembic.com",
        SUPPLIER_ADMIN_EMAIL: "integration.supplier.adminRole@alembic.com",
        SUPPLIER_EDITOR_EMAIL: "integration.supplier.editorRole@alembic.com",
        UPGRADE_USER_EMAIL: "integration.supplier.upgrade.editor@alembic.com",
        ORGANIZATION_NAME: "IntegrationTestOrganization",
        PUSH_TOKEN: 'fLJEsDMKn1M:APA91bE3Ins30n5DksYkZ7AS7m0x6oH9sSFUbP01Jrb7UyELrjo8obESU_IwJ9qHuxLYA5zxLqjszJwyw4MLojJUEUgEo7DROixo-NyXFtYPgkq_pgy-P1v5nkYiQYkn5SobZU7HPMCj',
    },
    IMAGE_UPLOAD_PATH: './img-uploads/',
}