export class Samsara {

  private access_token: string;
  public base_uri: string = 'https://api.samsara.com'

  constructor (access_token: string) {
    this.access_token = access_token
  }

}