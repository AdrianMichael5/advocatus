describe("Agenda e2e tests", () => {
  beforeEach(() => {
    cy.exec('del /f db.sqlite3');
    cy.exec('python manage.py migrate');
    cy.visit("/");
    cy.get(".register").click();
    cy.get("#username").type("adrian");
    cy.get("#email").type("adrian@gmail.com");
    cy.get("#password").type("123");
    cy.get("#password2").type("123");
    cy.get(".btnbtn-primary").click();
    cy.wait(2000);
    cy.visit("login/");
    cy.get("#username").type("adrian");
    cy.get("#password").type("123");
    cy.get(".btnbtn-primary").click();
    cy.visit("");
    cy.wait(2000); 
  });
const addClient1 = () => {
  cy.visit("");
  cy.get(".cliente").click();
  cy.wait(1000); 
  cy.get(".add-client").click();
  cy.get("#name").type("rafael");
  cy.get("#cell").type("81995750921");
  cy.get("#birthdate").type("2004-10-08");
  cy.get("#cpf").type("13387878451");
  cy.get("#cep").type("53439-360");
  cy.get("#adress").type("Rua rui barbosa,832");
  cy.get("#states").select("Pernambuco");
  cy.get("#states").should("have.value", "PE");
  cy.get("#city").type("recife");
  cy.get("#neighborhood").type("boa viagem");
  cy.get("#role").type("estudante");
  cy.get(".submit-button").click();
  cy.wait(2000); 
  cy.visit("");
};

const addProcess = () => {
  cy.get(".processes").click();
  cy.get(".add-process").click();
  cy.wait(1000); 
  cy.get("input[name='tipo']").type("Cível");
  cy.get("input[name='titulo']").type("Processo Teste");
  cy.get("input[name='tipo_acao']").type("Cobrança");
  cy.get("select[name='cliente']").select("rafael"); 
  cy.get("input[name='contrario']").type("Parte Contrária");
  cy.get("input[name='numero_pasta']").type("12345");
  cy.get("input[name='numero_cnj']").type("54321");
  cy.get("input[name='detalhes_pasta']").type("Detalhes do processo");
  cy.get("input[name='advogado']").type("Advogado Teste");
  cy.get("input[name='push_andamentos']").type("Sim");
  cy.get("input[name='comarca']").type("Comarca Teste");
  cy.get("input[name='juiz']").type("Juiz Teste");
  cy.get("select[name='risco']").select("Baixo");
  cy.get("input[name='tribunal']").type("Tribunal Teste");
  cy.get("select[name='uf']").select("SP");
  cy.get("select[name='instancia']").select("Primeira Instância");
  cy.get("input[name='vara']").type("Vara Teste");
  cy.get("input[name='valor_causa']").type("10000");
  cy.get("input[name='valor_possivel']").type("15000");
  cy.get("input[name='valor_provisionado']").type("12000");
  cy.get(".submit-button").click({ multiple: true });
  cy.wait(2000); 
  cy.get(".alert-success").should("contain", "Processo cadastrado com sucesso!");
};


  it("Caso favorável para adicionar despesa", () => {
    addClient1();
    addProcess();
    cy.get(".financeiro").click();
    cy.get(".add-finance").click();
    cy.get("select[name='process_title']").select("Processo Teste");
    cy.get("textarea[name='description']").type("Custos");
    cy.get("input[name='amount']").type("500.00");
    cy.get("input[name='expense_date']").type("2023-10-10");
    cy.get("select[name='expense_type']").select("judicial_fee").should("have.value", "judicial_fee");
    cy.wait(2000);
    cy.get(".submit-button").click();
    cy.get(".alert-success").should("contain", "Despesa cadastrada com sucesso!");
    cy.wait(2000);
  });

  it("Caso desfavorável para adicionar despesa", () => {
    addClient1();
    addProcess();
    cy.get(".financeiro").click();
    cy.get(".add-finance").click();
    cy.get("select[name='process_title']").select("Processo Teste");
    cy.get("textarea[name='description']").type("Custos");
    cy.get("input[name='amount']").type("-100");
    cy.get("input[name='expense_date']").type("2023-10-10");
    cy.get("select[name='expense_type']").select("operational").should("have.value", "operational");
    cy.get(".submit-button").click();
    cy.wait(2000);
  });

  it("Caso favoravel para gerenciar uma despesa", () => {
    addClient1();
    addProcess();
    cy.get(".financeiro").click();
    cy.get(".add-finance").click();
    cy.get("select[name='process_title']").select("Processo Teste");
    cy.get("textarea[name='description']").type("Custos");
    cy.get("input[name='amount']").type("500.00");
    cy.get("input[name='expense_date']").type("2023-10-10");
    cy.get("select[name='expense_type']").select("judicial_fee").should("have.value", "judicial_fee");
    cy.wait(2000);
    cy.get(".submit-button").click();
    cy.get(".alert-success").should("contain", "Despesa cadastrada com sucesso!");
    cy.wait(2000);
    cy.get(".edit-despesa").click();
    cy.get("input[name='amount']").clear().type("250.00");
    cy.wait(2000);
    cy.get(".submit-button").click();
    cy.get(".alert-success").should("contain", "Despesa editada com sucesso!");
    cy.wait(2000);
    cy.get(".delete-despesa").click();
    cy.wait(2000);
    cy.get(".confirm-button").click();
    cy.get(".alert-success").should("contain", "Despesa deletada com sucesso!");
    cy.wait(2000);
  });

it("Caso desfavoravel para gerenciar uma despesa", () => {
  addClient1();
  addProcess();
  cy.get(".financeiro").click();
  cy.get(".add-finance").click();
  cy.get("select[name='process_title']").select("Processo Teste");
  cy.get("textarea[name='description']").type("Custos");
  cy.get("input[name='amount']").type("500.00");
  cy.get("input[name='expense_date']").type("2023-10-10");
  cy.get("select[name='expense_type']").select("operational").should("have.value", "operational");
  cy.wait(2000);
  cy.get(".submit-button").click();
  cy.get(".alert-success").should("contain", "Despesa cadastrada com sucesso!");
  cy.wait(2000);
  cy.get(".edit-despesa").click();
  cy.get("input[name='amount']").clear().type("-100");
  cy.wait(2000);
  cy.get(".submit-button").click();
  cy.wait(2000);
});
});