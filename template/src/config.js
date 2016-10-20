exports.env = process.env.npm_package_config_env;

exports.server = {
  port: process.env.npm_package_config_server_port,
  host: process.env.npm_package_config_server_host
};

exports.client = {
  publicPath: process.env.npm_package_config_client_publicPath
};
