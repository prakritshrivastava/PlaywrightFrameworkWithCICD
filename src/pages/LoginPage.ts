import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{

    //private Locators
    private readonly emailID:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    private readonly forgottenPwdLink:Locator;
    private readonly loginErrMsg:Locator;


    constructor(page:Page){
        super(page);
        this.emailID=page.getByRole('textbox',{name:'E-Mail Address'});
        this.password=page.getByRole('textbox',{name:'Password'});
        this.loginBtn=page.getByRole('button',{name:'Login'});
        this.forgottenPwdLink=page.getByRole('link',{name:'Forgotten Password'}).first();
        this.loginErrMsg=page.locator(".alert.alert-danger.alert-dismissible");
    }

    async goToLoginPage():Promise<void>{

        await this.page.goto('opencart/index.php?route=account/login');

    }

    async getLoginPageTitle():Promise<string>{
       return await this.page.title();
    }

    async isForgotPwdLinkExist():Promise<boolean>{
        return await this.forgottenPwdLink.isVisible();
    }

    async performLogin(username:string,password:string){
        await this.emailID.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForTimeout(3000);
    }

    async loginErrMsgDisplay():Promise<boolean>{
        return await this.loginErrMsg.isVisible();
    }
}