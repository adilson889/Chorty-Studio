> Documento oficial da gramática, sintaxe e comportamento do **modo script** do Chorty.
> Cobre os alvos: `python`, `java`, `cpp`, `c`.
> **Versão 1.2**

---


## 1. Filosofia

**O modo script transpila( converte) lógica pura** — sem interface — para cinco linguagens de saída diferentes. É o modo pensado para ensino: um único ficheiro Chorty pode ser executado como JavaScript, Python, Java, C++ ou C, sem alterar uma linha de código.

**Princípios:**
- Mínimo de pontuação possível
- Português como língua nativa
- Uma única regra para cada situação — sem exceções
- O mesmo código Chorty produz o mesmo resultado em qualquer um dos 5 alvos
- Tipagem simples e previsível — cada variável tem um único tipo durante toda a sua vida

**Alvos suportados:**

| `saida` | Linguagem gerada | Tipagem |
|---|---|---|
| `"python"` | Python | dinâmica |
| `"java"` | Java | estática |
| `"cpp"` | C++ | estática |
| `"c"` | C | estática |

---

## 2. Estrutura Geral

### Modo Script Automático

Um ficheiro que **não começa com `app`** é tratado automaticamente como script — não precisa de `config` nem de `>>>` a envolver tudo:

```chorty
funcao dobro(x)
retornar x * 2
>>>

imprimir(dobro(5))
```

`>>>` fecha qualquer bloco (`funcao`, `se`, `enquanto`, etc.).

> Exceção: dentro de um bloco `<<< ... >>>` (texto bruto, ver secção 15.11), o `>>>` fecha sempre o texto.

### Modo Script com `app`

Também é possível declarar `app` e `config` explicitamente, escolhendo o alvo com `saida`:

```chorty
app "teste"

config
saida = "python"
>>>

funcao dobro(x)
retornar x * 2
>>>

imprimir(dobro(5))
```

Ambas as formas produzem o mesmo resultado — a segunda apenas torna o alvo explícito.

---

## 3. Config — Hub Central

```chorty
config
saida = "c"
>>>
```

| Atributo | Valores | Descrição |
|---|---|---|
| `saida` | `"console"` `"python"` `"java"` `"cpp"` `"c"` | Linguagem para a qual o script é transpilado |

> No modo script, `icones`, `importar` e `usar biblioteca` não se aplicam — são exclusivos do modo com interface (`tela`).

---

## 4. Variáveis

### Declaração por Atribuição

```chorty
x = 5
nome = "Adilson"
fixo PI = 3.14
```

- `nome = valor` cria a variável na primeira atribuição
- `fixo nome = valor` cria uma constante — não pode ser reatribuída depois

### Regra de Tipo Único

**Uma variável mantém o mesmo tipo durante toda a sua vida no mesmo escopo.** Uma vez atribuído um texto, número, lógico ou lista a uma variável, todas as atribuições seguintes a essa variável, nesse escopo, devem ser do mesmo tipo.

```chorty
# CORRETO — tipo consistente
idade = 25
idade = idade + 1

# CORRETO — variáveis diferentes, tipos diferentes
idade = 25
nome = "Ana"

# EVITAR — troca de tipo na mesma variável
resultado = "sim"
resultado = 10        # resultado deixou de ser texto e passou a número
```

Este é o único ponto onde o comportamento do script **diverge por alvo**:

| Alvo | Comportamento com troca de tipo |
|---|---|
| `console`, `python` | Funciona sempre — tipagem dinâmica nativa da linguagem |
| `java` | Funciona (usa `Object` internamente quando necessário) |
| `cpp`, `c` | Gera um comentário de aviso na linha afetada e mantém o tipo da primeira atribuição |

