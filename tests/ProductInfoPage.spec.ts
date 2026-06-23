import {test, expect} from '../src/fixtures/pageFixtures';
import { HomePage } from '../src/pages/HomePage';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';

test.beforeEach(async({loginPage})=>{

    await loginPage.goToLoginPage();
    await loginPage.performLogin(process.env.USERNAME!,process.env.PASSWORD!);

});

test('verify product images count',async({homePage,searchResultsPage,productInfoPage})=>{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let productImageCount:number=await productInfoPage.getProductImageCount();
    console.log('ProductImage Count: ',productImageCount);
    expect(productImageCount).toBe(4);
});

test('verify product information',async({homePage,searchResultsPage,productInfoPage})=>{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let actualProductInfoMap=await productInfoPage.getProductInfo();
    console.log('Actual Product Map:',actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('ProductHeader:')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('ProductImagesCount')).toBe(4);
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
});

test('logo exists',async({basePage})=>{
    expect(await basePage.isLogoVisible()).toBeTruthy();
});