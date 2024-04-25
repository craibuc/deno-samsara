export class Samsara {

  private access_token: string;
  public base_uri: string = 'https://api.samsara.com'

  constructor (access_token: string) {
    this.access_token = access_token
  }

  get_driver = async (
    id: number
  ) => {

    return await fetch(`https://api.samsara.com/fleet/drivers/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
      })
    .then((response) => response.json())
    .then((content) => content.data);

  }


}