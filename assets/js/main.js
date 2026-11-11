(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var loopVideos = document.querySelectorAll("video[data-autoplay-visible]");
  if (loopVideos.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(function () {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );
    loopVideos.forEach(function (video) { io.observe(video); });
  }

  document.querySelectorAll("[data-sound-toggle]").forEach(function (button) {
    var video = button.previousElementSibling;
    button.addEventListener("click", function () {
      video.muted = !video.muted;
      button.classList.toggle("is-unmuted", !video.muted);
    });
  });

  var leadForm = document.getElementById("orcamentoForm");
  if (leadForm) {
    var FORM_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbyeDhENTvcXCe8-NseRhYcxkdqIkYBqhhwTH0mVwUv1QTN45mZb_UVmgmKvoHh3ktk/exec";
    var statusEl = leadForm.querySelector("[data-form-status]");
    var submitBtn = leadForm.querySelector("button[type=submit]");

    leadForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (FORM_ENDPOINT_URL.indexOf("COLE_AQUI") !== -1) {
        if (statusEl) {
          statusEl.textContent = "Formulário ainda não configurado. Fale pelo WhatsApp enquanto isso.";
          statusEl.setAttribute("data-state", "error");
        }
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (statusEl) {
        statusEl.textContent = "Enviando...";
        statusEl.removeAttribute("data-state");
      }

      var formData = new FormData(leadForm);
      fetch(FORM_ENDPOINT_URL, { method: "POST", mode: "no-cors", body: formData })
        .then(function () {
          window.location.href = "./obrigado-obra-comercial.html";
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent = "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.";
            statusEl.setAttribute("data-state", "error");
          }
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
