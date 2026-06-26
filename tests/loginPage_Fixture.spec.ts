import {test, expect} from '../src/fixtures/pageFixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CSVHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JSONHelper';



test.beforeEach(async({ loginPage,homePage }) =>{
    await loginPage.goToLoginPage();
});

test('@smoke LoginTest',async({loginPage}) => {
    await loginPage.goToLoginPage();
    let title:string=await loginPage.getLoginPageTitle();
    console.log('Title is: ',title);
});


test('check pwd link',async({loginPage})=>{
    expect(loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('@smoke user is able to login',async({loginPage,homePage})=>{
   await loginPage.performLogin(process.env.USERNAME!,process.env.PASSWORD!);
   expect(await homePage.isLogoutLinkVisible()).toBeTruthy();
});

test('login to app with data driven test with wrong cred',async({testData,loginPage})=>{
    for(let row of testData){
        await loginPage.performLogin(row.username,row.password);
        expect(loginPage.loginErrMsgDisplay).toBeTruthy();
    }
});

let testData=CSVHelper.readCSV("src/data/logindata.csv")
for(let row of testData){
    test(`login test without fixtures in parallel-${row.username}`,async({  loginPage }) =>{
        await loginPage.performLogin(row.username,row.password);
        expect(loginPage.loginErrMsgDisplay).toBeTruthy();
    });
};

let loginJSONData=JsonHelper.readJson("src/data/loginTest.json");
for(let row of loginJSONData){

    test(`Invalid testdata from JSON-${row.username}`,async({ loginPage}) =>{
        await loginPage.performLogin(row.username,row.password);
        expect(loginPage.loginErrMsgDisplay).toBeTruthy();
    });

};

// let exceltestdata=ExcelHelper.readExcel('src/data/playwright_excel_testdata.xlsx','login')
// for(let row of exceltestdata){
//     test("withExcelWithoutFixtures",async({  loginPage }) =>{
//         await loginPage.performLogin(row.username,row.password);
//         expect(loginPage.loginErrMsgDisplay).toBeTruthy();
//     });
// };
