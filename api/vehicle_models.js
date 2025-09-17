// api/vehicle_models.js
import fetch from "node-fetch";
import { js2xml } from "xml-js";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://djiszadmcjigwrziqvfy.supabase.co/rest/v1/vehicle_models?select=*",
      {
        headers: {
          apikey: process.env.SUPABASE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Convert JSON → XML
    const xml = js2xml({ VehicleModels: data }, { compact: true, spaces: 2 });

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (err) {
    console.error("Error in handler:", err);
    res.status(500).send(`<error>${err.message}</error>`);
  }
}

