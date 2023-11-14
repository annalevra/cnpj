/**
 * Obtém o cnpj na API BrasilAPI
 * @param {string} cnpj - o cnpj que será consultado
 * @param {function} callback - Retorno da consulta
 */
function getCNPJ(cnpj, callback){
    let url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //verifica se o retorno contém a propriedade cnpj
        if('cnpj' in data){
            let retorno = data
            callback(null, retorno)
        } else {
            callback('Não foi possível obter o cnpj',null)
        }
    })
    .catch(error => {
        callback(error, null)
        
    })
}


/** 
 * Atualiza o formulário a partir do CNPJ
 */
function buscarCNPJ() {
    // Obtendo os campos do formulário
    const cnpj = document.getElementById('cnpj');
    const razao_social = document.getElementById('razao_social');
    const nome_fantasia = document.getElementById('nome_fantasia');
    const cnae_fiscal_descricao = document.getElementById('cnae_fiscal_descricao');
    const municipio = document.getElementById('municipio');
    const uf = document.getElementById('uf');

    const modalMsg = new bootstrap.Modal(document.getElementById('modalMsg'))
    
    // Obtendo o valor digitado no CNPJ
    const cnpjValor = cnpj.value;
    // Aviso de erro caso o usuário não insira 14 dígitos
    if (cnpjValor.length != 14){
        modalMsg.show();
    }
    // Verifica se o CNPJ tem 14 dígitos
    if (cnpjValor.length === 14) {
        // Mostramos o spinner
        spinner.classList.remove('d-none');

        // Chamamos a função getCNPJ
        getCNPJ(cnpjValor, (erro, dados) => {
            // Após receber a resposta, ocultamos o spinner
            spinner.classList.add('d-none');

            if (erro) {
                // Tem algum erro?
                modalMsg.show()
            } else {
                razao_social.value = `${dados.razao_social}`;
                nome_fantasia.value = `${dados.nome_fantasia}`;
                cnae_fiscal_descricao.value = `${dados.cnae_fiscal_descricao}`;
                municipio.value = `${dados.municipio}`;
                uf.value = `${dados.uf}`;
            }
        });
    }
}

document.getElementById("cnpj").addEventListener("input", function (event) {
    // Remove caracteres não numéricos
    let inputValue = event.target.value.replace(/\D/g, "");

    // Limita o valor a 14 dígitos
    inputValue = inputValue.substring(0, 14);

    // Atualiza o valor do campo
    event.target.value = inputValue;
});

        
