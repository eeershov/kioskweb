const hostname = window.location.hostname;

let backend: string;

if (hostname === "localhost") {
  backend = "http://localhost";
} else {
  backend = `http://${hostname}`;
}

export { backend };