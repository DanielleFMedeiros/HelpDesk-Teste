
// Atalhos do cabeçalho
function abrirLink() {
  window.open("https://drive.google.com/drive/folders/1Zjxqrsom2LXvtrx62O2bYz87Md8k72va?usp=sharing", "_blank");
}

function abrirLink1() {
  window.open("https://faq.tactelecom.com.br/bibliotecas/comercial/", "_blank");
}

//FORMATADOR DE CPF/CNPJ
function formatadorDoc() {
    const docEntrada = document.getElementById("docInput").value;
    const docNumeros = docEntrada.replace(/\D/g, "");

    const resultado = document.getElementById("docResultado");
    const botaoCopiar = document.getElementById("botaoCopiarDoc");

    if (docNumeros.length === 11) {
        // Formata como CPF
        resultado.textContent = docNumeros.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
        );

        botaoCopiar.style.display = "inline-block";

    } else if (docNumeros.length === 14) {
        // Formata como CNPJ
        resultado.textContent = docNumeros.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5"
        );

        botaoCopiar.style.display = "inline-block";

    } else {
        resultado.textContent =
            "Digite um CPF com 11 dígitos ou um CNPJ com 14 dígitos.";

        botaoCopiar.style.display = "none";
    }
}


function copiarDocumento() {
    const resultadoDoc = document.getElementById("docResultado").textContent;

    if (resultadoDoc) {
        copiarParaAreaTransferencia(resultadoDoc);
    }
}

function copiarParaAreaTransferencia(texto) {
  const tempInput = document.createElement("textarea");
  tempInput.value = texto;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Texto copiado para a área de transferência: " + texto);
}

/*//DMVIEW
function formatar_nome() {
  var nomeOriginal = document.getElementById("macInput").value;
  if (nomeOriginal.trim() === "") {
    document.getElementById("nomeResultado").innerText = "Por favor, digite um nome.";
  } else {
    var nomeFormatado = nomeOriginal.replace(/ /g, '_').toUpperCase();
    document.getElementById("nomeResultado").innerText = nomeFormatado;
  }
}

function copiarResultadoNome() {
  let resultadoNome = document.getElementById("nomeResultado").textContent;
  copiarParaAreaTransferencia(resultadoNome);
}
*/
//MAC
function verificarMac() {
  // Obter o valor do input
  var macAddress = document.getElementById("macInputVerificar").value;

  // Verificar se o valor está vazio
  if (macAddress.trim() === "") {
    // Limpar o iframe se o campo estiver vazio
    document.getElementById("iframeResultado").src = "";
    document.getElementById("resultado").innerText = "Endereço MAC vazio.";
    return;
  }

  // Construir a URL da solicitação
  var apiUrl = "https://api.macvendors.com/" + encodeURIComponent(macAddress);

  // Realizar a pesquisa diretamente no iframe
  document.getElementById("iframeResultado").src = apiUrl;

  // Limpar o campo de entrada
  document.getElementById("macInputVerificar").value = "";

  // Exibir o valor construído no elemento com id "resultado"
  document.getElementById("resultado").innerText = "Verificando...";
}

// LOCALIZAÇÃO
function formatarLocalizacao() {
  // Obtém o valor do input de localização
  let localizacaoEntrada = document.getElementById("localizacaoInput").value;

  // Utiliza expressão regular para extrair números decimais
  let numeros = localizacaoEntrada.match(/-?\d+\.\d+/g);

  if (numeros && numeros.length >= 2) {
    // Gera a localização formatada
    let localizacaoFormatada = "https://maps.google.com/?q=" + numeros.join(',');

    // Atualiza o texto e o link no HTML
    document.getElementById("localizacaoFormatada").textContent = localizacaoFormatada;
    document.getElementById("localizacaoFormatada").setAttribute("data-link-mapa", localizacaoFormatada);
  } else {
    // Exibe mensagem de localização inválida
    document.getElementById("localizacaoFormatada").textContent = "Localização inválida.";
  }
}

// Função para copiar o resultado
function copiarResultado() {
  // Obtém o resultado formatado
  let resultado = document.getElementById("localizacaoFormatada").getAttribute("data-link-mapa");

  // Cria um elemento de texto temporário para a área de transferência
  const tempInput = document.createElement("textarea");
  tempInput.value = resultado;
  document.body.appendChild(tempInput);

  // Seleciona o texto no elemento temporário
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Para dispositivos móveis

  // Copia o texto para a área de transferência
  document.execCommand("copy");

  // Remove o elemento temporário
  document.body.removeChild(tempInput);

  // Exibe mensagem de sucesso
  alert("Link do mapa copiado para a área de transferência:\n" + resultado);
}

// Função para gerar o link do mapa com coordenadas
function gerarLinkMapa(coordenadas) {
  // Gera o link do mapa com as coordenadas
  let linkMapa = "https://www.google.com/maps?q=" + coordenadas.join(',');

  // Atualiza o atributo href do elemento de link
  document.getElementById("linkMapa").setAttribute("href", linkMapa);
}

/* CONVERSÃO MINÚSCULA PARA MAIÚSCULA */
function converterMaiusculas() {
  let textoOriginal = document.getElementById("inputTexto").value;
  let textoConvertido = textoOriginal.toUpperCase();
  document.getElementById("textoConvertido").textContent = textoConvertido;
  document.getElementById("botaoCopiarTexto").style.display = "inline-block";
}
function converterMinusculas() {
  let textoOriginal = document.getElementById("inputTexto").value;
  let textoConvertido = textoOriginal.toLowerCase();
  document.getElementById("textoConvertido").textContent = textoConvertido;
  document.getElementById("botaoCopiarTexto").style.display = "inline-block";

}
function copiarTextoConversor() {
  let textoConvertido = document.getElementById("textoConvertido").textContent;
  const tempInput = document.createElement("textarea");
  tempInput.value = textoConvertido;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Texto copiado para a área de transferência: " + textoConvertido);
}

//o.s

let problemaSelect = null;

function mostrarElemento(elemento) {
  if (elemento) {
    elemento.classList.remove('hidden');
  }
}

function esconderElemento(elemento) {
  if (elemento && elemento.classList) {
    elemento.classList.add('hidden');
  }
}

function obterValorElemento(id) {
  return document.getElementById(id).value;
}

function limitarTextoComQuebras(texto, limite) {
  return texto
    .split('\n') // Divide o texto mantendo as quebras de linha originais
    .map(linha => linha.trim() ? limitarTexto(linha, limite) : linha) // Aplica a limitação onde necessário
    .join('\n'); // Junta as linhas mantendo as quebras intactas
}

function limitarTexto(texto, limite) {
  let palavras = texto.split(' ');
  let linhas = [];
  let linhaAtual = '';

  for (let palavra of palavras) {
    if ((linhaAtual + palavra).length <= limite) {
      linhaAtual += (linhaAtual ? ' ' : '') + palavra; // Adiciona espaço apenas se já houver texto na linha
    } else {
      linhas.push(linhaAtual);
      linhaAtual = palavra;
    }
  }

  if (linhaAtual) linhas.push(linhaAtual); // Adiciona a última linha se houver conteúdo

  return linhas.join('\n');
}

function obterModoContato(id) {
  const grupo = document.getElementById(id);
  if (!grupo) return '';
  return Array.from(grupo.querySelectorAll('input[type="checkbox"]:checked'))
    .map(opcao => opcao.value)
    .join(' e ');
}

