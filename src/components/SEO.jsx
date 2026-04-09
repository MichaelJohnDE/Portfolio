import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description = "Michael John Danville Enciso - Full-Stack Web Developer", 
  name = "Michael John Danville Enciso", 
  type = "website",
  url = "", 
  image = "/favicon.svg"
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | ${name}` : name}</title>
      <meta name='description' content={description} />
      
      {/* Open Graph tags for social sharing */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || name} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || name} />
      <meta name="twitter:description" content={description} />
      
      {/* JSON-LD Structured Data for SEO ranking */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": name,
          "url": url,
          "jobTitle": "Full-Stack Web Developer & Technical SEO Specialist",
          "knowsAbout": ["Full-Stack Development", "React", "Laravel", "Technical SEO"]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
