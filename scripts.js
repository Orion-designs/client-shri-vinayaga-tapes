/* ── EmailJS ── */
emailjs.init("c1RQoQIRZJT11eDc3");

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Enquiry is being sent...");
    const templateParams = {
        name:    document.getElementById("cname").value,
        email:   document.getElementById("cemail").value,
        phone:   document.getElementById("cphone").value,
        product: document.getElementById("cproduct").value,
        message: document.getElementById("cmessage").value
    };
    emailjs.send("service_51n8vpa", "template_strt7or", templateParams)
    .then(function() {
        alert("Enquiry sent successfully!");
        document.getElementById("contactForm").reset();
    })
    .catch(function(error) {
        alert("Failed to send enquiry.");
        console.log(error);
    });
});

/* ── Carousel ── */
(function () {
  var wrap  = document.getElementById('carouselWrap');
  var track = document.getElementById('carouselTrack');
  var btnL  = document.getElementById('btnLeft');
  var btnR  = document.getElementById('btnRight');

  if (!track || !wrap || !btnL || !btnR) return;

  var GAP = 24;
  var pos = 0;

  function cardW() {
    return track.querySelector('.product_card').offsetWidth + GAP;
  }

  function totalCards() {
    return track.querySelectorAll('.product_card').length;
  }

  function visibleCount() {
    return Math.floor(wrap.offsetWidth / cardW());
  }

  function maxPos() {
    return totalCards() - visibleCount();
  }

  function setPos(idx, animated) {
    pos = Math.max(0, Math.min(idx, maxPos()));
    track.style.transition = animated
      ? 'transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94)'
      : 'none';
    track.style.transform = 'translateX(' + (-pos * cardW()) + 'px)';
    btnL.style.opacity = pos <= 0 ? '0.3' : '1';
    btnR.style.opacity = pos >= maxPos() ? '0.3' : '1';
    btnL.style.pointerEvents = pos <= 0 ? 'none' : 'auto';
    btnR.style.pointerEvents = pos >= maxPos() ? 'none' : 'auto';
  }

  btnR.addEventListener('click', function () { setPos(pos + 1, true); });
  btnL.addEventListener('click', function () { setPos(pos - 1, true); });

  var dragStartX = null;
  var dragging = false;

  wrap.addEventListener('mousedown',  function (e) { dragStartX = e.clientX; dragging = true; });
  wrap.addEventListener('mousemove',  function (e) { if (!dragging) return; e.preventDefault(); });
  wrap.addEventListener('mouseup',    function (e) {
    if (!dragging) return;
    var diff = dragStartX - e.clientX;
    if (Math.abs(diff) > 40) diff > 0 ? setPos(pos + 1, true) : setPos(pos - 1, true);
    dragging = false;
  });
  wrap.addEventListener('mouseleave', function () { dragging = false; });

  wrap.addEventListener('touchstart', function (e) { dragStartX = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend',   function (e) {
    var diff = dragStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? setPos(pos + 1, true) : setPos(pos - 1, true);
  });

  window.addEventListener('resize', function () { setPos(pos, false); });

  requestAnimationFrame(function () {
    requestAnimationFrame(function () { setPos(0, false); });
  });
  wrap.addEventListener('wheel', function(e) {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
    if (e.deltaX > 30) setPos(pos + 1, true);
    if (e.deltaX < -30) setPos(pos - 1, true);
  }
}, { passive: false });
})();