var wrkr = new Worker("scripts/worker.min.js");

wrkr.onmessage = (e) => {
  console.log("[INDEX]: ", e.data);
};

document.addEventListener("DOMContentLoaded", function() {
  console.log("page loaded");
});
