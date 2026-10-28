/* HelpDesk — scripts principais */
const $ = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function abrirLink(){ window.open("https://drive.google.com/drive/folders/1Zjxqrsom2LXvtrx62O2bYz87Md8k72va?usp=sharing","_blank","noopener,noreferrer"); }
function abrirLink1(){ window.open("https://faq.tactelecom.com.br/bibliotecas/comercial/","_blank","noopener,noreferrer"); }

async function copiarTexto(texto){
  if(!texto){ alert("Não há texto para copiar."); return; }
  try {
    await navigator.clipboard.writeText(texto);
  } catch {
    const area=document.createElement("textarea"); area.value=texto; area.style.position="fixed"; area.style.opacity="0";
    document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
  }
  alert("Texto copiado para a área de transferência!");
}

function formatadorDoc(){
  const numeros=$("docInput").value.replace(/\D/g,"");
  const resultado=$("docResultado"), botao=$("botaoCopiarDoc");
  if(numeros.length===11) resultado.textContent=numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4");
  else if(numeros.length===14) resultado.textContent=numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,"$1.$2.$3/$4-$5");
  else resultado.textContent="Digite um CPF com 11 dígitos ou um CNPJ com 14 dígitos.";
  botao.classList.toggle("hidden",!(numeros.length===11||numeros.length===14));
}
function copiarDocumento(){ copiarTexto($("docResultado").textContent); }
function converterMaiusculas(){ $("textoConvertido").textContent=$("inputTexto").value.toUpperCase(); $("botaoCopiarTexto").classList.remove("hidden"); }
function converterMinusculas(){ $("textoConvertido").textContent=$("inputTexto").value.toLowerCase(); $("botaoCopiarTexto").classList.remove("hidden"); }
function copiarTextoConversor(){ copiarTexto($("textoConvertido").textContent); }

function formatarLocalizacao(){
  const entrada=$("localizacaoInput").value;
  const nums=entrada.match(/-?\d+(?:\.\d+)?/g);
  const resultado=$("localizacaoFormatada");
  if(nums && nums.length>=2){
    const lat=Number(nums[0]), lon=Number(nums[1]);
    if(Math.abs(lat)<=90 && Math.abs(lon)<=180){
      const link=`https://maps.google.com/?q=${lat},${lon}`;
      resultado.textContent=link; resultado.dataset.linkMapa=link; $("copiarLocalizacao").classList.remove("hidden"); return;
    }
  }
  resultado.textContent="Localização inválida. Informe latitude e longitude."; delete resultado.dataset.linkMapa; $("copiarLocalizacao").classList.add("hidden");
}
function copiarResultado(){ copiarTexto($("localizacaoFormatada").dataset.linkMapa || ""); }

async function verificarMac(){
  const mac=$("macInputVerificar").value.trim();
  const resultado=$("resultado"), caixa=$("macResultado");
  caixa.classList.add("hidden"); caixa.replaceChildren();
  if(!mac){ resultado.textContent="Digite um endereço MAC para consultar."; return; }
  if(!/^(?:[0-9a-f]{2}[:-]?){5}[0-9a-f]{2}$/i.test(mac.replace(/[\s.-]/g,""))){ resultado.textContent="Confira o formato do endereço MAC."; return; }
  resultado.textContent="Consultando fabricante…";
  try{
    const response=await fetch("https://api.macvendors.com/"+encodeURIComponent(mac));
    const fabricante=await response.text();
    if(!response.ok) throw new Error(fabricante || "Fabricante não encontrado.");
    resultado.textContent="Fabricante encontrado:";
    const strong=document.createElement("strong"); strong.textContent=fabricante; strong.style.display="block"; strong.style.padding="13px"; strong.style.color="var(--green)";
    caixa.appendChild(strong); caixa.classList.remove("hidden");
  }catch(e){ resultado.textContent="Não foi possível consultar agora. Verifique o MAC e tente novamente."; }
}

