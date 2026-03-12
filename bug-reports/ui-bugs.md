## UI-001 — Username and Password fields allow extremely large maximum input length

**Priority:** Medium  
**Type:** Validation / Input Constraint  

---

### Description
The **Username** and **Password** input fields on the login page allow an extremely large maximum length value (`2147483647`). Allowing such a large input size may cause performance issues or unexpected behavior when processing user input.

---

### Environment
**Application:** Paylocity Benefits Dashboard  
**Page:** Login Page  
**Browser:** Chrome  
**URL:** https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login  

---

### Steps to Reproduce
1. Open the login page in a web browser.
2. Open **Developer Tools**.
3. Inspect the **Username** input field.
4. Check the `maxlength` attribute.
5. Repeat the same for the **Password** input field.

---

### Actual Result
Both **Username** and **Password** input fields contain the following attribute: maxlength="2147483647"

### Expected Result
Input fields should have reasonable validation limits based on typical authentication standards.

Example recommended limits:
- **Username:** 50 characters  
- **Password:** 128 characters  

Screenshot: 
![Username and Password lenght issue](../screenshots/ui/username_password_lenght_issue.png)

