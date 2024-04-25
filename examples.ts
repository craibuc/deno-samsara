import { load } from "https://deno.land/std@0.222.1/dotenv/mod.ts";
const env = await load();

import { Samsara } from "./mod.ts";

try {

    const samsara = new Samsara(env.SAMSARA_ACCESS_TOKEN);

} catch (error) {
    console.error(error.message)
}
