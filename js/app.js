/* Project 3 starter: intentionally imperfect, but functional.
   Your job is to improve clarity, state handling, and accessibility. */

(function () {
  // MENU TOGGLE
  
  var menuBtn = document.querySelector(".menu-btn");
var nav = document.getElementById("site-nav");
var closeBtn = document.querySelector(".nav__close");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", function () {
    nav.classList.remove("nav--closed");
    menuBtn.setAttribute("aria-expanded", "true");
  });
}

if (closeBtn && nav) {
  closeBtn.addEventListener("click", function () {
    nav.classList.add("nav--closed");
    menuBtn.setAttribute("aria-expanded", "false");
  });
}


  // CARD DETAILS PANELS

  document.querySelectorAll('.card--program').forEach(card => {
  card.querySelectorAll('.js-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = card.querySelector('.panel');
      const isOpen = panel.classList.contains('panel--open');
      panel.classList.toggle('panel--open', !isOpen);
      panel.classList.toggle('panel--closed', isOpen);
      panel.setAttribute('aria-hidden', isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  card.querySelectorAll('.js-flip').forEach(btn => {
    btn.addEventListener('click', () => {
      const flipped = card.classList.toggle('is-flipped');
      card.querySelectorAll('.js-flip').forEach(b =>
        b.setAttribute('aria-expanded', flipped)
      );
    });
  });
});
  

  // FAQ TOGGLES (reuses panel class, but not DRY)
  var faqButtons = document.querySelectorAll(".js-faq");
  faqButtons.forEach(function (qBtn) {
    qBtn.addEventListener("click", function () {
      var answer = qBtn.nextElementSibling;
      if (!answer) return;

      var open = qBtn.getAttribute("aria-expanded") === "true";
      qBtn.setAttribute("aria-expanded", String(!open));
      answer.classList.toggle("panel--closed", open);
      answer.classList.toggle("panel--open", !open);
      answer.setAttribute("aria-hidden", String(open));
    });
  });

  // FORM FEEDBACK (intentionally naive)
  var form = document.querySelector(".form");
  if (form) {
    var status = form.querySelector(".form__status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var email = form.querySelector("#email");
      if (!email || !status) return;

      if (email.value.trim() === "") {
        status.textContent = "Please enter an email.";
        status.classList.remove("is-success");
        status.classList.add("is-error"); // style not defined on purpose
        email.focus();
        return;
      }

      status.textContent = "Message sent (demo).";
      status.classList.remove("is-error");
      status.classList.add("is-success"); // style not defined on purpose
      form.reset();
    });
  }

  // OPTIONAL FILTERS (present but incomplete on purpose)
  // Students may finish this as an intervention or extension
  var filterBtns = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".card");
  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      // set active state
      filterBtns.forEach(function (x) {
        x.classList.remove("filter-btn--active");
      });
      b.classList.add("filter-btn--active");

      var value = b.getAttribute("data-filter");
      // TODO: filtering logic intentionally left minimal/buggy
      cards.forEach(function (c) {
        if (value === "all") {
          c.style.display = "";
        } else {
          // BUG: mismatch between data-category values and filter values could occur
          c.style.display =
            c.getAttribute("data-category") === value ? "" : "none";
        }
      });
    });
  });
})();
