import React from "react";

interface CompanyCardProps {
      logo: string;
      image: string;
      sector: string;
      title: string;
      description: string;
      link?: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ logo, image, sector, title, description, link = "#" }) => {
      return (
            <div className="company-card env-card">
                  <div className="company-logo">
                        <img src={logo} alt={`${title} Logo`} className="logo-image" />
                  </div>
                  <div className="company-image">
                        <img src={image} alt={sector} className="sector-image" />
                  </div>
                  <div className="company-content">
                        <span className="company-sector">{sector}</span>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <a href={link} className="company-link">Saber Mais →</a>
                  </div>
            </div>
      );
};

export default CompanyCard;
