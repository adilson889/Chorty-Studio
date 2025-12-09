# Chorty-Studio
CHORTY Studio - README

#Visão Geral

CHORTY Studio é uma plataforma de desenvolvimento revolucionária que permite a criação de sites, interfaces, aplicações web utilizando exclusivamente a língua portuguesa. Através de um sistema de transpilação avançado, código escrito em português é automaticamente convertido em HTML, CSS e JavaScript padrão, eliminando a barreira linguística no desenvolvimento web.

*CAPTURA DE TELA

<img width="713" height="1261" alt="Image" src="https://github.com/user-attachments/assets/5a05b0df-640a-4678-9f7a-7733af74738d" />

<img width="707" height="1251" alt="Image" src="https://github.com/user-attachments/assets/70a66960-96bf-4bc3-89d3-968cb0db4593" />

<img width="717" height="1251" alt="Image" src="https://github.com/user-attachments/assets/3acbc7e5-2144-4333-92b2-6539db7ef381" />

<img width="714" height="1265" alt="Image" src="https://github.com/user-attachments/assets/0111c4d2-faf6-4a98-a1cb-d468b89919db" />

<img width="714" height="1263" alt="Image" src="https://github.com/user-attachments/assets/743865ee-0874-48f5-acaf-136091eae9bd" />





#Características Principais

Transpilação em Português

· Sintaxe completa em português para todas as camadas de desenvolvimento web
· Conversão automática para código padrão compatível com navegadores modernos
· Suporte a HTML, CSS e JavaScript totalmente em português

#Estrutura da Linguagem

Configuração de Página

_______________________

configurar metatags

criar pagina "Meu Site"
_______________________

#Elementos Estruturais


criar cabecalho

criar corpo

criar rodape


#Sistema CSS Natural


criar estilo do corpo

cor de fundo: azul

cor do texto: branco
preenchimento: 2rem
fechar estilo do corpo


#Lógica JavaScript em Português


criar comportamento

definir nome como "João"

definir idade como 25

funcao saudacao com nome

    imprimir "Olá " mais nome

    
fim funcao

se idade e maior ou igual a 18 entao

    imprimir "Maior de idade"
    
fim se

fechar comportamento


#Sistema de Componentes

· Formulários: criar formulario, adicionar campo de texto, adicionar campo de email
· Listas: criar lista, adicionar item
· Elementos Interativos: adicionar botao, adicionar titulo, adicionar paragrafo
· Layout: criar grade, exibicao: flexivel, exibicao: grade

#Instalação e Configuração

Pré-requisitos

· Node.js 18 ou superior
· NPM 9+ ou Yarn 1.22+
· Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)

#Instalação Local

bash
# Clone o repositório
git clone https://github.com/seu-usuario/chorty-studio.git

# Acesse o diretório do projeto
cd chorty-studio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
________________________

#Execução Online

Acesse a versão web em: https://chorty.studio

Guia de Uso Rápido

_________________________
Exemplo Básico


# Meu primeiro site CHORTY
criar pagina "Meu Portfólio"

criar estilo do corpo
cor de fundo: #0f172a
cor do texto: branco
exibicao: grade
preenchimento: 2rem
fechar estilo do corpo

criar cabecalho
adicionar titulo "Meu Portfólio"
adicionar subtitulo "Desenvolvedor CHORTY"
fechar cabecalho

criar corpo
adicionar botao "Meus Projetos" com id "btnProjetos"
adicionar botao "Contato" com id "btnContato"
fechar corpo

criar comportamento
definir nome como "Carlos"
imprimir "Bem-vindo " mais nome

funcao mostrarProjetos
    mostrar alerta "Abrindo projetos..."
fim funcao

buscar elemento "#btnProjetos" adicionar evento "clique" com mostrarProjetos
fechar comportamento
___________________________

#Recursos Avançados

Sistema de Grades


criar grade
# Conteúdo responsivo aqui
fechar grade


#Formulários Complexos


criar formulario "contato" com id "formContato"
adicionar campo de texto "Seu nome" com id "nome"
adicionar campo de email "Seu email" com id "email"
adicionar area de texto "Sua mensagem" com id "mensagem"
fechar formulario


#Manipulação de Eventos


buscar elemento "#meuBotao" adicionar evento "clique" com funcao
    mostrar alerta "Botão clicado!"
    buscar elemento "#campoTexto" adicionar evento "value" com texto
    imprimir "Texto digitado: " mais texto
