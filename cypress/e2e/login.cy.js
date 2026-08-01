describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı giriş yapılabiliyor", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("Test1234");
    cy.get('input[name="terms"]').check();

    cy.get("button").should("not.be.disabled").click();

    cy.url().should("include", "/success");
    cy.contains("Giriş Başarılı!").should("be.visible");
  });

  it("Yanlış email hata mesajı gösteriyor", () => {
    cy.get('input[name="email"]').type("yanlis");
    cy.get('input[name="password"]').type("Test1234");
    cy.get('input[name="terms"]').check();

    cy.get(".error").should("have.length", 1);
    cy.contains("Geçerli bir email giriniz.").should("be.visible");
    cy.get("button").should("be.disabled");
  });

  it("Email ve password yanlış", () => {
    cy.get('input[name="email"]').type("abc");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="terms"]').check();

    cy.get(".error").should("have.length", 2);
    cy.contains("Geçerli bir email giriniz.").should("be.visible");
    cy.contains(
      "Şifre en az 8 karakter, büyük harf, küçük harf ve rakam içermelidir."
    ).should("be.visible");

    cy.get("button").should("be.disabled");
  });

  it("Checkbox işaretlenmediğinde buton disabled", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("Test1234");

    cy.get('input[name="terms"]').should("not.be.checked");
    cy.get("button").should("be.disabled");
  });
});