/* ------------------------------------------- */
/*   Axios instance that reused accross queries for efficiency
/*   Generic REST query functions making use of the instance, used in the async thunk actions
/* ------------------------------------------- */

import axios from 'axios';
const http = require('http');
const https = require('https');


// First you set global config defaults that will be applied to every instances and requests
// https://github.com/axios/axios#global-axios-defaults
// 4 sec timeout
axios.defaults.timeout = 4000;
//follow up to 10 HTTP 3xx redirects
axios.defaults.maxRedirects = 10;
//cap the maximum content length we'll accept to 50MBs, just in case
axios.defaults.maxContentLength = 50 * 1000 * 1000;
//keepAlive pools and reuses TCP connections, so it's faster
axios.defaults.httpAgent = new http.Agent({ keepAlive: true });
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });


// then you create instance specific config when creating the instance
// https://github.com/axios/axios#custom-instance-defaults
// if we had authorization headers we would set them here
const axiosInstance = axios.create();


// utility function for posting a REST GET query to axios
// returns a promise with the response
const getRESTQuery = (endpoint, query) => {

  return axiosInstance.get(endpoint, {params: query})
    .then((response) => response)
    .catch((error) => console.log('ERROR!!! ',error));
};


export {
	axiosInstance,
	getRESTQuery
};

