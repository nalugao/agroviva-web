(function () {
    'use strict';

  // util: logger (desative em produção se quiser)
    const log = (...args) => console.log('[fale.js]', ...args);

  // executa quando o DOM estiver pronto
    function init() {
    const form = document.getElementById('contatoForm');
    const mensagemSucesso = document.getElementById('mensagemSucesso');

    if (!form) {
        console.warn('[fale.js] Form com id="contatoForm" não encontrado.');
        return;
    }
    if (!mensagemSucesso) {
        console.warn('[fale.js] Elemento #mensagemSucesso não encontrado. A mensagem de sucesso ficará indisponível.');
    }

    // campos esperados
    const campos = {
        nome: document.getElementById('nome'),
        email: document.getElementById('email'),
        telefone: document.getElementById('telefone'),
        contato: document.getElementById('contato'),
        mensagem: document.getElementById('mensagem'),
        tipo: document.getElementById('tipo')
    };

    // checa existência dos campos e loga se faltar algo
    Object.keys(campos).forEach(k => {
        if (!campos[k]) log(`[fale.js] aviso: campo "${k}" não encontrado no DOM.`);
    });

    // Remove erro ao digitar/select change
    function limparErroAoInteragir(el) {
        if (!el) return;
        el.addEventListener('input', () => el.classList.remove('is-invalid'));
        el.addEventListener('change', () => el.classList.remove('is-invalid'));
    }

    Object.values(campos).forEach(c => limparErroAoInteragir(c));

    // Regex de validação
    const nomeRegex = /^[A-Za-zÀ-ÿ]{2,}\s+[A-Za-zÀ-ÿ]{2,}(\s+[A-Za-zÀ-ÿ]{2,})*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validar() {
        let valido = true;
        let primeiroInvalido = null;

      // Nome
        if (campos.nome) {
        const v = campos.nome.value.trim();
        if (!nomeRegex.test(v)) {
            campos.nome.classList.add('is-invalid');
            valido = false;
            primeiroInvalido = primeiroInvalido || campos.nome;
        } else {
            campos.nome.classList.remove('is-invalid');
        }
    }

      // Email
    if (campos.email) {
        const v = campos.email.value.trim();
        if (!emailRegex.test(v)) {
            campos.email.classList.add('is-invalid');
            valido = false;
            primeiroInvalido = primeiroInvalido || campos.email;
        } else {
            campos.email.classList.remove('is-invalid');
        }
    }

      // Tipo (select) — opcional: garante que não seja a opção "disabled" selecionada
    if (campos.tipo) {
        const v = campos.tipo.value;
        if (!v || v === '' || campos.tipo.selectedIndex === 0) {
            campos.tipo.classList.add('is-invalid');
            valido = false;
            primeiroInvalido = primeiroInvalido || campos.tipo;
        } else {
            campos.tipo.classList.remove('is-invalid');
        }
    }

    if (campos.contato) {
        const v = campos.contato.value;
        if (!v || v === '' || campos.contato.selectedIndex === 0) {
            campos.contato.classList.add('is-invalid');
            valido = false;
            primeiroInvalido = primeiroInvalido || campos.contato;
        } else {
            campos.contato.classList.remove('is-invalid');
        }
    }

      // Mensagem
        if (campos.mensagem) {
        const v = campos.mensagem.value.trim();
        if (v === '' || v.length > 500) {
            campos.mensagem.classList.add('is-invalid');
            valido = false;
            primeiroInvalido = primeiroInvalido || campos.mensagem;
        } else {
            campos.mensagem.classList.remove('is-invalid');
        }
    }

      // Telefone — opcional (só limpa a classe se preenchido corretamente, se você quiser)
    if (campos.telefone) {
        // não obrigando validação, mas remova a linha abaixo se quiser validar
        campos.telefone.classList.remove('is-invalid');
    }

    if (primeiroInvalido) {
        try { primeiroInvalido.focus(); } catch (e) { /* ignore */ }
    }

    return valido;
    }

    // intercepta submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

    log('[fale.js] submit interceptado — iniciando validação');
    const ok = validar();

    if (!ok) {
        log('[fale.js] validação: FALHOU');
        return;
    }

    log('[fale.js] validação: OK — simulando envio');

      // aqui você pode enviar via fetch/ajax; por enquanto apenas reseta e mostra sucesso
    form.reset();

    if (mensagemSucesso) {
        mensagemSucesso.classList.remove('d-none');
        mensagemSucesso.classList.add('fade-in');

        setTimeout(() => {
            mensagemSucesso.classList.add('fade-out');
            setTimeout(() => {
            mensagemSucesso.classList.add('d-none');
            mensagemSucesso.classList.remove('fade-in', 'fade-out');
        }, 500);
        }, 3000);
    }
    });

    log('[fale.js] inicializado com sucesso.');
  } // fim init

  // Método de carga: aceita <script defer> ou carregamento normal
    if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    } else {
    init();
}
})();
