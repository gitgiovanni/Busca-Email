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
