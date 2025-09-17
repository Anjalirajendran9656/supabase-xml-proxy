import fetch from "node-fetch";
import { js2xml } from "xml-js";

export default async function handler(req, res) {
  try {
    // Check env key exists
    if (!process.env.SUPABASE_KEY) {
      return res.status(500).send("<error>Missing SUPABASE_KEY</error>");
    }

  
      const response = await fetch("https://djiszadmcjigwrziqvyf.supabase.co/rest/v1/vehicle_models?select=*", {

      {
        headers: {
          apikey: process.env.SUPABASE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        },
      }
    );

    const data = await response.json();

    // If Supabase sent an error message
    if (data.code || data.message) {
      return res.status(500).send(
        `<error>Supabase error: ${data.message || "Unknown"}</error>`
      );
    }

    // Transform JSON into <Vehicle> list
    const vehicles = data.map((item) => ({
      Vehicle: {
        id: item.id,
        brand: item.brand,
        model: item.model,
      },
    }));

    const xml = js2xml({ VehicleModels: vehicles }, { compact: true, spaces: 2 });

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    res.status(500).send(`<error>${error.message}</error>`);
  }
}

