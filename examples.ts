import { load } from "https://deno.land/std@0.222.1/dotenv/mod.ts";
const env = await load();

import { Samsara } from "./mod.ts";

try {

    const samsara = new Samsara(env.SAMSARA_ACCESS_TOKEN);

    const driver = await samsara.get_driver(1234567890)
    console.log('driver',driver)

} catch (error) {
    console.error(error.message)
}
