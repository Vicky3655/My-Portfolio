/* ============================================================
   script.js — shared across all pages (index, resume, project, contact)

   1) Home page profile-photo crossfade cycle
   2) Sweep-overlay transition when navigating between pages
   ============================================================ */

(function () {
    'use strict';

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1) Profile photo cycle (Home page only) ---------- */
    function initPhotoCycle() {
        var wrap = document.querySelector('.profile-photo-wrap');
        if (!wrap) return; // not on the Home page

        var photos = wrap.querySelectorAll('.profile-photo');
        if (photos.length < 2) return;

        var current = 0;
        photos.forEach(function (img, i) {
            img.classList.toggle('is-active', i === 0);
        });

        if (reduceMotion) return; // leave the first photo showing, no cycling

        window.setInterval(function () {
            photos[current].classList.remove('is-active');
            current = (current + 1) % photos.length;
            photos[current].classList.add('is-active');
        }, 3000);
    }

    /* ---------- 2) Page-transition sweep overlay ---------- */
    function initPageTransitions() {
        var overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.setAttribute('aria-hidden', 'true');

        var overlayText = document.createElement('span');
        overlayText.className = 'page-transition-text';
        overlayText.textContent = 'My Portfolio';
        overlay.appendChild(overlayText);

        document.body.appendChild(overlay);

        if (reduceMotion) {
            overlay.style.display = 'none';
            return;
        }

        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href$=".html"]');
            if (!link) return;
            if (link.target === '_blank' || link.hasAttribute('download')) return;

            e.preventDefault();
            var href = link.getAttribute('href');

            overlay.classList.add('is-sweeping-in');

            // 420ms for the green sweep to fully cover the screen, plus a
            // short hold so "My Portfolio" (which fades in around 200-500ms)
            // is actually readable before the browser navigates away.
            window.setTimeout(function () {
                window.location.href = href;
            }, 650);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPhotoCycle();
        initPageTransitions();
    });
})();