/* Construtores dos formulários: os IDs são criados de forma consistente e os campos são lidos por categoria. */
const osConfig = {
  semInternet:{title:"SEM INTERNET",fields:[
    ["regiao","Bairro e cidade","text","Ex.: Centro, Jaguaruna"],["morador","Tipo de local","radio",[["**MORA FIXO**","Morador fixo"],["**NÃO MORA FIXO**","Não mora fixo"],["**EMPRESA**","Empresa"],["**COMÉRCIO**","Comércio"]]],
    ["horario","Restrição de horário","text","Ex.: terça à tarde; quarta até 12h"],["solicitante","Tratado com","text","Nome de quem solicitou a O.S."],
    ["plano1","Plano","text","650MB-99,90"],["roteador1","Modelo do roteador","text","HUAWEI AX3S"],["mac1","MAC da ONU","text","DACMED123456"],["sinal1","Sinal RX","text","Ex.: -25.85"],["sinaltx","Sinal TX","text","Ex.: 2.78"],
    ["leds","Sobre os equipamentos","checks",[["Há led vermelho no roteador","Há led vermelho no roteador"],["Há led vermelho na ONU","Há led vermelho na ONU"],["Há led PON piscando na ONU","Há led PON piscando na ONU"],["LED dos equipamentos estão apagados","LED dos equipamentos estão apagados"],["LEDs da ONU estão apagados","LEDs da ONU estão apagados"],["LEDs do roteador estão apagados","LEDs do roteador estão apagados"],["Já realizou procedimento completo","Já realizou procedimento completo"],["Cabos estão bem conectados","Cabos estão bem conectados"],["Não retornou sinal após procedimentos","Não retornou sinal após procedimentos"],["O roteador resetou","O roteador resetou"]]],
    ["extras","Informações extras","text","Informações extras"],["telefone","Telefone para contato","text","Ex.: 4836600800"],["modocontato","Chamar como","checks",[["Whatsapp","Whatsapp"],["Ligação","Ligação"]]],["ref","Referência do local","text","Casa cinza ao lado do mercado"],["local","Link da localização do Google Maps","text","Cole o link aqui"]
  ]},
  personalization:{title:"PERSONALIZÁVEL",fields:[
    ["regiao6","Bairro, cidade e defeito","text","Centro, Jaguaruna — problema"],["horario6","Restrição de horário","text","Disponibilidade do cliente"],["solicitante6","Tratado com","text","Nome de quem solicitou"],
    ["plano2","Plano","text","650MB-99,90"],["roteador2","Modelo do roteador","text","HUAWEI AX3S"],["mac2","MAC da ONU","text","DACMED123456"],["sinal2","Sinal RX","text","Ex.: -25.85"],["sinaltx2","Sinal TX","text","Ex.: 2.78"],["extras6","Informações / relato","textarea","Descreva a solicitação"],["osanterior","O.S. anterior","textarea","Cole a O.S. anterior"],["telefone6","Telefone para contato","text","Ex.: 4836600800"],["ref6","Referência do local","text","Referência do endereço"],["local6","Link da localização","text","Cole o link do Google Maps"]
  ]},
  internetLenta:{title:"INTERNET LENTA",fields:[
    ["regiao2","Bairro e cidade","text","Centro, Jaguaruna"],["horario2","Restrição de horário","text","Disponibilidade do cliente"],["solicitante2","Tratado com","text","Nome de quem solicitou"],["procedimentoCompletoLento","Realizou procedimento completo?","select",[["sim","Sim"],["nao","Não"]]],["dispositivos","Está lento em quais dispositivos?","text","Ex.: celular e TV"],["tvCabeadaDiv","A TV é cabeada?","select",[["sim","Sim"],["nao","Não"]]],["sinal","Sinal no pedido","text","RX -25.85 | TX 2.98"],["extras2","Informações extras","textarea","Possível defeito, quedas, modelo do equipamento…"],["telefone2","Telefone para contato","text","Ex.: 4836600800"],["ref2","Referência do local","text","Referência do endereço"],["local2","Link da localização","text","Cole o link do Google Maps"]
  ]},
  internetCaindo:{title:"INTERNET CAINDO",fields:[
    ["regiao3","Bairro e cidade","text","Centro, Jaguaruna"],["horario3","Restrição de horário","text","Disponibilidade do cliente"],["solicitante3","Tratado com","text","Nome de quem solicitou"],["procedimentoCompletoCaindo","Realizou procedimento completo?","select",[["sim","Sim"],["nao","Não"]]],["quedas","Há quedas no sistema?","select",[["sim","Sim"],["nao","Não"]]],["cabosConectadosDiv1","Cabos estão bem conectados?","select",[["sim","Sim"],["nao","Não"]]],["dispositivos1","Está caindo em quais dispositivos?","text","Ex.: celular e computador"],["sinalcaindo","Sinal no pedido","text","RX -25.85 | TX 2.98"],["extras3","Informações extras","textarea","Descreva detalhes e reincidências"],["telefone3","Telefone para contato","text","Ex.: 4836600800"],["ref3","Referência do local","text","Referência do endereço"],["local3","Link da localização","text","Cole o link do Google Maps"]
  ]},
  sinalAlto:{title:"SINAL ALTO",fields:[
    ["regiao5","Bairro e cidade","text","Centro, Jaguaruna"],["horario5","Restrição de horário","text","Ex.: somente após as 18h"],["solicitante5","Tratado com","text","Nome de quem solicitou"],["sinal5","Sinal no pedido","text","RX -25.85 | TX 2.98"],["quedas5","Há quedas no sistema?","select",[["sim","Sim"],["nao","Não"]]],["extras5","Informações extras","textarea","Detalhes adicionais"],["telefone5","Telefone para contato","text","Ex.: 4836600800"],["ref5","Referência do local","text","Referência do endereço"],["local5","Link da localização","text","Cole o link do Google Maps"]
  ]},
  tvTac:{title:"TV TAC COM DEFEITO",fields:[
    ["regiao4","Bairro e cidade","text","Centro, Jaguaruna"],["horario4","Restrição de horário","text","Disponibilidade do cliente"],["solicitante4","Tratado com","text","Nome de quem solicitou"],["procedimentoCompletoTv4","Realizou procedimento completo?","select",[["sim","Sim"],["nao","Não"]]],["cabosConectadosDiv4","Cabos estão bem conectados?","select",[["sim","Sim"],["nao","Não"]]],["minimiza4","Está minimizando a tela?","select",[["sim","Sim"],["nao","Não"]]],["extras4","Informações extras","textarea","Propaganda, reincidência, última manutenção…"],["telefone4","Telefone para contato","text","Ex.: 4836600800"],["ref4","Referência do local","text","Referência do endereço"],["local4","Link da localização","text","Cole o link do Google Maps"]
  ]},
  cabeamento:{title:"CABEAMENTO",fields:[
    ["regiao7","Bairro e cidade","text","Centro, Jaguaruna"],["horario7","Restrição de horário","text","Disponibilidade do cliente"],["solicitante7","Tratado com","text","Nome de quem solicitou"],["cabear","O que deseja cabear?","textarea","Ex.: passagem de cabo para TV"],["metragem","Metragem estimada","text","Ex.: 10 metros"],["ciente","Cliente está ciente dos valores?","checkbox","Cliente está ciente dos valores"],["pagamento","Forma de pagamento","select",[["Será pago no: Pix","Pix"],["Será pago no local","No local"],["Será pago no: Boleto","Boleto"],["**Não será cobrado**","Não será cobrado"],["**Não será cobrado, cliente renovou plano**","Não será cobrado — renovou plano"]]],["extras7","Informações extras","textarea","Detalhes adicionais"],["telefone7","Telefone para contato","text","Ex.: 4836600800"],["ref7","Referência do local","text","Referência do endereço"],["local7","Link da localização","text","Cole o link do Google Maps"]
  ]},
  instalacao:{title:"INSTALAÇÃO DE FIBRA",fields:[
    ["nomeAtendente","Nome da atendente","text","Nome da atendente"],["planoCliente","Plano do cliente (megas e valor)","text","Ex.: 1000MB 199,90"],["cobrancaInstalacao","Cobrança da instalação","text","Gratuita ou valor e forma de pagamento"],["tipoRoteador","Roteador","select",[["Roteador Próprio","Próprio"],["Roteador Comodato","Comodato"]]],["appsCortesia","Aplicativos cortesia","text","Ex.: 3 APP PLAYHUB"],["metragemCabos","Cabeamento disponível","text","Ex.: 2 cabos de até 15m"],["vencimentoFatura","Dia de vencimento da fatura","select",[["10","10"],["20","20"],["30","30"]]],["fiacao","Tipo de fiação","select",[["aerea","Aérea"],["subterranea","Subterrânea"],["mista","Mista"]]],["clienteCiente","Cliente está ciente sobre","checks",[["Ciente sobre a prateleira","Prateleira"],["Ciente sobre o filtro de linha","Filtro de linha"],["Ciente sobre tomadas separadas","Tomadas separadas"],["Ciente sobre o cabo excedente","Cabo excedente"],["Não sabe se já tem fibra passada","Não sabe se já tem fibra passada"],["Já tem fibra passada","Já tem fibra passada"]]],["contrato","Contrato","select",[["Assinado Digitalmente","Assinado digitalmente"],["Levar em Mãos","Levar em mãos"],["Já Assinado na Loja","Já assinado na loja"]]],["telefoneComercial","Telefone para contato","text","Ex.: 4836600800"],["refComercial","Referência do local","text","Referência do endereço"],["localComercial","Link da localização","text","Cole o link do Google Maps"]
  ]}
};

