// 1. Leer y guardar la cookie _fbc en localStorage al cargar la página
function getCookie(name) {
  const match = document.cookie.match('(^|;)\s*' + name + '\s*=\s*([^;]+)');
  return match ? match.pop() : '';
}
document.addEventListener('DOMContentLoaded', () => {
  const fbc = getCookie('_fbc');
  if (fbc) localStorage.setItem('fbc', fbc);
});

// 2. Al click: disparar evento personalizado y luego redirect a wa.me
document.getElementById('btn-whatsapp').addEventListener('click', () => {
  const fbc = localStorage.getItem('fbc') || 'sin-codigo';
  // 2.1) trackear un evento custom antes de redirigir
  fbq('trackCustom', 'WhatsAppRedirect', { fbc });

  // 2.2) Construir URL de WhatsApp
  const whatsappNumber = '5491160411705';
  const mensajeBase = 'Hola, vengo por el bono de bienvenida del 𝟐𝟎𝟎%, ¿me creas un usuario?';
  const mensaje = `${mensajeBase}\nMi Código Promocional es: ${fbc}`;
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

  // 2.3) Esperar un breve momento para que el Pixel envíe el evento
  setTimeout(() => {
    window.location.href = whatsappURL;
  }, 300);
});
