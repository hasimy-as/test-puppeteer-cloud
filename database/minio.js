const { Client } = require('minio');

/** 
 * 
 * @description
 * Access minio by going to the
 * domain https://play.minio.io:9443
 * and use the credentials below for login.
 * 
**/

const minio = new Client({
  endPoint: 'play.minio.io',
  port: 9000,
  useSSL: true,
  accessKey: 'mokletdev-public-minio',
  secretKey: '5YWsTts0w06OjSQ8vBI9qQ=='
});

module.exports = minio;
