document.addEventListener("DOMContentLoaded", function () {
  // Banco de dados (simulado com arrays)
  let alunos = [];
  let funcionarios = [];
  let despesas = [];

  // Função para fazer login
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      if (email === "admin@universidade.com" && senha === "123456") {
        localStorage.setItem("logado", "true");
        window.location.href = "dashboard.html"; // Redirecionar para a página principal
      } else {
        alert("E-mail ou senha incorretos!");
      }
    });
  }

  // Verificar se o usuário está logado ao carregar a página
  if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("logado") !== "true") {
      window.location.href = "index.html"; // Redirecionar para o login se não estiver logado
    } else {
      carregarDados(); // Carregar dados salvos
      atualizarGrafico(); // Atualizar gráfico ao carregar a página
    }
  }

  // Função para cadastrar alunos
  const formAluno = document.getElementById("formAluno");
  if (formAluno) {
    formAluno.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("nomeAluno").value;
      const curso = document.getElementById("cursoAluno").value;
      const mensalidade = parseFloat(
        document.getElementById("mensalidadeAluno").value
      );

      const aluno = {
        nome,
        curso,
        mensalidade,
        situacao: "Adimplente",
      };
      alunos.push(aluno);
      alert(`Aluno ${nome} cadastrado com sucesso!`);
      this.reset();
      salvarDados();
      atualizarGrafico();
    });
  }

  // Função para cadastrar funcionários
  const formFuncionario = document.getElementById("formFuncionario");
  if (formFuncionario) {
    formFuncionario.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("nomeFuncionario").value;
      const cargo = document.getElementById("cargoFuncionario").value;
      const salario = parseFloat(
        document.getElementById("salarioFuncionario").value
      );

      const funcionario = {
        nome,
        cargo,
        salario,
      };
      funcionarios.push(funcionario);
      alert(`Funcionário ${nome} cadastrado com sucesso!`);
      this.reset();
      salvarDados();
    });
  }

  // Função para registrar despesas
  const formDespesa = document.getElementById("formDespesa");
  if (formDespesa) {
    formDespesa.addEventListener("submit", function (e) {
      e.preventDefault();
      const descricao = document.getElementById("descricaoDespesa").value;
      const valor = parseFloat(document.getElementById("valorDespesa").value);

      const despesa = {
        descricao,
        valor,
      };
      despesas.push(despesa);
      alert(`Despesa "${descricao}" registrada com sucesso!`);
      this.reset();
      salvarDados();
      atualizarGrafico();
    });
  }

  // Função para gerar relatório
  const botaoRelatorio = document.getElementById("gerarRelatorio");
  if (botaoRelatorio) {
    botaoRelatorio.addEventListener("click", function () {
      const totalReceitas = calcularTotalReceitas();
      const totalDespesas = calcularTotalDespesas();
      const saldo = totalReceitas - totalDespesas;
      const inadimplentes = alunos.filter(
        (aluno) => aluno.situacao === "Inadimplente"
      );

      const relatorio = `
              <h3>Relatório de Contabilidade</h3>
              <p><strong>Total de Receitas:</strong> R$ ${totalReceitas.toFixed(
                2
              )}</p>
              <p><strong>Total de Despesas:</strong> R$ ${totalDespesas.toFixed(
                2
              )}</p>
              <p><strong>Saldo Atual:</strong> R$ ${saldo.toFixed(2)}</p>
              <p><strong>Alunos Inadimplentes:</strong></p>
              <ul>
                  ${inadimplentes
                    .map((aluno) => `<li>${aluno.nome} (${aluno.curso})</li>`)
                    .join("")}
              </ul>
          `;

      document.getElementById("relatorio").innerHTML = relatorio;
    });
  }

  // Função para exportar dados para CSV
  const botaoExportarCSV = document.getElementById("exportarCSV");
  if (botaoExportarCSV) {
    botaoExportarCSV.addEventListener("click", function () {
      const csv =
        "Nome,Curso,Mensalidade,Situação\n" +
        alunos
          .map(
            (aluno) =>
              `${aluno.nome},${aluno.curso},${aluno.mensalidade},${aluno.situacao}`
          )
          .join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "alunos.csv";
      link.click();
    });
  }

  // Função para atualizar o gráfico
  function atualizarGrafico() {
    const ctx = document
      .getElementById("graficoReceitasDespesas")
      .getContext("2d");
    if (window.grafico) {
      window.grafico.destroy(); // Destruir gráfico existente
    }
    window.grafico = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Receitas", "Despesas"],
        datasets: [
          {
            label: "Valores",
            data: [calcularTotalReceitas(), calcularTotalDespesas()],
            backgroundColor: ["#3498db", "#e74c3c"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Funções auxiliares
  function calcularTotalReceitas() {
    return alunos.reduce((total, aluno) => total + aluno.mensalidade, 0);
  }

  function calcularTotalDespesas() {
    return despesas.reduce((total, despesa) => total + despesa.valor, 0);
  }

  function salvarDados() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    localStorage.setItem("despesas", JSON.stringify(despesas));
  }

  function carregarDados() {
    const alunosSalvos = localStorage.getItem("alunos");
    const funcionariosSalvos = localStorage.getItem("funcionarios");
    const despesasSalvas = localStorage.getItem("despesas");

    if (alunosSalvos) alunos = JSON.parse(alunosSalvos);
    if (funcionariosSalvos) funcionarios = JSON.parse(funcionariosSalvos);
    if (despesasSalvas) despesas = JSON.parse(despesasSalvas);
  }
});
