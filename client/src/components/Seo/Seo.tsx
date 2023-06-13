import React from "react";
import { Helmet } from "react-helmet";
import kiosklogo from "./kiosklogo.jpg";
import umamiTracker from "./umamiTracker";


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
      {umamiTracker}
    </Helmet>
  );
}
