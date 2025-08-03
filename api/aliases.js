module.exports = (req, res) => {
  // --- 1) Set CORS headers ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // --- 2) Handle preflight OPTIONS request ---
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- 3) Define the static data object ---
  const consumerAliases = {
    "32073341": "Professor Para (1st/East)",
    "32019059": "Professor Para (1st/West)",
    "32047148": "Professor Para (2nd Floor)",
    "32066990": "Professor Para (3rd/East)",
    "32066992": "Professor Para (3rd/West)",
    "32066991": "Professor Para (4th Floor)",
    "32073301": "Professor Para (Water Pump)",
    "32010967": "Assam Colony (Basa)",
    "32056622": "Assam Colony (Dokan)",
    "32044686": "Fultola (KG School)",
    "32072057": "Fultola (Merina)"
  };

  // --- 4) Send the JSON response ---
  return res.status(200).json(consumerAliases);
};
