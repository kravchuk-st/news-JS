import { Callback, Endpoint, HttpMethod, RequestConfig, RequestOptions } from '../../types';

class Loader {
  constructor(
    private readonly baseLink: string,
    private readonly options: Readonly<RequestOptions>
  ) {}

  protected getResp<T>(
    { endpoint, options = {} }: RequestConfig,
    callback: Callback<T> = (): void => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load<T>(HttpMethod.GET, endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: RequestOptions, endpoint: Endpoint): string {
    const urlOptions: RequestOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(method: HttpMethod, endpoint: Endpoint, callback: Callback<T>, options: RequestOptions = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => this.errorHandler(res))
      .then((res) => res.json() as Promise<T>)
      .then((data) => callback(data))
      .catch((err: unknown) => console.error(err));
  }
}

export default Loader;
