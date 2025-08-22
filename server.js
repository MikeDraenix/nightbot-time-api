import express from "express";
import moment from "moment-timezone";

const app = express();
const port = process.env.PORT || 3000;

// Location → Timezone mapping
const locations = {
  "sweden": "Europe/Stockholm",
  "new york": "US/Eastern",
  "los angeles": "US/Pacific",
  "london": "Europe/London",
  "tokyo": "Asia/Tokyo"
};

app.get("/", (req, res) => {
  let query = (req.query.q || "").toLowerCase().trim();

  if (!query) {
    return res.send("Usage: !time LOCATION (example: !time Sweden)");
  }

  // Find the first location that starts with the query (partial match)
  let match = Object.keys(locations).find(
    loc => loc.toLowerCase().startsWith(query)
  );

  if (!match) {
    return res.send("Location not found. Check spelling or try another one!");
  }

  let timezone = locations[match];
  let time = moment().tz(timezone).format("HH:mm z");

  res.send(`Current time in ${match.charAt(0).toUpperCase() + match.slice(1)}: ${time}`);
});

app.listen(port, () => {
  console.log(`Nightbot Time API running on port ${port}`);
});