Ver [secção 13](#13-compatibilidade) para o detalhe completo.

---

## 5. Tipos de Dados

### Tabela Completa

| Chorty | Descrição | Exemplo |
|---|---|---|
| `texto` | cadeia de caracteres | `nome = "Adilson"` |
| `numero` | número (inteiro ou decimal) | `preco = 9.99` |
| `numero_inteiro` | número inteiro | `idade = 25` |
| `decimal` | número decimal | `taxa = 0.15` |
| `logico` | verdadeiro / falso | `activo = verdadeiro` |
| `lista` | coleção ordenada | `numeros = [1, 2, 3]` |

### Tipo Explícito (Opcional)

No modo script, o tipo de uma variável ou parâmetro pode ser **inferido automaticamente** pelo transpilador (pela primeira atribuição, ou pelo uso dentro da função) ou **declarado explicitamente**:

```chorty
# tipo inferido
funcao somar(a, b)
retornar a + b
>>>

# tipo explícito
funcao somar(a: numero, b: numero)
retornar a + b
>>>
```

**Quando declarar o tipo explicitamente:**
- Quando o alvo é `cpp` ou `c` e a função usa listas como parâmetro
- Quando o parâmetro é usado tanto em texto quanto em número dentro da função (situação ambígua para o inferidor)
- Como boa prática, sempre que o código for revisado por terceiros

O tipo explícito nunca é obrigatório — funciona como documentação e como forma de resolver ambiguidades quando a inferência automática não é suficiente.

---

## 6. Listas

```chorty
numeros = [10, 3, 7, 1, 5]
nomes = ["Ana", "Bia", "Carlos"]

# ler por índice (0-based)
imprimir(numeros[0])
i = 2
imprimir(numeros[i + 1])

# atribuir a uma posição
numeros[0] = 99
```

### Regra de Lista Homogênea

**Uma lista deve conter elementos de um único tipo.** `[10, 3, 7]` é uma lista de números; `["Ana", "Bia"]` é uma lista de texto. Misturar tipos na mesma lista (`[10, "Ana", verdadeiro]`) não é suportado em nenhum alvo — em `console` e `python` pode "funcionar" por acaso, mas o comportamento não é garantido nos alvos tipados.

### Parâmetros do Tipo Lista

Quando uma função recebe uma lista como parâmetro, declare o tipo explicitamente para todos os alvos gerarem código correto:

```chorty
funcao somarTodos(numeros: lista)
total = 0
para cada n em numeros
total = total + n
>>>
retornar total
>>>
```

---

## 7. Funções

### Sintaxe

```chorty
# sem parâmetros
funcao iniciar
imprimir("Pronto!")
>>>

# com parâmetros, tipo inferido
funcao somar(a, b, c)
retornar a + b + c
>>>

# com tipo explícito
funcao somar(a: numero, b: numero, c: numero)
retornar a + b + c
>>>

# com tipo de retorno explícito
funcao somar(a: numero, b: numero) retorna numero
retornar a + b
>>>
```

### Chamada

```chorty
iniciar()
resultado = somar(10, 20, 30)
```

### Regras

| Situação | Sintaxe |
|---|---|
| Sem parâmetros | `funcao iniciar` |
| Com parâmetros | `funcao somar(a, b, c)` |
| Parâmetro tipado | `funcao somar(a: numero)` |
| Retorno tipado | `funcao somar(a: numero) retorna numero` |
| Chamada | `somar(10, 20, 30)` |

### Inferência de Tipo em Funções

Quando o tipo de um parâmetro ou do retorno não é declarado, o transpilador infere pelo uso dentro do corpo da função:

- Se o parâmetro participa de uma concatenação de texto (`&`) ou recebe um literal de texto, é tratado como `texto`
- Se a função devolve uma concatenação de texto, uma chamada a `texto(...)`, ou um literal de texto, o tipo de retorno é `texto`
- Caso contrário, o valor padrão é `numero`

Essa inferência é a mesma para todos os alvos — garante que uma função se comporta de forma equivalente em `python`, `java`, `cpp` e `c`.

### Recursão

Funções recursivas funcionam normalmente em todos os alvos:

```chorty
funcao fatorial(n)
se n <= 1
retornar 1
>>>
retornar n * fatorial(n - 1)
>>>
```

---

## 7.1 Classes (POO)

### Sintaxe

```chorty
classe NomeClasse [herda NomeClassePai]
propriedade1 = valorPadrao
propriedade2 = valorPadrao

funcao novo(parametros...)
este.propriedade1 = parametros
>>>

funcao metodo(parametros...)
# corpo do metodo, com acesso a este.propriedade
>>>
>>>
```

- **`classe Nome ... >>>`** — declara a classe
- **`herda Pai`** (opcional) — a classe herda propriedades e métodos de `Pai`
- **Propriedades** — declaradas soltas no corpo da classe, com valor padrão (`nome = ""`, `idade = 0`); tornam-se atributos de instância
- **`funcao novo(...)`** — construtor; corre sempre que um objeto é criado com `novo`. Não é obrigatório declarar — se ausente, um construtor vazio é gerado automaticamente, preenchendo só as propriedades com o valor padrão
- **`este`** — referência ao objeto atual (equivalente a `self` em Python, `this` em Java/C++/JS)
- **Métodos** — funções declaradas dentro do corpo da classe; todos recebem `este` implicitamente (não é declarado como parâmetro)

### Instanciação

```chorty
objeto = novo NomeClasse(argumentos...)
objeto.metodo(argumentos...)
objeto.propriedade
```

### Exemplo completo

```chorty
classe Animal
nome = ""
idade = 0

funcao novo(nome, idade)
este.nome = nome
este.idade = idade
>>>

funcao apresentar()
imprimir("Eu sou " + este.nome + " e tenho " + texto(este.idade) + " anos")
>>>
>>>

classe Cachorro herda Animal
raca = ""

funcao novo(nome, idade, raca)
este.nome = nome
este.idade = idade
este.raca = raca
>>>

funcao latir()
imprimir(este.nome + " diz au au")
>>>
>>>

rex = novo Cachorro("Rex", 3, "Labrador")
rex.apresentar()     # herdado de Animal
rex.latir()          # próprio de Cachorro
```

### Regras

| Situação | Sintaxe |
|---|---|
| Classe simples | `classe Nome ... >>>` |
| Classe com herança | `classe Nome herda Pai ... >>>` |
| Construtor | `funcao novo(a, b) ... >>>` |
| Referência ao próprio objeto | `este` |
| Acesso a propriedade | `este.propriedade` (dentro da classe) / `objeto.propriedade` (fora) |
| Criar instância | `objeto = novo Nome(args)` |
| Chamar método | `objeto.metodo(args)` |

### Como cada alvo traduz `classe`

| Chorty | `console` / `js` | `python` | `java` | `cpp` / `c` |
|---|---|---|---|---|
| `classe Nome` | `class Nome { }` | `class Nome:` | `class Nome { }` | não suportado neste momento |
| `herda Pai` | `class Nome extends Pai` | `class Nome(Pai):` | `class Nome extends Pai` | — |
| `este` | `this` | `self` (implícito no `def __init__`/métodos) | `this` | — |
| `funcao novo(...)` | `constructor(...)` | `def __init__(self, ...):` | construtor `Nome(...)` | — |
| `novo Nome(args)` | `new Nome(args)` | `Nome(args)` | `new Nome(args)` | — |

`c` e `cpp` ainda não têm suporte a `classe` no transpilador — usar classes num script destinado a esses dois alvos gera erro. Para código que precisa correr nos 5 alvos, evitar `classe` e usar funções com dados passados explicitamente.

### Limitações atuais

- Sem suporte a métodos privados/protegidos — todas as propriedades e métodos são públicos
- Sem sobrecarga de construtor — cada classe tem apenas um `novo`
- Herança múltipla não suportada — `herda` aceita apenas uma classe pai
- `super()` (chamar explicitamente o construtor/método do pai) ainda não tem sintaxe própria; a classe filha deve reescrever a lógica necessária

---

## 8. Controlo de Fluxo

**Condicional:**
```chorty
se nota >= 7
imprimir("Aprovado")
senao se nota >= 5
imprimir("Recuperação")
senao
imprimir("Reprovado")
>>>
```

**Ciclo numérico:**
```chorty
para i=1 ate 5
imprimir(i)
>>>

# com passo
para i=0 ate 10 passo 2
imprimir(i)
>>>
```

**Ciclo sobre lista:**
```chorty
numeros = [10, 20, 30]
para cada item em numeros
imprimir(item)
>>>
```

**Enquanto:**
```chorty
contador = 0
enquanto contador < 3
contador = contador + 1
imprimir(contador)
>>>
```

**Retornar / Interromper / Continuar:**
```chorty
funcao procurar(lista, alvo)
para cada item em lista
se item == alvo
retornar verdadeiro
>>>
>>>
retornar falso
>>>
```

---

## 9. Concatenação de Texto

O operador `+` funciona tanto para soma numérica quanto para concatenação de texto — o Parser decide automaticamente pelo contexto:

```chorty
imprimir("Fatorial de 5: " + texto(fatorial(5)))
imprimir("Olá " + nome + ", você tem " + texto(idade) + " anos")
```

- `texto(x)` converte qualquer valor para texto antes de concatenar — use sempre que misturar texto com número
- Concatenar texto com texto não precisa de `texto(...)`
- Internamente, quando o Parser detecta concatenação de texto, o operador é tratado como concatenação em todos os alvos, garantindo que `"A" + "B"` nunca vira uma soma numérica

```chorty
# CORRETO
nome = "Ana"
idade = 25
imprimir(nome + " tem " + texto(idade) + " anos")

# EVITAR — concatenar número sem texto()
imprimir(nome + " tem " + idade + " anos")   # comportamento inconsistente entre alvos
```

---

## 10. Entrada e Saída

```chorty
imprimir("Mensagem normal")
mensagem("Aviso ou alerta")

idade = numero(inserir("Digite a idade:"))
```

| Função | Descrição |
|---|---|
| `imprimir(x)` | escreve uma linha na saída padrão |
| `mensagem(x)` | escreve uma linha destacada como aviso |
| `inserir(prompt)` | lê uma linha da entrada padrão — **sempre devolve texto** |

> `inserir()` sempre devolve texto. Para usar como número: `idade = numero(inserir("Idade:"))`.

---

## 11. Funções Builtin

### Conversão de Tipo

| Chorty | Descrição |
|---|---|
| `texto(x)` | converte para texto |
| `numero(x)` | converte para número decimal |
| `numero_inteiro(x)` | converte para número inteiro |
| `decimal(x)` | converte para decimal |
| `logico(x)` | converte para lógico |

### Matemática

| Chorty | Descrição |
|---|---|
| `raiz(x)` | raiz quadrada |
| `potencia(b, e)` | b elevado a e |
| `aleatorio()` | número aleatório entre 0 e 1 |
| `minimo(a, b)` | menor dos dois |
| `maximo(a, b)` | maior dos dois |
| `absoluto(x)` | valor absoluto |
| `arredondar(x)` | arredonda para o inteiro mais próximo |
| `chao(x)` / `chão(x)` | arredonda para baixo |
| `teto(x)` | arredonda para cima |

### Texto

| Chorty | Descrição |
|---|---|
| `comprimento(x)` | número de caracteres |

### Utilitários

| Chorty | Descrição |
|---|---|
| `tipo_de(x)` | nome do tipo do valor |
| `e_nulo(x)` | verdadeiro se o valor é nulo |
| `agora()` | instante atual em milissegundos |

---

## 12. Palavras Reservadas

### Podem ser nome de variável (com desambiguação pelo Parser)

`lista`, `mapa`, `tabela`, `grade`, `texto`, `numero`, `imagem`, `video`, `botao`

O Parser distingue pelo contexto: se a palavra é seguida de `=`, `[` ou `.`, é tratada como variável.

```chorty
lista = [10, 20, 30]     # variável — seguida de "="
lista[0] = 99             # variável — seguida de "["
```

### Sempre reservadas

`funcao`, `fixo`, `se`, `senao`, `para`, `cada`, `em`, `ate`, `passo`, `enquanto`, `fazer`, `retornar`, `interromper`, `continuar`, `config`, `app`, `dados`, `verdadeiro`, `falso`, `classe`, `herda`, `novo`, `este`

---

## 13. Compatibilidade entre Alvos

Esta secção documenta explicitamente onde o comportamento diverge entre os 5 alvos, para que o mesmo código Chorty possa ser escrito pensando em todos eles desde o início.

### Tipagem dinâmica vs. estática

| Situação | `console` / `python` | `java` | `cpp` / `c` |
|---|---|---|---|
| Variável muda de tipo no mesmo escopo | funciona | funciona | mantém o primeiro tipo; gera aviso |
| Parâmetro de função sem tipo declarado | inferido em runtime | inferido em runtime | inferido em tempo de transpilação, pelo uso no corpo |
| Lista com tipos mistos | funciona | não recomendado | não suportado |
| Parâmetro do tipo lista sem anotação | funciona | funciona | recomenda-se `nome: lista` explícito |
| Uso de `classe` | funciona (`console`/`js`), `python`, `java` | funciona | **não suportado em `cpp`/`c`** |

### O que escrever para garantir compatibilidade total

Para que um script funcione de forma idêntica nos 5 alvos, sem avisos:

1. Cada variável recebe sempre o mesmo tipo de valor, do início ao fim do seu escopo
2. Listas contêm sempre elementos do mesmo tipo
3. Parâmetros de função do tipo lista são anotados explicitamente (`nome: lista`)
4. Ao concatenar número com texto, o número passa sempre por `texto(...)`

Código que segue estas quatro regras compila e executa de forma equivalente em `console`, `python`, `java`, `cpp` e `c`.

### Avisos em `cpp` / `c`

Quando o transpilador detecta uma situação que não pode resolver com segurança nos alvos estaticamente tipados (troca de tipo, lista sem anotação usada com índice, tipo ambíguo), o código gerado inclui um comentário no ponto exato:

```c
/* aviso Chorty: tipo inconsistente para 'resultado' — mantido como texto */
```

O código continua a ser gerado e a compilar — o comentário serve apenas para o aluno perceber a diferença de comportamento entre alvos, sem interromper a transpilação.

---

## 14. Exemplos Completos

### Exemplo 1 — Fatorial (recursão simples)

```chorty
funcao fatorial(n)
se n <= 1
retornar 1
>>>
retornar n * fatorial(n - 1)
>>>

imprimir("Fatorial de 5: " + texto(fatorial(5)))
imprimir("Fatorial de 10: " + texto(fatorial(10)))
```

### Exemplo 2 — Concatenação com múltiplos parâmetros

```chorty
funcao saudacao(nome, idade)
retornar "Olá " + nome + ", você tem " + texto(idade) + " anos"
>>>

imprimir(saudacao("Ana", 25))
```

### Exemplo 3 — Listas, condicional e concatenação combinadas

```chorty
funcao gerarRelatorio(nome: texto, notas: lista)
total = 0
aprovado = "sim"
para i=0 ate 2
total = total + notas[i]
se notas[i] < 5
aprovado = "não"
>>>
>>>
media = total / 3
retornar nome + " — média: " + texto(media) + " — aprovado: " + aprovado
>>>

notasAna = [8, 6, 9]
notasBia = [3, 4, 2]

imprimir(gerarRelatorio("Ana", notasAna))
imprimir(gerarRelatorio("Bia", notasBia))
```

### Exemplo 4 — Fibonacci em ciclo

```chorty
funcao fibonacci(n)
se n <= 1
retornar n
>>>
retornar fibonacci(n - 1) + fibonacci(n - 2)
>>>

para i=0 ate 5
imprimir("fib(" + texto(i) + ") = " + texto(fibonacci(i)))
>>>
```

---

## 15. Bibliotecas Nativas

O modo script tem acesso a um conjunto de bibliotecas nativas, importadas com `usar biblioteca`:

```chorty
usar biblioteca dados.api da
```

O nome depois do `usar biblioteca` é o **alias** — pode ser qualquer nome. É por esse nome que se chamam os métodos da biblioteca.

**Bibliotecas disponíveis:**

| Biblioteca | Para quê |
|---|---|
| [`dados.api`](#151-dadosapi) | Pedidos HTTP (GET, POST, PUT, PATCH, DELETE) |
| [`numerico`](#152-numerico) | Vetores, estatística básica, arredondamento, álgebra simples |
| [`dados.arquivo`](#153-dadosarquivo) | Guardar e ler dados que persistem entre execuções |
| [`texto.json`](#154-textojson) | Converter entre texto JSON e objetos/listas |
| [`texto.regex`](#155-textoregex) | Busca, substituição e validação de texto com expressões regulares |
| [`dados.csv`](#156-dadoscsv) | Ler e escrever dados no formato CSV |
| [`dados.hash`](#157-dadoshash) | Hashing (MD5, SHA-256) e codificação Base64 |
| [`rede.socket`](#158-redesocket) | Comunicação em tempo real via WebSocket |
| [`sistema.processos`](#159-sistemaprocessos) | Reservada para execução de comandos de sistema (ainda não implementada) |

> `desenho.livre` não está listada aqui porque depende de interface (canvas) — é exclusiva do modo com `tela`, não do modo script.

---

### 15.1 dados.api

Biblioteca nativa do Chorty para fazer pedidos HTTP (GET, POST, PUT, PATCH, DELETE) a partir do teu código.

#### Importar

```
usar biblioteca dados.api da
```

O nome depois do `usar biblioteca` é o **alias** — pode ser qualquer nome (`da`, `http`, `api`...). É por esse nome que vais chamar os métodos.

#### Métodos

| Método | Parâmetros | Verbo HTTP | Devolve |
|---|---|---|---|
| `buscar(url)` | `url` | GET | resposta (objeto/lista/texto) |
| `enviar(url, corpo)` | `url`, `corpo` | POST | resposta |
| `atualizar(url, corpo)` | `url`, `corpo` | PUT | resposta |
| `editar(url, corpo)` | `url`, `corpo` | PATCH | resposta |
| `apagar(url)` | `url` | DELETE | resposta |
| `cabecalho(chave, valor)` | `chave`, `valor` | — | o próprio `da` (encadeável) |
| `limparCabecalhos()` | — | — | o próprio `da` (encadeável) |

`buscar` e `apagar` recebem **só a URL**. `enviar`, `atualizar` e `editar` recebem URL **e** o corpo do pedido — o `corpo` é convertido para JSON automaticamente.

#### O que a resposta devolve

- Se o servidor devolver JSON válido, `da.buscar(...)` devolve o dado já convertido — um objeto ou uma lista, dependendo do que veio.
- Se não for JSON, devolve o texto puro.

**Importante:** se a resposta for uma lista de objetos, `imprimir(resultado)` mostra `[object Object]` para cada item. Para ver o conteúdo de verdade, percorre a lista e acede aos campos:

```
resultado = da.buscar(url)
para cada item em resultado
imprimir(item.nome)
>>>
```

Troca `item.nome` pelo nome do campo que existe na tua resposta.

#### Cabeçalhos personalizados

```
da.cabecalho("Accept", "application/json")
da.cabecalho("Authorization", "Bearer " + token)
resultado = da.buscar(url)
```

`cabecalho(...)` é encadeável, então também funciona assim:

```
da.cabecalho("Accept", "application/json").cabecalho("Authorization", token)
```

`limparCabecalhos()` remove todos os cabeçalhos personalizados que já foste definindo.

#### Tratamento de erros

Se o pedido falhar (rede indisponível, CORS bloqueado, ou resposta HTTP fora da faixa 200–299), o método lança um erro. Usa sempre `tentar` / `pegar`:

```
usar biblioteca dados.api da

funcao buscar_dados(url)
tentar
resultado = da.buscar(url)
imprimir(resultado)
pegar erro
imprimir("Falhou: " + erro)
>>>
>>>

buscar_dados("https://raw.githubusercontent.com/adilson889/comunidade-chorty/main/catalogo_libs.json")
```

#### Erros comuns

**"Falhou: NetworkError: Failed to execute 'send' on 'XMLHttpRequest'"**
Duas causas possíveis:

1. **Falta permissão de internet no app.** O `AndroidManifest.xml` precisa ter:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```
Sem isso, *nenhum* pedido de rede funciona, seja qual for a URL.

2. **CORS bloqueado pelo servidor.** Nem todo site permite pedidos vindos de outra origem. Por exemplo, a página do GitHub (`github.com/.../blob/...`) é HTML feito pra navegador, não uma API — não tem CORS aberto. Usa a versão "raw" do arquivo:
```
https://raw.githubusercontent.com/utilizador/repositorio/main/ficheiro.json
```

**`imprimir(resultado)` mostra `[object Object]`**
O `resultado` é uma lista/objeto, não texto. Percorre com `para cada` e acede aos campos (`item.nome`, `item.versao`, etc.) em vez de imprimir a lista inteira.

#### Exemplo completo

```
usar biblioteca dados.api da

funcao buscar_catalogo(url)
tentar
da.cabecalho("Accept", "application/json")
resultado = da.buscar(url)
para cada item em resultado
imprimir(item.nome)
>>>
pegar erro
imprimir("Falhou: " + erro)
>>>
>>>

buscar_catalogo("https://raw.githubusercontent.com/adilson889/comunidade-chorty/main/catalogo_libs.json")
```

---

### 15.2 numerico

Biblioteca nativa do Chorty para operações matemáticas: vetores, estatística básica, arredondamento e álgebra simples.

#### Importar

```
usar biblioteca numerico num
```

#### Métodos

| Método | Parâmetros | Devolve |
|---|---|---|
| `array(a)` | `a` (lista) | cópia da lista |
| `zeros(n)` | `n` | lista de `n` zeros |
| `uns(n)` | `n` | lista de `n` uns |
| `sequencia(a, b, s)` | início, fim (exclusivo), passo opcional (padrão 1) | lista |
| `espacado(a, b, n)` | início, fim, quantidade de pontos | lista com `n` valores igualmente espaçados entre `a` e `b` |
| `soma(a)` | lista | número |
| `media(a)` | lista | número |
| `minimo(a)` | lista | número |
| `maximo(a)` | lista | número |
| `desvio(a)` | lista | desvio padrão |
| `raiz(x)` | número | raiz quadrada |
| `absoluto(x)` | número ou lista | valor absoluto (mapeia se for lista) |
| `arredondar(x, d)` | número, casas decimais opcional | número arredondado |
| `chao(x)` | número | arredonda para baixo |
| `teto(x)` | número | arredonda para cima |
| `aleatorio()` | — | número entre 0 e 1 |
| `aleatorio_inteiro(a, b)` | intervalo | inteiro entre `a` (inclusivo) e `b` (exclusivo) |
| `produto(a, b)` | dois vetores ou duas matrizes | produto escalar (vetores) ou multiplicação de matrizes |
| `pi` | — | valor de pi |
| `e` | — | número de Euler |

#### Notas

- `sequencia(a, b, s)` funciona como um intervalo: `s` pode ser omitido (assume `1`) e o valor `b` **não entra** na lista.
- `pi` e `e` são valores, não funções — usa `num.pi`, sem parênteses.

#### Exemplo

```
usar biblioteca numerico num

funcao estatisticas(lista)
imprimir("Media: " + num.media(lista))
imprimir("Desvio: " + num.arredondar(num.desvio(lista), 2))
imprimir("Min: " + num.minimo(lista) + " Max: " + num.maximo(lista))
>>>

dados = num.sequencia(1, 11)
estatisticas(dados)
```

---

### 15.3 dados.arquivo

Biblioteca nativa do Chorty para guardar e ler dados que ficam salvos entre execuções do app.

#### Importar

```
usar biblioteca dados.arquivo arq
```

#### Métodos

| Método | Parâmetros | Devolve |
|---|---|---|
| `ler(caminho)` | `caminho` | conteúdo salvo (texto), ou `''` se não existir |
| `escrever(caminho, conteudo)` | `caminho`, `conteudo` | `verdadeiro`/`falso` conforme sucesso |
| `existe(caminho)` | `caminho` | `verdadeiro`/`falso` |
| `apagar(caminho)` | `caminho` | `verdadeiro`/`falso` |
| `listar(pasta)` | `pasta` opcional | lista de caminhos guardados que começam com o prefixo dado |

#### Notas

- `conteudo` é sempre guardado como texto — se guardares um objeto ou lista diretamente, ele vira `"[object Object]"`. Converte com `texto.json.paraTexto(...)` antes de guardar dados estruturados, e com `texto.json.paraObjeto(...)` depois de ler.
- `listar(pasta)` retorna os caminhos já "limpos", no mesmo formato que usaste em `escrever`.

#### Exemplo

```
usar biblioteca dados.arquivo arq
usar biblioteca texto.json json

funcao salvar_config(dados)
arq.escrever("config.json", json.paraTexto(dados))
>>>

funcao carregar_config()
se arq.existe("config.json") entao
devolver json.paraObjeto(arq.ler("config.json"))
>>>
devolver {}
>>>
```

---

### 15.4 texto.json

Biblioteca nativa do Chorty para converter entre texto JSON e objetos/listas do Chorty.

#### Importar

```
usar biblioteca texto.json json
```

#### Métodos

| Método | Parâmetros | Devolve |
|---|---|---|
| `paraTexto(objeto)` | objeto ou lista | texto JSON formatado |
| `paraObjeto(texto)` | texto JSON | objeto ou lista, já convertido |
| `validar(texto)` | texto | `verdadeiro`/`falso` |

#### Notas

- `paraTexto` e `paraObjeto` nunca lançam erro: se a conversão falhar, `paraTexto` devolve `''` e `paraObjeto` devolve `{}` (objeto vazio) — não precisa de `tentar`/`pegar` para usar.
- Usa `validar(texto)` quando precisares saber se um texto é JSON válido antes de converter.

#### Exemplo

```
usar biblioteca texto.json json

texto = '{"nome": "Chorty", "versao": 1}'

se json.validar(texto) entao
obj = json.paraObjeto(texto)
imprimir(obj.nome)
senao
imprimir("JSON invalido")
>>>

imprimir(json.paraTexto(obj))
```

---

### 15.5 texto.regex

Biblioteca nativa do Chorty para busca, substituição e validação de texto usando expressões regulares.

#### Importar

```
usar biblioteca texto.regex re
```

#### Métodos

| Método | Parâmetros | Devolve |
|---|---|---|
| `encontrar(texto, padrao)` | texto a buscar, padrão regex | lista com a correspondência encontrada, ou lista vazia se não achar nada |
| `trocar(texto, padrao, novo)` | texto, padrão regex, texto de substituição | texto com todas as ocorrências trocadas |
| `validar(texto, padrao)` | texto, padrão regex | `verdadeiro`/`falso` se o texto inteiro casa com o padrão |

#### Notas

- `padrao` é escrito no formato de expressão regular do JavaScript, sem barras (`/.../`) na frente.
- `trocar` sempre substitui todas as ocorrências, não só a primeira.
- `validar` verifica o texto inteiro (do início ao fim). Se quiseres só checar se o padrão aparece em algum lugar do texto, usa `encontrar` e confere se a lista veio vazia.

#### Exemplo

```
usar biblioteca texto.regex re

email = "contato@chorty.dev"

se re.validar(email, "[^@]+@[^@]+\\.[^@]+") entao
imprimir("Email valido")
>>>

telefone = "Ligue: 912345678 ou 934567890"
numeros = re.encontrar(telefone, "\\d{9}")
imprimir(numeros)

limpo = re.trocar("Ola,   mundo!!!", "\\s+", " ")
imprimir(limpo)
```

---

### 15.6 dados.csv

Biblioteca nativa do Chorty para ler e escrever dados no formato CSV.

#### Importar

```
usar biblioteca dados.csv csv
```

#### Métodos

| Método | Parâmetros | Devolve |
|---|---|---|
| `ler(texto)` | texto no formato CSV | lista de objetos, um por linha (chaves = cabeçalhos) |
| `escrever(dados)` | lista de objetos | texto CSV, com cabeçalho na primeira linha |

#### Notas

- `ler` usa a primeira linha como cabeçalho, separado por vírgulas.
- Todos os valores lidos vêm como texto, mesmo que pareçam números — converte manualmente quando precisares (ex.: `numero(item.idade)`).
- `escrever` usa as chaves do primeiro objeto da lista como cabeçalhos.

#### Exemplo

```
usar biblioteca dados.csv csv

texto = "nome,idade\nAna,30\nBruno,25"

pessoas = csv.ler(texto)
para cada p em pessoas
imprimir(p.nome + " tem " + p.idade + " anos")
>>>

saida = csv.escrever(pessoas)
imprimir(saida)
```

---

### 15.7 dados.hash

Biblioteca nativa do Chorty para hashing (MD5, SHA-256) e codificação Base64.

#### Importar

```
usar biblioteca dados.hash hash
```

#### Métodos

| Método | Parâmetros | Devolve |
|---|---|---|
| `md5(texto)` | texto | hash MD5 em hexadecimal |
| `sha256(texto)` | texto | hash SHA-256 em hexadecimal |
| `base64(texto)` | texto | texto codificado em Base64 |

#### Notas

- MD5 é útil para checksums simples ou chaves de cache, mas não deve ser usado para senhas ou segurança. Para isso, prefere `sha256`.
- `base64(texto)` pode não funcionar corretamente com textos que tenham acentuação ou emojis.

#### Exemplo

```
usar biblioteca dados.hash hash

senha = "minhaSenha123"
imprimir("SHA-256: " + hash.sha256(senha))
imprimir("MD5 (checksum): " + hash.md5(senha))
imprimir("Base64: " + hash.base64("Chorty"))
```

---

### 15.8 rede.socket

Biblioteca nativa do Chorty para comunicação em tempo real via WebSocket.

#### Importar

```
usar biblioteca rede.socket ws
```

#### Métodos

| Método | Parâmetros | Devolve |
|---|---|---|
| `conectar(url)` | URL do servidor (`ws://` ou `wss://`) | `verdadeiro`/`falso` |
| `enviar(mensagem)` | mensagem (convertida para texto) | `verdadeiro`/`falso` |
| `receber()` | — | próxima mensagem recebida, ou `nulo` se não houver nenhuma |
| `fechar()` | — | `verdadeiro` |

#### Notas

- Depois de `conectar`, espera um pouco antes de `enviar` — a conexão leva um instante para abrir.
- `receber()` funciona tirando uma mensagem por vez de uma fila. Se quiseres checar se chegou algo novo, chama `receber()` periodicamente (por exemplo, dentro de um loop com uma pequena espera).

#### Exemplo

```
usar biblioteca rede.socket ws

ws.conectar("wss://echo.websocket.org")

esperar(500)

ws.enviar("Ola servidor")

esperar(500)

mensagem = ws.receber()
se mensagem != nulo entao
imprimir("Recebido: " + mensagem)
>>>

ws.fechar()
```

---

### 15.9 sistema.processos

Biblioteca nativa do Chorty reservada para execução de comandos de sistema.

#### Importar

```
usar biblioteca sistema.processos sis
```

#### Métodos

| Método | Parâmetros | Devolve |
|---|---|---|
| `executar(comando)` | texto do comando | texto informando que a operação não é suportada |

#### Estado atual

Esta biblioteca ainda não está implementada. `executar(comando)` não roda nada de verdade — só devolve uma mensagem dizendo que o comando não é suportado.

#### Exemplo

```
usar biblioteca sistema.processos sis

resultado = sis.executar("ls -la")
imprimir(resultado)
```

---

### 15.10 servidor

Biblioteca nativa do Chorty para declarar rotas HTTP e correr um servidor web a partir do teu código.

#### Importar

```
usar biblioteca servidor srv
```

#### Métodos

| Método | Parâmetros | Devolve |
|---|---|---|
| `rota(caminho, metodo, funcao)` | caminho (`"/"`), método (`"GET"`, `"POST"`...), função a chamar | o próprio `srv` (encadeável) |
| `executar(porta)` | porta (número, por omissão `8080`) | o próprio `srv` |

`rota(...)` regista um caminho — quando alguém acede a esse caminho, a `funcao` indicada é chamada e o valor que ela devolver (com `retornar`) é o que aparece no navegador.

`executar(porta)` liga o servidor. Depois de chamado, o site fica acessível em `http://localhost:<porta>` (ou pelo IP do telemóvel na mesma rede Wi-Fi).

#### Exemplo

```
usar biblioteca servidor srv

funcao inicio()
retornar "Bem-vindo ao meu site!"
>>>

funcao ola()
retornar "Olá, mundo!"
>>>

srv.rota("/", "GET", inicio)
srv.rota("/ola", "GET", ola)

srv.executar(8080)
```

#### Estado atual

- `srv.rota(...)`: já funciona — regista as rotas normalmente.
- `srv.executar(...)`: no alvo `console`, ainda **simula** a execução (mostra as rotas registadas nos logs, mas não abre nenhuma porta real). Em `python`, `java`, `cpp` e `c`, esta biblioteca ainda não está implementada.

Esta biblioteca está em desenvolvimento ativo — o comportamento pode mudar em versões futuras.

---

### 15.11 Bloco de texto bruto `<<< >>>`

Escreve HTML, CSS ou qualquer texto multi-linha sem escapar nada — sem comentário em `#`, sem chaveta a quebrar o parser, sem aspas simples/duplas a fechar cedo.

```chorty
html = <<<
<div style='padding:20px'>
<h1 style='color:#0f172a'>Ola, Chorty!</h1>
</div>
>>>
```

- Tudo entre `<<<` e `>>>` é copiado literalmente, incluindo quebras de linha.
- `#`, `{`, `}`, `'`, `"` dentro do bloco não têm significado especial.
- O resultado é uma `texto` normal — usa `retornar`, concatena, passa como argumento.

---

### 15.12 mostrar_html

Mostra HTML diretamente no ecrã, sem precisar de `servidor`/`srv` nem de `config`. Funciona em qualquer script — o Chorty deteta a chamada e monta a tela sozinho.

```chorty
funcao pagina_inicial()
html = <<<
<div style='font-family:sans-serif;text-align:center;padding:60px'>
<h1>Bem-vindo ao Chorty!</h1>
</div>
>>>
mostrar_html(html)
>>>

pagina_inicial()
```

- `renderizar(html)` e `mostrar_tela(html)` são aliases — fazem o mesmo.
- Podes chamar de novo dentro de outra função para trocar o que está no ecrã (ex.: resposta a um clique).
- `onclick`, `<script>` e `<style>` dentro do HTML funcionam normalmente, como em qualquer página web.

```chorty
funcao entrar()
mostrar_html("<h1 style='text-align:center;padding:60px'>Login feito!</h1>")
>>>

funcao pagina_login()
html = <<<
<button onclick='entrar()'>Entrar</button>
>>>
mostrar_html(html)
>>>

pagina_login()
```

Funções chamadas por `onclick` (mesmo que usem `mostrar_html` de novo) mantêm o acesso a todas as funções Chorty do programa — o runtime é reconstruído a cada troca de tela.

---