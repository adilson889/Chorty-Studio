Documentação Completa: Chorty Language 4.0 (Universal Syntax)

Índice

1. Introdução & Filosofia
2. Estrutura Fundamental
3. Declarações & Configurações
4. Sistema de Dados
5. Sistema de Interface (Telas)
6. Lógica & Funções
7. Eventos & Reatividade
8. Componentes & Reutilização
9. Multi-Target (Transpilação)
10. Tutorial Prático Completo
11. Referência da API

---

1. Introdução & Filosofia

O Que É Chorty?

Chorty é uma linguagem de programação declarativa projetada para desenvolvimento universal. Sua principal característica é a capacidade de ser transpilada para múltiplas plataformas (HTML, Python, Java, C#, etc.) mantendo exatamente a mesma sintaxe, permitindo que desenvolvedores escrevam uma única vez e executem em qualquer lugar.

Princípios de Design

1. Universalidade

Uma sintaxe única para todas as plataformas alvo. Você escreve em Chorty uma vez e gera código para web, desktop, mobile ou console sem alterações significativas.

2. Paradigma Declarativo

Foco em descrever O QUE o programa deve fazer, não COMO fazer. Isso reduz a complexidade e aumenta a produtividade, especialmente para interfaces de usuário.

3. Simplicidade Radical

Sintaxe limpa e intuitiva que pode ser aprendida em minutos, mesmo por iniciantes em programação. A curva de aprendizado é suave e progressiva.

4. Reatividade Nativa

Sistema de dados reativo onde a interface de usuário atualiza automaticamente quando os dados mudam, sem necessidade de manipulação manual do DOM ou atualização de estados.

5. Componentização Inteira

Tudo na linguagem é construído para ser reutilizável, desde pequenos elementos de UI até lógicas complexas de negócio.

Hello World Universal

```chor
app "HelloWorld"
    tela
        texto "Olá, Mundo!"
        botao "Clique-me" ação: saudar
    
    função saudar
        mensagem "Bem-vindo ao Chorty!"
fim
```

Explicação detalhada:

1. app "HelloWorld" - Declara um novo aplicativo com identificador "HelloWorld"
2. tela - Define a interface principal do usuário
3. texto "Olá, Mundo!" - Exibe um texto estático na tela
4. botao "Clique-me" ação: saudar - Cria um botão que chama a função saudar quando clicado
5. função saudar - Define uma função sem parâmetros chamada saudar
6. mensagem - Exibe uma mensagem para o usuário (modal, toast ou console, dependendo da plataforma alvo)

Esta aplicação pode ser transpilada para:

· Uma página web com HTML/JavaScript
· Um aplicativo desktop com Python/Tkinter
· Um aplicativo console em Java
· Um aplicativo móvel básico em C#

---

2. Estrutura Fundamental

Bloco App (Raiz de Todo Programa)

Todo programa Chorty começa obrigatoriamente com um bloco app. Este bloco define o escopo global e serve como contêiner para todos os outros elementos do programa.

```chor
app "NomeDoApp"
    # TODO o conteúdo do aplicativo vai aqui
fim
```

Atributos Opcionais do Bloco App

```chor
app "MeuApp"
    versao: "1.0.0"
    autor: "Seu Nome"
    empresa: "Sua Empresa LTDA"
    saida: ["html", "python", "java"]  # Plataformas alvo para transpilação
    licenca: "MIT"
    descricao: "Aplicativo exemplo da documentação"
fim
```

Atributos disponíveis:

Atributo Tipo Descrição Padrão
versao texto Versão semântica do aplicativo "1.0.0"
autor texto Nome do autor/desenvolvedor ""
empresa texto Empresa/organização responsável ""
saida lista de texto Plataformas para transpilar ["html"]
licenca texto Tipo de licença "MIT"
descricao texto Breve descrição do propósito ""

Hierarquia de Blocos

A estrutura de um programa Chorty segue uma hierarquia bem definida:

```
app (obrigatório)
├── config (opcional)
├── dados (opcional)
├── tela(s) (pelo menos uma)
├── função(ões) (opcional)
└── quando (eventos, opcional)
```

Regras estruturais:

1. Um bloco app deve conter pelo menos um bloco tela
2. Blocos podem ser aninhados, mas mantendo a hierarquia correta
3. A ordem dos blocos dentro do app geralmente é:
   · Primeiro config (se existir)
   · Depois dados (se existir)
   · Depois tela(s)
   · Depois função(ões)
   · Por último quando (eventos)

---

3. Declarações & Configurações

Bloco Config

O bloco config define metadados e configurações globais que afetam o comportamento do aplicativo e o processo de transpilação.

```chor
config
    nome: "Calculadora Avançada"
    versao: "2.1.0"
    autor: "João Silva"
    empresa: "Tech Solutions Inc."
    licenca: "MIT"
    saida: ["html", "python_console", "android"]
    
    opcoes:
        tema: "escuro"
        idioma: "pt-BR"
        debug: verdadeiro
        log_nivel: "info"
        tempo_sessao: 3600
```

Propriedades de Saída (Plataformas Alvo)

A propriedade saida especifica para quais plataformas o código será transpilado:

Valor Descrição Tecnologias Geradas
"html" Single Page Application web HTML, CSS, JavaScript (Vanilla)
"html_react" Aplicação web com React HTML, CSS, JavaScript, React
"html_vue" Aplicação web com Vue.js HTML, CSS, JavaScript, Vue
"python_console" Script de terminal Python Python 3.x
"python_gui" Interface gráfica com Tkinter Python + Tkinter
"python_web" Aplicação web com Flask Python + Flask
"java_console" Aplicação Java de linha de comando Java SE
"java_swing" Interface gráfica Java Swing Java + Swing
"java_spring" Aplicação web Java Spring Java + Spring Boot
"csharp_console" Aplicação console C# C# .NET Core
"csharp_winforms" Windows Forms em C# C# + WinForms
"android" Aplicativo Android básico Java/Kotlin + Android SDK
"ios" Aplicativo iOS básico Swift + UIKit
"electron" Aplicação desktop multiplataforma JavaScript + Electron

Configurações Avançadas por Plataforma

```chor
config
    saida: ["html", "python_gui", "android"]
    
    # Configurações específicas para HTML
    target_html:
        framework: "react"
        bundler: "vite"
        css_framework: "tailwind"
        seo_otimizado: verdadeiro
        pwa: falso
    
    # Configurações específicas para Python
    target_python:
        versao_minima: "3.8"
        usar_type_hints: verdadeiro
        criar_venv: verdadeiro
        requirements: ["requests", "pillow"]
    
    # Configurações específicas para Android
    target_android:
        versao_minima_sdk: 21
        versao_alvo_sdk: 33
        usar_kotlin: verdadeiro
        incluir_firebase: falso
    
    # Configurações gerais de build
    build:
        diretorio_saida: "./dist"
        minificar: verdadeiro
        gerar_documentacao: verdadeiro
        incluir_exemplos: falso
```

Explicação das Configurações por Target:

Para HTML:

· framework: Escolhe o framework JavaScript (react, vue, angular, vanilla)
· bundler: Ferramenta de build (webpack, vite, parcel)
· css_framework: Framework CSS (tailwind, bootstrap, materialize)
· seo_otimizado: Otimizações automáticas para SEO
· pwa: Gera Progressive Web App com service worker

Para Python:

· versao_minima: Versão mínima do Python requerida
· usar_type_hints: Inclui type hints nas funções geradas
· criar_venv: Cria virtual environment automaticamente
· requirements: Lista de dependências do pip

Para Android:

· versao_minima_sdk: API level mínimo do Android
· versao_alvo_sdk: API level alvo
· usar_kotlin: Gera código em Kotlin em vez de Java
· incluir_firebase: Adiciona configuração básica do Firebase

---

4. Sistema de Dados

Tipos de Dados Nativos

Chorty possui um sistema de tipos robusto que mapeia para os tipos nativos de cada plataforma alvo.

```chor
dados
    # Tipos básicos primitivos
    nome: texto = "João da Silva"
    idade: numero = 25
    ativo: logico = verdadeiro
    preco: decimal = 19.99
    data_nascimento: data = "1998-05-15"
    hora_reuniao: hora = "14:30:00"
    timestamp: data_hora = "2024-01-15 14:30:00"
    cor_fundo: cor = "#3b82f6"
    
    # Coleções homogêneas
    emails: lista de texto = ["joao@email.com", "contato@site.com"]
    notas: lista de numero = [8.5, 9.0, 7.5]
    flags: lista de logico = [verdadeiro, falso, verdadeiro]
    
    # Mapas (dicionários/chave-valor)
    configuracoes: mapa de texto para texto = {
        "tema": "escuro",
        "idioma": "pt-BR",
        "fuso_horario": "America/Sao_Paulo"
    }
    
    pontuacoes: mapa de texto para numero = {
        "fase1": 1500,
        "fase2": 2300,
        "fase3": 3100
    }
    
    # Estruturas complexas (objetos tipados)
    usuario: estrutura
        nome: texto = "João"
        email: texto = "joao@email.com"
        idade: numero = 25
        ativo: logico = verdadeiro
        endereco: estrutura
            rua: texto = "Rua das Flores"
            numero: texto = "123"
            cidade: texto = "São Paulo"
            estado: texto = "SP"
            cep: texto = "01234-567"
        telefones: lista de texto = ["(11) 99999-9999", "(11) 88888-8888"]
```

Tabela de Tipos de Dados

Tipo Chorty Descrição Exemplos Equivalente em Outras Linguagens
texto Sequência de caracteres Unicode "Olá Mundo", "123", "" String (Java/Python/JS), string (C#)
numero Número inteiro ou ponto flutuante 42, -15, 3.1415 int/double (Java), int/float (Python), number (JS)
decimal Número decimal de precisão fixa (monetária) 19.99, 100.50, 0.00 BigDecimal (Java), Decimal (Python/C#)
logico Valor booleano (verdadeiro/falso) verdadeiro, falso boolean (Java), bool (Python/C#), boolean (JS)
data Data sem hora (YYYY-MM-DD) "2024-01-15" LocalDate (Java), date (Python), Date (JS/C#)
hora Hora sem data (HH:MM:SS) "14:30:00", "09:15" LocalTime (Java), time (Python), TimeSpan (C#)
data_hora Data e hora combinadas "2024-01-15 14:30:00" LocalDateTime (Java), datetime (Python), DateTime (C#/JS)
cor Cor em formato hexadecimal ou nome "#FF0000", "azul", "rgb(255,0,0)" String (todas), Color objeto em algumas
lista de T Array ordenado e tipado [1, 2, 3], ["a", "b"] List<T> (Java), list (Python), Array (JS/C#)
mapa de K para V Dicionário chave-valor tipado {"nome": "João", "idade": 25} Map<K,V> (Java), dict (Python), Object (JS), Dictionary (C#)
estrutura Objeto com campos nomeados e tipados Definido pelo usuário Class/struct (todas)

Modificadores de Acesso

Chorty oferece três níveis de controle de acesso aos dados:

```chor
dados
    # Público: Acessível de qualquer lugar, inclusive por outros componentes
    publico nome_publico: texto = "Acesso livre"
    
    # Privado: Acessível apenas dentro deste aplicativo/componente
    privado senha: texto = "123456"
    privado token_acesso: texto = "abc123def456"
    
    # Compartilhado: Estado compartilhado entre componentes do mesmo aplicativo
    compartilhado contador_global: numero = 0
    compartilhado usuario_logado: estrutura
        id: numero
        nome: texto
        perfil: texto

# Exemplo de uso com controle de acesso
função processar_login(usuario: texto, senha_digitada: texto): logico
    # Acesso a dados privados
    se senha_digitada = senha
        usuario_logado = {
            id: 1,
            nome: usuario,
            perfil: "admin"
        }
        contador_global = contador_global + 1
        retornar verdadeiro
    senão
        retornar falso
```

Validação de Dados

```chor
dados
    # Com validações inline
    email: texto = "" 
        validar: email contem "@" e email contem "."
    
    idade: numero = 0
        validar: idade >= 0 e idade <= 150
        mensagem_erro: "Idade deve estar entre 0 e 150"
    
    senha: texto = ""
        validar: tamanho(senha) >= 8
        mensagem_erro: "Senha deve ter pelo menos 8 caracteres"
    
    # Validações complexas
    data_inicio: data
        validar: data_inicio >= hoje()
    
    data_fim: data
        validar: data_fim > data_inicio
        mensagem_erro: "Data final deve ser após data inicial"

# Validação customizada
função validar_cpf(cpf: texto): logico
    # Lógica de validação de CPF
    retornar cpf_valido
```

Dados Computados (Derivados)

Dados computados são valores que são automaticamente recalculados quando suas dependências mudam.

```chor
dados
    # Dados base
    preco_base: decimal = 100.00
    desconto_percentual: numero = 10
    taxa_frete: decimal = 15.50
    
    # Dados computados (derivados)
    valor_desconto: computado
        retornar preco_base * (desconto_percentual / 100)
    
    preco_final: computado
        retornar preco_base - valor_desconto + taxa_frete
    
    # Computados com múltiplas dependências
    status_pedido: computado
        se preco_final > 500
            retornar "PREMIUM"
        senão se preco_final > 100
            retornar "STANDARD"
        senão
            retornar "BASIC"
    
    # Computados com formatação
    preco_formatado: computado
        retornar "R$ " & para_texto(preco_final, casas_decimais=2)
```

Ciclo de Vida dos Dados

```chor
dados
    # Com inicialização complexa
    cache_usuario: mapa de texto para estrutura = {}
        inicializar:
            # Carrega do localStorage (HTML) ou arquivo (desktop)
            @html: carregar local_armazenamento "cache_usuario"
            @outros: carregar_arquivo "cache_usuario.json"
    
    # Com limpeza automática
    sessao_temporaria: lista de texto = []
        ao_destruir:
            # Limpa dados sensíveis
            sessao_temporaria.limpar()
            @html: remover local_armazenamento "sessao_temporaria"
    
    # Com persistência
    configuracoes_usuario: mapa de texto para texto
        persistir: verdadeiro
        local_persistencia: "local_armazenamento"  # ou "arquivo", "banco_dados"
```

---

5. Sistema de Interface (Telas)

Bloco Tela Básico

O bloco tela define uma interface de usuário completa ou parcial. Um aplicativo pode ter múltiplas telas.

```chor
tela "Principal"
    titulo "Meu Aplicativo Financeiro"
    subtitulo "Gerencie suas finanças de forma inteligente"
    texto "Bem-vindo ao sistema! Aqui você pode controlar todas suas despesas e receitas."
    
    grupo "Controles Principais"
        botao "Nova Transação" ação: abrir_formulario_transacao
        botao "Relatórios" ação: mostrar_relatorios
        botao "Exportar Dados" ação: exportar_para_excel
    
    grupo "Visão Rápida"
        cartao
            titulo "Saldo Atual"
            texto "R$ 5.247,89"
            icone "dinheiro"
        
        cartao
            titulo "Despesas do Mês"
            texto "R$ 2.150,45"
            icone "grafico"
        
        cartao
            titulo "Receitas do Mês"
            texto "R$ 7.398,34"
            icone "seta_cima"
fim
```

Elementos de Interface Disponíveis

Texto e Exibição de Informação

```chor
# Texto simples (parágrafo)
texto "Este é um parágrafo de texto normal que pode conter múltiplas linhas se necessário. O texto é automaticamente ajustado para caber no contêiner."

# Texto com formatação rica (HTML-like)
texto_rico "Texto com <b>negrito</b>, <i>itálico</i>, <u>sublinhado</u> e <code>código inline</code>. Também suporta <a href='https://exemplo.com'>links</a> e <mark>destaques</mark>."

# Títulos e cabeçalhos (níveis hierárquicos)
titulo "Título Principal (Nível 1)"  # <h1> equivalente
subtitulo "Subtítulo (Nível 2)"      # <h2> equivalente
cabecalho "Cabeçalho de Seção" nivel=3  # <h3> - nivel pode ser 1-6

# Badges e tags para status
badge "Novo" cor="verde"            # Verde para indicar sucesso/novo
badge "Em Andamento" cor="azul"     # Azul para informações
badge "Urgente" cor="vermelho"      # Vermelho para alertas
badge "Aguardando" cor="amarelo"    # Amarelo para avisos
tag "JavaScript" cor="laranja"      # Para categorização

# Indicadores de progresso
barra_progresso valor=75 max=100 rotulo="Completo: 75%"
barra_progresso valor=30 max=100 tipo="circular" largura=100 altura=100

# Status indicators
status ativo cor="verde" texto="Online" icone="check_circle"
status inativo cor="vermelho" texto="Offline" icone="cancel"
status pendente cor="amarelo" texto="Processando" icone="timer"

# Separadores visuais
divisor  # Linha horizontal simples
divisor rotulo="OU"  # Linha com texto centralizado
divisor tipo="espaco" tamanho="20px"  # Espaçamento vertical
```

Entrada de Dados

```chor
# Campos de texto básicos
entrada "Nome Completo" -> usuario.nome
    placeholder: "Digite seu nome completo"
    obrigatorio: verdadeiro
    max_caracteres: 100

entrada "Email" tipo="email" -> usuario.email
    placeholder: "seu@email.com"
    obrigatorio: verdadeiro
    validar: valor contem "@"

entrada "Senha" tipo="senha" -> usuario.senha
    placeholder: "Mínimo 8 caracteres"
    obrigatorio: verdadeiro
    mostrar_forca: verdadeiro

entrada "Telefone" tipo="tel" -> usuario.telefone
    placeholder: "(11) 99999-9999"
    mascara: "(##) #####-####"

# Campos numéricos
numero "Idade" -> usuario.idade
    min: 0
    max: 120
    passo: 1
    sufixo: " anos"

numero_decimal "Preço Unitário" -> produto.preco
    min: 0
    max: 10000
    casas_decimais: 2
    prefixo: "R$ "

intervalo "Nível de Satisfação" -> satisfacao
    min: 0
    max: 10
    passo: 1
    rotulos: ["Mínimo", "Máximo"]

# Campos de seleção
escolha "País" opções=["Brasil", "EUA", "Canadá", "Portugal"] -> usuario.pais
    opcao_vazia: "Selecione um país"
    multiplo: falso

escolha_multipla "Habilidades" opções=["JavaScript", "Python", "Java", "C#", "Go", "Rust"] -> usuario.habilidades
    min_selecoes: 1
    max_selecoes: 3

# Campos de data e hora
data "Data de Nascimento" -> usuario.data_nascimento
    formato: "dd/MM/yyyy"
    min_data: "1900-01-01"
    max_data: hoje()

hora "Horário Preferido" -> usuario.hora_contato
    formato: "HH:mm"
    intervalo: 30  # minutos entre opções

data_hora "Agendamento" -> agendamento.data_hora
    mostrar_data: verdadeiro
    mostrar_hora: verdadeiro
    desabilitar_passado: verdadeiro

# Área de texto multilinha
area_texto "Observações" -> pedido.observacoes
    linhas: 4
    max_caracteres: 500
    placeholder: "Digite observações adicionais..."
    redimensionavel: verdadeiro

# Campos de busca
busca "Pesquisar produtos" -> termo_busca
    tempo_delay: 300  # ms antes de disparar busca
    min_caracteres: 2

# Upload de arquivos
upload "Documento de Identidade" -> documentos.rg
    tipos_aceitos: ["jpg", "png", "pdf"]
    max_tamanho: 5242880  # 5MB
    multiplo: falso

upload_multiplo "Comprovantes" -> documentos.comprovantes
    tipos_aceitos: ["pdf", "jpg", "png"]
    max_tamanho_total: 20971520  # 20MB
    max_arquivos: 10
```

Controles de Ação

```chor
# Botões básicos
botao "Salvar Alterações" ação: salvar_dados
    tipo: "primario"
    icone: "salvar"
    desabilitado: nao dados_modificados

botao "Cancelar" ação: cancelar_edicao
    tipo: "secundario"
    icone: "cancelar"

botao "Excluir Registro" ação: excluir_registro
    tipo: "perigoso"
    icone: "lixeira"
    confirmar: verdadeiro
    mensagem_confirmacao: "Tem certeza que deseja excluir este registro?"

botao "Download Relatório" ação: baixar_relatorio
    icone: "download"
    tamanho: "grande"
    bloco: verdadeiro  # Ocupa largura total

# Botões com estado (toggle)
alternancia "Modo Noturno" -> config.modo_escuro
    icone_ligado: "lua"
    icone_desligado: "sol"

alternancia "Notificações Push" -> config.notificacoes
    descricao: "Receber notificações no dispositivo"

# Botões de ação flutuante
botao_flutuante "Adicionar" icone="mais" ação: adicionar_item
    posicao: "inferior_direita"

# Menus de contexto
menu_acao "Opções do Usuário"
    icone: "menu_vertical"
    
    item "Editar Perfil" icone="editar" ação: editar_perfil
    item "Alterar Senha" icone="senha" ação: alterar_senha
    divisor_menu
    item "Exportar Dados" icone="exportar" ação: exportar_dados
    item "Sair" icone="sair" ação: logout

# Grupo de botões
grupo_botoes
    botao "Anterior" acao: anterior desabilitado: pagina = 1
    texto "Página {pagina} de {total_paginas}"
    botao "Próximo" acao: proximo desabilitado: pagina = total_paginas

# Speed dial (múltiplas ações rápidas)
speed_dial icone="mais"
    item icone="email" acao: novo_email rotulo="Novo Email"
    item icone="calendar" acao: novo_evento rotulo="Novo Evento"
    item icone="task" acao: nova_tarefa rotulo="Nova Tarefa"
```

Layout e Containers

```chor
# Agrupamento lógico com rótulo
grupo "Informações Pessoais"
    borda: verdadeiro
    sombra: "suave"
    
    entrada "Nome" -> usuario.nome
    entrada "Email" -> usuario.email
    entrada "Telefone" -> usuario.telefone

# Cards para conteúdo em destaque
cartao
    titulo "Estatísticas do Mês"
    subtitulo "Visão geral das suas atividades"
    
    conteudo
        grade colunas=3
            cartao_estatistica
                valor: "R$ 5.247,89"
                rotulo: "Saldo Atual"
                icone: "dinheiro"
                tendencia: "positiva"
            
            cartao_estatistica
                valor: "R$ 2.150,45"
                rotulo: "Despesas"
                icone: "seta_baixo"
                tendencia: "negativa"
            
            cartao_estatistica
                valor: "R$ 7.398,34"
                rotulo: "Receitas"
                icone: "seta_cima"
                tendencia: "positiva"
    
    rodape
        texto "Atualizado há 5 minutos"
        botao "Ver Detalhes" acao: ver_detalhes

# Sistema de abas
abas
    aba "Perfil" icone="usuario"
        grupo "Dados Pessoais"
            entrada "Nome" -> usuario.nome
            entrada "Email" -> usuario.email
    
    aba "Segurança" icone="seguranca"
        grupo "Autenticação"
            entrada "Senha Atual" tipo="senha"
            entrada "Nova Senha" tipo="senha"
            entrada "Confirmar Senha" tipo="senha"
    
    aba "Preferências" icone="config"
        grupo "Configurações"
            alternancia "Modo Escuro" -> config.modo_escuro
            alternancia "Notificações" -> config.notificacoes
    
    aba "Privacidade" icone="privacidade"
        texto "Configurações de privacidade e dados..."
        botao "Exportar Meus Dados" acao: exportar_dados
        botao "Excluir Minha Conta" acao: excluir_conta tipo="perigoso"

# Accordion (acordeão) para conteúdo expansível
acordeao
    item "Configurações Gerais" expandido=verdadeiro
        entrada "Nome da Empresa" -> empresa.nome
        entrada "CNPJ" -> empresa.cnpj
        escolha "Setor" opcoes=["Tecnologia", "Comércio", "Serviços"] -> empresa.setor
    
    item "Configurações de Sistema"
        alternancia "Manutenção" -> sistema.manutencao
        alternancia "Backup Automático" -> sistema.backup_auto
        numero "Intervalo Backup (horas)" -> sistema.intervalo_backup
    
    item "Configurações Avançadas"
        entrada "API Key" tipo="senha" -> sistema.api_key
        entrada "Webhook URL" -> sistema.webhook_url

# Modal (diálogo/popup)
modal "Configurações do Sistema" id=modal_config
    tamanho: "medio"  # pequeno, medio, grande, tela_cheia
    
    cabecalho
        titulo "Configurações"
        botao_fechar acao: fechar_modal
    
    conteudo
        abas
            aba "Geral"
                grupo "Aparência"
                    escolha "Tema" opcoes=["Claro", "Escuro", "Automático"] -> config.tema
                    escolha "Densidade" opcoes=["Confortável", "Compacto"] -> config.densidade
            
            aba "Notificações"
                grupo "Tipos de Notificação"
                    alternancia "Email" -> notificacoes.email
                    alternancia "Push" -> notificacoes.push
                    alternancia "SMS" -> notificacoes.sms
    
    rodape
        botao "Cancelar" acao: fechar_modal tipo="secundario"
        botao "Salvar" acao: salvar_config tipo="primario"

# Sidebar (menu lateral)
sidebar aberto=menu_aberto
    cabecalho
        titulo "Menu"
        botao_fechar acao: fechar_menu
    
    conteudo
        menu_lateral
            item "Dashboard" icone="dashboard" acao: ir_dashboard ativo=tela_atual = "dashboard"
            item "Usuários" icone="usuarios" acao: ir_usuarios ativo=tela_atual = "usuarios"
            item "Relatórios" icone="relatorios" acao: ir_relatorios ativo=tela_atual = "relatorios"
            divisor
            item "Configurações" icone="config" acao: ir_config ativo=tela_atual = "config"
            item "Ajuda" icone="ajuda" acao: ir_ajuda ativo=tela_atual = "ajuda"
    
    rodape
        texto "Versão 1.2.3"
        botao "Sair" acao: logout icone="sair"

# Grid system para layout responsivo
grade colunas=12 espacamento="16px"
    coluna largura=3  # 25%
        cartao
            titulo "Menu Lateral"
            menu_vertical
                item "Início"
                item "Perfil"
                item "Configurações"
    
    coluna largura=6  # 50%
        cartao
            titulo "Conteúdo Principal"
            texto "Conteúdo principal da aplicação..."
    
    coluna largura=3  # 25%
        cartao
            titulo "Sidebar"
            texto "Informações adicionais..."
```

Tabelas e Listas

```chor
# Tabela de dados
tabela dados=lista_usuarios pagina_atual=pagina itens_por_pagina=10
    cabecalho
        coluna "ID" campo="id" ordenavel=verdadeiro largura="80px"
        coluna "Nome" campo="nome" ordenavel=verdadeiro
        coluna "Email" campo="email" ordenavel=verdadeiro
        coluna "Status" campo="ativo"
            formatar: se valor então "Ativo" senão "Inativo"
        coluna "Data Cadastro" campo="data_cadastro" 
            formatar: valor.formatar("dd/MM/yyyy")
        coluna "Ações" largura="150px"
            botao "Editar" tamanho="pequeno" acao: editar_usuario
            botao "Excluir" tamanho="pequeno" tipo="perigoso" acao: excluir_usuario
    
    rodape
        paginacao 
            total_itens: lista_usuarios.tamanho
            itens_por_pagina: 10
            pagina_atual: pagina
            ao_mudar_pagina: pagina = valor
    
    vazio
        texto "Nenhum usuário encontrado."
        botao "Adicionar Usuário" acao: adicionar_usuario

# Tabela com expansão de linhas
tabela_expansivel dados=pedidos
    coluna "ID" campo="id"
    coluna "Cliente" campo="cliente.nome"
    coluna "Valor" campo="valor_total"
        formatar: "R$ " & para_texto(valor, casas_decimais=2)
    coluna "Status" campo="status"
    
    detalhes  # Conteúdo expandido
        titulo "Itens do Pedido"
        tabela dados=linha.itens
            coluna "Produto" campo="produto.nome"
            coluna "Quantidade" campo="quantidade"
            coluna "Preço Unitário" campo="preco_unitario"
            coluna "Subtotal" campo="subtotal"

# Lista de itens
lista itens=produtos tipo="grade" colunas=3
    template
        cartao
            imagem src=item.imagem_url largura=200 altura=150
            titulo item.nome
            texto item.descricao_curta
            texto "R$ {item.preco}"
            botao "Comprar" acao: adicionar_carrinho(item)
            botao "Detalhes" acao: ver_detalhes(item)
    
    vazio
        cartao
            titulo "Nenhum produto encontrado"
            texto "Tente ajustar os filtros de busca."
            botao "Ver Todos" acao: limpar_filtros

# Lista vertical
lista_vertical itens=notificacoes
    template
        cartao
            cabecalho
                texto_rico "<b>{item.titulo}</b>"
                badge item.tipo
            texto item.mensagem
            rodape
                texto item.data.formatar("dd/MM/yyyy HH:mm")
                botao "Marcar como Lida" acao: marcar_lida(item)

# Timeline (linha do tempo)
timeline itens=atividades
    template
        item_timeline
            icone: item.icone
            cor: item.cor
            titulo: item.titulo
            subtitulo: item.data.formatar("dd/MM/yyyy HH:mm")
            conteudo: item.descricao
```

Mídia

```chor
# Imagens
imagem src="logo.png" 
    largura: 200
    altura: 100
    alt: "Logo da Empresa"
    legenda: "Nosso logotipo oficial"
    carregamento="preguiçoso"  # ou "eager"
    fallback: "imagem_placeholder.png"

# Galeria de imagens
galeria imagens=produto.fotos
    colunas: 3
    espacamento: "10px"
    mostrar_ampliar: verdadeiro
    mostrar_miniaturas: verdadeiro
    navegacao: verdadeiro

# Vídeo
video src="apresentacao.mp4"
    largura: 640
    altura: 360
    controles: verdadeiro
    autoplay: falso
    loop: falso
    poster: "thumbnail.jpg"
    legendas: 
        src: "legendas.vtt"
        idioma: "pt-BR"

# Áudio
audio src="musica.mp3"
    controles: verdadeiro
    autoplay: falso
    loop: falso
    volume: 0.7
    mostrar_titulo: verdadeiro

# Mapa
mapa
    centro: [-23.5505, -46.6333]  # São Paulo
    zoom: 12
    marcadores: 
        - posicao: [-23.5505, -46.6333]
          titulo: "Escritório Principal"
          descricao: "Nossa sede"
        - posicao: [-23.5614, -46.6564]
          titulo: "Filial"
          descricao: "Filial Centro"
    tipo: "roadmap"  # roadmap, satellite, hybrid, terrain
    interativo: verdadeiro

# Gráficos
grafico tipo="linha" dados=dados_vendas
    titulo: "Vendas Mensais"
    largura: 600
    altura: 400
    eixo_x: meses
    eixo_y: valores
    legenda: verdadeiro
    tooltip: verdadeiro

grafico tipo="pizza" dados=distribuicao
    titulo: "Distribuição por Categoria"
    largura: 400
    altura: 400
    mostrar_valores: verdadeiro
    mostrar_porcentagens: verdadeiro

# Documentos
visualizador_documento src="relatorio.pdf"
    largura: "100%"
    altura: "600px"
    tipo: "pdf"
    mostrar_controles: verdadeiro
    permitir_download: verdadeiro
```

Layout Responsivo

```chor
tela "Dashboard Responsivo"
    # Mobile-first: estilos para telas pequenas primeiro
    em celular  # <= 768px
        coluna espacamento="16px"
            cabecalho_mobile
                botao_menu acao: alternar_menu
                titulo "Meu App"
                botao_notificacoes contador=5 acao: ver_notificacoes
            
            conteudo
                cartao
                    titulo "Resumo"
                    texto "Conteúdo otimizado para mobile..."
                
                lista itens=itens_recentes
                    template
                        cartao
                            titulo item.titulo
                            texto item.descricao
            
            rodape_mobile
                menu_inferior
                    item icone="home" rotulo="Início" ativo=tela="home"
                    item icone="busca" rotulo="Buscar" ativo=tela="busca"
                    item icone="carrinho" rotulo="Carrinho" contador=3 ativo=tela="carrinho"
                    item icone="perfil" rotulo="Perfil" ativo=tela="perfil"
    
    em tablet  # 768px - 1024px
        grade colunas=2 espacamento="20px"
            coluna largura=1
                sidebar
                    titulo "Menu"
                    menu_vertical
                        item "Dashboard"
                        item "Relatórios"
                        item "Configurações"
            
            coluna largum=1
                conteudo
                    grade colunas=2
                        cartao "Estatísticas 1"
                        cartao "Estatísticas 2"
                        cartao "Estatísticas 3"
                        cartao "Estatísticas 4"
    
    em desktop  # > 1024px
        grade colunas=4 espacamento="24px"
            coluna largura=1
                sidebar_largo
                    cabecalho
                        titulo "Sistema"
                        subtitulo "v1.0.0"
                    
                    menu_vertical
                        grupo "Principal"
                            item "Dashboard" icone="dashboard"
                            item "Analytics" icone="analytics"
                            item "Relatórios" icone="relatorios"
                        
                        grupo "Gestão"
                            item "Usuários" icone="usuarios"
                            item "Produtos" icone="produtos"
                            item "Pedidos" icone="pedidos"
            
            coluna largura=2
                conteudo_principal
                    titulo "Dashboard Principal"
                    
                    grade colunas=3
                        cartao_estatistica
                        cartao_estatistica
                        cartao_estatistica
                    
                    cartao
                        titulo "Gráfico Principal"
                        grafico tipo="linha" dados=dados_principais
            
            coluna largura=1
                sidebar_direito
                    cartao
                        titulo "Atividades Recentes"
                        lista_vertical itens=atividades
                    
                    cartao
                        titulo "Notificações"
                        lista_vertical itens=notificacoes

# Container responsivo
container responsivo
    # Breakpoints customizados
    @max_largura 600
        grade colunas=1
    
    @min_largura 601 e max_largura 900
        grade colunas=2
    
    @min_largura 901
        grade colunas=4

# Elementos responsivos
imagem_responsiva src="banner.jpg"
    # Diferentes imagens para diferentes tamanhos de tela
    srcset:
        celular: "banner-mobile.jpg"
        tablet: "banner-tablet.jpg"
        desktop: "banner-desktop.jpg"
    
    # Tamanhos responsivos
    tamanhos:
        celular: "100vw"
        tablet: "80vw"
        desktop: "1200px"
    
    estilo: "max-width: 100%; height: auto;"

# Mostrar/ocultar elementos por tamanho de tela
em celular
    mostrar menu_mobile
    ocultar menu_desktop

em tablet
    mostrar menu_tablet
    ocultar menu_mobile menu_desktop

em desktop
    mostrar menu_desktop
    ocultar menu_mobile menu_tablet
```

Temas e Estilização

```chor
# Definição de tema completo
tema "MeuTemaCorporativo"
    # Cores da marca
    cores
        primaria: "#3b82f6"
        primaria_escura: "#1d4ed8"
        primaria_clara: "#93c5fd"
        
        secundaria: "#10b981"
        secundaria_escura: "#047857"
        secundaria_clara: "#a7f3d0"
        
        neutras:
            fundo: "#f8fafc"
            superficie: "#ffffff"
            borda: "#e2e8f0"
            texto_primario: "#1e293b"
            texto_secundario: "#64748b"
            texto_terciario: "#94a3b8"
        
        semantica:
            sucesso: "#10b981"
            erro: "#ef4444"
            aviso: "#f59e0b"
            info: "#3b82f6"
    
    # Tipografia
    tipografia
        familia_base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        familia_mono: "'JetBrains Mono', 'Courier New', monospace"
        
        tamanhos:
            xs: "0.75rem"    # 12px
            sm: "0.875rem"   # 14px
            base: "1rem"     # 16px
            lg: "1.125rem"   # 18px
            xl: "1.25rem"    # 20px
            "2xl": "1.5rem"  # 24px
            "3xl": "1.875rem" # 30px
            "4xl": "2.25rem"  # 36px
            "5xl": "3rem"     # 48px
        
        pesos:
            normal: 400
            medio: 500
            semibold: 600
            bold: 700
        
        alturas_linha:
            tight: 1.25
            normal: 1.5
            relaxed: 1.75
    
    # Espaçamento (escala 8px)
    espacamento
        px: "1px"
        0.5: "0.125rem"   # 2px
        1: "0.25rem"      # 4px
        2: "0.5rem"       # 8px
        3: "0.75rem"      # 12px
        4: "1rem"         # 16px
        5: "1.25rem"      # 20px
        6: "1.5rem"       # 24px
        8: "2rem"         # 32px
        10: "2.5rem"      # 40px
        12: "3rem"        # 48px
        16: "4rem"        # 64px
        20: "5rem"        # 80px
        24: "6rem"        # 96px
        32: "8rem"        # 128px
        40: "10rem"       # 160px
        48: "12rem"       # 192px
        56: "14rem"       # 224px
        64: "16rem"       # 256px
    
    # Cantos arredondados
    bordas
        raio:
            nenhum: "0"
            sm: "0.125rem"   # 2px
            default: "0.25rem" # 4px
            md: "0.375rem"   # 6px
            lg: "0.5rem"     # 8px
            xl: "0.75rem"    # 12px
            "2xl": "1rem"    # 16px
            "3xl": "1.5rem"  # 24px
            full: "9999px"
        
        largura:
            default: "1px"
            0: "0"
            2: "2px"
            4: "4px"
            8: "8px"
    
    # Sombras
    sombras
        nenhuma: "none"
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
        default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
    
    # Estilos de componentes
    componentes
        botao:
            raio_borda: "{bordas.raio.default}"
            espacamento_horizontal: "{espacamento.4}"
            espacamento_vertical: "{espacamento.2}"
            fonte_tamanho: "{tipografia.tamanhos.base}"
            fonte_peso: "{tipografia.pesos.medio}"
            transicao: "all 0.2s ease"
        
        cartao:
            raio_borda: "{bordas.raio.lg}"
            padding: "{espacamento.6}"
            cor_fundo: "{cores.neutras.superficie}"
            sombra: "{sombras.md}"
            border: "1px solid {cores.neutras.borda}"
        
        entrada:
            raio_borda: "{bordas.raio.default}"
            padding: "{espacamento.2} {espacamento.3}"
            border: "1px solid {cores.neutras.borda}"
            cor_fundo: "{cores.neutras.superficie}"
            foco_border: "2px solid {cores.primaria}"
        
        tabela:
            cabecalho_cor_fundo: "{cores.neutras.fundo}"
            cabecalho_cor_texto: "{cores.neutras.texto_secundario}"
            linha_alternada: "{cores.neutras.fundo}"
            border: "1px solid {cores.neutras.borda}"
            celula_padding: "{espacamento.3} {espacamento.4}"
    
    # Animações
    animacoes
        duracao:
            rapida: "150ms"
            normal: "300ms"
            lenta: "500ms"
        
        timing:
            default: "ease"
            linear: "linear"
            in: "ease-in"
            out: "ease-out"
            in_out: "ease-in-out"
        
        keyframes:
            fade_in:
                0%: "opacity: 0"
                100%: "opacity: 1"
            
            slide_in_right:
                0%: "transform: translateX(100%)"
                100%: "transform: translateX(0)"
            
            spin:
                0%: "transform: rotate(0deg)"
                100%: "transform: rotate(360deg)"
            
            pulse:
                "0%, 100%": "opacity: 1"
                "50%": "opacity: 0.5"
fim

# Aplicar tema
usar_tema "MeuTemaCorporativo"

# Sobrescrever configurações específicas
usar_tema "MeuTemaCorporativo" com
    cores.primaria: "#8b5cf6"  # Sobrescreve apenas a cor primária
    componentes.botao.raio_borda: "9999px"  # Botões totalmente arredondados

# Tema escuro/claro
tema "ModoEscuro" extends "MeuTemaCorporativo"
    cores
        fundo: "#0f172a"
        superficie: "#1e293b"
        borda: "#334155"
        texto_primario: "#f1f5f9"
        texto_secundario: "#cbd5e1"
    
    componentes.cartao.sombra: "{sombras.lg}"
fim

# Alternar temas
quando botao_tema.clique
    se tema_atual = "claro"
        usar_tema "ModoEscuro"
        tema_atual = "escuro"
    senão
        usar_tema "MeuTemaCorporativo"
        tema_atual = "claro"

# Estilos inline e customizados
cartao
    estilo: """
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
    """
    
    estilo_hover: """
        transform: translateY(-2px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    """
    
    estilo_mobile: """
        margin: 16px;
        border-radius: 16px;
    """

# Classes CSS customizadas
classe "texto-destaque"
    estilo: """
        font-weight: bold;
        color: var(--cor-primaria);
        font-size: 1.125rem;
    """

# Usar classe
texto classe="texto-destaque" "Texto importante destacado"

# Variáveis CSS customizadas
variaveis_css
    --gradiente-primario: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    --sombra-elevada: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    --raio-grande: "20px"

# Media queries customizadas
@media "prefers-color-scheme: dark"
    usar_tema "ModoEscuro"

@media "prefers-reduced-motion: reduce"
    animacoes.duracao.rapida: "0ms"
    animacoes.duracao.normal: "0ms"
    animacoes.duracao.lenta: "0ms"

@media "max-width: 768px"
    componentes.cartao.padding: "{espacamento.4}"
    componentes.botao.fonte_tamanho: "{tipografia.tamanhos.sm}"
```

---
