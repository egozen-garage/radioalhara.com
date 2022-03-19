import sanityClient from"@sanity/client";

export default sanityClient({
    projectId: 'u3ckmo0l',
    dataset: 'production',
    apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
    token: 'skKER4NHgzHkGfwZombG9S3GOGJvkmRTJFdugXjL7MFzzG5LJtxPjEvFOoYiHTUGkw0UX52m3LJf0ssrD5LnhZxccEcDMIAnSNI2NM8k1Vcag17br6Ri4MRRF0Xyj8nmB1O2TBlua4vQNHocBaP5QgyOW3VSICiMrisIHa4oUL2mFVdkSgSI', // or leave blank for unauthenticated usage
    useCdn: true, // `false` if you want to ensure fresh data
})