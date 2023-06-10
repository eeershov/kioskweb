import React from "react";
import { Helmet } from "react-helmet";
import kiosklogo from "./kiosklogo.jpg";

export default function Seo() {
  return (
    <Helmet>
      <meta property="og:url" content="https://kioskcomedy.org/" />
      <meta property="og:site_name" content="KioskComedy" />
      <meta property="og:title" content="Киоск комедии" />
      <meta property="og:image" content={"https://kioskcomedy.org" + kiosklogo} />
      <meta property="og:image:height" content="1000" />
      <meta property="og:image:width" content="1000" />
      <script async src="https://umami.kioskcomedy.org/script.js" data-website-id="b1beac61-5271-4b9e-ad38-aab4a087637e"></script>
    </Helmet>
  );
}
