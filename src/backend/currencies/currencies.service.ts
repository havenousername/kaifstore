type RequestInitCurrencies = {
  method: string;
  redirect: RequestRedirect;
  headers: HeadersInit;
};

export type ResponseCurrenciesData = {
  success: boolean;
  symbols: Record<string, string>;
};

export class CurrenciesService {
  constructor(private apiUrl: string = 'https://api.apilayer.com') {}

  async getCurrencies(): Promise<ResponseCurrenciesData> {
    const headers = new Headers();
    headers.append('apikey', 'iuI65C3LZIxIPuiNyyChFpeB95Uh0HmO');
    const reqOptions: RequestInitCurrencies = {
      method: 'GET',
      redirect: 'follow',
      headers,
    };

    const data = await fetch(
      this.apiUrl + '/exchangerates_data/symbols',
      reqOptions,
    );

    if (data.status !== 200) {
      return { success: false, symbols: {} };
    }

    return (await data.json()) as ResponseCurrenciesData;
  }
}