function gerarTexto() {

  // Campo genérico removido: não existe no HTML e não é necessário.

  /* sem */
  const regiaoMk = obterValorElemento('regiao');
  const horarioMk = obterValorElemento('horario');
  const solicitanteMk = obterValorElemento('solicitante');
  const divplano = obterValorElemento('plano1');
  const divroteador = obterValorElemento('roteador1');
  const divmac = obterValorElemento('mac1');
  const divsinal = obterValorElemento('sinal1');
  const divsinaltx = obterValorElemento('sinaltx');
  const extras = obterValorElemento('extras');
  const telefoneMk = obterValorElemento('telefone');
  const modoContato = obterModoContato('modoContato');
  const refMk = obterValorElemento('ref');
  const localMk = obterValorElemento('local');

  /* personalizavel */
  const problema = problemaSelect.value;
  const regiaoMk6 = obterValorElemento('regiao6');
  const horarioMk6 = obterValorElemento('horario6');
  const solicitanteMk6 = obterValorElemento('solicitante6');
  const divplano2 = obterValorElemento('plano2');
  const divroteador2 = obterValorElemento('roteador2');
  const divmac2 = obterValorElemento('mac2');
  const divsinal2 = obterValorElemento('sinal2');
  const divsinaltx2 = obterValorElemento('sinaltx2');
  const extras6 = obterValorElemento('extras6');
  const osanterior = obterValorElemento('osanterior');
  const telefoneMk6 = obterValorElemento('telefone6');
  const modoContato6 = obterModoContato('modoContato6');
  const refMk6 = obterValorElemento('ref6');
  const localMk6 = obterValorElemento('local6');

  /* lenta */
  const regiaoMk2 = obterValorElemento('regiao2');
  const horarioMk2 = obterValorElemento('horario2');
  const solicitanteMk2 = obterValorElemento('solicitante2');
  const procedimentoCompletoLento = obterValorElemento('procedimentoCompletoLento');
  const dispositivosDiv = obterValorElemento('dispositivos');
  const tvCabeadaDiv = obterValorElemento('tvCabeadaDiv');
  const planoLenta = obterValorElemento('planoLenta');
  const roteadorLenta = obterValorElemento('roteadorLenta');
  const macLenta = obterValorElemento('macLenta');
  const sinalRXLenta = obterValorElemento('sinalRXLenta');
  const sinalTXLenta = obterValorElemento('sinalTXLenta');
  const extras2 = obterValorElemento('extras2');
  const telefoneMk2 = obterValorElemento('telefone2');
  const modoContato2 = obterModoContato('modoContato2');
  const refMk2 = obterValorElemento('ref2');
  const localMk2 = obterValorElemento('local2');

  /* caindo */
  const regiaoMk3 = obterValorElemento('regiao3');
  const horarioMk3 = obterValorElemento('horario3');
  const solicitanteMk3 = obterValorElemento('solicitante3');
  const procedimentoCompletoCaindo = obterValorElemento('procedimentoCompletoCaindo');
  const quedas = obterValorElemento('quedas');
  const cabosConectadosDiv1 = obterValorElemento('cabosConectadosDiv1');
  const dispositivosDiv1 = obterValorElemento('dispositivos1');
  const planoCaindo = obterValorElemento('planoCaindo');
  const roteadorCaindo = obterValorElemento('roteadorCaindo');
  const macCaindo = obterValorElemento('macCaindo');
  const sinalRXCaindo = obterValorElemento('sinalRXCaindo');
  const sinalTXCaindo = obterValorElemento('sinalTXCaindo');
  const extras3 = obterValorElemento('extras3');
  const telefoneMk3 = obterValorElemento('telefone3');
  const modoContato3 = obterModoContato('modoContato3');
  const refMk3 = obterValorElemento('ref3');
  const localMk3 = obterValorElemento('local3');

  /* sinal alto */
  const regiaoMk5 = obterValorElemento('regiao5');
  const horarioMk5 = obterValorElemento('horario5');
  const solicitanteMk5 = obterValorElemento('solicitante5');
  const quedas5 = obterValorElemento('quedas5');
  const planoSinalAlto = obterValorElemento('planoSinalAlto');
  const roteadorSinalAlto = obterValorElemento('roteadorSinalAlto');
  const macSinalAlto = obterValorElemento('macSinalAlto');
  const sinalRXSinalAlto = obterValorElemento('sinalRXSinalAlto');
  const sinalTXSinalAlto = obterValorElemento('sinalTXSinalAlto');
  const extras5 = obterValorElemento('extras5');
  const telefoneMk5 = obterValorElemento('telefone5');
  const modoContato5 = obterModoContato('modoContato5');
  const refMk5 = obterValorElemento('ref5');
  const localMk5 = obterValorElemento('local5');

  /* tv */
  const regiaoMk4 = obterValorElemento('regiao4');
  const horarioMk4 = obterValorElemento('horario4');
  const solicitanteMk4 = obterValorElemento('solicitante4');
  const planoTv = obterValorElemento('planoTv');
  const roteadorTv = obterValorElemento('roteadorTv');
  const macTv = obterValorElemento('macTv');
  const sinalRXTv = obterValorElemento('sinalRXTv');
  const sinalTXTv = obterValorElemento('sinalTXTv');
  const procedimentoCompletoTv4 = obterValorElemento('procedimentoCompletoTv4');
  const cabosConectadosDiv4 = obterValorElemento('cabosConectadosDiv4');
  const minimiza = obterValorElemento('minimiza4');
  const extras4 = obterValorElemento('extras4');
  const telefoneMk4 = obterValorElemento('telefone4');
  const modoContato4 = obterModoContato('modoContato4');
  const refMk4 = obterValorElemento('ref4');
  const localMk4 = obterValorElemento('local4');

  /* cabeamento*/
  const regiaoMk7 = obterValorElemento('regiao7');
  const horarioMk7 = obterValorElemento('horario7');
  const solicitanteMk7 = obterValorElemento('solicitante7');
  const cabearOq = obterValorElemento('cabear');
  const metragemMk = obterValorElemento('metragem');
  const cienteMk = obterValorElemento('ciente');
  const pagamentoMk = obterValorElemento('pagamento');
  const extras7 = obterValorElemento('extras7');
  const telefoneMk7 = obterValorElemento('telefone7');
  const modoContato7 = obterModoContato('modoContato7');
  const refMk7 = obterValorElemento('ref7');
  const localMk7 = obterValorElemento('local7');

  /* instalacao */
  const extraInstalacaoFibra = obterValorElemento('extraInstalacaoFibra');
  const nomeAtendente = obterValorElemento('nomeAtendente');
  const planoCliente = obterValorElemento('planoCliente');
  const cobrancaInstalacao = obterValorElemento('cobrancaInstalacao');
  const tipoRoteador = obterValorElemento('tipoRoteador');
  const appsCortesia = obterValorElemento('appsCortesia');
  const metragemCabos = obterValorElemento('metragemCabos');
  const vencimentoFatura = obterValorElemento('vencimentoFatura');
  const fiacao = obterValorElemento('fiacao');
  const clienteCiente = obterValorElemento('clienteCiente');
  const contrato = obterValorElemento('contrato');
  const telefoneMkComercial = obterValorElemento('telefoneComercial');
  const modoContatoComercial = obterModoContato('modoContatoComercial');
  const refMkComercial = obterValorElemento('refComercial');
  const localMkComercial = obterValorElemento('localComercial');

  let textoIntro = "";
  let textoGerado = "";
  let textoLocal = "";
  let texto = "";
  let telefone = "";
  let textoComFormatacaoPropria = false;

  // Função para pegar os valores dos checkbox marcados
  function obterCheckBoxMarcados() {
    let checkbox = document.querySelectorAll('.leds');
    let valorMarcado = [];

    checkbox.forEach(function (checkbox) {
      if (checkbox.checked) {
        valorMarcado.push(checkbox.value); // Adiciona o valor ao array
      }
    });

    return valorMarcado;
  }

  function montarTelefoneContato(numero, modo) {
    return numero + (modo ? ' - ' + modo : '');
  }

  function obterMorador() {
    const selecionado = document.querySelector('input[name="morador"]:checked');
    return selecionado ? selecionado.value : '';
  }

  //SEM INTERNET
  if (problema === 'semInternet') {

    let morador = obterMorador();

    textoIntro = regiaoMk + " - SEM INTERNET " +
             (morador ? "- " + morador + " " : "") +
             '\n' + "(" + horarioMk + ")" + '\n' + '\n' +
             "TRATADO COM: " + solicitanteMk + '\n' + '\n';
    
    "(" + horarioMk + ")" + '\n' + '\n' + "TRATADO COM: " + solicitanteMk + '\n' + '\n';


    const infos = [
      divplano,
      divroteador,
      divmac,
      (divsinal || divsinaltx) ? `RX: ${divsinal} | TX: ${divsinaltx}` : null
    ]
      .filter(Boolean)
      .join(', ');

    texto = `Plano, roteador, MAC e sinal: ${infos}.` + '\n' + '\n' + `CLIENTE ESTÁ SEM INTERNET.`;

    //checkbox

    let checkboxMarcado = obterCheckBoxMarcados();

    texto += checkboxMarcado ? " " + checkboxMarcado + "." : "";
    texto += extras ? " " + extras + "." : "";

    telefone = '\n' + montarTelefoneContato(telefoneMk, modoContato) + '\n' + refMk;
    textoLocal = localMk;
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + '\n' + textoLocal;
  }

  //PERSONALIZAVEL
  if (problema === 'personalization') {
    textoIntro = regiaoMk6 + '\n' + "(" + horarioMk6 + ")" + '\n' + '\n' + "TRATADO COM: " + solicitanteMk6 + '\n' + '\n';
     const infos2 = [
      divplano2,
      divroteador2,
      divmac2,
      (divsinal2 || divsinaltx2) ? `RX: ${divsinal2} | TX: ${divsinaltx2}` : null
    ]
      .filter(Boolean)
      .join(', ');

    texto = `Plano, roteador, MAC e sinal: ${infos2}.` + '\n' + '\n';
    texto += extras6;

    if (osanterior) {
      texto += '\n' + '\n' + `O.S ANTERIOR: ` + osanterior + '.';
    }


    telefone = '\n' + montarTelefoneContato(telefoneMk6, modoContato6) + '\n' + '\n' + refMk6 + '\n';
    textoLocal = localMk6;
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;
  }

  //INTERNET LENTA
  if (problema === 'internetLenta') {
    const infosLenta = [
      planoLenta ? `PLANO: ${planoLenta}` : null,
      roteadorLenta ? `MODELO DO ROTEADOR: ${roteadorLenta}` : null,
      macLenta ? `MAC DA ONU: ${macLenta}` : null,
      (sinalRXLenta || sinalTXLenta) ? `SINAL RX: ${sinalRXLenta} | SINAL TX: ${sinalTXLenta}` : null
    ].filter(Boolean).join('\n');
    textoIntro = regiaoMk2 + " - INTERNET LENTA" + '\n' + "(" + horarioMk2 + ")" + '\n\n' +
      "TRATADO COM: " + solicitanteMk2 + ',' + '\n' +
      (infosLenta ? infosLenta + '\n' : '') + '\n';
    texto = "CLIENTE ESTÁ COM INTERNET LENTA. ";

    if (procedimentoCompletoLento === 'nao') {
      texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    } else if (procedimentoCompletoLento === 'sim') {
      texto += "REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    }

    texto += "APRESENTA LENTIDÃO EM: " + dispositivosDiv + ". ";

    if (tvCabeadaDiv === 'sim') {
      texto += "TV É CABEADA. ";
    } else if (tvCabeadaDiv === 'nao') {
      texto += "TV NÃO É CABEADA. ";
    }

    textoLocal = localMk2;
    texto += extras2;

    telefone = '\n' + montarTelefoneContato(telefoneMk2, modoContato2) + '\n' + refMk2 + '\n';
    textoComFormatacaoPropria = true;
    textoGerado = textoIntro.toUpperCase() + limitarTexto(texto.toUpperCase(), 64) + '\n' + telefone.toUpperCase() + textoLocal;

  }

  //INTERNET CAINDO
  if (problema === 'internetCaindo') {
    const infosCaindo = [
      planoCaindo ? `PLANO: ${planoCaindo}` : null,
      roteadorCaindo ? `MODELO DO ROTEADOR: ${roteadorCaindo}` : null,
      macCaindo ? `MAC DA ONU: ${macCaindo}` : null,
      (sinalRXCaindo || sinalTXCaindo) ? `SINAL RX: ${sinalRXCaindo} | SINAL TX: ${sinalTXCaindo}` : null
    ].filter(Boolean).join('\n');
    textoIntro = regiaoMk3 + " - INTERNET CAINDO" + '\n' + "(" + horarioMk3 + ")" + '\n\n' +
      "TRATADO COM: " + solicitanteMk3 + ',' + '\n' +
      (infosCaindo ? infosCaindo + '\n' : '') + '\n';
    texto = "CLIENTE ESTÁ COM INTERNET CAINDO. ";

    if (procedimentoCompletoCaindo === 'nao') {
      texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    } else if (procedimentoCompletoCaindo === 'sim') {
      texto += "REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    }

    if (cabosConectadosDiv1 === 'sim') {
      texto += "CABOS ESTÃO BEM CONECTADOS. ";
    } else if (cabosConectadosDiv1 === 'nao') {
      texto += "CABOS ESTÃO MAL CONECTADOS. ";
    }

    if (quedas === 'sim') {
      texto += "APRESENTAM QUEDAS SIGNIFICATIVAS NO SISTEMA. ";
    } else if (quedas === 'nao') {
      texto += "NÃO APRESENTAM QUEDAS NO SISTEMA. ";
    }

    texto += "Há QUEDAS EM: " + dispositivosDiv1 + ". ";

    textoLocal = localMk3;
    texto += extras3;

    telefone = '\n' + montarTelefoneContato(telefoneMk3, modoContato3) + '\n' + refMk3 + '\n';
    textoComFormatacaoPropria = true;
    textoGerado = textoIntro.toUpperCase() + limitarTexto(texto.toUpperCase(), 64) + '\n' + telefone.toUpperCase() + textoLocal;

  }

  //SINAL ALTO
  if (problema === 'sinalAlto') {
    const infosSinalAlto = [
      planoSinalAlto ? `PLANO: ${planoSinalAlto}` : null,
      roteadorSinalAlto ? `MODELO DO ROTEADOR: ${roteadorSinalAlto}` : null,
      macSinalAlto ? `MAC DA ONU: ${macSinalAlto}` : null,
      (sinalRXSinalAlto || sinalTXSinalAlto) ? `SINAL RX: ${sinalRXSinalAlto} | SINAL TX: ${sinalTXSinalAlto}` : null
    ].filter(Boolean).join('\n');

    textoIntro = regiaoMk5 + " - SINAL ALTO" + '\n' + "(" + horarioMk5 + ")" + '\n\n' +
      "TRATADO COM: " + solicitanteMk5 + ',' + '\n' +
      (infosSinalAlto ? infosSinalAlto + '\n' : '') + '\n';
    texto = "CLIENTE ESTÁ COM SINAL ALTO. ";

    if (quedas5 === 'sim') {
      texto += "APRESENTAM QUEDAS SIGNIFICATIVAS NO SISTEMA. ";
    } else if (quedas5 === 'nao') {
      texto += "NÃO APRESENTAM QUEDAS NO SISTEMA. ";
    }

    texto+= '\n' + extras5 + ". " +'\n\n' + "VERIFICAR SINAL DE REDE, DROPP DA FIBRA, FUSÕES, ATUALIZAR A CONFIGURAÇÃO DE EQUIPAMENTO, VELOCIDADE, INSTALAÇÃO E POSICIONAMENTO "+
    "DA ONU E DEIXAR PADRÃO DEFINIDO. AO ENTRAR EM CONTATO COM O CLIENTE INFORMAR MANUTENÇÃO PREVENTIVA. "+
    "PRECISA CONTER NO FECHAMENTO DA O.S: FOTO DO SINAL DO T.A, SINAL DA CASA E FOTO DA ONU.*";

    textoLocal = localMk5;

    telefone = '\n' + montarTelefoneContato(telefoneMk5, modoContato5) + '\n' + refMk5 + '\n';
    textoComFormatacaoPropria = true;
    textoGerado = textoIntro.toUpperCase() + limitarTexto(texto.toUpperCase(), 64) + '\n' + telefone.toUpperCase() + textoLocal;

  }

  //TV COM DEFEITO
  if (problema === 'tvDefeito') {
    const infosTv = [
      planoTv ? `PLANO: ${planoTv}` : null,
      roteadorTv ? `MODELO DO ROTEADOR: ${roteadorTv}` : null,
      macTv ? `MAC DA ONU: ${macTv}` : null,
      (sinalRXTv || sinalTXTv) ? `SINAL RX: ${sinalRXTv} | SINAL TX: ${sinalTXTv}` : null
    ].filter(Boolean).join('\n');

    textoIntro = regiaoMk4 + " - TV COM DEFEITO" + '\n' + "(" + horarioMk4 + ")" + '\n\n' +
      "TRATADO COM: " + solicitanteMk4 + ',' + '\n' +
      (infosTv ? infosTv + '\n' : '') + '\n';
    texto = "CLIENTE ESTÁ COM PROBLEMAS NA TV. ";

    if (procedimentoCompletoTv4 === 'nao') {
      texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR EQUIPAMENTOS. ";
    } else if (procedimentoCompletoTv4 === 'sim') {
      texto += "REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR EQUIPAMENTOS. ";
    }

    if (cabosConectadosDiv4 === 'sim') {
      texto += "CABOS ESTÃO BEM CONECTADOS. ";
    } else if (cabosConectadosDiv4 === 'nao') {
      texto += "CABOS ESTÃO MAL CONECTADOS. ";
    }

    if (minimiza === 'sim') {
      texto += "TV ESTÁ MINIMIZANDO A TELA. ";
    } else if (minimiza === 'nao') {
      texto += "TV NÃO ESTÁ MINIMIZANDO A TELA. ";
    }

    //CABEAMENTO
    if (problema === 'cabeamento') {
      textoIntro = regiaoMk7 + " - CABEAMENTO" + '\n' + "(" + horarioMk7 + ")" + '\n' + '\n' + "TRATADO COM: " + solicitanteMk7 + '\n' + '\n';
      textoLocal = localMk7;

      if (metragemMk) {
        texto += '\n' + '\n' + `EM TORNO DE: ` + metragemMk + '.';
      }

      if (pagamentoMk) {
        texto += '\n' + '\n' + `Será pago no: ` + pagamento + '.';
      }
      texto += extras7;


      telefone = '\n' + montarTelefoneContato(telefoneMk7, modoContato7) + '\n' + '\n' + refMk7 + '\n';
      textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;
    }

    texto += extras4;
    telefone = '\n' + montarTelefoneContato(telefoneMk4, modoContato4) + '\n' + refMk4;
    textoLocal = localMk4;
    textoComFormatacaoPropria = true;
    textoGerado = textoIntro.toUpperCase() + limitarTexto(texto.toUpperCase(), 64) + '\n' + telefone.toUpperCase() + '\n' + textoLocal;

  }
  //INSTALACAO
  // Função para pegar os valores dos checkboxes marcados
  function obterCheckBoxesMarcados() {
    let checkboxes = document.querySelectorAll('.clienteCiente');
    let valoresMarcados = [];

    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        valoresMarcados.push(checkbox.value); // Adiciona o valor ao array
      }
    });

    return valoresMarcados;
  }

  if (problema === 'instalacao') {

    texto = nomeAtendente + " - FIBRA " + planoCliente + " - " + "INSTA " +
      cobrancaInstalacao + " + " + tipoRoteador + " + " + "\n" + appsCortesia + " + " +
      "Metragem de Cabeamento Disponível: " + metragemCabos + '\n'
      + "VENC:" + vencimentoFatura + '\n' + "FIAÇÃO:" + fiacao + "\n" + "\n";

    let checkboxesMarcados = obterCheckBoxesMarcados();
    if (checkboxesMarcados.length > 0) {
      texto += "**" + checkboxesMarcados.join(" / ") + "**" + '\n'; // Adicionando espaçamento correto
    }

    texto += "**CONTRATO " + contrato + "**" + '\n';

    telefone = '\n' + "CONTATO: " + montarTelefoneContato(telefoneMkComercial, modoContatoComercial) + '\n' + '\n' + refMkComercial + '\n';
    textoLocal = localMkComercial;

    textoGerado = texto.toUpperCase() + telefone.toUpperCase() + textoLocal;
  }

  //CABEAMENTO
  if (problema === 'cabeamento') {

    const cienteMk = document.getElementById("ciente").checked
      ? document.getElementById("ciente").value
      : "";

    textoIntro = regiaoMk7 + " - CABEAMENTO" + '\n' + "(" + horarioMk7 + ")" + '\n' + '\n' + "TRATADO COM: " + solicitanteMk7 + '\n' + '\n';
    textoLocal = localMk7;

    if (cabearOq) {
      texto += cabearOq;
    }

    if (metragemMk) {
      texto += '\n' + `EM TORNO DE: ` + metragemMk + '.';
    }

    if (cienteMk) {
      texto += '\n' + cienteMk + " - COBRAR 3,00 O METRO DO CABO  + 50,00 A HORA TÉCNICA. " + '\n';
    }


    if (pagamentoMk) {
      texto += '\n' + pagamentoMk + '.' + '\n';
    }

    if (extras7) {
      texto += '\n' + ">> " + extras7 + '.';
    }

    telefone = '\n' + montarTelefoneContato(telefoneMk7, modoContato7) + '\n' + '\n' + refMk7 + '\n';
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;
  }

  function obterValorElemento(elementoId) {
    var elemento = document.getElementById(elementoId);

    // Verifique se o elemento existe
    if (elemento) {
      return elemento.value; // Só tenta acessar o valor se o elemento for encontrado
    } else {
      console.error('Elemento com id ' + elementoId + ' não encontrado.');
      return ''; // Retorna um valor padrão ou vazio se o elemento não for encontrado
    }
  }

  // Aplica o mesmo limite de 64 caracteres por linha a todos os modelos de O.S.,
  // preservando as quebras de linha que já foram definidas em cada modelo.
  const textoLimitado = limitarTextoComQuebras(textoGerado, 64);

  // Atualiza o elemento de texto com o resultado
  document.getElementById('textoGerado').textContent = textoLimitado;
  const avisoConferencia = document.getElementById('avisoConferenciaOS');
  if (avisoConferencia) avisoConferencia.classList.remove('hidden');

  // Mostra o botão de copiar texto
  const botaoCopiarTexto = document.getElementById('copiarTextoo');
  botaoCopiarTexto.classList.remove('hidden');
  console.log("Texto gerado:", textoGerado);
}

