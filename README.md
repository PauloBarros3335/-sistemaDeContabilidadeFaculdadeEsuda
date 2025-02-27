# Sistema de Contabilidade - Faculdade Esuda

Este projeto é um sistema de contabilidade desenvolvido para a Faculdade Esuda. Ele permite o gerenciamento de alunos, funcionários e despesas, além de fornecer gráficos e relatórios para análise financeira.

## Funcionalidades

- **Cadastro de Alunos:**
  - Nome, curso e mensalidade.
  - Situação (Adimplente/Inadimplente).

- **Cadastro de Funcionários:**
  - Nome, cargo e salário.

- **Registro de Despesas:**
  - Descrição e valor.

- **Gráficos:**
  - Visualização de receitas (mensalidades) e despesas.

- **Relatórios:**
  - Total de receitas, despesas e saldo atual.
  - Lista de alunos inadimplentes.

- **Exportação de Dados:**
  - Exportar dados dos alunos para CSV.

- **Apagar Registros:**
  - Botão para apagar todos os registros de alunos, funcionários e despesas.

## Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3 (com responsividade para diferentes tamanhos de tela)
  - JavaScript (Vanilla JS)
  - Chart.js (para gráficos)

- **Armazenamento:**
  - LocalStorage (para persistência de dados no navegador)

## Como Usar

1. **Login:**
   - Acesse a página de login (`index.html`).
   - Use as credenciais:
     - E-mail: `admin@universidade.com`
     - Senha: `123456`

2. **Dashboard:**
   - Após o login, você será redirecionado para a página principal (`dashboard.html`).
   - Navegue pelas seções para cadastrar alunos, funcionários e despesas.
   - Visualize gráficos e gere relatórios.

3. **Exportar Dados:**
   - Clique no botão "Exportar para CSV" para baixar os dados dos alunos em formato CSV.

4. **Apagar Registros:**
   - Clique no botão "Apagar Todos os Registros" para remover todos os dados cadastrados.

## Responsividade

O sistema foi desenvolvido para ser totalmente responsivo, funcionando bem em:

- Smartphones pequenos (a partir de 300px).
- Smartphones maiores (400px - 767px).
- Tablets (768px - 1023px).
- Notebooks e telas médias (1024px - 1440px).
- Telas grandes (acima de 1440px).

## Estrutura do Projeto
