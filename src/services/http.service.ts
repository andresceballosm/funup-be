import { IncomingMessage } from 'http';
import https, { RequestOptions } from 'https';
import QueryString from 'querystring';

export type HttpOptions = {
  data: any;
  headers: {
    [header: string]: string;
  };
};

export type HttpResponse = {
  response: IncomingMessage;
  result: any;
};

const defaultHttpOptions: HttpOptions = {
  data: {},
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const generateRequestOptions = (
  url: URL,
  options: HttpOptions,
  method: 'POST' | 'GET'
): RequestOptions => {
  const reqData: RequestOptions = {
    protocol: url.protocol,
    hostname: url.hostname,
    port: url.port,
    path: url.pathname,
    method,
  };

  options.headers
    ? (reqData.headers = options.headers)
    : (reqData.headers = defaultHttpOptions.headers);

  return reqData;
};

const postRequest = (endpoint: string, options: HttpOptions = defaultHttpOptions) => {
  return new Promise<HttpResponse>((resolve, reject) => {
    // build request data
    const url = new URL(endpoint);
    const reqData = generateRequestOptions(url, options, 'POST');

    // create request
    const req = https.request(reqData, (res) => {
      // build response
      const buffers: any[] = [];
      res.on('data', (chunk) => {
        buffers.push(chunk);
      });

      res.on('end', () => {
        // parse response
        let result = null;
        try {
          result = Buffer.concat(buffers);
          result = result.toString();
          let contentType = res.headers['content-type'];
          if (typeof contentType == 'string') {
            contentType = contentType.split(';')[0].trim();
          }
          if (contentType == 'application/x-www-form-urlencoded') {
            result = QueryString.parse(result);
          } else if (contentType == 'application/json') {
            result = JSON.parse(result);
          }
        } catch (error: any) {
          error.response = res;
          error.data = result;
          reject(error);
          return;
        }
        resolve({ response: res, result: result });
      });
    });

    // handle error
    req.on('error', (error) => {
      reject(error);
    });

    // send
    options.data = QueryString.stringify(options.data);
    req.write(options.data);
    req.end();
  });
};

export { postRequest };
