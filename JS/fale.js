(function () {
    'use strict';
    function init() {
        const form = document.getElementById('contatoForm');
        const msgSucesso = document.getElementById('mensagemSucesso');
        if (!form) return;
        // Campos
        const campos = {
            nome: document.getElementById('nome'),
            email: document.getElementById('email'),
            telefone: document.getElementById('telefone'),
            tipo: document.getElementById('tipo'),
            contato: document.getElementById('contato'),
            mensagem: document.getElementById('mensagem')
        };
        // Regex
        const nomeRegex = /^[A-Za-zÀ-ÿ]{2,}\s+[A-Za-zÀ-ÿ]{2,}(\s+[A-Za-zÀ-ÿ]{2,})*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Criar contador de caracteres para mensagem
        const MAX_CHARS = 500;
        const contadorDiv = document.createElement('div');
        contadorDiv.className = 'form-text';
        contadorDiv.id = 'mensagemContador';
        contadorDiv.innerHTML = `<span id="charCount">0</span>/${MAX_CHARS} caracteres`;
        
        // Inserir contador após o textarea
        if (campos.mensagem && campos.mensagem.parentNode) {
            campos.mensagem.parentNode.insertBefore(contadorDiv, campos.mensagem.nextSibling);
        }
        
        // Atualizar contador em tempo real
        if (campos.mensagem) {
            campos.mensagem.addEventListener('input', function() {
                const length = this.value.length;
                const charCount = document.getElementById('charCount');
                
                if (charCount) {
                    charCount.textContent = length;
                    
                    // Mudar cor quando ultrapassar
                    if (length > MAX_CHARS) {
                        contadorDiv.classList.add('text-danger');
                        contadorDiv.classList.remove('text-muted');
                        this.classList.add('is-invalid');
                    } else {
                        contadorDiv.classList.remove('text-danger');
                        contadorDiv.classList.add('text-muted');
                        this.classList.remove('is-invalid');
                    }
                }
            });
        }
        
        // Remove erro ao digitar/alterar
        Object.values(campos).forEach(campo => {
            if (!campo) return;
            campo.addEventListener('input', () => {
                // Não remover erro do mensagem se ainda ultrapassar limite
                if (campo === campos.mensagem && campo.value.length > MAX_CHARS) return;
                campo.classList.remove('is-invalid');
            });
            campo.addEventListener('change', () => campo.classList.remove('is-invalid'));
        });
        
        function validar() {
            let valido = true;
            let primeiroInvalido = null;
            // Nome
            if (!nomeRegex.test(campos.nome.value.trim())) {
                campos.nome.classList.add('is-invalid');
                valido = false;
                primeiroInvalido ??= campos.nome;
            }
            // Email
            if (!emailRegex.test(campos.email.value.trim())) {
                campos.email.classList.add('is-invalid');
                valido = false;
                primeiroInvalido ??= campos.email;
            }
            // Select: tipo
            if (campos.tipo.selectedIndex === 0) {
                campos.tipo.classList.add('is-invalid');
                valido = false;
                primeiroInvalido ??= campos.tipo;
            }
            // Select: contato
            if (campos.contato.selectedIndex === 0) {
                campos.contato.classList.add('is-invalid');
                valido = false;
                primeiroInvalido ??= campos.contato;
            }
            // Mensagem
            const msg = campos.mensagem.value.trim();
            if (msg === '' || msg.length > MAX_CHARS) {
                campos.mensagem.classList.add('is-invalid');
                valido = false;
                primeiroInvalido ??= campos.mensagem;
            }
            // Focar no primeiro inválido
            if (primeiroInvalido) primeiroInvalido.focus();
            return valido;
        }
        
        // SUBMIT
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validar()) return;
            // Sucesso → resetar form
            form.reset();
            
            // Resetar contador
            const charCount = document.getElementById('charCount');
            if (charCount) {
                charCount.textContent = '0';
                contadorDiv.classList.remove('text-danger');
                contadorDiv.classList.add('text-muted');
            }
            
            // Mostrar mensagem suave
            if (msgSucesso) {
                msgSucesso.classList.remove('d-none');
                msgSucesso.classList.add('fade-in');
                setTimeout(() => {
                    msgSucesso.classList.add('fade-out');
                    setTimeout(() => {
                        msgSucesso.classList.add('d-none');
                        msgSucesso.classList.remove('fade-in', 'fade-out');
                    }, 500);
                }, 3000);
            }
        });
    }
    // Init
    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
})();