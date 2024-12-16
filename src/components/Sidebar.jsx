import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import "./../styles/Sidebar.css";

const BASE_URL = "https://short.link";

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 6);
}

function hasExpired(unixTimestamp) {
  const timestampDate = new Date(unixTimestamp * 1000);
  const currentDate = new Date();
  return timestampDate.getTime() < currentDate.getTime();
}

const Sidebar = ({ urls, onDelete }) => {
  const [linkClicks, setLinkClicks] = useState({});

  const handleLinkClick = (e, original_url, expiration_time) => {
    e.preventDefault();

    if (hasExpired(expiration_time)) {
      alert("This link has expired.");
    } else {
      setLinkClicks((prevClicks) => {
        const currentCount = prevClicks[original_url] || 0;
        return {
          ...prevClicks,
          [original_url]: currentCount + 1,
        };
      });

      window.open(original_url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="sidebar-container">
      <img src="/logo.png" alt="Logo" className="logo" />

      <h3 className="sidebar-heading">My Shortened URLs</h3>

      {urls.length === 0 ? (
        <p className="empty-state">No shortened URLs yet.</p>
      ) : (
        <ul className="url-list">
          {urls.map(({ original_url, id, expiration_time }) => {
            const uniqueId = generateUniqueId();
            const shortUrl = `${BASE_URL}/${uniqueId}`;
            const clickCount = linkClicks[original_url] || 0;

            return (
              <li key={id} className="url-item">
                <a
                  href={original_url}
                  className="url-link"
                  title={`This link has been clicked: ${clickCount} times`}
                  onClick={(e) =>
                    handleLinkClick(e, original_url, expiration_time)
                  }
                >
                  {shortUrl}
                </a>

                <button className="delete-button" onClick={() => onDelete(id)}>
                  <FaRegTrashCan />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
