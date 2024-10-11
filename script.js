const senhaCorreta = "MUDAR@123";

function verificarSenha() {
    const senha = document.getElementById('password').value.toLowerCase(); // Converte a senha para minúsculas
    const senhaCorretaLower = senhaCorreta.toLowerCase(); // Converte a senha correta para minúsculas
    const loginMessage = document.getElementById('loginMessage');

    if (senha === senhaCorretaLower) {
        // Mostra o conteúdo do site e esconde a tela de login
        document.getElementById('loginContainer').classList.remove('active');
        document.getElementById('siteContent').classList.add('active');
    } else {
        // Exibe mensagem de erro
        loginMessage.textContent = "Senha incorreta. Tente novamente.";
        loginMessage.style.color = "red";
    }
}

function mascaraCPF(input) {
    let value = input.value.replace(/\D/g, ''); 
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
    input.value = value;
}

async function buscarEmail() {
    const cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // Remove pontos e traços do CPF
    const emailDisplay = document.getElementById('emailDisplay');

    if (cpf.length !== 11) { // Verifica se o CPF tem 11 dígitos
        emailDisplay.textContent = "CPF inválido.";
        return;
    }

    try {
        // Altere aqui para usar a URL do seu servidor proxy
        const response = await fetch(`http://localhost:3000/api`, { // Mude para a URL do servidor proxy
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf }), // Envia o CPF no corpo da requisição
        });

        if (!response.ok) {
            throw new Error('Erro na busca do e-mail.');
        }

        const data = await response.json(); // Supondo que a API retorne um JSON
        const email = data.email || "E-mail não encontrado.";

        emailDisplay.textContent = email;
    } catch (error) {
        emailDisplay.textContent = "Erro ao buscar e-mail.";
    }
}

document.getElementById('cpf').addEventListener('blur', buscarEmail); // Dispara a busca quando o campo de CPF perde o foco
