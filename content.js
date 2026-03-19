(function() {

  const originalFills = new Map();

  function enableDark() {
    if (document.getElementById("alibaba-dark")) return;

    const style = document.createElement("style");
    style.id = "alibaba-dark";
    style.textContent = `
      :root{
        --bg:#121212; 
        --text:#b0b0b0; 
        --border:#555; 
      }

      *:not(img):not(video){
        background-color: var(--bg) !important;
        color: var(--text) !important;
        border-color: var(--border) !important;
      }

      div.unread-num {
        background-color: #FF3333 !important;
        color: #FFFFFF !important;
      }

      p.read-status.unread {
        color: #FF6A00 !important;
      }

      div.session-rich-content.text {
        background-color: #444444 !important;
        color: #e0e0e0 !important;
      }

      .icbu-im-im-weblite-chat .message-box .buttons-box {
        background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #444444) !important;
        color: #e0e0e0 !important;
      }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('svg path').forEach(path => {
      if (!path.closest('.icon-wrapper') && !path.closest('.tool-icon-tip')) {
        if (!originalFills.has(path)) {
          originalFills.set(path, path.getAttribute("fill") || "");
        }
        path.setAttribute("fill", "#bbb");
      }
    });
  }

  const selectors = [
    ".buyer-messenger-container.buyer .content-body",
    ".messenger-left-container-snapshot.left-panel-snapshot .content-body",
    ".buyer-messenger-container.buyer .content-body .message-container .content-header",
    ".buyer-messenger-container.buyer .content-body .message-container .landing-page-wrapper",
    ".messenger-left-container-snapshot.left-panel-snapshot .content-body .message-container .content-header",
    ".messenger-left-container-snapshot.left-panel-snapshot .content-body .message-container .landing-page-wrapper"
  ];

  function applyDark() {
    document.querySelectorAll(selectors.join(",")).forEach(el => {
      el.style.setProperty("background-color", "#121212", "important");
      el.style.setProperty("color", "#b0b0b0", "important");
    });
  }

  let darkEnabled = true;

  enableDark();
  applyDark();

  const button = document.createElement("button");
  button.innerText = "☀️ Light";
  button.style.cssText = `
    position:fixed;
    bottom:20px;
    right:20px;
    z-index:999999;
    padding:8px 14px;
    background:#000;
    color:#fff;
    border:1px solid #444;
    border-radius:8px;
    cursor:pointer;
    font-size:14px;
  `;
  document.body.appendChild(button);

  button.onclick = () => {
    darkEnabled = !darkEnabled;
    const darkEl = document.getElementById("alibaba-dark");

    if (darkEl) {
      darkEl.remove();

      document.querySelectorAll(selectors.join(",")).forEach(el => {
        el.style.removeProperty("background-color");
        el.style.removeProperty("color");
      });

      originalFills.forEach((fill, path) => {
        if (path.isConnected) path.setAttribute("fill", fill);
      });

      button.innerText = "🌙 Dark";

    } else {
      enableDark();
      applyDark();
      button.innerText = "☀️ Light";
    }
  };

  const observer = new MutationObserver(() => {
    if (darkEnabled) {
      enableDark();
      applyDark();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

})();