function adicionarEventoProblema() {
  if (!problemaSelect) {
    console.error('Campo #problemaSelect não encontrado no HTML.');
    return;
  }
  problemaSelect.addEventListener('change', function () {
    // Oculta todas as opções
    esconderElemento(opcoesSemInternet);
    esconderElemento(opcoesPersonalizavel);
    // Esconde os leds
    let checkbox = document.querySelectorAll('.leds');
    checkbox.forEach(function (checkbox) {
      esconderElemento(checkbox);
    });

    // Esconde os checkboxes da instalação
    let checkboxes = document.querySelectorAll('.clienteCiente');
    checkboxes.forEach(function (checkbox) {
      esconderElemento(checkbox);
    });
    esconderElemento(extrasc);
    esconderElemento(opcoesInternetLenta);
    esconderElemento(opcoesInternetCaindo);
    esconderElemento(opcoesSinalAlto);
    esconderElemento(opcoesTvDefeito);
    esconderElemento(opcoesInstalacao);
    esconderElemento(extraInstalacaoFibra);
    esconderElemento(opcoesCabeamento);

    // Verifica o problema selecionado e mostra as opções correspondentes
    if (problemaSelect.value === 'semInternet') {
      mostrarElemento(opcoesSemInternet);
      mostrarElemento(regiaoMk);
      mostrarElemento(horarioMk);
      mostrarElemento(solicitanteMk);
      mostrarElemento(divplano);
      mostrarElemento(divroteador);
      mostrarElemento(divmac);
      mostrarElemento(divsinal);
      mostrarElemento(divsinaltx);
      // Aqui, encontramos todos os checkbox e mostramos cada um deles individualmente
      document.querySelectorAll('.leds').forEach(mostrarElemento);

      mostrarElemento(extrasc);
      mostrarElemento(telefoneMk);


      mostrarElemento(refMk);
      mostrarElemento(localMk);
      
    } else if (problemaSelect.value === 'personalization') {
      mostrarElemento(opcoesPersonalizavel);
      mostrarElemento(regiaoMk6);
      mostrarElemento(horarioMk6);
      mostrarElemento(solicitanteMk6)
      mostrarElemento(divplano2);
      mostrarElemento(divroteador2);
      mostrarElemento(divmac2);
      mostrarElemento(divsinal2);
      mostrarElemento(divsinaltx2);
      mostrarElemento(extrasc6);
      mostrarElemento(osanteriores);
      mostrarElemento(telefoneMk6);
      mostrarElemento(refMk6);
      mostrarElemento(localMk6);

    } else if (problemaSelect.value === 'internetLenta') {
      mostrarElemento(opcoesInternetLenta);
      mostrarElemento(regiaoMk2);
      mostrarElemento(horarioMk2);
      mostrarElemento(solicitanteMk2)
      mostrarElemento(procedimentoCompletoLento);
      mostrarElemento(dispositivosDiv);
      mostrarElemento(tvCabeada);
      mostrarElemento(planoLentaDiv);
      mostrarElemento(roteadorLentaDiv);
      mostrarElemento(macLentaDiv);
      mostrarElemento(sinalRXLentaDiv);
      mostrarElemento(sinalTXLentaDiv);
      mostrarElemento(extrasc2);
      mostrarElemento(telefoneMk2);
      mostrarElemento(refMk2);
      mostrarElemento(localMk2);

    } else if (problemaSelect.value === 'internetCaindo') {
      mostrarElemento(opcoesInternetCaindo);
      mostrarElemento(regiaoMk3);
      mostrarElemento(horarioMk3);
      mostrarElemento(solicitanteMk3)
      mostrarElemento(procedimentoCompletoCaindo);
      mostrarElemento(conectadoCabo1);
      mostrarElemento(quedas);
      mostrarElemento(dispositivosDiv1);
      mostrarElemento(planoCaindoDiv);
      mostrarElemento(roteadorCaindoDiv);
      mostrarElemento(macCaindoDiv);
      mostrarElemento(sinalRXCaindoDiv);
      mostrarElemento(sinalTXCaindoDiv);
      mostrarElemento(extrasc3);
      mostrarElemento(telefoneMk3);
      mostrarElemento(refMk3);
      mostrarElemento(localMk3);

    } else if (problemaSelect.value === 'sinalAlto') {
      mostrarElemento(opcoesSinalAlto);
      mostrarElemento(regiaoMk5);
      mostrarElemento(horarioMk5);
      mostrarElemento(solicitanteMk5)
      mostrarElemento(quedas5);
      mostrarElemento(planoSinalAltoDiv);
      mostrarElemento(roteadorSinalAltoDiv);
      mostrarElemento(macSinalAltoDiv);
      mostrarElemento(sinalRXSinalAltoDiv);
      mostrarElemento(sinalTXSinalAltoDiv);
      mostrarElemento(extrasc5);
      mostrarElemento(telefoneMk5);
      mostrarElemento(refMk5);
      mostrarElemento(localMk5);

    } else if (problemaSelect.value === 'tvDefeito') {
      mostrarElemento(opcoesTvDefeito);
      mostrarElemento(regiaoMk4);
      mostrarElemento(horarioMk4);
      mostrarElemento(solicitanteMk4);
      mostrarElemento(planoTvDiv);
      mostrarElemento(roteadorTvDiv);
      mostrarElemento(macTvDiv);
      mostrarElemento(sinalRXTvDiv);
      mostrarElemento(sinalTXTvDiv);
      mostrarElemento(procedimentoCompletoTv4);
      mostrarElemento(conectadoCabo4);
      mostrarElemento(minimiza);
      mostrarElemento(extrasc4);
      mostrarElemento(telefoneMk4);
      mostrarElemento(refMk4);
      mostrarElemento(localMk4);

    } else if (problemaSelect.value === 'cabeamento') {
      mostrarElemento(opcoesCabeamento);
      mostrarElemento(regiaoMk7);
      mostrarElemento(horarioMk7);
      mostrarElemento(solicitanteMk7)
      mostrarElemento(cabearOq);
      mostrarElemento(metragemMk);
      mostrarElemento(cienteMk);
      mostrarElemento(pagamentoMk);
      mostrarElemento(extrasc7);
      mostrarElemento(telefoneMk7);
      mostrarElemento(refMk7);
      mostrarElemento(localMk7);

    } else if (problemaSelect.value === 'instalacao') {
      mostrarElemento(opcoesInstalacao);
      mostrarElemento(extraInstalacaoFibra);
      mostrarElemento(nomeAtendente);
      mostrarElemento(planoCliente);
      mostrarElemento(cobrancaInstalacao);
      mostrarElemento(tipoRoteador);
      mostrarElemento(appsCortesia);
      mostrarElemento(metragemCabos);
      mostrarElemento(vencimentoFatura);
      mostrarElemento(fiacao);
      // Aqui, encontramos todos os checkboxes e mostramos cada um deles individualmente
      let checkboxes = document.querySelectorAll('.clienteCiente');
      checkboxes.forEach(function (checkbox) {
        mostrarElemento(checkbox); // Agora, mostramos o próprio elemento checkbox
      });
      mostrarElemento(contrato);
      mostrarElemento(telefoneComercial);
      mostrarElemento(refComercial);
      mostrarElemento(localComercial);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  problemaSelect = document.getElementById('problemaSelect');
  problemaSelect2 = document.getElementById('problemaSelect2');
  adicionarEventoProblema();
  configurarProblemaSelect2();
  configurarCopiarAtendimento();

  // Adiciona o evento de clique para copiar o texto gerado
  const botaoCopiarTexto = document.getElementById('copiarTextoo');
  if (botaoCopiarTexto) botaoCopiarTexto.addEventListener('click', function () {
    // Obtém o texto gerado
    const textoGerado = document.getElementById('textoGerado').textContent;

    // Cria um elemento de texto temporário
    const tempInput = document.createElement('textarea');
    tempInput.value = textoGerado;

    // Adiciona o elemento de texto temporário ao corpo do documento
    document.body.appendChild(tempInput);

    // Seleciona o texto no elemento de texto temporário
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Para dispositivos móveis

    // Copia o texto para a área de transferência
    document.execCommand('copy');

    // Remove o elemento de texto temporário
    document.body.removeChild(tempInput);

    // Alerta o usuário que o texto foi copiado
    alert('Texto copiado: ' + '\n' + textoGerado);
  });
});


// GERADOR DE ATENDIMENTO

let problemaSelect2 = null;

function mostrarElemento2(elemento2) {
  if (elemento2) {
    elemento2.classList.remove('hidden');
  }
}

function esconderElemento2(elemento2) {
  if (elemento2 && elemento2.classList) {
    elemento2.classList.add('hidden');
  }
}

function obterValorElemento2(id) {
  const elemento = document.getElementById(id);
  return elemento ? elemento.value : '';
}
// PERSONALIZAVEL

function gerarA() {

  const problema2 = problemaSelect2.value;

  let textoGerado2 = "";

  // PERSONALIZAVEL
  if (problema2 === 'personalizationA') {

    const cliente = obterValorElemento2('cliente');
    const contato = obterValorElemento2('contatos');
    const origem2 = obterValorElemento2('origem2');
    const relato = obterValorElemento2('relatos');
    const plano = obterValorElemento2('planos');
    const alteracoes = obterValorElemento2('alteracoesr');
    const extrasate = obterValorElemento2('extrasatendimento');

    const textoComeco =
      "Tratado com: " + cliente + '.' + '\n' +
      "Telefone: " + contato + ' - ' + origem2 + "." + '\n\n' +
      "Plano, roteador, MAC e sinal: " + plano + '.' + '\n';

    const textomeio =
      "Relato: " + relato + '.' + '\n\n' +
      "Alterações realizadas: " + alteracoes + '.' + '\n';

    const textoadd =
      extrasate ? "Informações importantes: " + extrasate + '.' : "";

    textoGerado2 = (
      textoComeco +
      '\n' +
      textomeio +
      '\n' +
      textoadd
    ).toUpperCase();
  }

  // MPC
  else if (problema2 === 'mpc') {

    const cadastro = obterValorElemento2('cadastro');
    const celular = obterValorElemento2('celular');
    const origem = obterValorElemento2('origem');
    const infocadastro = obterValorElemento2('infocadastro');
    const relatocliente = obterValorElemento2('relatocliente');
    const desfecho = obterValorElemento2('desfecho');
    const plus = obterValorElemento2('plus');

    const motivosSelecionados = document.querySelectorAll('.motivompc:checked');

    let motivos = [];

    motivosSelecionados.forEach(function (motivo) {
      motivos.push(motivo.value);
    });

    const textoComeco =
      "Cadastro: " + cadastro + '.' + '\n' +
      "Telefone: " + celular + '.' + origem + '.' + '\n';

    const textoMotivo =
      "Motivo: *" + motivos.join(' ') + "*" + '\n\n';

    const textoMeio =
      "Plano, roteador, MAC e sinal: " + infocadastro + '.' + '\n\n' +
      "Relato: " + relatocliente + '.' + '\n';

    const textoFim =
      "Desfecho: " + desfecho + '.';

    const textoAdd =
      plus ? '\n\nInformações importantes: ' + plus + '.' : '';

    textoGerado2 = (
      textoComeco +
      '\n' +
      textoMotivo +
      textoMeio +
      '\n' +
      textoFim +
      textoAdd);
  }
  // PÓS - CHAMADO
  else if (problema2 === 'poschamado') {

    const cadastro2 = obterValorElemento2('cadastro2');
    const celular2 = obterValorElemento2('celular2');
    const origem3 = obterValorElemento2('origem3');
    const dataultimavisita = obterValorElemento2('dataultimavisita');
    const motivodavisita = obterValorElemento2('motivodavisita');
    const tecnico = obterValorElemento2('tecnico');
    const situacao = obterValorElemento2('situacao');
    const relatocliente2 = obterValorElemento2('relatocliente2');
    const plus2 = obterValorElemento2('plus2');

    //data da ultima visita formatação dia/mes/ano
    const data = document.getElementById('dataultimavisita').value;

    const dataFormatada = data
      ? data.split('-').reverse().join('-')
      : '';

    const textoComeco =
      "*Nome do cadastro:* " + cadastro2 + '.' + '\n' +
      "*Telefone do cliente:* " + celular2 + ' - ' + origem3 + "." + '\n\n' +
      "*Data da última visita:*  " + dataFormatada + '.' + '\n' +
      "*Motivo da abertura da O.S.:* " + motivodavisita + '.' + '\n';

    const textomeio =
      "*Técnico responsável na visita:* " + tecnico + '.' + '\n\n' +
      "*Situação:* " + situacao + '.' + '\n' +
      "*Relato:* " + relatocliente2 + '.' + '\n';

    const textoadd =
      plus2 ? "*Informações extras:* " + plus2 + '.' : "";

    textoGerado2 = (
      textoComeco +
      '\n' +
      textomeio +
      '\n' +
      textoadd
    );
  };

  const botaoCopiar = document.getElementById('copiarA');
  if (botaoCopiar) botaoCopiar.classList.remove('hidden');
  const campoAtendimento = document.getElementById('atendimento');
  if (campoAtendimento) campoAtendimento.textContent = textoGerado2;
}

function configurarProblemaSelect2() {
  if (!problemaSelect2) {
    console.error('Campo #problemaSelect2 não encontrado no HTML.');
    return;
  }
  problemaSelect2.addEventListener('change', function () {

  const problema = this.value;

  // Esconde tudo primeiro
  document.querySelectorAll('#formulario1 .opcoes').forEach(el => {
    el.classList.add('hidden');
  });

  if (problema === 'personalizationA') {

    document.getElementById('opcoesPersonalizavel1').classList.remove('hidden');
    document.getElementById('clientes').classList.remove('hidden');
    document.getElementById('contato').classList.remove('hidden');
    document.getElementById('divorigem2').classList.remove('hidden');
    document.getElementById('plano').classList.remove('hidden');
    document.getElementById('relato').classList.remove('hidden');
    document.getElementById('alteracoes').classList.remove('hidden');
    document.getElementById('extrasate').classList.remove('hidden');

  } else if (problema === 'mpc') {

    document.getElementById('opcoesmpc').classList.remove('hidden');
    document.getElementById('cadastros').classList.remove('hidden');
    document.getElementById('divcelular').classList.remove('hidden');
    document.getElementById('divorigem').classList.remove('hidden');
    document.getElementById('divinfocadastro').classList.remove('hidden');
    document.getElementById('divrelatocliente').classList.remove('hidden');
    document.getElementById('divdesfecho').classList.remove('hidden');
    document.getElementById('divplus').classList.remove('hidden');

  } else if (problema === 'poschamado') {

    document.getElementById('opcoespos').classList.remove('hidden');
    document.getElementById('cadastros2').classList.remove('hidden');
    document.getElementById('divcelular2').classList.remove('hidden');
    document.getElementById('divorigem3').classList.remove('hidden');
    document.getElementById('divdataultimavisita').classList.remove('hidden');
    document.getElementById('divmotivodavisita').classList.remove('hidden');
    document.getElementById('divtecnico').classList.remove('hidden');
    document.getElementById('divsituacao').classList.remove('hidden');
    document.getElementById('divrelatocliente2').classList.remove('hidden');
    document.getElementById('divplus2').classList.remove('hidden');
  }
  });
}

function configurarCopiarAtendimento() {
  const botaoCopiarAtendimento = document.getElementById('copiarA');
  if (!botaoCopiarAtendimento) {
    console.error('Botão #copiarA não encontrado no HTML.');
    return;
  }
  botaoCopiarAtendimento.addEventListener('click', function () {
  const texto = document.getElementById('atendimento').textContent;

  navigator.clipboard.writeText(texto)
    .then(() => {
      alert('Texto copiado!');
    })
    .catch(err => {
      console.error('Erro ao copiar:', err);
    });
  });
}


function aplicarTema(modoEscuro) {
    document.body.classList.toggle("modo-escuro", modoEscuro);

    const botao = document.getElementById("botaoTema");

    if (botao) {
        botao.textContent = modoEscuro
            ? "☀️ Modo claro"
            : "🌙 Modo escuro";
    }
}

function alternarTema() {
    const modoEscuro =
        !document.body.classList.contains("modo-escuro");

    aplicarTema(modoEscuro);

    localStorage.setItem(
        "temaHelpDesk",
        modoEscuro ? "escuro" : "claro"
    );
}

document.addEventListener("DOMContentLoaded", function () {
    const temaSalvo = localStorage.getItem("temaHelpDesk");

    aplicarTema(temaSalvo === "escuro");
});



/* Guia interativo de diagnóstico — baseado no TREINAMENTO SUPORTE E TÉCNICO 2025.
   As respostas permanecem apenas nesta tela; não são salvas nem enviadas. */
const guiaFluxos = {
  semInternet: {
    titulo: "Sem internet", inicio: "los",
    etapas: {
      los: { q:"A ONU apresenta LOS vermelho ou piscando vermelho?", help:"Os nomes e comportamentos dos LEDs podem variar conforme o modelo.", opts:[
        ["Sim","Sim","coletivo"],["Não","Não","pon"],["Não foi possível verificar","Não verificado","fimNaoVerificado"]] },
      coletivo: { q:"Há outros clientes da mesma região relatando falta de conexão?", help:"Confira os registros internos antes de classificar como falha coletiva.", opts:[
        ["Sim, há outros clientes","Há outros clientes afetados","fimColetivo"],["Não, aparentemente só este cliente","Aparentemente apenas este cliente","fimIndividual"],["Ainda não verificado","Abrangência coletiva não verificada","fimChecarColetivo"]] },
      pon: { q:"Como está o LED PON da ONU?", help:"No treinamento, PON fixo indica registro; piscando persistentemente pode indicar falha de registro/autenticação; apagado pode indicar ausência de registro ou sinal.", opts:[
        ["Aceso fixo","PON aceso fixo","cabos"],["Piscando ou apagado","PON piscando ou apagado","fimPon"],["Não foi possível verificar","PON não verificado","fimNaoVerificado"]] },
      cabos: { q:"O roteador está ligado e os cabos de energia e WAN estão conectados corretamente?", help:"Verifique visualmente conexões acessíveis. Não oriente o cliente a manusear fibra ou conectores ópticos delicados.", opts:[
        ["Sim, tudo conectado e ligado","Equipamentos ligados e cabos conectados","fimAutenticacao"],["Foi encontrado cabo solto ou equipamento desligado","Conexão/energia solta ou equipamento desligado","fimReconectar"],["Não foi possível confirmar","Conexões não confirmadas","fimNaoVerificado"]] }
    },
    finais: {
      fimColetivo:["Possível falha coletiva","Consultar registros internos e seguir o procedimento da empresa para ocorrência coletiva. Registrar região, horário de início e evidências."],
      fimIndividual:["Possível falha óptica individual","Seguir o procedimento interno para falha óptica e avaliar abertura de O.S. Registrar estado do LOS e níveis RX/TX disponíveis."],
      fimChecarColetivo:["Verificação pendente","Consultar ocorrências da região antes de classificar o caso. Se persistir LOS vermelho, seguir o procedimento interno e avaliar O.S."],
      fimPon:["Possível falha de sinal ou registro","Registrar o estado do PON e seguir o procedimento interno de verificação óptica/provisionamento. Se não normalizar, encaminhar para análise técnica ou abrir O.S. conforme o fluxo da empresa."],
      fimAutenticacao:["Verificações físicas básicas concluídas","Se o sinal óptico estiver normal, verificar no sistema autorizado o estado da conexão, WAN/autenticação e eventual provisionamento. Reiniciar equipamento somente conforme o procedimento aprovado; se persistir, encaminhar para análise técnica/O.S."],
      fimReconectar:["Conexão física ajustada","Validar se a conexão retornou após ajustar apenas conexões acessíveis e seguras. Se não retornar, continuar o diagnóstico conforme os LEDs e o procedimento interno."],
      fimNaoVerificado:["Diagnóstico incompleto","Confirmar os LEDs e as conexões que possam ser verificadas com segurança. Se o cliente não conseguir verificar ou o caso exigir visita, registrar essa limitação e seguir o fluxo de suporte/O.S."]
    }
  },
  lenta: {
    titulo:"Internet lenta / velocidade baixa", inicio:"abrangencia",
    etapas:{
      abrangencia:{q:"A lentidão acontece em um único dispositivo ou em vários?",opts:[
        ["Só em um dispositivo","Somente um dispositivo","umDisp"],["Em vários dispositivos","Vários dispositivos","testeCabo"],["Não foi possível confirmar","Abrangência não confirmada","fimMaisDados"]]},
      umDisp:{q:"O dispositivo afetado é um aparelho HTV/IPTV?",help:"Este caminho especial é exclusivo para lentidão apresentada em aparelhos HTV/IPTV.",opts:[
        ["Sim, é HTV/IPTV","Dispositivo afetado é HTV/IPTV","htvApps"],["Não, é celular, computador ou outro dispositivo","Lentidão em outro dispositivo","umDispComum"],["Não foi possível identificar","Dispositivo afetado não identificado","fimMaisDados"]]},
      umDispComum:{q:"No dispositivo afetado, a lentidão acontece também por cabo de rede (se possível)?",opts:[
        ["Só no Wi-Fi / por cabo funciona melhor","Problema parece restrito ao Wi-Fi","fimWifi"],["Também fica lento por cabo","Lentidão também ocorre por cabo","fimDispCabo"],["Não foi possível testar por cabo","Teste por cabo não realizado","fimMaisDados"]]},
      htvApps:{q:"Os demais aplicativos do HTV, como YouTube, funcionam normalmente?",help:"Se os outros aplicativos funcionam e somente o HTV apresenta lentidão, direcione o diagnóstico para o dispositivo e o serviço específico.",opts:[
        ["Sim, YouTube funciona normalmente","YouTube funciona normalmente; lentidão restrita ao HTV","htvConexao"],["Não, outros aplicativos também apresentam lentidão","Outros aplicativos do HTV também apresentam lentidão","fimWifi"],["Não foi possível testar","Funcionamento dos demais aplicativos não confirmado","fimMaisDados"]]},
      htvConexao:{q:"Como o HTV está conectado à rede?",opts:[
        ["Wi-Fi","HTV conectado por Wi-Fi","htvProcedimento"],["Cabo de rede","HTV conectado por cabo de rede","htvProcedimento"],["Não foi possível confirmar","Tipo de conexão do HTV não confirmado","fimMaisDados"]]},
      htvProcedimento:{q:"O procedimento padrão da TAC para esse cenário já foi aplicado?",help:"Procedimento padrão informado: fixar o IP do HTV em modo estático e limitar a banda a 2048 kbps.",opts:[
        ["Sim, IP estático e limite de 2048 kbps aplicados","Aplicado IP estático e limite de banda de 2048 kbps","htvTeste"],["Ainda não foi aplicado","Procedimento padrão ainda não aplicado","fimHTVPendente"],["Não foi possível realizar","Procedimento padrão não realizado","fimHTVNaoRealizado"]]},
      htvTeste:{q:"Como ficou o funcionamento do HTV após os ajustes?",opts:[
        ["Normalizou","HTV normalizado após os ajustes","fimHTVResolvido"],["Continua lento ou travando","HTV continua apresentando lentidão após os ajustes","fimHTVPersistente"],["Cliente ainda não realizou o teste","Aguardando teste do HTV pelo cliente","fimHTVAguardando"]]},
      testeCabo:{q:"Foi feito teste por cabo, com um único dispositivo e sem downloads ou vídeos em segundo plano?",help:"O treinamento recomenda teste cabeado e sem tráfego concorrente para separar Wi-Fi de conexão.",opts:[
        ["Sim, teste cabeado realizado","Teste cabeado realizado","resultadoCabo"],["Não, ainda não","Teste cabeado pendente","fimTestePendente"]]},
      resultadoCabo:{q:"Qual foi o resultado do teste por cabo?",opts:[
        ["Velocidade adequada por cabo","Velocidade adequada por cabo","fimWifi"],["Velocidade baixa também por cabo","Velocidade baixa também por cabo","fimCaboLento"],["Resultado inconclusivo","Teste inconclusivo","fimMaisDados"]]}
    },
    finais:{
      fimWifi:["Indício de problema no Wi-Fi","Verificar distância, obstáculos, interferência, dispositivo e quantidade de equipamentos conectados. Registrar se o cabo apresenta desempenho normal."],
      fimDispCabo:["Investigar o dispositivo","Como o problema aparece em um dispositivo, investigar limitações do equipamento, placa de rede, configuração e tráfego local. Comparar com outro dispositivo antes de concluir falha da conexão."],
      fimCaboLento:["Investigar conexão cabeada","Confirmar teste com um único dispositivo e sem tráfego em segundo plano. Verificar se a placa/porta Ethernet negocia apenas 100 Mbps e seguir as verificações internas de sinal/rede; escalar se necessário."],
      fimTestePendente:["Teste adicional recomendado","Realizar teste por cabo, com um único dispositivo e sem tráfego em segundo plano. Se não for possível, registrar o tipo de conexão usada e as limitações do teste."],
      fimMaisDados:["Coletar mais informações","Confirmar quantos dispositivos são afetados e realizar teste controlado, preferencialmente por cabo. Registrar horário, plano, modelo do roteador e resultado."],
      fimHTVResolvido:["Lentidão exclusiva no HTV/IPTV — normalizada","Demais aplicativos, como YouTube, funcionavam normalmente. Aplicado o procedimento padrão da TAC: IP do HTV fixado em modo estático e limitação de banda em 2048 kbps. Cliente realizou novo teste e informou normalização."],
      fimHTVPendente:["Lentidão exclusiva no HTV/IPTV — procedimento pendente","Demais aplicativos funcionam normalmente. Orientar, conforme procedimento padrão da TAC, a fixação do IP do HTV em modo estático e a limitação de banda em 2048 kbps. Após a configuração, solicitar novo teste e registrar o resultado."],
      fimHTVNaoRealizado:["Lentidão exclusiva no HTV/IPTV — procedimento não realizado","Demais aplicativos funcionam normalmente. Procedimento padrão da TAC não realizado. Registrar o motivo e seguir o fluxo interno para continuidade da análise."],
      fimHTVPersistente:["Lentidão exclusiva no HTV/IPTV — persiste após ajustes","Aplicados IP estático e limitação de banda em 2048 kbps, conforme procedimento padrão da TAC. Cliente informa que o problema persiste. Registrar os testes, verificar o comportamento do serviço e do dispositivo e encaminhar para análise conforme o fluxo interno."],
      fimHTVAguardando:["Lentidão exclusiva no HTV/IPTV — aguardando validação","Aplicados IP estático e limitação de banda em 2048 kbps, conforme procedimento padrão da TAC. Aguardando retorno do cliente para confirmar se houve normalização."]
    }
  },
  quedas:{
    titulo:"Internet caindo / oscilando",inicio:"escopo",
    etapas:{
      escopo:{q:"As quedas afetam todos os dispositivos ou somente um?",opts:[
        ["Todos ou vários dispositivos","Quedas em vários dispositivos","historico"],["Somente um dispositivo","Quedas em um dispositivo","fimUmDisp"],["Não foi possível confirmar","Abrangência não confirmada","fimColetar"]]},
      historico:{q:"O histórico/registro interno mostra eventos de queda nos horários relatados?",opts:[
        ["Sim","Há eventos no histórico","verificacoes"],["Não","Não há eventos identificados","verificacoes"],["Não consultei / não disponível","Histórico não verificado","fimColetar"]]},
      verificacoes:{q:"Foram verificados energia, fonte, cabos/conectores acessíveis e níveis de sinal óptico no sistema?",opts:[
        ["Sim, verificados","Energia, cabos e sinal verificados","fimEscalar"],["Ainda não","Verificações pendentes","fimVerificar"]]}
    },
    finais:{
      fimUmDisp:["Investigar dispositivo ou Wi-Fi","Comparar com outros dispositivos e, se possível, testar por cabo. Registrar se a queda ocorre apenas nesse equipamento."],
      fimColetar:["Coletar evidências das quedas","Anotar datas/horários e frequência, confirmar quantos dispositivos são afetados e consultar o histórico interno. Verificar energia, fonte, cabos, sinal óptico e possível conflito de IP conforme os procedimentos autorizados."],
      fimEscalar:["Quedas persistentes após verificações","Registrar horários, eventos encontrados, estado dos cabos/fonte e níveis ópticos. Encaminhar para análise técnica/engenharia com as evidências conforme o fluxo interno."],
      fimVerificar:["Verificações ainda pendentes","Conferir fonte, energia, cabos/conectores acessíveis, níveis ópticos e histórico. Se continuar, encaminhar com datas/horários e evidências; considerar possível conflito de IP conforme procedimento interno."]
    }
  },
  servico:{
    titulo:"Site, aplicativo ou e-mail específico",inicio:"escopo",
    etapas:{
      escopo:{q:"A falha acontece somente em um site, aplicativo ou serviço?",opts:[
        ["Sim, somente um serviço","Falha em um serviço específico","teste"],["Vários serviços também falham","Falha em vários serviços","fimGeral"],["Não foi possível confirmar","Abrangência não confirmada","fimDados"]]},
      teste:{q:"O serviço foi testado em outro dispositivo/rede e no computador de suporte, quando disponível?",opts:[
        ["Sim, o problema foi confirmado","Problema confirmado em testes","fimFerramentas"],["Não, ainda não","Testes comparativos pendentes","fimTeste"]]}
    },
    finais:{
      fimGeral:["Investigar conectividade geral","Confirmar se há internet e se os LEDs estão normais. Se houver falha geral, seguir o fluxo de 'Sem internet' ou 'Internet lenta/caindo', conforme os sintomas."],
      fimDados:["Confirmar o escopo da falha","Anotar URL/nome do serviço, mensagem de erro, horário e dispositivos afetados. Comparar com outro dispositivo ou rede, se possível."],
      fimFerramentas:["Análise de serviço, rota ou DNS","Conforme ferramentas autorizadas, consultar Downdetector, testar no computador de suporte e comparar ping/traceroute ou DNS/rota no ISPTools. Se a política permitir teste temporário de firewall/antivírus, reative a proteção imediatamente. Encaminhar à engenharia com URL, IP público, horário, resultados e capturas/logs disponíveis."],
      fimTeste:["Realizar testes comparativos","Testar em outro dispositivo/rede e no computador de suporte, quando disponível. Registrar URL, erro, horário e resultados antes de escalar."]
    }
  },
  telefone:{
    titulo:"Telefone / VoIP",inicio:"sintoma",
    etapas:{
      sintoma:{q:"Qual é o sintoma principal da linha?",opts:[
        ["Linha com status ERRO / não registra","Linha com erro ou sem registro","redeAta"],["Chiado / ruído na ligação","Chiado ou ruído","fimChiado"],["Outro sintoma","Outro sintoma de telefonia","fimTelefone"]]},
      redeAta:{q:"O ATA está ligado a roteador adicional/switch ou pode ser testado diretamente no roteador principal?",opts:[
        ["Há equipamento adicional","Há roteador adicional ou switch","fimAta"],["Pode testar diretamente no roteador principal","Pode testar ATA direto no roteador principal","fimAta"],["Não foi possível confirmar","Estrutura da rede não confirmada","fimTelefone"]]}
    },
    finais:{
      fimChiado:["Verificações para chiado","Confirmar plano/minutos ativos, inspecionar cabo RJ11 e testar outro cabo ou aparelho, se disponível. O treinamento cita VAD como possibilidade se persistir, conforme procedimento interno."],
      fimTelefone:["Coletar dados da linha","Registrar sintoma, status da linha no sistema, modelo do ATA, estrutura da rede e testes já realizados. Encaminhar conforme fluxo interno."],
      fimAta:["Diagnóstico de registro VoIP","Confirmar estrutura de rede e, se possível, testar o ATA diretamente no roteador principal. Testar a linha pelo Microsip quando disponível. Aplicar STUN somente quando o status estiver 'ERRO' e conforme procedimento documentado; se persistir, escalar com os testes realizados."]
    }
  }
};
let guiaEstado={tipo:"",etapa:"",respostas:[],pilha:[]};
function iniciarGuiaDiagnostico(){
 const tipo=document.getElementById("guiaTipoProblema").value;
 if(!tipo||!guiaFluxos[tipo]){alert("Selecione o problema para iniciar o diagnóstico.");return;}
 guiaEstado={tipo,etapa:guiaFluxos[tipo].inicio,respostas:[],pilha:[]};
 document.getElementById("guiaIntro").classList.add("hidden");
 document.getElementById("guiaResultado").classList.add("hidden");
 document.getElementById("guiaEtapa").classList.remove("hidden");
 renderizarEtapaGuia();
}
function renderizarEtapaGuia(){
 const fluxo=guiaFluxos[guiaEstado.tipo],dados=fluxo.etapas[guiaEstado.etapa],painel=document.getElementById("guiaEtapa");
 if(!dados){reiniciarGuiaDiagnostico();return;}
 painel.innerHTML=`<div class="guia-progresso">Diagnóstico: ${fluxo.titulo}</div><h3>${dados.q}</h3>${dados.help?`<p class="guia-ajuda">${dados.help}</p>`:""}<div class="guia-opcoes">${dados.opts.map((o,i)=>`<button type="button" class="guia-opcao" data-opcao="${i}">${o[0]}</button>`).join("")}</div><div class="guia-acoes"><button type="button" class="guia-secundario" id="guiaVoltar">Voltar</button><button type="button" class="guia-secundario" onclick="reiniciarGuiaDiagnostico()">Reiniciar</button></div>`;
 painel.querySelectorAll("[data-opcao]").forEach(b=>b.addEventListener("click",()=>{
   const o=dados.opts[Number(b.dataset.opcao)];
   guiaEstado.pilha.push(guiaEstado.etapa);
   guiaEstado.respostas.push({pergunta:dados.q,resposta:o[1]});
   if(fluxo.finais[o[2]]) finalizarGuiaDiagnostico(o[2]);
   else {guiaEstado.etapa=o[2];renderizarEtapaGuia();}
 }));
 document.getElementById("guiaVoltar").addEventListener("click",voltarGuiaDiagnostico);
}
function finalizarGuiaDiagnostico(chave){
 const fluxo=guiaFluxos[guiaEstado.tipo],final=fluxo.finais[chave]||["Encaminhar para avaliação","Registrar as verificações realizadas e seguir o fluxo interno de suporte."];
 document.getElementById("guiaEtapa").classList.add("hidden");
 const resultado=document.getElementById("guiaResultado");resultado.classList.remove("hidden");
 const lista=guiaEstado.respostas.map((r,i)=>`${i+1}. ${r.pergunta}\n   Resposta: ${r.resposta}`).join("\n");
 resultado.innerHTML=`<div class="guia-progresso">Resumo do diagnóstico</div><h3>${final[0]}</h3><p>${final[1]}</p><label for="guiaResumoFinal">Resumo para registro (revise antes de copiar):</label><textarea id="guiaResumoFinal" rows="9"></textarea><div class="guia-acoes"><button type="button" onclick="copiarResumoGuia()">📋 Copiar resumo</button><button type="button" class="guia-secundario" onclick="reiniciarGuiaDiagnostico()">Novo diagnóstico</button></div><p class="guia-aviso">Orientações baseadas no treinamento interno fornecido. Confirme os procedimentos vigentes antes de executar ações em equipamentos ou sistemas.</p>`;
 document.getElementById("guiaResumoFinal").value=`PROBLEMA: ${fluxo.titulo}\n\nVERIFICAÇÕES E RESPOSTAS:\n${lista||"Nenhuma resposta registrada."}\n\nCONCLUSÃO: ${final[0]}\nPRÓXIMOS PASSOS: ${final[1]}`;
}
function copiarResumoGuia(){
 const campo=document.getElementById("guiaResumoFinal");campo.select();campo.setSelectionRange(0,campo.value.length);
 if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(campo.value).then(()=>alert("Resumo copiado!")).catch(()=>{document.execCommand("copy");alert("Resumo copiado!");});
 else {document.execCommand("copy");alert("Resumo copiado!");}
}
function voltarGuiaDiagnostico(){
 if(!guiaEstado.pilha.length){reiniciarGuiaDiagnostico();return;}
 guiaEstado.respostas.pop();guiaEstado.etapa=guiaEstado.pilha.pop();
 document.getElementById("guiaResultado").classList.add("hidden");
 document.getElementById("guiaEtapa").classList.remove("hidden");
 renderizarEtapaGuia();
}
function reiniciarGuiaDiagnostico(){
 guiaEstado={tipo:"",etapa:"",respostas:[],pilha:[]};
 document.getElementById("guiaTipoProblema").value="";
 document.getElementById("guiaIntro").classList.remove("hidden");
 document.getElementById("guiaEtapa").classList.add("hidden");
 document.getElementById("guiaResultado").classList.add("hidden");
}

