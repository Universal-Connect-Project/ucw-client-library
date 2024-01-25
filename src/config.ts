
const config = {
    LogLevel: 'debug',
    Port: '8088',
    Env: 'pre', // mocked
    Version: '',
    CryptoAlgorithm: 'aes-256-cbc',

    HostUrl: `${process.env.HOST_URL}`,
    WebhookHostUrl: `${process.env.WEBHOOK_HOST_URL}`,

    AuthServiceEndpoint: 'https://login.universalconnectproject.org/api',

    SophtronApiServiceEndpoint: 'https://api.sophtron.com/api',
    SophtronVCServiceEndpoint: 'https://vc.sophtron.com/api/',

    UcpClientId: `${process.env.UCP_USERID}`,
    UcpClientSecret: `${process.env.UCP_ACCESS_KEY}`,
    UcpEncryptionKey: `${process.env.UCP_ENCRYPTION_KEY}`,

    SophtronApiUserId: `${process.env.SOPHTRON_USERID}`,
    SophtronApiUserSecret: `${process.env.SOPHTRON_ACCESS_KEY}`,

    MxClientId: `${process.env.MX_CLIENT_ID}`,
    MxApiSecret: `${process.env.MX_API_KEY}`,
    MxClientIdProd: '',
    MxApiSecretProd: '',

    AkoyaClientId: '',
    AkoyaApiSecret: '',
    AkoyaClientIdProd: '',
    AkoyaApiSecretProd: '',

    FinicityPartnerId: '',
    FinicityAppKey: '',
    FinicitySecret: '',
    FinicityPartnerIdProd: '',
    FinicityAppKeyProd: '',
    FinicitySecretProd: '',
};

export default config;