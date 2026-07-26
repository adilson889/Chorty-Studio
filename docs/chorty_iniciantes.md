
> Um guia passo a passo para quem está a aprender a programar pela primeira vez.
> Não é preciso saber nada de programação antes de começar.
> **Versão 1.2**

---

## Índice

1. [O que é programar?](#1-o-que-e-programar)
2. [O teu primeiro programa](#2-primeiro-programa)
3. [Variáveis — guardar informação](#3-variaveis)
4. [Tipos de dados — que tipo de informação?](#4-tipos)
5. [Variáveis fixas — informação que nunca muda](#5-fixas)
6. [Listas — várias informações juntas](#6-listas)
7. [Operações — fazer contas e comparações](#7-operacoes)
8. [Decisões — se isto, então aquilo](#8-decisoes)
9. [Repetições — fazer a mesma coisa várias vezes](#9-repeticoes)
10. [Funções — guardar um bloco de trabalho com nome](#10-funcoes)
11. [Juntar texto com números](#11-juntar-texto)
12. [Classes — moldes para criar coisas parecidas](#12-classes)
13. [Erros comuns de iniciante](#13-erros-comuns)
14. [Exercícios progressivos](#14-exercicios)

---

## 1. O que é programar?

Programar é escrever instruções, passo a passo, para o computador seguir. É como uma receita de cozinha: cada linha é um passo, e o computador executa os passos **na ordem em que estão escritos**, de cima para baixo.

O Chorty é uma linguagem de programação escrita em português, criada para facilitar esse primeiro contacto. Em vez de aprenderes símbolos e palavras em inglês desde o início, escreves instruções quase como falarias.

---

## 2. O teu primeiro programa

```chorty
imprimir("Olá, mundo!")
```

Esta única linha diz ao computador: "mostra o texto Olá, mundo! no ecrã". `imprimir` é uma instrução que já vem pronta no Chorty — chama-se uma **função** (vamos falar disso mais à frente). O texto entre aspas é o que queremos mostrar.

Experimenta mudar o texto entre aspas e correr de novo. É assim que se aprende — a experimentar.

---

## 3. Variáveis — guardar informação

Uma variável é como uma **caixa com um nome colado**, onde guardas um valor para usar mais tarde.

```chorty
idade = 25
```

Isto cria uma caixa chamada `idade` e coloca o número `25` lá dentro. Sempre que escreveres `idade` depois disto, o Chorty vai buscar o valor que está guardado nessa caixa.

```chorty
idade = 25
imprimir(idade)          # mostra: 25

idade = 26
imprimir(idade)          # mostra: 26
```

Repara: a segunda linha **substitui** o valor que estava na caixa. É por isso que se chama variável — o valor pode **variar**, mudar ao longo do tempo.

**Regra de nomes:** o nome de uma variável não pode ter espaços nem começar por número. `idade_do_aluno` está certo, `1idade` não está.

---

## 4. Tipos de dados — que tipo de informação?

Cada valor que guardas numa variável tem um **tipo** — uma categoria que diz ao computador o que aquele valor é e o que se pode fazer com ele.

| Tipo | O que guarda | Exemplo |
|---|---|---|
| `texto` | letras, palavras, frases | `nome = "Adilson"` |
| `numero` | qualquer número | `preco = 9.99` |
| `numero_inteiro` | número sem casas decimais | `idade = 25` |
| `decimal` | número com casas decimais | `altura = 1.75` |
| `logico` | só pode ser verdadeiro ou falso | `activo = verdadeiro` |

**Texto** vai sempre entre aspas: `"Adilson"`, `"Bem-vindo!"`, `"25"` (repara que `"25"` entre aspas é texto, não número).

**Número** nunca leva aspas: `25`, `9.99`, `-3`.

```chorty
idade = 25          # número — sem aspas
nome = "Adilson"    # texto — com aspas
codigo = "25"       # texto — mesmo sendo dígitos, as aspas fazem dele texto
```

### Uma variável, um tipo, para sempre

No Chorty, depois de decidires que tipo de informação uma variável vai guardar, **mantém esse tipo até ao fim do programa**. Se `idade` começou como número, deixa-a sempre como número.

```chorty
# CORRETO
idade = 25
idade = idade + 1        # continua número

# EVITAR — muda de tipo a meio
resultado = "aprovado"
resultado = 10            # agora é número — isto confunde o programa e a ti próprio
```

Esta regra existe porque, quando o teu código for transformado (transpilado) para linguagens como C ou C++, o computador precisa de saber de antemão que "gaveta" reservar para cada variável — uma gaveta para texto é diferente de uma gaveta para número. Manter o tipo é também um hábito de bom programador, em qualquer linguagem.

---

## 5. Variáveis fixas — informação que nunca muda

Às vezes queres guardar um valor que **nunca deve ser alterado** — por exemplo, o valor de Pi, ou o nome da tua aplicação. Para isso usa `fixo`:

```chorty
fixo PI = 3.14
fixo NOME_APP = "Chorty"
```

Se tentares mudar o valor de uma variável `fixo` depois de a criares, é um erro — o Chorty não deixa. É uma proteção: se um valor não deve mudar, o computador ajuda-te a não mudares por engano.

**Convenção:** é comum escrever nomes de variáveis fixas em maiúsculas (`PI`, `NOME_APP`), para se distinguirem à primeira vista das variáveis normais.

---

## 6. Listas — várias informações juntas

Uma lista é como uma **fila de caixas numeradas**, todas com o mesmo nome, guardando vários valores do mesmo tipo.

```chorty
notas = [8, 6, 9, 10, 7]
```

Isto cria uma lista chamada `notas` com cinco números lá dentro. Cada valor tem uma **posição**, chamada índice, e a contagem começa em **zero**, não em um:

```chorty
notas = [8, 6, 9, 10, 7]
#         0  1  2  3   4    ← estas são as posições (índices)

imprimir(notas[0])    # mostra: 8   (o primeiro elemento)
imprimir(notas[2])    # mostra: 9   (o terceiro elemento)
```

Podes também mudar o valor numa posição:

```chorty
notas[0] = 9
imprimir(notas[0])    # mostra: 9
```

### Lista tem de ser do mesmo tipo

Assim como uma variável mantém um tipo, uma lista deve conter **só um tipo de valor** — só números, ou só textos, nunca misturado:

```chorty
# CORRETO
notas = [8, 6, 9]
nomes = ["Ana", "Bia", "Carlos"]

# EVITAR
misturado = [8, "Ana", verdadeiro]
```

---

## 7. Operações — fazer contas e comparações

### Contas com números

| Símbolo | Operação | Exemplo | Resultado |
|---|---|---|---|
| `+` | soma | `5 + 3` | `8` |
| `-` | subtração | `5 - 3` | `2` |
| `*` | multiplicação | `5 * 3` | `15` |
| `/` | divisão | `10 / 2` | `5` |

```chorty
a = 10
b = 3
imprimir(a + b)     # 13
imprimir(a * b)     # 30
```

### Comparações

Comparações não fazem contas — respondem **verdadeiro** ou **falso**:

| Símbolo | Pergunta | Exemplo |
|---|---|---|
| `==` | são iguais? | `idade == 18` |
| `!=` | são diferentes? | `idade != 18` |
| `>` | maior que? | `idade > 18` |
| `<` | menor que? | `idade < 18` |
| `>=` | maior ou igual? | `idade >= 18` |
| `<=` | menor ou igual? | `idade <= 18` |

**Cuidado — o erro mais comum de todos:** `=` serve para **guardar** um valor. `==` serve para **comparar**. São coisas completamente diferentes.

```chorty
idade = 18         # guarda 18 na variável idade
idade == 18        # pergunta: idade é igual a 18? (verdadeiro)
```

---

## 8. Decisões — se isto, então aquilo

O bloco `se` permite ao programa escolher um caminho diferente conforme uma condição:

```chorty
idade = 20

se idade >= 18
imprimir("És maior de idade")
>>>
```

Isto lê-se: "se a idade for maior ou igual a 18, mostra a mensagem". A linha `>>>` marca onde termina o bloco `se`.

### Com alternativa (senao)

```chorty
idade = 15

se idade >= 18
imprimir("És maior de idade")
senao
imprimir("Ainda és menor de idade")
>>>
```

### Com várias condições (senao se)

```chorty
nota = 6

se nota >= 7
imprimir("Aprovado")
senao se nota >= 5
imprimir("Recuperação")
senao
imprimir("Reprovado")
>>>
```

O Chorty testa as condições **de cima para baixo** e para na primeira que for verdadeira.

---

## 9. Repetições — fazer a mesma coisa várias vezes

### Repetir um número certo de vezes

```chorty
para i=1 ate 5
imprimir(i)
>>>
```

Isto mostra os números de 1 a 5, um por linha. `i` é uma variável criada automaticamente pelo `para`, que muda a cada repetição — chama-se **contador**.

### Percorrer uma lista

```chorty
notas = [8, 6, 9]

para cada nota em notas
imprimir(nota)
>>>
```

Isto passa por cada valor da lista `notas`, um de cada vez, chamando-o `nota` dentro do bloco.

### Repetir enquanto uma condição for verdadeira

```chorty
contador = 0

enquanto contador < 3
imprimir(contador)
contador = contador + 1
>>>
```

O bloco `enquanto` repete enquanto a condição continuar verdadeira. **Cuidado:** se te esqueceres de mudar a condição lá dentro (como o `contador = contador + 1` acima), o programa repete para sempre — chama-se um ciclo infinito.

---

## 10. Funções — guardar um bloco de trabalho com nome

Uma função é um **bloco de instruções com nome**, que podes chamar sempre que precisares, sem reescrever tudo de novo.

```chorty
funcao saudar()
imprimir("Olá!")
>>>

saudar()     # chama a função — mostra: Olá!
saudar()     # chama outra vez — mostra: Olá! de novo
```

### Funções com parâmetros

Um parâmetro é uma informação que entregas à função quando a chamas, para ela usar por dentro:

```chorty
funcao saudar(nome)
imprimir("Olá, " + nome + "!")
>>>

saudar("Ana")       # mostra: Olá, Ana!
saudar("Carlos")    # mostra: Olá, Carlos!
```

Aqui `nome` é o parâmetro — uma caixa temporária que só existe enquanto a função está a correr, e que recebe o valor que passares entre parêntesis.

### Funções que devolvem um valor

Em vez de mostrar algo diretamente, uma função pode **calcular e devolver** um valor, para usares depois:

```chorty
funcao dobro(x)
retornar x * 2
>>>

resultado = dobro(5)
imprimir(resultado)     # mostra: 10
```

`retornar` entrega o valor de volta a quem chamou a função. Depois de `retornar`, a função para — nenhuma linha depois dela dentro da função é executada.

---

## 11. Juntar texto com números

Para juntar (concatenar) pedaços de texto, usa `+`:

```chorty
nome = "Ana"
imprimir("Olá, " + nome)     # mostra: Olá, Ana
```

Mas se quiseres juntar um **número** a um texto, tens de transformar o número em texto primeiro, com `texto(...)`:

```chorty
idade = 25
imprimir("Tens " + texto(idade) + " anos")     # mostra: Tens 25 anos
```

**Porquê?** Texto e número são tipos diferentes — é como tentar somar maçãs com quilos: primeiro tens de pôr tudo na mesma unidade. `texto(idade)` transforma o número `25` no texto `"25"`, para poder ser juntado a outro texto.

```chorty
# CORRETO
imprimir("Idade: " + texto(idade))

# ERRO comum — esquecer o texto()
imprimir("Idade: " + idade)
```

---

## 12. Classes — moldes para criar coisas parecidas

Até agora guardaste informação em variáveis soltas: `nome = "Ana"`, `idade = 25`. Mas e se precisares de guardar várias pessoas, cada uma com o seu nome e a sua idade? Ias precisar de `nome1`, `idade1`, `nome2`, `idade2`... isto fica confuso rápido.

Uma **classe** é um molde. Defines uma vez como é "uma pessoa" (que informação ela guarda, o que ela sabe fazer), e depois crias quantas pessoas quiseres a partir desse molde — cada uma com os seus próprios valores.

```chorty
classe Pessoa
nome = ""
idade = 0

funcao novo(nome, idade)
este.nome = nome
este.idade = idade
>>>

funcao apresentar()
imprimir("Olá, eu sou " + este.nome + " e tenho " + texto(este.idade) + " anos")
>>>
>>>
```

Repara em três coisas novas:

- **`classe Pessoa ... fim`** — define o molde, com um nome
- **`funcao novo(...)`** — é a função especial que corre sempre que crias uma pessoa nova. Serve para preencher os valores dela
- **`este`** — significa "esta pessoa aqui, a que estou a criar/usar agora". `este.nome` é o nome desta pessoa específica, não de outra

Agora criamos pessoas a partir do molde, usando `novo`:

```chorty
ana = novo Pessoa("Ana", 25)
carlos = novo Pessoa("Carlos", 30)

ana.apresentar()        # mostra: Olá, eu sou Ana e tenho 25 anos
carlos.apresentar()     # mostra: Olá, eu sou Carlos e tenho 30 anos
```

`ana` e `carlos` são dois objetos diferentes, criados a partir do **mesmo molde** `Pessoa`. Cada um guarda o seu próprio nome e a sua própria idade — mudar o nome de `ana` não afeta o `carlos`.

**Quando é que isto é útil?** Sempre que tens várias "coisas" parecidas no teu programa — vários alunos, vários produtos numa loja, vários carros — em vez de uma variável para cada informação de cada um, cada "coisa" vira um objeto, criado a partir de uma classe.

> Isto é só o início. Classes têm muito mais por explorar (uma classe pode herdar comportamento de outra, por exemplo) — isso está coberto em detalhe na Documentação do Modo Script.

---

## 13. Erros comuns de iniciante

| Erro | Exemplo errado | Correção |
|---|---|---|
| Confundir `=` com `==` | `se idade = 18` | `se idade == 18` |
| Esquecer aspas em texto | `nome = Ana` | `nome = "Ana"` |
| Esquecer `texto()` ao juntar número | `"Idade: " + idade` | `"Idade: " + texto(idade)` |
| Esquecer o `>>>` de um bloco | `se x > 0 \n imprimir(x)` | adicionar `>>>` no final |
| Índice de lista a começar em 1 | `notas[1]` para o primeiro elemento | `notas[0]` é o primeiro |
| Trocar o tipo de uma variável a meio | `x = "sim"` depois `x = 5` | manter sempre o mesmo tipo |
| Ciclo `enquanto` sem atualizar a condição | esquecer `contador = contador + 1` | garantir que a condição muda a cada volta |

---

## 14. Exercícios progressivos

Tenta resolver cada exercício antes de veres a solução — é assim que se aprende de verdade.

### Nível 1 — Variáveis

Cria uma variável com o teu nome e outra com a tua idade, e mostra: `"O meu nome é ___ e tenho ___ anos"`.

<details>
<summary>Ver solução</summary>

```chorty
nome = "Adilson"
idade = 20
imprimir("O meu nome é " + nome + " e tenho " + texto(idade) + " anos")
```
</details>

### Nível 2 — Decisão

Pede uma nota (usa um número fixo por agora) e mostra "Aprovado" se for maior ou igual a 7, ou "Reprovado" caso contrário.

<details>
<summary>Ver solução</summary>

```chorty
nota = 8

se nota >= 7
imprimir("Aprovado")
senao
imprimir("Reprovado")
>>>
```
</details>

### Nível 3 — Repetição

Mostra a tabuada do 5, de 1 a 10 (`5 x 1 = 5`, `5 x 2 = 10`, ...).

<details>
<summary>Ver solução</summary>

```chorty
para i=1 ate 10
imprimir("5 x " + texto(i) + " = " + texto(5 * i))
>>>
```
</details>

### Nível 4 — Listas

Cria uma lista com 5 notas e mostra a soma de todas elas.

<details>
<summary>Ver solução</summary>

```chorty
notas = [8, 6, 9, 10, 7]
soma = 0

para cada nota em notas
soma = soma + nota
>>>

imprimir("A soma é " + texto(soma))
```
</details>

### Nível 5 — Funções

Escreve uma função `ehPar(numero)` que devolve verdadeiro se o número for par, e falso caso contrário. Testa-a com alguns números.

<details>
<summary>Ver solução</summary>

```chorty
funcao ehPar(numero)
resto = numero - (numero / 2) * 2
se resto == 0
retornar verdadeiro
>>>
retornar falso
>>>

imprimir(ehPar(4))
imprimir(ehPar(7))
```
</details>

### Nível 6 — Juntar tudo

Escreve uma função `classificar(nome, nota)` que devolve um texto do tipo `"Ana foi aprovado com 8"` ou `"Ana foi reprovado com 4"`. Chama a função para 3 alunos diferentes.

<details>
<summary>Ver solução</summary>

```chorty
funcao classificar(nome, nota)
se nota >= 7
retornar nome + " foi aprovado com " + texto(nota)
senao
retornar nome + " foi reprovado com " + texto(nota)
>>>
>>>

imprimir(classificar("Ana", 8))
imprimir(classificar("Carlos", 4))
imprimir(classificar("Bia", 7))
```
</details>

### Nível 7 — Classes

Cria uma classe `Produto` com nome e preço. Adiciona uma função `aplicarDesconto(percentagem)` que reduz o preço do produto. Cria dois produtos diferentes e aplica um desconto a um deles.

<details>
<summary>Ver solução</summary>

```chorty
classe Produto
nome = ""
preco = 0

funcao novo(nome, preco)
este.nome = nome
este.preco = preco
>>>

funcao aplicarDesconto(percentagem)
este.preco = este.preco - (este.preco * percentagem / 100)
>>>

funcao mostrar()
imprimir(este.nome + " custa " + texto(este.preco))
>>>
>>>

sapatos = novo Produto("Sapatos", 5000)
camisa = novo Produto("Camisa", 2000)

sapatos.aplicarDesconto(10)

sapatos.mostrar()     # mostra: Sapatos custa 4500
camisa.mostrar()      # mostra: Camisa custa 2000
```
</details>

---

*Chorty para Iniciantes — o próximo passo é a Documentação do Modo Script, mais técnica e completa.*