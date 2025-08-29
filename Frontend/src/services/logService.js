import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn: "https://e0ada38750a7456006557223a27727ef@o4509791004590080.ingest.de.sentry.io/4509791016648784",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
  });
}

function log(error) {
  throw new Error(error);
}
export default {
  init,
  log,
};
