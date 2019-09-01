console.log("Worker starting...");

const NIGHTSCOUT_URL = "";

function pollNightscout() {
  setTimeout(() => {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.info("[WORKER]: ", res);
        // postMessage({
        //   date: new Date(res.date).toLocaleTimeString(),
        //   sgv: res.sgv
        // });
        postMessage(res);
      }
    };

    req.open("GET", NIGHTSCOUT_URL, true);
    req.send();
    // pollNightscout();
  }, 5000);
}

pollNightscout();
