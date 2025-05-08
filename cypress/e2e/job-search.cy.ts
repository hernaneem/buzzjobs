describe("Job Search", () => {
  beforeEach(() => {
    cy.visit("/jobs")

    // Mock job search API response
    cy.intercept("GET", "**/rest/v1/jobs*", {
      statusCode: 200,
      body: [
        {
          id: "job-1",
          title: "Frontend Developer",
          company: "Tech Corp",
          location: "Remote",
          salary_range: "$80,000 - $100,000",
          tags: ["React", "TypeScript", "Next.js"],
          is_remote: true,
          is_new: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "job-2",
          title: "Backend Developer",
          company: "Data Systems",
          location: "New York, NY",
          salary_range: "$90,000 - $120,000",
          tags: ["Node.js", "PostgreSQL", "AWS"],
          is_remote: false,
          is_new: false,
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    }).as("getJobs")
  })

  it("displays job search form", () => {
    cy.get("form").within(() => {
      cy.get("input[placeholder*='Buscar']").should("be.visible")
      cy.get("select").should("be.visible")
      cy.get("button[type='submit']").should("be.visible")
    })
  })

  it("displays job listings", () => {
    cy.wait("@getJobs")

    cy.get("[data-testid='job-card']").should("have.length", 2)
    cy.contains("Frontend Developer").should("be.visible")
    cy.contains("Backend Developer").should("be.visible")
  })

  it("filters jobs by search term", () => {
    // Mock filtered job search API response
    cy.intercept("GET", "**/rest/v1/jobs*", {
      statusCode: 200,
      body: [
        {
          id: "job-1",
          title: "Frontend Developer",
          company: "Tech Corp",
          location: "Remote",
          salary_range: "$80,000 - $100,000",
          tags: ["React", "TypeScript", "Next.js"],
          is_remote: true,
          is_new: true,
          created_at: new Date().toISOString(),
        },
      ],
    }).as("getFilteredJobs")

    cy.get("input[placeholder*='Buscar']").type("Frontend")
    cy.get("button[type='submit']").click()

    cy.wait("@getFilteredJobs")
    cy.get("[data-testid='job-card']").should("have.length", 1)
    cy.contains("Frontend Developer").should("be.visible")
    cy.contains("Backend Developer").should("not.exist")
  })

  it("filters jobs by location", () => {
    // Mock location filtered job search API response
    cy.intercept("GET", "**/rest/v1/jobs*", {
      statusCode: 200,
      body: [
        {
          id: "job-2",
          title: "Backend Developer",
          company: "Data Systems",
          location: "New York, NY",
          salary_range: "$90,000 - $120,000",
          tags: ["Node.js", "PostgreSQL", "AWS"],
          is_remote: false,
          is_new: false,
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    }).as("getLocationFilteredJobs")

    cy.get("select").select("New York, NY")
    cy.get("button[type='submit']").click()

    cy.wait("@getLocationFilteredJobs")
    cy.get("[data-testid='job-card']").should("have.length", 1)
    cy.contains("Backend Developer").should("be.visible")
    cy.contains("Frontend Developer").should("not.exist")
  })

  it("navigates to job details page when clicking on a job", () => {
    cy.wait("@getJobs")
    cy.contains("Frontend Developer").click()
    cy.url().should("include", "/jobs/job-1")
  })

  it("shows empty state when no jobs match filters", () => {
    // Mock empty job search API response
    cy.intercept("GET", "**/rest/v1/jobs*", {
      statusCode: 200,
      body: [],
    }).as("getEmptyJobs")

    cy.get("input[placeholder*='Buscar']").type("NonExistentJobTitle")
    cy.get("button[type='submit']").click()

    cy.wait("@getEmptyJobs")
    cy.contains("No se encontraron empleos").should("be.visible")
  })
})
