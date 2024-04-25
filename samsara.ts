import { DriverUpdateType, DriverCreateType } from './types.ts'

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

  find_drivers = async (
    inactive?: boolean,
  ) => {
  
    // param
    const params = new URLSearchParams()

    if (inactive) params.append('driverActivationStatus','deactivated')
  
    let url = params.size>0 ? `https://api.samsara.com/fleet/drivers?${ params.toString() }` : "https://api.samsara.com/fleet/drivers";
  
    let drivers: Array<object> = [];
    let proceed: boolean = false;

    do {

      const content = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
      });

      drivers = drivers.concat(content.data);

      // next page of data
      proceed = content.pagination.hasNextPage;

      if (content.pagination.hasNextPage) {
        params.set('after',content.pagination.endCursor)
        url = `https://api.samsara.com/fleet/drivers?${ params.toString() }`;
      }

    } while (proceed);

    return drivers;

  }
  
  update_driver = async (
    id: number,
    driver: DriverUpdateType
  ) => {  

    return await fetch(`https://api.samsara.com/fleet/drivers/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.access_token}`,
          'Content-Type': "application/json",
        },
        body: JSON.stringify(driver)
      })
    .then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
    })
    .then((content) => content.data)
    .catch((response) => {

      const response_status = `${response.statusText} [${response.status}]`;
      const content_type = response.headers.get("content-type");

      if (content_type && content_type.indexOf("application/json") !== -1) {
          return response.json().then((data: any) => {
            throw new Error(`${response_status} - ${data.message}`);
          });
      } else {
          return response.text().then((text: string) => {
            throw new Error(`${response_status} - ${text}`);
          });
      }

    });

  }

  create_driver = async (
    driver: DriverCreateType
  ) => {  

    // data cleansing
    driver.phone = driver.phone ? driver.phone.replace(/[^0-9]/g, "") : undefined;

    return await fetch(`https://api.samsara.com/fleet/drivers`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.access_token}`,
          'Content-Type': "application/json",
        },
        body: JSON.stringify(driver)
      })
    .then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
    })
    .then((content) => content.data)
    .catch((response) => {

      const response_status = `${response.statusText} [${response.status}]`;
      const content_type = response.headers.get("content-type");

      if (content_type && content_type.indexOf("application/json") !== -1) {
          return response.json().then((data: any) => {
            throw new Error(`${response_status} - ${data.message}`);
          });
      } else {
          return response.text().then((text: string) => {
            throw new Error(`${response_status} - ${text}`);
          });
      }

    });
    
  }

}