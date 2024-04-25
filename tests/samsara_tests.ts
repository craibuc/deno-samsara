import { assertEquals } from "https://deno.land/std@0.223.0/assert/mod.ts";
import { MockFetch } from "https://deno.land/x/deno_mock_fetch@0.1.1/mod.ts";

import { Samsara } from "../mod.ts";

const samsara = new Samsara('access token');
