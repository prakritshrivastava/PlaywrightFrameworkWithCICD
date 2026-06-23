import {test, expect} from '../src/fixtures/pageFixtures';
import { HomePage } from '../src/pages/HomePage';
import { CSVHelper } from '../src/utils/CsvHelper';

test.beforeEach(async({loginPage}) => {

    //Login would be prerequisite for homepage
    await loginPage.goToLoginPage();
    await loginPage.performLogin(process.env.USERNAME!,process.env.PASSWORD!);

});

//Data Provider
const productData=CSVHelper.readCSV("src/data/productNames.csv");
for(let row of productData){
    test(`verify search result count - ${row.searchKey} and ${row.productName}`,async({homePage,searchResultsPage}) => {
        await homePage.doSearch(row.searchKey);
        let productCount=await searchResultsPage.obtainResultsCount();
        expect(productCount).toBe(Number(row.resultCount));
    });


    test(`view product details on product page - ${row.searchKey} and ${row.productName}`,async({homePage,searchResultsPage,page}) => {
    await homePage.doSearch(row.searchKey);
    await searchResultsPage.selectProduct(row.productName);
    expect(await page.title()).toBe(row.productName);
    
});

}



