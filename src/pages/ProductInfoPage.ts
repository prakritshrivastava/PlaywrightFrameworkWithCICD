import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage{

    private readonly productHeader:Locator;
    private readonly productImages:Locator;
    private readonly productMetadata:Locator;
    private readonly productPricing:Locator;
    private map:Map<string,string|number>;

    constructor(page:Page){
        super(page);
        this.productHeader=page.locator('h1');
        this.productImages=page.locator('#content img');
        this.productMetadata=page.locator('#content .list-unstyled:nth-of-type(1) li');
        this.productPricing=page.locator('#content .list-unstyled:nth-of-type(2) li');
        this.map=new Map<string,string|number>();
    }

    async getProductHeader():Promise<string>{
        return await this.productHeader.innerText();
    }

    async getProductImageCount():Promise<number>{
        await this.productImages.first().waitFor({state:'visible'});
        return await this.productImages.count();
    }

   /**
    * 
    * @returns  consolidated product information.
    */ 
    async getProductInfo():Promise<Map<string,string|number>>{
        this.map.set('ProductHeader:',await this.getProductHeader());
        this.map.set('ProductImagesCount',await this.getProductImageCount());
        await this.getProductMetaData();
        await this.getProductPricing();
        return this.map;
    }

    private async getProductMetaData():Promise<void>{
    
        let metaDataArr:string[]=await this.productMetadata.allInnerTexts();
        for(let metaInfo of metaDataArr){

            let focusString:string[]=metaInfo.split(':')
            let key:string=focusString[0].trim();
            let value:string=focusString[1].trim();
            
            this.map.set(key,value);

        }
    }

    private async getProductPricing():Promise<void>{

        let metaDataArr:string[]=await this.productPricing.allInnerTexts();

        let productPrice=metaDataArr[0].trim();
        let extTextPrice=metaDataArr[1].split(':')[1].trim();

        this.map.set('ProductPrice: ',productPrice);
        this.map.set('ExtTextPrice:',extTextPrice);

    }

}