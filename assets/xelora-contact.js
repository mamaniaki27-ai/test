(function () {
  var form = document.getElementById("xelora-contact-form");
  if (!form) return;
  var note = document.getElementById("xelora-contact-note");
  var button = form.querySelector("button");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var data = new FormData(form);
    var first = String(data.get("first") || "").trim();
    var last = String(data.get("last") || "").trim();
    var email = String(data.get("email") || "").trim();
    var company = String(data.get("company") || "").trim();
    var message = String(data.get("message") || "").trim();
    button.disabled = true;
    if (note) note.textContent = "Sending…";

    fetch("https://formsubmit.co/ajax/hello@xeloras.org", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: first + " " + last,
        email: email,
        company: company,
        message: message,
        _subject: "Website message from " + first + " " + last,
        _replyto: email,
        _template: "table",
        _captcha: "false"
      })
    })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok || body.success === false || body.success === "false") {
            throw new Error(body.message || "send failed");
          }
          var nested = location.pathname.split("/").filter(Boolean).length > 1;
          location.href = (nested ? "../" : "") + "thanks/index.html";
        });
      })
      .catch(function () {
        button.disabled = false;
        if (note) note.textContent = "Could not send. Write directly to hello@xeloras.org.";
      });
  });
})();
