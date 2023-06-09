import React from "react";
import { Helmet } from "react-helmet";
import kiosklogo from "./kiosklogo.jpg";

export default function Seo() {
  return (
    <Helmet>
      <meta property="og:url" content="https://kioskcomedy.org/" />
      <meta property="og:site_name" content="KioskComedy" />
      <meta property="og:title" content="Киоск комедии" />
      <meta property="og:image" content={kiosklogo} />
      <meta property="og:image:height" content="1000" />
      <meta property="og:image:width" content="1000" />
    </Helmet>
  );
}