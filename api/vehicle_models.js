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

    const data = await response.json();

    // Wrap inside root <VehicleModels>
    const xml = js2xml(
      { VehicleModels: { Vehicle: data } },
      { compact: true, spaces: 2 }
    );

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}
