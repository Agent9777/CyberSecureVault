import "../app.css";
function About() {
  return (
    <div className="ab">
      <div className="content">
        <h1>About Us</h1>
        <p>
          CyberSecure Vault is committed to revolutionizing digital safety in
          the financial world. Our mission is to provide robust and intelligent
          cybersecurity solutions, ensuring the confidentiality and integrity of
          financial data. From advanced threat detection to secure user access,
          we deliver top-notch protection using the latest technologies.
        </p>

        <h2>Our Team</h2>
        <div className="team">
          <div className="member-box">
            <h3>Harsh Vikram Singh</h3>
            <p>
              Responsible for CSS, API fetching, and layout structuring of the
              website. His creative eye ensures a sleek and responsive design
              across all pages.
            </p>
          </div>

          <div className="member-box">
            <h3>Surat Sahoo</h3>
            <p>
              Backend developer ensuring smooth and secure server-side
              integration. Surat manages the data pipelines and maintains system
              integrity.
            </p>
          </div>

          <div className="member-box">
            <h3>Shourya Deep</h3>
            <p>
              Leads the full layout design and overall application development.
              His Skills ensures cohesive design, function, and user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
