import React from "react";
import { Helmet } from "react-helmet";
import kiosklogo from "./kiosklogo.jpg";

export default function Seo() {
  return (
    <Helmet>
      <meta name="description" content="Киоск комедии" />
      <meta property="og:title" content="Киоск комедии" />
      <meta property="og:site_name" content="kioskcomedy.org" />
      <meta property="og:url" content="https://kioskcomedy.org" />
      <meta property="og:description" content="" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={"https://kioskcomedy.org" + kiosklogo} />
      <script async src="https://umami.kioskcomedy.org/script.js" data-website-id="b1beac61-5271-4b9e-ad38-aab4a087637e"></script>
    </Helmet>
  );
}
