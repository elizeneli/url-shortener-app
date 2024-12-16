import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ShortenUrl from "./components/ShortenUrl";
import { fetchUrls, addUrlToDb, deleteUrlFromDb } from "./services/apiUrl";
import "./styles/App.css";

const App = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const loadUrls = async () => {
      const fetchedUrls = await fetchUrls();
      setUrls(fetchedUrls);
    };
    loadUrls();
  }, []);

  const addUrl = async (originalUrl, expirationTime) => {
    const addedUrl = await addUrlToDb(originalUrl, expirationTime);
    if (addedUrl) {
      setUrls((prevUrls) => [...prevUrls, addedUrl]);
    }
  };

  const deleteUrl = async (id) => {
    await deleteUrlFromDb(id);
    setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));
  };

  return (
    <div className="app-container">
      <Sidebar urls={urls} onDelete={deleteUrl} />
      <ShortenUrl addUrl={addUrl} />
    </div>
  );
};

export default App;
