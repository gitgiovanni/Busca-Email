const senhaCorreta = "MUDAR@123";

function verificarSenha() {
    const senha = document.getElementById('password').value.toLowerCase();
    const senhaCorretaLower = senhaCorreta.toLowerCase();
    const loginMessage = document.getElementById('loginMessage');

    if (senha === senhaCorretaLower) {
        document.getElementById('loginContainer').classList.remove('active');
        document.getElementById('siteContent').classList.add('active');
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

async function buscarEmail() {
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const emailDisplay = document.getElementById('emailDisplay');

    if (cpf.length !== 11) {
        emailDisplay.textContent = "CPF inválido.";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api?cpf=${cpf}`, { method: 'GET' });
        
        if (!response.ok) {
            throw new Error('Erro na busca do e-mail.');
        }

        const data = await response.json();
        const email = data.Funcionarios[0]?.Email.trim() || "E-mail não encontrado.";
        
        emailDisplay.textContent = email;
    } catch (error) {
        emailDisplay.textContent = "Erro ao buscar e-mail.";
    }
}

// Adiciona o evento de keydown no campo CPF para buscar o e-mail ao pressionar Enter
document.getElementById('cpf').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        buscarEmail();
    }
});
