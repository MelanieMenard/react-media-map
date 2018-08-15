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


// utility function for posting a REST GET query to Flickr Public Feed API via axios
// returns a promise with the response
const getFlickrFeedQuery = (searchString) => {

	// Flickr Public Feed API url
	// https://www.flickr.com/services/feeds/docs/photos_public/
	const endpoint = 'http://www.flickr.com/services/feeds/photos_public.gne';

	const formattedQueryTerms = searchString.split(' ').join(',');
	// nojsoncallback necessary to make the API return plain JSON rather than JSONP
	const query = {
    	tags: formattedQueryTerms,
    	format: "json",
    	nojsoncallback: "true"
  	};

  	// !!! 'Content-Type': 'application/x-www-form-urlencoded' was an attempt to get Flickr API to acept CORS request, however it did not work
  	// workaround is to install Chrome extension: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
  	// this problem would not happen in a production app using API designed to work with it
  	// I had only used Flickr API with jquery ajax and JSONP so never had this problem before, and used an API I already knew for this code test, as short on time.
  	const requestConfig = {
  		params: query,
  		headers: {
  			'Content-Type': 'application/x-www-form-urlencoded'
  		}
  	};

  	return axiosInstance.get(endpoint, requestConfig)
    .then((response) => {
    	// modify the image filename in each image result as Flickr returns tiny thumbnails
    	let formattedResponse = response.data.items.map((item) => {
    		let formattedResult = {
    			title: item.title,
    			author: item.author,
    			link: item.link,
    			image: item.media.m.replace("_m.jpg", ".jpg")
    		}
    		return formattedResult;
    	});
        return formattedResponse;
    })
    .catch((error) => console.log('getFlickrFeedQuery ERROR!!! ',error));
};


export {
	axiosInstance,
	getFlickrFeedQuery
};

