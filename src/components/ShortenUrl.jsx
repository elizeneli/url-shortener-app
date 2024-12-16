import { useState } from "react";
import "../styles/ShortenUrl.css";

const ShortenUrl = ({ addUrl }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [expirationTime, setExpirationTime] = useState("");

  const durationMapping = {
    "1 minute": 1,
    "5 minutes": 5,
    "30 minutes": 30,
    "1 hour": 60,
    "5 hours": 300,
  };

  const calculateExpirationTime = (duration) => {
    const currentTime = Date.now();

    const minutes = durationMapping[duration] || 60;
    return Math.floor((currentTime + minutes * 60 * 1000) / 1000);
  };

  const handleShorten = () => {
    if (!originalUrl.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    const expiration = calculateExpirationTime(expirationTime);

    addUrl(originalUrl.trim(), expiration);
    setOriginalUrl("");
    setExpirationTime("");
  };

  return (
    <div className="shorten-url-container">
      <div className="shorten-url">
        <h3>URL Shortener</h3>
        <input
          type="text"
          placeholder="Paste the URL to be shortened"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button onClick={handleShorten}>Shorten URL</button>
      </div>

      <div className="add-expiration">
        <select
          value={expirationTime}
          onChange={(e) => setExpirationTime(e.target.value)}
          className="options"
        >
          <option value="">Add expiration time</option>
          {Object.keys(durationMapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShortenUrl;
