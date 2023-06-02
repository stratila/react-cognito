const config = {
  // Replace these values with your own AWS Cognito configuration
  aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_POOLS_WEB_CLIENT_ID,

  // API Gateway configuration
  aws_invoke_url: process.env.REACT_APP_AWS_INVOKE_URL,

};


export default config;