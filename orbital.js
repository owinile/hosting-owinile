(function(){
  var metaVersion = document.querySelector('meta[name="nichoClean-version"]');

  // Determinar PIN
  var pin = "SIN_PIN";
  if(metaVersion){
    var match = metaVersion.content.match(/r(\d+)/i);
    pin = match ? "PIN-" + match[1].padStart(3, "0") : "SIN_PIN";
  }

  var domain = window.location.hostname;
  var ua = navigator.userAgent;
  var webAppUrl = "https://script.google.com/macros/s/AKfycbxd-RdCKUlb3ihExrOl4MXvKsiTn4lpHD53M-UaO9iIXQej3BZ7yyKx8bBFzrAAiIqNyQ/exec";

  // Caso: falta el meta → bloquear
  if(!metaVersion){
    fetch(`${webAppUrl}?domain=${encodeURIComponent(domain)}&pin=${encodeURIComponent(pin)}&ua=${encodeURIComponent(ua)}&estado=META_ELIMINADO`)
      .catch(e => console.log("No se pudo registrar META_ELIMINADO", e));

    document.body.innerHTML = `
    <div id="bloqueo-licencia">
      <div class="bloqueo-container">
        <div class="icono">⚠️</div>
        <h1>🚫 Sitio sin soporte válido</h1>
        <p>
          Has eliminado un elemento esencial del theme (<em>meta de versión</em>).<br>
          Esto invalida la licencia y desactiva el soporte oficial.
        </p>
        <p>
          Por favor, restaura el código original o contacta con el desarrollador para obtener ayuda.
        </p>
        <a href="https://nichoclean.owinile.com/p/contacto.html" class="boton-soporte">Obtener soporte</a>
      </div>
    </div>

    <style>
    #bloqueo-licencia {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: #f9fafb;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
    }
    .bloqueo-container {
      max-width: 420px;
      padding: 30px 20px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      text-align: center;
      font-family: system-ui, sans-serif;
      color: #1f2937;
    }
    .bloqueo-container .icono {
      font-size: 48px;
      margin-bottom: 12px;
    }
    .bloqueo-container h1 {
      font-size: 20px;
      margin-bottom: 16px;
      color: #dc2626;
    }
    .bloqueo-container p {
      font-size: 15px;
      margin: 10px 0;
      line-height: 1.5;
    }
    .boton-soporte {
      display: inline-block;
      margin-top: 16px;
      padding: 10px 20px;
      background: #2563eb;
      color: #fff;
      font-weight: 600;
      text-decoration: none;
      border-radius: 8px;
      transition: background 0.2s;
    }
    .boton-soporte:hover {
      background: #1e40af;
    }
    </style>
    `;
    return; // corta ejecución
  }

  // Caso normal → registrar como META_OK
  fetch(`${webAppUrl}?domain=${encodeURIComponent(domain)}&pin=${encodeURIComponent(pin)}&ua=${encodeURIComponent(ua)}&estado=META_OK`)
    .then(res => console.log("Licencia registrada:", domain, pin))
    .catch(e => console.log("No se pudo registrar licencia (ignorado)", e));
})();