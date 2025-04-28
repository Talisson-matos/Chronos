# Arquitetura do Sistema

## Nome
Genética

## Objetivo
website informativo sobre principais temas da área da génetica.

## Visão Geral
Este documento descreve a arquitetura do sistema, incluindo seus principais componentes e interações.

## Componentes Principais
- **Frontend:** Interface do usuário construída com React/Next.JS/Typescript.
- **Backend:** API REST desenvolvida em Next.js API Routes.
- **Banco de Dados:** MongoDB utilizado para armazenamento de dados.
- **Conteinerização** pode rodar em qualquer sistema operacional que suporte Docker (Linux, macOS, Windows).

# Fluxo de Dados

## 1. O usuário interage com o frontend
- O componente `Header` permite que o usuário altere o tema (claro ou escuro), e essa configuração é salva no `localStorage`.
- O componente `TextContent` exibe o conteúdo principal da página, incluindo um menu responsivo e seções de texto.
- Quando a página é carregada, o componente `TextContent` faz uma requisição para a API `api/texto1` para buscar dados do banco de dados.

## 2. O frontend envia requisições HTTP para o backend
- No componente `TextContent`, a função `fetch("api/texto1")` é usada para enviar uma requisição HTTP para o endpoint `/api/texto1`.
- Essa requisição é feita no `useEffect`, que é executado quando o componente é montado.

## 3. O backend processa os dados e consulta o MongoDB
- O arquivo `pages/api/texto1.ts` define um endpoint da API que processa a requisição.
- A função `handler` conecta ao banco de dados MongoDB usando a função `connectToDatabase` do arquivo `mongodb.ts`.
- O backend consulta a coleção `texto1` no banco de dados MongoDB e retorna os dados encontrados.

## 4. O backend retorna respostas para o frontend
- O backend retorna os dados da coleção `texto1` no formato JSON.
- No componente `TextContent`, os dados retornados são processados e exibidos na página. Se os dados ainda não estiverem disponíveis, um spinner de carregamento é exibido.

---

## Detalhamento do Fluxo

### **Frontend (Componente `TextContent`)**
1. O componente `TextContent` é renderizado.
2. O `useEffect` faz uma requisição para o endpoint `/api/texto1`.
3. Quando os dados são recebidos, o estado `texto1` é atualizado com o conteúdo retornado.
4. O conteúdo é exibido na página usando `dangerouslySetInnerHTML`.

### **Backend (API `/api/texto1`)**
1. O endpoint `/api/texto1` é chamado pelo frontend.
2. A função `connectToDatabase` conecta ao banco de dados MongoDB.
3. A coleção `texto1` é consultada usando `collection.find({}).toArray()`.
4. Os dados são retornados no formato JSON.

### **Banco de Dados (MongoDB)**
1. O MongoDB armazena os dados na coleção `texto1`.
2. O backend consulta essa coleção e retorna os dados para o frontend.

---

## Resumo do Fluxo
1. **Interação do Usuário**: O usuário acessa a página e interage com o tema ou navega pelas seções.
2. **Requisição ao Backend**: O frontend solicita dados ao backend.
3. **Processamento no Backend**: O backend consulta o MongoDB e retorna os dados.
4. **Exibição no Frontend**: Os dados são exibidos na página para o usuário.

## Decisões Arquiteturais
- Optamos pelo MongoDB devido à necessidade de escalabilidade e flexibilidade na estrutura dos dados.
- A comunicação entre frontend e backend ocorre via REST API, garantindo modularidade.
- Portabilidade:  aplicação pode rodar em qualquer sistema operacional que suporte Docker (Linux, macOS, Windows), desde que o Docker esteja instalado e configurado corretamente.


## Tecnologias Utilizadas
| Componente     |   Tecnologia    |
|----------------|-----------------|
| Frontend       |   Next.jS       |
| Backend        |   Next.JS       |
| Banco de Dados |   MongoDB       |
| Devops         |   Docker        |

## Considerações Finais
Essa arquitetura foi escolhida com foco em escalabilidade e facilidade de manutenção. Futuras melhorias podem incluir a adoção de GraphQL ou otimizações na infraestrutura.


