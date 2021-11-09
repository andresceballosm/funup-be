/**
 * This gist was inspired from https://gist.github.com/homam/8646090 which I wanted to work when uploading an image from
 * a base64 string.
 * Updated to use Promise (bluebird)
 * Web: https://mayneweb.com
 *
 * @param  {string}  base64 Data
 * @return {string}  Image url
 */

 import fs from 'fs';
 const path = require('path');

 const imageUpload = async (base64:string) => {
    if (!base64) { return; }
  
    // You can either "yarn add aws-sdk" or "npm i aws-sdk"
    const AWS = require('aws-sdk');
  
    // Configure AWS with your access and secret key.
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET } = process.env;
    AWS.config.update({ region: AWS_REGION });

    if (process.env.NODE_ENV === 'local') {
      AWS.config.update({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      });
    }

    // Configure AWS to use promise
    AWS.config.setPromisesDependency(require('bluebird'));
  
    // Create an s3 instance
    const s3 = new AWS.S3();
  
    // Ensure that you POST a base64 data to your server.
    // Let's assume the variable "base64" is one.
    const base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  
    // Getting the file type, ie: jpeg, png or gif
    const type = base64.split(';')[0].split('/')[1];
  
    // Generally we'd have an userId associated with the image
    // For this example, we'll simulate one
    const uniqueFileName = new Date().toISOString().replace('.', '').replace(/:/g,'-');

    // With this setup, each time your user uploads an image, will be overwritten.
    // To prevent this, use a different Key each time.
    // This won't be needed if they're uploading their avatar, hence the filename, userAvatar.js.
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: `${uniqueFileName}.${type}`, // type is not required
      Body: base64Data,
      ContentEncoding: 'base64', // required
      ContentType: `image/${type}` // required. Notice the back ticks
    }

    if (process.env.NODE_ENV === 'test') {
      const publicPath = path.join(__dirname, '../public/');
      const filePath = `${publicPath}${uniqueFileName}.${type}`;
      fs.writeFile(filePath, base64Data, 'base64', (err) => { console.log(err) });

      return filePath;
    }

    // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
    // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
    let location = '';
    let key = '';
    try {
      const { Location, Key } = await s3.upload(params).promise();
      location = Location;
      key = Key;
    } catch (error) {
      console.log(error)
    }
    
    // Save the Location (url) to your database and Key if needs be.
    // As good developers, we should return the url and let other function do the saving to database etc
    console.log(location, key);
    
    return location;
    
    // To delete, see: https://gist.github.com/SylarRuby/b3b1430ca633bc5ffec29bbcdac2bd52
  }

module.exports = imageUpload;