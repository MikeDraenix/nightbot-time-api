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
  let query = (req.query.q || "").toLowerCase();

  if (!query || !locations[query]) {
    return res.send("Usage: !time LOCATION (example: !time Sweden)");
  }

  let timezone = locations[query];
  let time = moment().tz(timezone).format("HH:mm z"); // e.g., "14:35 CEST"

  res.send(`Current time in ${query.charAt(0).toUpperCase() + query.slice(1)}: ${time}`);
});

app.listen(port, () => {
  console.log(`Nightbot Time API running on port ${port}`);
});