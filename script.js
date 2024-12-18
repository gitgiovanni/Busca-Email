

// Adiciona o evento de busca ao CPF
document.getElementById('cpf').addEventListener('blur', buscarEmail);

// Foca no campo CPF ao carregar a página
window.onload = () => document.getElementById('cpf').focus();