function createField(field, prefix){
  const [id,label,type,extra]=field;
  const wrap=document.createElement("div"); wrap.className="field";
  if(type==="checks"){
    wrap.className="field full";
    const group=document.createElement("fieldset"); group.className="check-group";
    const legend=document.createElement("legend"); legend.textContent=label; group.appendChild(legend);
    extra.forEach(([value,text],i)=>{
      const lab=document.createElement("label"); lab.className="check-field";
      const input=document.createElement("input"); input.type="checkbox"; input.name=id; input.value=value; input.dataset.group=id;
      input.id=`${prefix}_${id}_${i}`; const span=document.createElement("span"); span.textContent=text;
      lab.append(input,span); group.appendChild(lab);
    });
    wrap.appendChild(group); return wrap;
  }
  const labelEl=document.createElement("label"); labelEl.textContent=label; labelEl.htmlFor=`${prefix}_${id}`; wrap.appendChild(labelEl);
  if(type==="radio"){
    const group=document.createElement("fieldset"); group.className="check-group";
    extra.forEach(([value,text],i)=>{
      const lab=document.createElement("label"); lab.className="check-field";
      const input=document.createElement("input"); input.type="radio"; input.name=id; input.value=value; input.id=`${prefix}_${id}_${i}`;
      const span=document.createElement("span"); span.textContent=text; lab.append(input,span); group.appendChild(lab);
    }); wrap.appendChild(group); return wrap;
  }
  if(type==="select"){
    const el=document.createElement("select"); el.id=`${prefix}_${id}`; el.dataset.field=id;
    el.add(new Option("Selecione uma opção","")); extra.forEach(([value,text])=>el.add(new Option(text,value))); wrap.appendChild(el); return wrap;
  }
  if(type==="checkbox"){
    wrap.className="field full";
    const lab=document.createElement("label"); lab.className="check-field";
    const el=document.createElement("input"); el.type="checkbox"; el.id=`${prefix}_${id}`; el.dataset.field=id; el.value=extra;
    const span=document.createElement("span"); span.textContent=extra; lab.append(el,span); wrap.appendChild(lab); return wrap;
  }
  const el=document.createElement(type==="textarea"?"textarea":"input");
  if(type!=="textarea") el.type=type;
  el.id=`${prefix}_${id}`; el.dataset.field=id; el.placeholder=extra||""; wrap.appendChild(el);
  return wrap;
}
function renderDynamicForm(selectId, targetId, config, prefix){
  const select=$(selectId), target=$(targetId);
  function render(){
    target.replaceChildren(); const selected=config[select.value];
    target.classList.toggle("hidden",!selected);
    if(!selected) return;
    selected.fields.forEach(f=>target.appendChild(createField(f,prefix)));
  }
  select.addEventListener("change",render); render();
}
function getField(id,prefix){
  const radio=document.querySelector(`input[name="${id}"]:checked`);
  if(radio) return radio.value;
  const checks=[...document.querySelectorAll(`input[data-group="${id}"]:checked`)].map(x=>x.value);
  if(checks.length) return checks.join("; ");
  const checkbox=$(`${prefix}_${id}`);
  if(checkbox && checkbox.type==="checkbox") return checkbox.checked ? (checkbox.value || "Sim") : "";
  const el=$(`${prefix}_${id}`);
  return el ? el.value.trim() : "";
}
function val(id,prefix){return getField(id,prefix);}
function compact(parts){return parts.filter(x=>x!==null && x!==undefined && String(x).trim()!=="").join("\n");}
function commonIntro(region,hour,contact,title){
  return compact([region ? `${region} - ${title}` : title,hour?`(${hour})`:"",contact?`TRATADO COM: ${contact}`:""]);
}
function generateOS(){
  const type=$("problemaSelect").value, c=osConfig[type]; if(!c){alert("Selecione o tipo de solicitação.");return "";}
  const g=id=>val(id,"os");
  let intro="", body="", end="", fields=[];
  if(type==="semInternet"){
    const infos=[g("plano1"),g("roteador1"),g("mac1"),(g("sinal1")||g("sinaltx"))?`RX: ${g("sinal1")} | TX: ${g("sinaltx")}`:""].filter(Boolean).join(", ");
    intro=commonIntro(g("regiao"),g("horario"),g("solicitante"),"SEM INTERNET");
    if(g("morador")) intro += "\n"+g("morador");
    body=compact([infos?`PLANO, ROTEADOR, MAC E SINAL: ${infos}.`:"","CLIENTE ESTÁ SEM INTERNET.",g("leds"),g("extras")]);
    end=compact([g("telefone")+(g("modocontato")?` - ${g("modocontato")}`:""),g("ref"),g("local")]);
  } else if(type==="personalization"){
    intro=commonIntro(g("regiao6"),g("horario6"),g("solicitante6"),"");
    const infos=[g("plano2"),g("roteador2"),g("mac2"),(g("sinal2")||g("sinaltx2"))?`RX: ${g("sinal2")} | TX: ${g("sinaltx2")}`:""].filter(Boolean).join(", ");
    body=compact([infos?`PLANO, ROTEADOR, MAC E SINAL: ${infos}.`:"",g("extras6"),g("osanterior")?`O.S. ANTERIOR: ${g("osanterior")}`:""]);
    end=compact([g("telefone6"),g("ref6"),g("local6")]);
  } else if(type==="internetLenta"){
    intro=commonIntro(g("regiao2"),g("horario2"),g("solicitante2"),"INTERNET LENTA");
    body=compact(["CLIENTE ESTÁ COM INTERNET LENTA.",g("procedimentoCompletoLento")==="sim"?"REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR O ROTEADOR.":g("procedimentoCompletoLento")==="nao"?"NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR O ROTEADOR.":"",g("dispositivos")?`APRESENTA LENTIDÃO EM: ${g("dispositivos")}.`:"",g("tvCabeadaDiv")==="sim"?"TV É CABEADA.":g("tvCabeadaDiv")==="nao"?"TV NÃO É CABEADA.":"",g("sinal")?`SINAL ESTÁ: ${g("sinal")}.`:"",g("extras2")]);
    end=compact([g("telefone2"),g("ref2"),g("local2")]);
  } else if(type==="internetCaindo"){
    intro=commonIntro(g("regiao3"),g("horario3"),g("solicitante3"),"INTERNET CAINDO");
    body=compact(["CLIENTE ESTÁ COM INTERNET CAINDO.",g("procedimentoCompletoCaindo")==="sim"?"REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR O ROTEADOR.":g("procedimentoCompletoCaindo")==="nao"?"NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR O ROTEADOR.":"",g("cabosConectadosDiv1")==="sim"?"CABOS ESTÃO BEM CONECTADOS.":g("cabosConectadosDiv1")==="nao"?"CABOS NÃO ESTÃO BEM CONECTADOS.":"",g("quedas")==="sim"?"APRESENTAM QUEDAS NO SISTEMA.":g("quedas")==="nao"?"NÃO APRESENTAM QUEDAS NO SISTEMA.":"",g("dispositivos1")?`HÁ QUEDAS EM: ${g("dispositivos1")}.`:"",g("sinalcaindo")?`SINAL ESTÁ: ${g("sinalcaindo")}.`:"",g("extras3")]);
    end=compact([g("telefone3"),g("ref3"),g("local3")]);
  } else if(type==="sinalAlto"){
    intro=commonIntro(g("regiao5"),g("horario5"),g("solicitante5"),"SINAL ALTO");
    body=compact([g("sinal5")?`SINAL ESTÁ: ${g("sinal5")}.`:"","CLIENTE ESTÁ COM SINAL ALTO.",g("quedas5")==="sim"?"APRESENTAM QUEDAS SIGNIFICATIVAS NO SISTEMA.":g("quedas5")==="nao"?"NÃO APRESENTAM QUEDAS NO SISTEMA.":"",g("extras5"),"VERIFICAR SINAL DE REDE, DROP DA FIBRA, FUSÕES, CONFIGURAÇÃO DO EQUIPAMENTO, VELOCIDADE, INSTALAÇÃO E POSICIONAMENTO DA ONU. INFORMAR AO CLIENTE SOBRE A MANUTENÇÃO PREVENTIVA. INCLUIR NO FECHAMENTO DA O.S.: FOTO DO SINAL DO T.A., SINAL DA CASA E FOTO DA ONU."]);
    end=compact([g("telefone5"),g("ref5"),g("local5")]);
  } else if(type==="tvTac"){
    intro=commonIntro(g("regiao4"),g("horario4"),g("solicitante4"),"TV TAC COM DEFEITO");
    body=compact(["CLIENTE ESTÁ COM PROBLEMAS NA TV TAC.",g("procedimentoCompletoTv4")==="sim"?"REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR OS EQUIPAMENTOS.":g("procedimentoCompletoTv4")==="nao"?"NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR OS EQUIPAMENTOS.":"",g("cabosConectadosDiv4")==="sim"?"CABOS ESTÃO BEM CONECTADOS.":g("cabosConectadosDiv4")==="nao"?"CABOS NÃO ESTÃO BEM CONECTADOS.":"",g("minimiza4")==="sim"?"TV ESTÁ MINIMIZANDO A TELA.":g("minimiza4")==="nao"?"TV NÃO ESTÁ MINIMIZANDO A TELA.":"",g("extras4")]);
    end=compact([g("telefone4"),g("ref4"),g("local4")]);
  } else if(type==="cabeamento"){
    intro=commonIntro(g("regiao7"),g("horario7"),g("solicitante7"),"CABEAMENTO");
    body=compact([g("cabear"),g("metragem")?`EM TORNO DE: ${g("metragem")}.`:"",g("ciente")?"CLIENTE ESTÁ CIENTE DOS VALORES — COBRAR R$ 3,00 POR METRO DE CABO + R$ 50,00 POR HORA TÉCNICA.":"",g("pagamento"),g("extras7")?`OBS.: ${g("extras7")}`:""]);
    end=compact([g("telefone7"),g("ref7"),g("local7")]);
  } else if(type==="instalacao"){
    intro=compact([`${g("nomeAtendente")} - FIBRA ${g("planoCliente")} - INSTA ${g("cobrancaInstalacao")}`,`ROTEADOR: ${g("tipoRoteador")}`,g("appsCortesia")?`APPS CORTESIA: ${g("appsCortesia")}`:"",g("metragemCabos")?`METRAGEM DE CABEAMENTO DISPONÍVEL: ${g("metragemCabos")}`:"",g("vencimentoFatura")?`VENCIMENTO: ${g("vencimentoFatura")}`:"",g("fiacao")?`FIAÇÃO: ${g("fiacao")}`:"",g("clienteCiente")?`CIENTE SOBRE: ${g("clienteCiente")}`:"",g("contrato")?`CONTRATO: ${g("contrato")}`:""]);
    end=compact([g("telefoneComercial")?`CONTATO: ${g("telefoneComercial")}`:"",g("refComercial"),g("localComercial")]);
  }
  return compact([intro.toUpperCase(),body.toUpperCase(),end.toUpperCase()]);
}
function gerarTexto(){const text=generateOS(); if(text){$("textoGerado").value=text;$("copiarTextoo").classList.remove("hidden");}}
function generateAtendimento(){
  const type=$("problemaSelect2").value; const g=id=>val(id,"at");
  if(!type){alert("Selecione o modelo de atendimento.");return "";}
  if(type==="personalizationA"){
    return compact([g("cliente")?`TRATADO COM: ${g("cliente")}.`:"",g("contatos")?`TELEFONE: ${g("contatos")}${g("origem2")?" - "+g("origem2"):""}.`:"",g("planos")?`PLANO, ROTEADOR, MAC E SINAL: ${g("planos")}.`:"",g("relatos")?`RELATO: ${g("relatos")}.`:"",g("alteracoesr")?`ALTERAÇÕES REALIZADAS: ${g("alteracoesr")}.`:"",g("extrasatendimento")?`INFORMAÇÕES IMPORTANTES: ${g("extrasatendimento")}.`:""]).toUpperCase();
  }
  if(type==="mpc"){
    const motivos=g("motivompc");
    return compact([g("cadastro")?`CADASTRO: ${g("cadastro")}.`:"",g("celular")?`TELEFONE: ${g("celular")}${g("origem")?" - "+g("origem"):""}.`:"",motivos?`MOTIVO: *${motivos}*`:"",g("infocadastro")?`PLANO, ROTEADOR, MAC E SINAL: ${g("infocadastro")}.`:"",g("relatocliente")?`RELATO: ${g("relatocliente")}.`:"",g("desfecho")?`DESFECHO: ${g("desfecho")}.`:"",g("plus")?`INFORMAÇÕES IMPORTANTES: ${g("plus")}.`:""]).toUpperCase();
  }
  const date=g("dataultimavisita");
  const dateFormatted=date?date.split("-").reverse().join("/"):"";
  return compact([g("cadastro2")?`*Nome do cadastro:* ${g("cadastro2")}`:"",g("celular2")?`*Telefone do cliente:* ${g("celular2")}${g("origem3")?" - "+g("origem3"):""}`:"",dateFormatted?`*Data da última visita:* ${dateFormatted}`:"",g("motivodavisita")?`*Motivo da abertura da O.S.:* ${g("motivodavisita")}`:"",g("tecnico")?`*Técnico responsável na visita:* ${g("tecnico")}`:"",g("situacao")?`*Situação:* ${g("situacao")}`:"",g("relatocliente2")?`*Relato:* ${g("relatocliente2")}`:"",g("plus2")?`*Informações extras:* ${g("plus2")}`:""]);
}
function gerarA(){const text=generateAtendimento();if(text){$("atendimentoTexto").value=text;$("copiarA").classList.remove("hidden");}}

