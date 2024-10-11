document.getElementById('websiteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Pegar o link inserido pelo usuário
    const url = document.getElementById('websiteUrl').value;

    // Exibir um loading enquanto o resumo é gerado
    const resumoElemento = document.getElementById('resumoTexto');
    resumoElemento.textContent = 'Gerando resumo...';

    try {
        // Fazer uma requisição à API para coletar o conteúdo do site
        const resposta = await fetch('https://api.example.com/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ websiteUrl: url })
        });

        const dados = await resposta.json();

        // Enviar o conteúdo coletado para a API de IA para gerar o resumo
        const resumo = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer SUA_CHAVE_API_OPENAI'
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Resuma o seguinte conteúdo: ${dados.conteudo}`,
                max_tokens: 150
            })
        });

        const resumoDados = await resumo.json();
        resumoElemento.textContent = resumoDados.choices[0].text.trim();

    } catch (error) {
        console.error('Erro:', error);
        resumoElemento.textContent = 'Erro ao gerar o resumo. Tente novamente.';
    }
});
