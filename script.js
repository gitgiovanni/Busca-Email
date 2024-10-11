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
        const response = await fetch(`http://localhost:3000/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf }),
        });

        if (!response.ok) {
            throw new Error('Erro na busca do e-mail.');
        }

        const data = await response.json(); // Supondo que a API retorne um JSON

        console.log('Resposta do servidor proxy:', data); // Log da resposta do servidor proxy

        // Processa a resposta para extrair o e-mail
        const funcionarios = data.Funcionarios; // Acesse o array de Funcionarios
        if (funcionarios && funcionarios.length > 0) {
            const email = funcionarios[0].Email.trim(); // Pega o e-mail do primeiro funcionário e remove espaços em branco
            emailDisplay.textContent = email || "E-mail não encontrado."; // Exibe o e-mail ou uma mensagem caso não encontre
        } else {
            emailDisplay.textContent = "Funcionário não encontrado.";
        }
    } catch (error) {
        emailDisplay.textContent = "Erro ao buscar e-mail.";
        console.error(error); // Para fins de depuração
    }
}


document.getElementById('cpf').addEventListener('blur', buscarEmail); // Dispara a busca quando o campo de CPF perde o foco