const atendimentoConfig={
  personalizationA:{fields:[["cliente","Tratado com","text","Quem solicitou o atendimento"],["contatos","Telefone","text","Ex.: 4836600800"],["origem2","Origem do contato","select",[["Whatsapp","WhatsApp"],["Presencial","Presencial"],["Telefônico","Telefônico"],["Redes sociais","Redes sociais"]]],["planos","Plano, roteador, MAC e sinal RX/TX","text","650MB, HUAWEI AX3S, RX -25, TX 2.78"],["relatos","Relato","textarea","Relato do problema"],["alteracoesr","Alterações realizadas","textarea","Ex.: alterada largura de banda, ativado IPv6"],["extrasatendimento","Informações adicionais","textarea","Outras informações"]]},
  mpc:{fields:[["cadastro","Nome do cadastro","text","JOSE DA SILVA"],["celular","Telefone","text","(48) 3660-0800"],["origem","Origem do contato","select",[["Whatsapp","WhatsApp"],["Presencial","Presencial"],["Telefônico","Telefônico"],["Redes sociais","Redes sociais"]]],["motivompc","Motivo(s)","checks",[["Mais de 2 O.S abertas no mês pelo mesmo motivo ou mais.","Mais de 2 O.S. pelo mesmo motivo"],["Reclamação via rede social.","Reclamação via rede social"],["Reclamação/insatisfação durante o atendimento.","Insatisfação durante atendimento"],["Citou cancelamento.","Citou cancelamento"],["Mencionou trocar de provedora.","Mencionou trocar de provedora"],["Cliente questionou a data de término da fidelidade.","Questionou fidelidade"],["4 atendimentos abertos em 1 ano.","4 atendimentos em 1 ano"]]],["infocadastro","Plano, roteador, MAC e sinal RX/TX","text","650MB, HUAWEI AX3S, RX -25, TX 2.78"],["relatocliente","Relato do cliente","textarea","Relato do cliente"],["desfecho","Desfecho","textarea","Alterações feitas, O.S. aberta, cliente testando…"],["plus","Informações adicionais","textarea","Se houver"]]},
  poschamado:{fields:[["cadastro2","Nome do cadastro","text","JOSE DA SILVA"],["celular2","Telefone do cliente","text","(48) 3660-0800"],["origem3","Origem do contato","select",[["Whatsapp","WhatsApp"],["Presencial","Presencial"],["Telefônico","Telefônico"],["Redes sociais","Redes sociais"]]],["dataultimavisita","Data da última visita","date",""],["motivodavisita","Motivo da abertura da O.S.","textarea","Descreva o problema que gerou a visita"],["tecnico","Técnico responsável pela visita","text","Nome do técnico"],["situacao","Situação","select",[["*(X) Recorrente* ( ) Reincidente","Recorrente"],["( ) Recorrente *(X) Reincidente*","Reincidente"]]],["relatocliente2","Relato","textarea","Relato do cliente após a visita"],["plus2","Informações extras","textarea","Se houver"]]}
};
document.addEventListener("DOMContentLoaded",()=>{
  renderDynamicForm("problemaSelect","osFields",osConfig,"os");
  renderDynamicForm("problemaSelect2","atendimentoFields",atendimentoConfig,"at");
  $("copiarTextoo").addEventListener("click",()=>copiarTexto($("textoGerado").value));
  $("copiarA").addEventListener("click",()=>copiarTexto($("atendimentoTexto").value));
  $("limparOS").addEventListener("click",()=>setTimeout(()=>{$("osFields").classList.add("hidden");$("textoGerado").value="";$("copiarTextoo").classList.add("hidden");},0));
  $("limparAtendimento").addEventListener("click",()=>setTimeout(()=>{$("atendimentoFields").classList.add("hidden");$("atendimentoTexto").value="";$("copiarA").classList.add("hidden");},0));
  const saved=localStorage.getItem("temaHelpDesk");
  aplicarTema(saved==="claro");
});
function aplicarTema(claro){
  document.body.classList.toggle("modo-claro",claro);
  const btn=$("botaoTema");
  if(btn) btn.textContent=claro?"🌙 Modo escuro":"☀️ Modo claro";
}
function alternarTema(){
  const claro=!document.body.classList.contains("modo-claro");
  aplicarTema(claro);localStorage.setItem("temaHelpDesk",claro?"claro":"escuro");
}
