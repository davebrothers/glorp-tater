console.log("Worker starting...");

const SERVICE_URL = "";
const POLL_INTERVAL = 5000;

function run() {
  setTimeout(() => {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.info("[WORKER]: ", res);
        postMessage(res);
      }
    };

    req.open("GET", SERVICE_URL, true);
    req.send();

    run();
  }, POLL_INTERVAL);
}

run();
