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

async function buscarEmail(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário (se houver)

    const cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // Remove pontos e traços do CPF
    const emailDisplay = document.getElementById('emailDisplay');

    if (cpf.length !== 11) { // Verifica se o CPF tem 11 dígitos
        emailDisplay.textContent = "CPF inválido.";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api?cpf=${cpf}`); // Usando GET

        if (!response.ok) {
            throw new Error('Erro na busca do e-mail.');
        }

        const data = await response.json(); // Supondo que a API retorne um JSON
        const email = (data.Funcionarios && data.Funcionarios.length > 0) ? data.Funcionarios[0].Email.trim() : "Funcionário não encontrado.";

        emailDisplay.textContent = email;
    } catch (error) {
        emailDisplay.textContent = "Erro ao buscar e-mail.";
    }
}

document.getElementById('cpf').addEventListener('blur', buscarEmail); // Dispara a busca quando o campo de CPF perde o foco

// Se você tiver um botão para buscar o e-mail, adicione um listener
const buscarButton = document.getElementById('buscarButton'); // Substitua pelo ID correto do seu botão
if (buscarButton) {
    buscarButton.addEventListener('click', buscarEmail);
}
