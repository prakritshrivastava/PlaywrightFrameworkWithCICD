import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage{

    //Private Locators
    private readonly searchResults:Locator;

    //Initialize using constructor
    constructor(page:Page){
        super(page);
        this.searchResults=page.locator('.product-layout.product-grid');
    }

    //actions
    async obtainResultsCount():Promise<number>{
        return await this.searchResults.count();
    }

    async selectProduct(productName:string):Promise<void>{
        await this.page.getByRole('link',{name:productName,exact:true}).first().click();
    }

}