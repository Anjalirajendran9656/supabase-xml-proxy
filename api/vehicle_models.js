// api/vehicle_models.js
import { js2xml } from "xml-js";   // keep only this import

export default async function handler(req, res) {
  try {
    // Use built-in fetch (no import needed)
    const response = await fetch(
      "https://djiszadmcjigwrziqvfy.supabase.co/rest/v1/vehicle_models?select=*",
      {
        headers: {
          apikey: process.env.SUPABASE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        },
      }
    );

    const data = await response.json();

    // Wrap into clean XML format
    const xml = js2xml(
      { VehicleModels: { Vehicle: data } },
      { compact: true, spaces: 2 }
    );

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).send(`<error>${err.message}</error>`);
  }
}
