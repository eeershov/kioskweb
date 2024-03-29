const hostname = window.location.hostname;

let backend: string;

if (hostname === "localhost") {
  backend = "http://localhost";
} else {
  backend = `https://${hostname}`;
}

export { backend };