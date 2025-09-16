(function(){
  // --- LICENCIA / VERSION ---
  var metaVersion = document.querySelector('meta[name="nichoClean-version"]');
  var pin = "SIN_PIN";
  if(metaVersion){
    var match = metaVersion.content.match(/r(\d+)/i);
    pin = match ? "PIN-" + match[1].padStart(3,"0") : "SIN_PIN";
  }
  var domain = window.location.hostname;
  var ua = navigator.userAgent;
  var webAppUrl = "https://script.google.com/macros/s/AKfycbxd-RdCKUlb3ihExrOl4MXvKsiTn4lpHD53M-UaO9iIXQej3BZ7yyKx8bBFzrAAiIqNyQ/exec";

  // Bloqueo si falta meta
  if(!metaVersion){
    fetch(`${webAppUrl}?domain=${encodeURIComponent(domain)}&pin=${encodeURIComponent(pin)}&ua=${encodeURIComponent(ua)}&estado=META_ELIMINADO`)
      .catch(()=>{});
    document.body.innerHTML=`
    <div id="bloqueo-licencia">
      <div class="bloqueo-container">
        <div class="icono">⚠️</div>
        <h1>🚫 Sitio sin soporte válido</h1>
        <p>Has eliminado un elemento esencial del theme (<em>meta de versión</em>).<br>Esto invalida la licencia y desactiva el soporte oficial.</p>
        <p>Por favor, restaura el código original o contacta con el desarrollador para obtener ayuda.</p>
        <a href="https://nichoclean.owinile.com/p/contacto.html" class="boton-soporte">Obtener soporte</a>
      </div>
    </div>
    <style>
      #bloqueo-licencia{position:fixed;top:0;left:0;width:100%;height:100%;background:#f9fafb;display:flex;align-items:center;justify-content:center;z-index:99999;}
      .bloqueo-container{max-width:420px;padding:30px 20px;background:#fff;border-radius:16px;box-shadow:0 8px 20px rgba(0,0,0,0.15);text-align:center;font-family:system-ui,sans-serif;color:#1f2937;}
      .bloqueo-container .icono{font-size:48px;margin-bottom:12px;}
      .bloqueo-container h1{font-size:20px;margin-bottom:16px;color:#dc2626;}
      .bloqueo-container p{font-size:15px;margin:10px 0;line-height:1.5;}
      .boton-soporte{display:inline-block;margin-top:16px;padding:10px 20px;background:#2563eb;color:#fff;font-weight:600;text-decoration:none;border-radius:8px;transition:background 0.2s;}
      .boton-soporte:hover{background:#1e40af;}
    </style>
    `;
    return; // corta ejecución
  }

  // Registrar licencia normal
  fetch(`${webAppUrl}?domain=${encodeURIComponent(domain)}&pin=${encodeURIComponent(pin)}&ua=${encodeURIComponent(ua)}&estado=META_OK`)
    .catch(()=>{});

  // --- JS CRÍTICO: MENÚ + CARRITO + ORBITAL ---
  document.addEventListener("DOMContentLoaded", () => {
    const menuBtn  = document.querySelector(".menu-toggle");
    const menuList = document.querySelector("nav.main-nav ul");
    const footer   = document.querySelector("footer");
    const cartBtn  = document.querySelector(".cart-float");
    const isMobile = () => window.innerWidth <= 768;

    if(menuBtn && menuList){
      menuBtn.addEventListener("click", () => {
        menuList.classList.toggle("active");
        menuBtn.classList.toggle("open");
      });
    }

    function ajustarCarrito(){
      if(!cartBtn||!footer)return;
      const vh = window.innerHeight;
      const footerTop = footer.getBoundingClientRect().top;
      const overlap = footerTop < vh ? (vh-footerTop+20) : 20;
      cartBtn.style.bottom = overlap + "px";
    }

    function ajustarOrbital(){
      if(!menuBtn||!footer)return;
      if(!isMobile()){ menuBtn.style.bottom="16px"; return; }
      const carritoVisible = window.TIENDA_CONFIG?.mostrarContador ?? false;
      let baseBottom = carritoVisible ? 80 : 16;
      let margenFooter = carritoVisible ? 80 : 20;
      const footerTop = footer.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const overlap = footerTop < vh ? (vh-footerTop+margenFooter) : 0;
      const btnBottom = overlap > 0 ? overlap : baseBottom;
      menuBtn.style.bottom = btnBottom + "px";
      if(menuList){ menuList.style.bottom = (btnBottom + 60) + "px"; }
    }

    function ajustarTodo(){ ajustarCarrito(); ajustarOrbital(); }
    setTimeout(ajustarTodo, 50);
    window.addEventListener("scroll", ajustarTodo, {passive:true});
    window.addEventListener("resize", ajustarTodo);
  });

})();
