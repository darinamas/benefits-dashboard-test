# Paylocity STE Assessment – QA Automation 🚀

This repository contains my submission for the **Paylocity Software Test Engineer assessment** 

## Contents 

* **UI and API automation tests** (Playwright + TypeScript) 🖥️
* **Postman API collection** 📬
* **Bug reports for UI and API issues** 🐞

## Project Structure 📁

```
tests/
  ui/        UI tests
  api/       API tests

pages/       Page Object Model
fixtures/    Playwright fixtures
test-data/   Test data
postman/     Postman collection

```
## Key Features

- **Page Object Model (POM)**  
  UI interactions are encapsulated in page classes, improving readability, maintainability, and reusability of tests.

- **Factory Pattern for Test Data**  
  Test data is generated dynamically using factory classes, allowing consistent and reusable creation of test entities.

- **Playwright Fixtures**  
  Custom fixtures provide shared test resources such as API clients, authenticated pages, and prepared test data.

- **API + UI Hybrid Testing**  
  API calls are used to prepare test data, create employee and perform cleanup, while UI tests validate the user interface behavior.

- **Test Data Isolation**  
  Each test creates its own independent data, ensuring tests can run in parallel without affecting each other.

- **Automatic Test Cleanup**  
  Test data created during tests is automatically removed after execution, keeping the test environment clean.

- **Modular Project Architecture**  
  The project is organized into logical modules (pages, API clients, fixtures, test data, utils, tests), improving scalability and maintainability.
  
## Setup ⚙️

Install dependencies:

```
npm install
```

Install Playwright browsers:

```
npx playwright install
```

## Run Tests ▶️

```
npx playwright test
```

Open report:

```
npx playwright show-report
```

---
<img width="2852" height="3866" alt="Playwright-Test-Report-03-17-2026_02_57_PM" src="https://github.com/user-attachments/assets/359e8db1-2f20-4b56-a607-882062bed1f8" />

