# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginPage_Fixture.spec.ts >> @smoke LoginTest
- Location: tests/loginPage_Fixture.spec.ts:13:1

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://naveenautomationlabs.com/opencart/index.php?route=account/login", waiting until "load"

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | import { BasePage } from "./BasePage";
  3  | 
  4  | export class LoginPage extends BasePage{
  5  | 
  6  |     //private Locators
  7  |     private readonly emailID:Locator;
  8  |     private readonly password:Locator;
  9  |     private readonly loginBtn:Locator;
  10 |     private readonly forgottenPwdLink:Locator;
  11 |     private readonly loginErrMsg:Locator;
  12 | 
  13 | 
  14 |     constructor(page:Page){
  15 |         super(page);
  16 |         this.emailID=page.getByRole('textbox',{name:'E-Mail Address'});
  17 |         this.password=page.getByRole('textbox',{name:'Password'});
  18 |         this.loginBtn=page.getByRole('button',{name:'Login'});
  19 |         this.forgottenPwdLink=page.getByRole('link',{name:'Forgotten Password'}).first();
  20 |         this.loginErrMsg=page.locator(".alert.alert-danger.alert-dismissible");
  21 |     }
  22 | 
  23 |     async goToLoginPage():Promise<void>{
  24 | 
> 25 |         await this.page.goto('opencart/index.php?route=account/login');
     |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  26 | 
  27 |     }
  28 | 
  29 |     async getLoginPageTitle():Promise<string>{
  30 |        return await this.page.title();
  31 |     }
  32 | 
  33 |     async isForgotPwdLinkExist():Promise<boolean>{
  34 |         return await this.forgottenPwdLink.isVisible();
  35 |     }
  36 | 
  37 |     async performLogin(username:string,password:string){
  38 |         await this.emailID.fill(username);
  39 |         await this.password.fill(password);
  40 |         await this.loginBtn.click();
  41 |         await this.page.waitForTimeout(3000);
  42 |     }
  43 | 
  44 |     async loginErrMsgDisplay():Promise<boolean>{
  45 |         return await this.loginErrMsg.isVisible();
  46 |     }
  47 | }
```