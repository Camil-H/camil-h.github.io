/* ============================================
   App — Theme, Command Palette, Animations
   ============================================ */

// --- Theme ---

function getTheme() {
  return localStorage.getItem('theme') || 'auto';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeSwitch(theme);
}

function updateThemeSwitch(theme) {
  var options = document.querySelectorAll('.theme-switch-option');
  options.forEach(function(opt) {
    opt.classList.toggle('is-active', opt.getAttribute('data-theme') === theme);
  });
}

var themeCycle = ['light', 'auto', 'dark'];

function cycleTheme() {
  var current = getTheme();
  var idx = themeCycle.indexOf(current);
  var next = themeCycle[(idx + 1) % themeCycle.length];
  setTheme(next);
}

// --- Nav dropdown ---

function toggleNavDropdown() {
  var dropdown = document.querySelector('.nav-dropdown');
  if (!dropdown) return;
  var isOpen = dropdown.classList.toggle('is-open');
  dropdown.querySelector('.nav-dropdown-trigger').setAttribute('aria-expanded', isOpen);
}

function closeNavDropdown() {
  var dropdown = document.querySelector('.nav-dropdown');
  if (!dropdown) return;
  dropdown.classList.remove('is-open');
  dropdown.querySelector('.nav-dropdown-trigger').setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', function(e) {
  var dropdown = document.querySelector('.nav-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    closeNavDropdown();
  }
});

// --- Command Palette ---

var commandPalette = null;
var cmdInput = null;
var cmdItems = [];
var activeIndex = -1;

function openCommandPalette() {
  commandPalette = commandPalette || document.getElementById('commandPalette');
  cmdInput = cmdInput || document.getElementById('cmdInput');
  commandPalette.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  cmdInput.value = '';
  filterCommands('');
  setTimeout(function() { cmdInput.focus(); }, 50);
  activeIndex = -1;
  updateActiveItem();
}

function closeCommandPalette() {
  commandPalette = commandPalette || document.getElementById('commandPalette');
  commandPalette.classList.remove('is-open');
  document.body.style.overflow = '';
  activeIndex = -1;
}

function getVisibleItems() {
  var results = document.getElementById('cmdResults');
  return Array.from(results.querySelectorAll('.cmd-item')).filter(function(el) {
    return !el.hidden;
  });
}

function updateActiveItem() {
  var items = getVisibleItems();
  items.forEach(function(item, i) {
    item.classList.toggle('is-active', i === activeIndex);
  });
  if (activeIndex >= 0 && items[activeIndex]) {
    items[activeIndex].scrollIntoView({ block: 'nearest' });
  }
}

function filterCommands(query) {
  var results = document.getElementById('cmdResults');
  var items = results.querySelectorAll('.cmd-item');
  var groups = results.querySelectorAll('.cmd-group');
  var q = query.toLowerCase().trim();

  items.forEach(function(item) {
    var label = (item.querySelector('.cmd-item-label') || item).textContent.toLowerCase();
    var keywords = (item.getAttribute('data-keywords') || '').toLowerCase();
    var match = !q || label.includes(q) || keywords.includes(q);
    item.hidden = !match;
  });

  groups.forEach(function(group) {
    var visibleItems = group.querySelectorAll('.cmd-item:not([hidden])');
    group.hidden = visibleItems.length === 0;
  });

  activeIndex = -1;
  updateActiveItem();
}

function executeItem(item) {
  if (!item) return;

  var href = item.getAttribute('href');
  if (href) {
    closeCommandPalette();
    window.location.href = href;
  }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  var paletteOpen = commandPalette && commandPalette.classList.contains('is-open');

  // Cmd/Ctrl + K
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    if (paletteOpen) {
      closeCommandPalette();
    } else {
      openCommandPalette();
    }
    return;
  }

  if (!paletteOpen) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeCommandPalette();
    return;
  }

  var items = getVisibleItems();
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % items.length;
    updateActiveItem();
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
    updateActiveItem();
    return;
  }

  if (e.key === 'Enter') {
    e.preventDefault();
    if (activeIndex >= 0 && items[activeIndex]) {
      executeItem(items[activeIndex]);
    }
  }
});

// Input filtering
document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('cmdInput');
  if (input) {
    input.addEventListener('input', function() {
      filterCommands(this.value);
    });
  }

  updateThemeSwitch(getTheme());

  populatePostItems();

  initFadeIn();
});

// --- Populate posts in command palette ---

function populatePostItems() {
  var container = document.getElementById('cmdPostResults');
  if (!container) return;

  var postElements = document.querySelectorAll('[data-post-title]');
  if (!postElements.length) {
    container.hidden = true;
    return;
  }

  postElements.forEach(function(el) {
    var a = document.createElement('a');
    a.className = 'cmd-item';
    a.href = el.getAttribute('data-post-url');
    a.setAttribute('data-keywords', el.getAttribute('data-post-keywords') || '');
    a.innerHTML =
      '<span class="cmd-item-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2.5H12C12.5523 2.5 13 2.94772 13 3.5V12.5C13 13.0523 12.5523 13.5 12 13.5H4C3.44772 13.5 3 13.0523 3 12.5V3.5C3 2.94772 3.44772 2.5 4 2.5Z" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 5.5H10.5M5.5 8H10.5M5.5 10.5H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>' +
      '<span class="cmd-item-label">' + el.getAttribute('data-post-title') + '</span>';
    container.appendChild(a);
  });
}

// --- Fade-in on scroll ---

function initFadeIn() {
  var elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    elements.forEach(function(el) {
      el.classList.add('is-visible');
    });
  }
}
