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
})();
