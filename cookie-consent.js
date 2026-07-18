// ===== Cookie Consent Management =====

function getCookieConsent() {
  return localStorage.getItem('overdosed_cookie_consent') === 'true';
}

function setCookieConsent() {
  localStorage.setItem('overdosed_cookie_consent', 'true');
}

function grantConsent() {
  gtag('consent', 'update', {
    'analytics_storage': 'granted'
  });
}

function showCookieBanner() {
  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.style.cssText =
    'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
    'background:#111;border-top:1px solid #333;padding:16px 24px;' +
    'display:flex;align-items:center;justify-content:space-between;gap:20px;' +
    'flex-wrap:wrap;' +
    'font-family:\'Inter\',sans-serif;font-size:12px;color:#aaa;letter-spacing:0.3px;line-height:1.5;';

  const text = document.createElement('span');
  text.style.cssText = 'flex:1;min-width:200px;';
  text.textContent = 'Этот сайт использует файлы cookie для улучшения работы. Продолжая использовать сайт, вы соглашаетесь с условиями обработки cookie.';

  const btn = document.createElement('button');
  btn.textContent = 'OK';
  btn.style.cssText =
    'background:#ff0000;border:none;color:#fff;padding:10px 30px;' +
    'font-size:13px;letter-spacing:2px;cursor:pointer;' +
    'transition:background 0.3s;font-family:\'Inter\',sans-serif;text-transform:uppercase;';
  btn.onmouseover = function() { this.style.background = '#cc0000'; };
  btn.onmouseout = function() { this.style.background = '#ff0000'; };
  btn.onclick = function() {
    setCookieConsent();
    grantConsent();
    const parent = this.parentNode;
    parent.style.transition = 'opacity 0.3s ease';
    parent.style.opacity = '0';
    setTimeout(function() { parent.remove(); }, 300);
  };

  banner.appendChild(text);
  banner.appendChild(btn);
  document.body.appendChild(banner);
}

document.addEventListener('DOMContentLoaded', function() {
  if (getCookieConsent()) {
    if (typeof grantConsent === 'function') grantConsent();
  } else {
    showCookieBanner();
  }
});