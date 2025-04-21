import { useEffect, useState } from "react";

function FinancialNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://newsdata.io/api/1/news?apikey=pub_81517594b768e1765166e89d32d65e5f69a6b&q=finance&category=business ")
      .then((res) => res.json())
      .then((data) => setArticles(data.results || []))
      .catch((err) => console.error("News fetch error:", err));
  }, []);

  return (
    <div className="fn">
    <div className="content">
      <h1>Financial News</h1>
      <p>Catch up on the latest trends, breaches, and innovations in the fintech security world.</p>
      <ul className="news-list">
        {articles.length === 0 ? (
          <p>Loading news...</p>
        ) : (
          articles.map((item, index) => (
            <li className="list" key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <strong>{item.title}</strong>
              </a>
              <p>{item.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
    </div>
  );
}

export default FinancialNews;
