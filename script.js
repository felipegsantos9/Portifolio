const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const aberto = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', aberto);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('form');
const mensagem = form.elements['mensagem'];
const contador = document.getElementById('count');

mensagem.addEventListener('input', () => {
  contador.textContent = mensagem.value.length;
});


const status = document.getElementById('status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valido = true;

  [...form.elements].forEach((campo) => {
    if (!campo.name) return;
    const erro = !campo.value.trim() || (campo.type === 'email' && !campo.checkValidity());
    campo.setAttribute('aria-invalid', erro);
    if (erro) valido = false;
  });

  if (!valido) {
    status.textContent = 'Preencha todos os campos com um e-mail válido.';
    return;
  }

  const assunto = encodeURIComponent('Contato via portfólio');
  const corpo = encodeURIComponent(
    `Nome: ${form.elements['nome'].value}\nE-mail: ${form.elements['email'].value}\n\n${mensagem.value}`
  );
  window.location.href = `mailto:seuemail@exemplo.com?subject=${assunto}&body=${corpo}`;

  status.textContent = 'Abrindo seu app de e-mail para enviar a mensagem.';
  form.reset();
  contador.textContent = '0';
});

document.getElementById('year').textContent = new Date().getFullYear();