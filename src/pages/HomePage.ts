import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class HomePage extends BasePage{

    private readonly logoutLink:Locator;
    private readonly header:Locator;
    //private readonly user:Locator;



    constructor(page:Page){
        super(page);
        this.logoutLink=page.getByRole('link',{name:'Logout'});
        this.header=page.getByRole('heading',{level:2});
    };

    async getHomePageTitle():Promise<string>{
        return await this.page.title();
    }

    async isLogoutLinkVisible():Promise<boolean>{
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders():Promise<string[]>{
        return await this.header.allInnerTexts();
    }


    async doSearch(searchKey:string){
        console.log(`Search Key is ${searchKey}`);
        await this.searchBox.fill(searchKey);
        await this.searchIcon.click();
        await this.page.waitForTimeout(3000);
    }


}