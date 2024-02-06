describe("Blog app", () => {

  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    const user = {
      name: "Matti Luukkainen",
      userName: "mluukkai",
      password: "salainen"
    }
    cy.request("POST", "http://localhost:3003/users/", user)

    cy.visit("http://localhost:5173")
  })

  describe("Login", () => {
    it("Succeeds with correct credentials", () => {
      cy.get("#username").type("mluukkai")
      cy.get("#password").type("salainen")
  
      cy.contains("log in").click()
  
      cy.contains("Matti Luukkainen logged in")
    })
    
    it("fails with wrong credentials", () => {
      cy.get("#username").type("a")
      cy.get("#password").type("a")
  
      cy.contains("log in").click()
      
      cy.get(".error").contains("Wrong credentials")
      cy.get(".error").should("have.css", "color", "rgb(120, 0, 0)")
      cy.get(".error").invoke("css", "background").should("match", /^rgb\(255, 190, 190\)/)

    })
  })

  describe("when logged in", () => {
    beforeEach(() => {
      cy.get("#username").type("mluukkai")
      cy.get("#password").type("salainen")
      cy.contains("log in").click()
    })

    it("a blog can be created", () => {
      cy.contains("Add a blog").click()
      cy.get("#title").type("Test blog")
      cy.get("#author").type("mluukkai's test blog")
      cy.get("#url").type("tb.com")

      cy.contains("create").click()

      cy.contains("New blog added!")

    })

    describe("User interacting with blogs", () => {
      
      beforeEach(() => {
        cy.contains("Add a blog").click()
        cy.get("#title").type("Test blog")
        cy.get("#author").type("mluukkai's test blog")
        cy.get("#url").type("tb.com")

        cy.contains("create").click()
        cy.contains("view").click();
      })

      it("A user can like a blog", () => {

        cy.contains("0 likes").should("exist");

        cy.contains("like").click();

        cy.contains("1 likes").should("exist");
        
      })
      it("A user can delete any of his blogs", () => {
        cy.contains("Test blog").contains("mluukkai's test blog")
        cy.contains("Delete blog").click();

        cy.contains("Test blog").should("not.exist");
        cy.contains("mluukkai's test blog").should("not.exist");
      })
      it("Only the creator of a blog can see its delete button", () => {
        cy.contains("log out").click();

        const user = {
          name: "Not Matti",
          userName: "imNotMatti",
          password: "123"
        }
        cy.request("POST", "http://localhost:3003/users/", user)

        cy.get("#username").type("imNotMatti")
        cy.get("#password").type("123")
        cy.contains("log in").click()

        cy.contains("view").click();

        cy.contains("Delete blog").should("not.exist");
      })
      it("Blogs are ordered by likes", () => {
        
        cy.contains("Add a blog").click()
        cy.get("#title").type("Test blog 2")
        cy.get("#author").type("mluukkai's test blog 2")
        cy.get("#url").type("tb2.com")
        
        cy.contains("create").click()
        
        cy.contains("view").click();
        cy.contains("Test blog 2").parent().contains("like").click()
        
        cy.get(".blog").eq(0).should("contain", "Test blog 2")
        cy.get(".blog").eq(1).should("contain", "Test blog")
      })
    })

  })
})