const senhaCorreta = "MUDAR@123"; 
let emailBuscado = false; // Estado para controlar se a busca do email já foi feita

function verificarSenha() {
    const senha = document.getElementById('password').value.toLowerCase();
    const senhaCorretaLower = senhaCorreta.toLowerCase();
    const loginMessage = document.getElementById('loginMessage');

    if (senha === senhaCorretaLower) {
        document.getElementById('loginContainer').classList.remove('active');
        document.getElementById('siteContent').classList.add('active');
        emailBuscado = false; // Resetar o estado após o login
    } else {
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
    event.preventDefault();

    // Verifica se a busca já foi realizada
    if (emailBuscado) {
        return; // Se já buscou, não faz nada
    }

    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const emailDisplay = document.getElementById('emailDisplay');

    if (cpf.length !== 11) {
        emailDisplay.textContent = "CPF inválido.";
        return;
    }

    try {
        // Chamada para a API HTTPS
        const response = await fetch(`http://10.30.35.8:8080/rest/index/WSGETFUNCIONARIO?cpf=${cpf}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro na busca do e-mail.');
        }

        const data = await response.json();
        const email = (data.Funcionarios && data.Funcionarios.length > 0) ? data.Funcionarios[0].Email.trim() : "Funcionário não encontrado.";

        emailDisplay.textContent = email;
        emailBuscado = true; // Marcar que a busca foi realizada
    } catch (error) {
        emailDisplay.textContent = "Erro ao buscar e-mail.";
    }
}

// Adiciona o evento apenas após a tela de login ser removida
document.getElementById('cpf').addEventListener('blur', buscarEmail);
