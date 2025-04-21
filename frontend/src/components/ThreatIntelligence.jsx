import { useEffect, useState } from "react";

function ThreatIntelligence() {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    // Directly use the API key in the fetch request
    fetch("https://otx.alienvault.com/api/v1/pulses/subscribed?limit=5", {
      headers: {
        "X-OTX-API-KEY": "7cb84f6b8aef3da34d04ca3e91472184aaed81b3ae09b5b3a609d5ef9abd8d83", // Directly inserting your API key here
      }
    })
      .then(res => res.json())
      .then(data => setThreats(data.results || []))
      .catch(err => console.error("Error fetching threat intelligence:", err));
  }, []);

  return (
    < div className="ti">
    <div className="content">
      <h1>Threat Intelligence</h1>
      <p>Recent threat intel from global sources:</p>
      <ul>
        {threats.length === 0 ? (
          <p>Loading threats...</p>
        ) : (
          threats.map((item, index) => (
            <li className="list" key={index}>
              <strong>{item.name}</strong> - {item.description.substring(0, 100)}...
            </li>
          ))
        )}
      </ul>
      <p><em>Data powered by AlienVault OTX.</em></p>
    </div>
    </div>
  );
}

export default ThreatIntelligence;
