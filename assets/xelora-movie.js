(function () {
  var DURATION = 8000;
  document.querySelectorAll(".xelora-movie").forEach(function (root) {
    var dataEl = root.querySelector(".xelora-movie-data");
    if (!dataEl) return;
    var clips = JSON.parse(dataEl.textContent);
    var img = root.querySelector("img");
    var title = root.querySelector("h2");
    var place = root.querySelector(".place");
    var overview = root.querySelector(".overview");
    var bar = root.querySelector(".xelora-movie-progress span");
    var count = root.querySelector(".xelora-movie-count");
    var btn = root.querySelector("button");
    var i = 0;
    var timer = 0;
    var playing = true;

    function show(n) {
      var clip = clips[n];
      img.src = clip.image;
      img.alt = clip.title;
      title.textContent = clip.title;
      place.textContent = clip.place;
      overview.textContent = clip.overview;
      count.textContent = String(n + 1).padStart(2, "0") + " / " + String(clips.length).padStart(2, "0");
      img.style.animation = "none";
      bar.style.transition = "none";
      bar.style.width = "0%";
      void img.offsetWidth;
      img.style.animation = "";
      if (playing) {
        requestAnimationFrame(function () {
          bar.style.transition = "width " + DURATION + "ms linear";
          bar.style.width = "100%";
        });
        clearTimeout(timer);
        timer = setTimeout(next, DURATION);
      }
    }

    function next() {
      i = (i + 1) % clips.length;
      show(i);
    }

    btn.addEventListener("click", function () {
      playing = !playing;
      btn.textContent = playing ? "Pause" : "Play";
      root.classList.toggle("is-paused", !playing);
      if (playing) show(i);
      else clearTimeout(timer);
    });

    show(0);
  });
})();
