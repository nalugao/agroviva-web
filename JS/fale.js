document.addEventListener('DOMContentLoaded', function () {
const form = document.getElementById('contatoForm');
const mensagemSucesso = document.getElementById('mensagemSucesso');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // impede o envio antes da validação
    let formValido = true;

    // Nome completo
    const nome = document.getElementById('nome');
    const nomeValor = nome.value.trim();
    const nomeRegex = /^[A-Za-zÀ-ÿ]{2,}\s+[A-Za-zÀ-ÿ]{2,}(\s+[A-Za-zÀ-ÿ]{2,})*$/;
    if (!nomeRegex.test(nomeValor)) {
        nome.classList.add('is-invalid');
        formValido = false;
    } else {
        nome.classList.remove('is-invalid');
    }

    // E-mail
    const email = document.getElementById('email');
    const emailValor = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValor)) {
        email.classList.add('is-invalid');
        formValido = false;
    } else {
        email.classList.remove('is-invalid');
    }

    // Mensagem
    const mensagem = document.getElementById('mensagem');
    const mensagemValor = mensagem.value.trim();
    if (mensagemValor === '' || mensagemValor.length > 500) {
        mensagem.classList.add('is-invalid');
        formValido = false;
    } else {
        mensagem.classList.remove('is-invalid');
    }

    // Se estiver tudo válido
    if (formValido) {
        form.reset();

      // Mostra mensagem de sucesso
    mensagemSucesso.classList.remove('d-none');
    mensagemSucesso.classList.add('fade-in');

      // Oculta mensagem após 4 segundos
    setTimeout(() => {
        mensagemSucesso.classList.add('fade-out');
        setTimeout(() => {
            mensagemSucesso.classList.add('d-none');
            mensagemSucesso.classList.remove('fade-in', 'fade-out');
        }, 500);
    }, 3000);
    }
});
});

// MENU HAMBÚRGUER RESPONSIVO
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});
});
