import { load } from "https://deno.land/std@0.222.1/dotenv/mod.ts";
const env = await load();

import { Samsara } from "./mod.ts";

try {

    const samsara = new Samsara(env.SAMSARA_ACCESS_TOKEN);

    const when = new Date(new Date().setHours(0,0,0,0)).toLocaleString();
    console.log('when',when)

    const statistics = await samsara.get_vehicle_statistics([], when, ['obdOdometerMeters'])
    console.log('statistics',statistics)

    let driver = await samsara.create_driver({
        name: 'Foo Bar',
        username: 'foobar',
        password: 'password'
    });
    console.log('driver',driver)

    driver = await samsara.update_driver(driver.id, {
        notes: 'lorem ipsum'
    });
    console.log('driver',driver)

    driver = await samsara.get_driver(driver.id)
    console.log('driver',driver)

    const drivers = await samsara.find_drivers()
    console.log('drivers',drivers.length)

} catch (error) {
    console.error(error.message)
}
