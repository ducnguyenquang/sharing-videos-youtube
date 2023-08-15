import { GET, POST, PUT, DELETE } from './api';

class BaseService {
  requestURL = '';
  constructor(requestURL: string) {
    this.requestURL = requestURL;
  }
  get(options: any) {
    return GET(this.requestURL, options);
  }

  post(payload: any, options?: any) {
    return POST(this.requestURL, payload, options);
  }

  put(payload: any, options: any) {
    return PUT(this.requestURL, payload, options);
  }

  delete(payload: any, options: any) {
    return DELETE(this.requestURL, payload, options);
  }
}

export default BaseService;