fim funcao


#Arquitetura Técnica

Fluxo de Processamento

1. Análise Léxica: Divisão do código CHORTY em tokens
2. Classificação: Identificação do tipo de cada comando
3. Tradução: Conversão para HTML/CSS/JavaScript padrão
4. Montagem: Geração do arquivo final HTML

#Componentes Principais

· Dicionário CSS: Mais de 50 propriedades CSS traduzidas
· Dicionário de Cores: 15+ cores com nomes em português
· Sistema JavaScript: Variáveis, funções, eventos e operadores
· Gerador HTML: Estrutura semântica automática

#Sistema de Tipos


# Valores especiais
verdadeiro → true
falso → false
vazio → null
nulo → null

# Operadores
mais → +
menos → -
vezes → *
dividido por → /
e maior que → >
e igual a → ===

________________________
Casos de Uso
_________________________
Educação

· Ensino de programação web para iniciantes
· Material didático em português
· Redução da curva de aprendizagem

#Prototipagem

· Desenvolvimento rápido de interfaces
· Validação de conceitos com stakeholders
· Criação de MVPs funcionais

#Desenvolvimento Corporativo

· Padronização de código em equipes multilingues
· Documentação técnica em português
· Treinamento de novos desenvolvedores

Melhores Práticas

#Convenções de Código

1. Use # para comentários de linha única
2. Strings sempre entre aspas duplas: "texto"
3. IDs para elementos interativos: com id "nomeDoId"
4. Termine linhas de JavaScript com ; automaticamente

#Organização de Projetos


# Estrutura recomendada
configurar metatags
criar pagina "Título do Projeto"

# CSS Global
criar estilo do corpo
# propriedades aqui
fechar estilo do corpo

# HTML
criar cabecalho
# conteúdo do cabeçalho
fechar cabecalho

criar corpo
# conteúdo principal
fechar corpo

# JavaScript
criar comportamento
# lógica da aplicação
fechar comportamento


#Limitações Conhecidas

Compatibilidade

· Propriedades CSS desconhecidas são passadas diretamente
· Algumas funções JavaScript avançadas podem requerer sintaxe tradicional
· Suporte a frameworks JavaScript via extensões

Performance

· Transpilação em tempo real para projetos pequenos e médios
· Para projetos grandes, recomenda-se build de produção
· Cache automático para melhor desempenho

Contribuição

Como Contribuir

1. Fork o repositório
2. Crie uma branch para sua feature: git checkout -b minha-feature
3. Commit suas mudanças: git commit -m 'Adiciona nova feature'
4. Push para a branch: git push origin minha-feature
5. Abra um Pull Request

#Áreas de Melhoria

· Expansão do dicionário de tradução
· Otimização do motor de transpilação
· Novos componentes e elementos
· Melhoria da documentação

Suporte e Comunidade

Documentação

· Guia completo disponível em docs.chorty.studio
· Exemplos práticos e tutoriais
· FAQ atualizado regularmente

#Comunidade

· Fórum de discussão: forum.chorty.studio
· Canal Discord para suporte em tempo real
· Grupo Telegram para desenvolvedores

Reportar Problemas

Utilize o sistema de Issues do GitHub para:

· Reportar bugs
· Sugerir melhorias
· Solicitar novas funcionalidades

_________________________
#Roadmap
_________________________
Versão 1.0 (Atual MVP)

· Sistema básico de transpilação
· Editor com realce de sintaxe e suporte a microfone
· Preview em tempo real
· Exportação para HTML( ZIP)
 

Versão 2.0 (Próxima)

· Sistema de módulos e importação
· Suporte a frameworks (React, Vue)
· Colaboração em tempo real
· Extensões e plugins

Versão 3.0 (Futuro)

· Compilação para múltiplas plataformas
· Ferramentas de debugging integradas
· Sistema de templates profissional
· Integração com serviços em nuvem

#Licença

Distribuído sob a licença MIT. Veja LICENSE para mais informações.

#Reconhecimentos

· Comunidade de desenvolvedorés brasileiros, inspiração em VisuAlg
· Contribuidores open source
· Instituições educacionais parceiras

_____________________________

Chorty Studio - Democratizando o desenvolvimento web através da língua portuguesa.
____________________________
#Autor: ADILSON CAMBINDA RAFAEL
ESTUDANTE UNIVERSITARIO ANGOLANO 12/2025
