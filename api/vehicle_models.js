// api/vehicle_models.js
import fetch from "node-fetch";
import { js2xml } from "xml-js";

export default async function handler(req, res) {
  try {
    // Fetch data from Supabase
    const response = await fetch(
      "https://YOUR_PROJECT.supabase.co/rest/v1/vehicle_models?select=*",
      {
        headers: {
          apikey: process.env.SUPABASE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        },
      }
    );

    const data = await response.json();

    // Convert JSON into XML with <Vehicle> as root nodes
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
    res.status(500).send({
      error: "Failed to fetch data from Supabase",
      details: error.message,
    });
  }
}
