console.log("Worker starting...");

function poll() {
  setTimeout(() => {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.info("[WORKER]: ", res);
        postMessage(res);
      }
    };

    req.open("GET", "", true);
    req.send();
    // poll();
  }, 5000);
}

poll();
