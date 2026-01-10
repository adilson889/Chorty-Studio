# Chorty V 4.0- uma nova sintaxe

## testes V1.0: https://adilson889.github.io/Chorty-Studio/

## Nova Versão:
chorty7-2.netlify.app

------------------------------------
## Índice

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

------------------------------------

## 1. INTRODUÇÃO & FILOSOFIA

# O Que É Chorty?

Chorty é uma pseudo linguagem de programação visual/declarativa projetada para ser transpilada para múltiplas plataformas (HTML, Python, Java, C#, etc.) mantendo a mesma sintaxe.

## Princípios de Design

1. Universalidade: Uma sintaxe, múltiplas plataformas
2. Declarativo: Descreva O QUE, não COMO
3. Simplicidade Radical: Aprendizado em minutos
4. Reatividade Nativa: Dados atualizam UI automaticamente
5. Componentização: Tudo é reutilizável

## Hello World Universal

```chor
app "HelloWorld"
    tela
        texto "Olá, Mundo!"
        botao "Clique-me" ação: saudar
    
    função saudar
        mensagem "Bem-vindo ao Chorty!"
fim
```

------------------------------------

## 2. ESTRUTURA FUNDAMENTAL

Bloco app (Raiz)

Todo programa Chorty começa com um bloco app.

```chor
app "NomeDoApp"
    # TODO o conteúdo vai aqui
fim
```

## Atributos opcionais:

```chor
app "MeuApp"
    versao: "1.0.0"
    autor: "Seu Nome"
    saida: ["html", "python", "java"]  # Targets de transpilação
    # ... conteúdo
fim
```

## Hierarquia de Blocos

```
app
├── config
├── dados
├── tela(s)
├── função(ões)
└── quando (eventos)
```

---

## 3. DECLARAÇÕES & CONFIGURAÇÕES

# Bloco config

Define metadados e configurações globais.

```chor
config
    nome: "Calculadora Avançada"
    versao: "2.1.0"
    autor: "João Silva"
    empresa: "Tech Solutions"
    licenca: "MIT"
    saida: ["html", "python_console", "android"]
    opcoes:
        tema: "escuro"
        idioma: "pt-BR"
        debug: verdadeiro
```

# Propriedades especiais de saida:

· "html": Gera Single Page Application
· "python_console": Script de terminal Python
· "python_gui": Interface Tkinter
· "java_console": Aplicação Java CLI
· "java_swing": Interface gráfica Java
· "csharp_winforms": Windows Forms em C#
· "android": App Android básico

---

## 4. SISTEMA DE DADOS

#Tipos de Dados Nativos

```chor
dados
    # Tipos básicos
    nome: texto = "João"
    idade: numero = 25
    ativo: logico = verdadeiro
    preco: decimal = 19.99
    
    # Coleções
    emails: lista de texto = ["joao@email.com", "contato@site.com"]
    configs: mapa de texto para texto = {"tema": "escuro", "idioma": "pt"}
    
    # Estruturas complexas
    usuario: estrutura
        nome: texto
        email: texto
        idade: numero
        endereco: estrutura
            rua: texto
            cidade: texto
```

# Sistema de Tipos

Tipo Chorty Descrição Exemplo
texto Strings Unicode "Olá", "123"
numero Inteiros e floats 42, 3.14
decimal Precisão monetária 19.99, 100.50
logico Booleanos verdadeiro, falso
data Datas/tempo 2024-12-01, 14:30
cor Cores (hex/rgb) "#FF0000", "azul"
lista de T Arrays tipados [1, 2, 3]
mapa de K para V Dicionários {"chave": "valor"}

# Modificadores de Acesso

```chor
dados
    publico nome: texto = "João"       # Acessível em qualquer lugar
    privado senha: texto = "123"       # Apenas neste app
    compartilhado contador: numero = 0 # Entre componentes
```

---

# 5. SISTEMA DE INTERFACE (TELAS)

Bloco tela Básico

```chor
tela "Principal"
    titulo "Meu Aplicativo"
    subtitulo "Versão 1.0"
    texto "Bem-vindo ao sistema!"
    
    grupo "Controles"
        botao "Salvar" ação: salvar_dados
        botao "Cancelar" ação: cancelar
fim
```

# Elementos de UI Disponíveis

Texto e Exibição

```chor
# Texto simples
texto "Este é um parágrafo normal."

# Texto formatado
texto_rico "Texto com <b>negrito</b> e <i>itálico</i>"

# Títulos
titulo "Título Principal (h1)"
subtitulo "Subtítulo (h2)"
cabecalho "Cabeçalho de seção"

# Badges e tags
badge "Novo" cor="verde"
tag "Urgente" cor="vermelho"

# Progresso e status
barra_progresso valor=75 max=100
status ativo cor="verde" texto="Online"
```

# Entrada de Dados

```chor
# Campos de texto
entrada "Seu nome" -> variavel_nome
entrada "Email" tipo=email -> email
entrada "Senha" tipo=senha -> senha

# Campos numéricos
numero "Idade" min=0 max=120 -> idade
numero_decimal "Preço" casas=2 -> preco
intervalo "Nível" min=0 max=100 -> nivel

# Seleção
escolha "País" opções=["BR", "US", "ES"] -> pais
escolha_multipla "Hobbies" opções=["Leitura", "Esporte", "Música"] -> hobbies

# Datas e tempo
data "Data de Nascimento" -> data_nascimento
hora "Horário" -> horario_agenda
data_hora "Agendamento" -> agendamento

# Área de texto grande
area_texto "Comentários" linhas=5 -> comentarios
```

# Controles de Ação

```chor
# Botões
botao "Salvar" ação: salvar
botao "Cancelar" tipo="secundario" ação: cancelar
botao "Excluir" tipo="perigoso" ação: excluir
botao "Enviar" icone="enviar" ação: enviar

# Botões com estado
alternancia "Modo Escuro" -> modo_escuro
alternancia "Notificações" -> notificacoes_ativas

# Upload
upload "Arquivo" tipos=["jpg", "png", "pdf"] -> arquivo_selecionado
upload_multiplo "Documentos" -> documentos

# Ações contextuais
menu_acao "Opções"
    item "Editar" ação: editar
    item "Copiar" ação: copiar
    item "Excluir" ação: excluir
```

# Layout e Containers

```chor
# Agrupamento lógico
grupo "Informações Pessoais"
    entrada "Nome" -> nome
    entrada "Email" -> email

# Cards
cartao
    titulo "Card Title"
    texto "Card content"
    botao "Action"

# Abas
abas
    aba "Perfil"
        entrada "Nome" -> nome
    aba "Configurações"
        alternancia "Notificações" -> notificacoes
    aba "Privacidade"
        texto "Configurações de privacidade..."

# Accordion
acordeao
    item "Seção 1"
        texto "Conteúdo da seção 1"
    item "Seção 2"
        texto "Conteúdo da seção 2"

# Modal
modal "Configurações" id=modal_config
    titulo "Configurações do Sistema"
    # ... conteúdo
    rodape
        botao "Salvar" ação: salvar_config
        botao "Cancelar" ação: fechar_modal
```

# Tabelas e Listas

```chor
# Tabela simples
tabela dados=usuarios
    coluna "Nome" campo="nome"
    coluna "Email" campo="email"
    coluna "Ações"
        botao "Editar" ação: editar_usuario
        botao "Excluir" ação: excluir_usuario

# Lista
lista itens=produtos
    template
        titulo "{nome}"
        texto "Preço: R$ {preco}"
        botao "Comprar" ação: comprar

# Grade responsiva
grade colunas=3
    para cada produto em produtos
        cartao
            imagem produto.imagem
            titulo produto.nome
            texto "R$ {produto.preco}"
```

# Mídia

```chor
imagem "logo.png" largura=200 altura=100
video "apresentacao.mp4" controles
audio "musica.mp3" autoplay
galeria imagens=["foto1.jpg", "foto2.jpg", "foto3.jpg"]
```

# Layout Responsivo

```chor
tela "Responsiva"
    # Mobile-first
    em celular  # < 768px
        coluna
            titulo "App"
            menu_vertical
                item "Início"
                item "Perfil"
    
    em tablet  # 768px - 1024px
        grade colunas=2
            secao "Conteúdo"
            secao "Sidebar"
    
    em desktop  # > 1024px
        grade colunas=4
            secao "Menu"
            secao "Conteúdo"
            secao "Sidebar"
            secao "Widgets"
```

# Temas e Estilização

```chor
tema "MeuTema"
    cores
        primaria: "#3b82f6"
        secundaria: "#10b981"
        fundo: "#f8fafc"
        texto: "#1e293b"
    
    tipografia
        familia: "Inter, sans-serif"
        tamanho_base: "16px"
    
    espacamento
        pequeno: "8px"
        medio: "16px"
        grande: "24px"
    
    componentes
        botao.raio_borda: "8px"
        cartao.sombra: "0 4px 6px rgba(0,0,0,0.1)"
fim

# Aplicar tema
usar_tema "MeuTema"
```

---

##  6. LÓGICA & FUNÇÕES

Declaração de Funções

```chor
função nome_da_funcao
    # Corpo da função
    retornar valor
fim

# Com parâmetros
função calcular_soma(a: numero, b: numero)
    retornar a + b
fim

# Com retorno tipado
função obter_nome(): texto
    retornar "João"
fim
```

# Estruturas de Controle

Condicionais

```chor
# If simples
se idade >= 18
    texto "Maior de idade"

# If-else
se pontuacao >= 90
    nota = "A"
senão se pontuacao >= 80
    nota = "B"
senão
    nota = "C"

# Switch/Case
escolha opcao
    caso "salvar"
        salvar_dados()
    caso "excluir"
        excluir_dados()
    padrão
        mensagem "Opção inválida"
```

# Loops

```chor
# Loop for tradicional
para i = 1 até 10 passo 1
    imprimir i

# For-each
para cada usuario em usuarios
    imprimir usuario.nome

# While
enquanto contador < 100
    contador = contador + 1

# Do-while
fazer
    entrada = ler_entrada()
enquanto entrada ≠ "sair"
```

# Operadores

```chor
# Aritméticos
soma = a + b
subtracao = a - b
multiplicacao = a * b
divisao = a / b
modulo = a % b
potencia = a ^ b

# Comparação
igual = a = b          # NOTA: Um único = para igualdade
diferente = a ≠ b
maior = a > b
menor = a < b
maior_igual = a ≥ b
menor_igual = a ≤ b

# Lógicos
e = condicao1 e condicao2
ou = condicao1 ou condicao2
nao = nao condicao

# Strings
concatenacao = "Olá" & " " & "Mundo"
contem = "texto" contem "ex"
tamanho = tamanho("texto")
```

# Manipulação de Dados

```chor
# Listas
lista = [1, 2, 3]
lista.adicionar(4)
lista.remover(2)
lista.ordenar()
tamanho = lista.tamanho()
existe = lista.contem(3)

# Mapas
mapa = {"nome": "João", "idade": 25}
valor = mapa.obter("nome")
mapa.definir("cidade", "SP")
mapa.remover("idade")

# Strings
texto = "Olá Mundo"
maiusculo = texto.maiusculas()
minusculo = texto.minusculas()
partes = texto.dividir(" ")
substring = texto.fatiar(0, 3)
```

# Tratamento de Erros

```chor
tentar
    arquivo = abrir_arquivo("dados.txt")
    conteudo = arquivo.ler()
pegar erro as e
    mensagem "Erro: " & e.mensagem
finalmente
    # Sempre executa
    mensagem "Operação concluída"
```

---

# 7. EVENTOS & REATIVIDADE

# Eventos Nativos

```chor
# Eventos de UI
quando botao_salvar.clique
    salvar_dados()

quando campo_nome.mudar
    validar_nome()

quando formulario.enviar
    processar_formulario()

# Eventos de ciclo de vida
quando app.iniciar
    carregar_dados()

quando app.parar
    salvar_estado()

quando tela.carregar
    animar_entrada()

# Eventos personalizados
emitir "dados_salvos"
quando evento "dados_salvos"
    mensagem "Dados salvos com sucesso!"
```

# Data Binding (Ligação de Dados)

```chor
# One-way (UI → Dados)
entrada "Nome" -> usuario.nome

# One-way (Dados → UI)
texto "Olá, {usuario.nome}!"

# Two-way (Bidirecional)
entrada "Email" <-> usuario.email

# Computed properties
dados
    nome: texto = "João"
    sobrenome: texto = "Silva"
    nome_completo: computado
        retornar nome & " " & # sobrenome

# Usando
texto "Nome: {nome_completo}"  # Atualiza automaticamente
```

# Reatividade Automática

```chor
dados
    contador: numero = 0
    dobro: computado
        retornar contador * 2

# Quando contador muda, dobro atualiza automaticamente
quando contador mudar
    imprimir "Novo dobro: {dobro}"
```

---

## 8. COMPONENTES & REUTILIZAÇÃO

# Criando Componentes

```chor
componente BotaoPersonalizado
    parametros
        texto: texto
        cor: texto = "azul"
        tamanho: texto = "medio"
    
    eventos
        ao_clicar
    
    dados locais
        pressionado: logico = falso
    
    interface
        botao 
            estilo: "botao-{cor} {tamanho}"
            texto: texto
            classe: "pressionado" se pressionado
            clique: ao_clicar
    
    comportamento
        quando botao.clique_descer
            pressionado = verdadeiro
        
        quando botao.clique_subir
            pressionado = falso
fim
```

# Usando Componentes

```chor
# Com parâmetros posicionais
usar BotaoPersonalizado("Salvar")

# Com parâmetros nomeados
usar BotaoPersonalizado(
    texto: "Excluir",
    cor: "vermelho",
    tamanho: "pequeno"
)

# Com event handlers
usar BotaoPersonalizado("Enviar") ao_clicar: enviar_dados
```

# Slots e Conteúdo Dinâmico

```chor
componente Card
    parametros titulo
    
    interface
        div.classe="card"
            h3 titulo
            slot  # Conteúdo injetado aqui
            div.rodape
                slot nome="rodape"
fim

# Usando slots
usar Card(titulo: "Produto")
    texto "Descrição do produto..."
    
    slot nome="rodape"
        botao "Comprar"
        botao "Detalhes"
```

---

## 9. MULTI-TARGET (TRANSPILAÇÃO)

# Configurando Multi-Target

```chor
config
    saida: ["html", "python_console", "java_swing"]
    
    # Configurações específicas por target
    target_html
        framework: "react"  # ou "vue", "angular", "vanilla"
        estilo: "tailwind"  # ou "bootstrap", "customizar"
    
    target_python
        tipo: "console"     # ou "gui_tkinter", "web_flask"
    
    target_java
        versao: "11"
        build: "maven"      # ou "gradle"
fim
```

# Diretivas de Transpilação

```chor
# Incluir apenas em certos targets
@html @python
função funcao_web_desktop
    # Só compila para HTML e Python

@android @ios
função funcao_mobile
    # Só para mobile

@todos_exceto(c)
função funcao_sem_c
    # Todos exceto C

# Código condicional por target
se target = "html"
    usar BibliotecaWeb()
senão se target = "python"
    usar BibliotecaPython()
```

# APIs Específicas por Plataforma

```chor
# Sistema de arquivos (diferente por target)
@html
    # No browser: File API
    arquivo = entrada_arquivo.arquivos[0]
    
@python @java @csharp
    # No desktop: File System
    arquivo = sistema_arquivos.ler("caminho/arquivo.txt")

# Banco de dados
@html
    banco_dados = indexeddb.abrir("meu_db")
    
@outros
    banco_dados = sqlite.conectar("dados.db")
```

---

## 10. TUTORIAL PRÁTICO COMPLETO

# PROJETO 1: Calculadora Universal

```chor
app "CalculadoraUniversal"
    
    config
        nome: "Calculadora Multiplataforma"
        saida: ["html", "python_console", "java_swing"]
        versao: "1.0"
    
    dados
        valor_a: numero = 0
        valor_b: numero = 0
        operacao: texto = "+"
        resultado: computado
            escolha operacao
                caso "+": retornar valor_a + valor_b
                caso "-": retornar valor_a - valor_b
                caso "*": retornar valor_a * valor_b
                caso "/": 
                    se valor_b ≠ 0
                        retornar valor_a / valor_b
                    senão
                        retornar 0
    
    # INTERFACE WEB
    tela web
        grupo "Calculadora"
            titulo "Calculadora Web"
            
            grade colunas=2
                numero "Valor A" -> valor_a
                numero "Valor B" -> valor_b
            
            grupo "Operações"
                grade colunas=4
                    botao "+" ação: operacao = "+"
                    botao "-" ação: operacao = "-"
                    botao "×" ação: operacao = "*"
                    botao "÷" ação: operacao = "/"
            
            grupo "Resultado"
                cartao
                    titulo "Resultado"
                    texto "{valor_a} {operacao} {valor_b} = {resultado}"
                    texto "Última operação: {operacao}"
    
    # INTERFACE CONSOLE (Python/Java)
    tela console
        instrução "=== CALCULADORA ==="
        
        fazer
            escrever "Digite o primeiro número: "
            ler -> valor_a
            
            escrever "Digite o segundo número: "
            ler -> valor_b
            
            escrever "Escolha operação (+ - * /): "
            ler -> operacao
            
            escrever "Resultado: {resultado}"
            
            escrever "Continuar? (s/n): "
            ler continuar
        enquanto continuar = "s"
    
    # LÓGICA COMPARTILHADA
    função limpar
        valor_a = 0
        valor_b = 0
        operacao = "+"
    
    quando app.iniciar
        @html
            mensagem "Calculadora Web pronta!"
        
        @python @java
            mensagem "Calculadora Console iniciada!"
    
fim
```

# PROJETO 2: Gerenciador de Tarefas

```chor
app "TaskManager"
    
    dados
        tarefas: lista de estrutura
            id: numero
            titulo: texto
            descricao: texto
            concluida: logico = falso
            data_criacao: data = agora()
        
        filtro: texto = "todas"
        tarefas_filtradas: computado
            se filtro = "ativas"
                retornar tarefas.filtrar(t -> nao t.concluida)
            senão se filtro = "concluidas"
                retornar tarefas.filtrar(t -> t.concluida)
            senão
                retornar tarefas
    
    tela principal
        cabecalho
            titulo "📝 Gerenciador de Tarefas"
            badge "{tarefas_filtradas.tamanho} tarefas"
        
        grupo "Nova Tarefa"
            entrada "Título" -> nova_titulo
            area_texto "Descrição" -> nova_descricao
            botao "Adicionar" ação: adicionar_tarefa
        
        grupo "Filtros"
            alternancia "Mostrar concluídas" -> mostrar_concluidas
            botoes_alternancia
                opcao "Todas" valor="todas" -> filtro
                opcao "Ativas" valor="ativas" -> filtro
                opcao "Concluídas" valor="concluidas" -> filtro
        
        grupo "Lista de Tarefas"
            para cada tarefa em tarefas_filtradas
                cartao
                    se tarefa.concluida
                        estilo: "opacidade: 0.7"
                    
                    cabecalho
                        alternancia tarefa.titulo -> tarefa.concluida
                        badge se tarefa.concluida: "✅" senão: "⏳"
                    
                    texto tarefa.descricao
                    
                    rodape
                        texto "Criada: {tarefa.data_criacao.formatar('dd/MM/yy')}"
                        botao "Editar" ação: editar_tarefa(tarefa)
                        botao "Excluir" ação: excluir_tarefa(tarefa)
        
        grupo "Estatísticas"
            grade colunas=3
                cartao
                    titulo "Total"
                    texto "{tarefas.tamanho}"
                cartao
                    titulo "Ativas"
                    texto "{tarefas.filtrar(t -> nao t.concluida).tamanho}"
                cartao
                    titulo "Concluídas"
                    texto "{tarefas.filtrar(t -> t.concluida).tamanho}"
    
    função adicionar_tarefa
        se nova_titulo ≠ ""
            tarefas.adicionar({
                id: tarefas.tamanho + 1,
                titulo: nova_titulo,
                descricao: nova_descricao
            })
            nova_titulo = ""
            nova_descricao = ""
    
    função excluir_tarefa(tarefa)
        tarefas.remover(tarefa)
    
    função editar_tarefa(tarefa)
        modal "Editar Tarefa"
            entrada "Título" -> tarefa.titulo
            area_texto "Descrição" -> tarefa.descricao
            botao "Salvar" ação: fechar_modal
    
    quando tarefa.concluida mudar
        se tarefa.concluida
            mensagem "Tarefa '{tarefa.titulo}' concluída!"
    
fim
```

---

## 11. REFERÊNCIA DA API

Funções Globais

```chor
# Entrada/Saída
imprimir(valor)           # Console log
ler() -> texto           # Ler entrada
ler_numero() -> numero   # Ler número

# Conversão
para_texto(valor) -> texto
para_numero(texto) -> numero
para_logico(valor) -> logico

# Matemática
abs(numero) -> numero
arredondar(numero, casas=0) -> numero
aleatorio(min, max) -> numero
raiz_quadrada(numero) -> numero

# Strings
maiusculas(texto) -> texto
minusculas(texto) -> texto
substituir(texto, velho, novo) -> texto
dividir(texto, delimitador) -> lista de texto

# Data/Hora
agora() -> data_hora
hoje() -> data
data_parse(texto) -> data
diferenca_dias(data1, data2) -> numero

# Listas
ordenar(
