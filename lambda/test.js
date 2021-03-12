const { NetlifyJwtVerifier } = require('@serverless-jwt/netlify');

const requireAuth = NetlifyJwtVerifier({
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE
});

exports.handler = requireAuth(async (event, context) => {
  try {
    const { claims } = context.identityContext;

    return {
      statusCode: 200,
      body: JSON.stringify({ claims })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error_description: err.message })
    };
  }
});