import {test, expect} from '../src/fixtures/pageFixtures';


test.beforeEach(async({loginPage}) => {

    //Login would be prerequisite for homepage
    await loginPage.goToLoginPage();
    await loginPage.performLogin(process.env.USERNAME!,process.env.PASSWORD!);

});

test('@smoke home page title test',async({homePage}) => {
    let homepagetitle=await homePage.getPageTitle();
    console.log("Home Page Title: ",homepagetitle);
    expect(homepagetitle).toBe('My Account');
});

test('logout link exist',async({homePage}) => {
    expect(homePage.isLogoutLinkVisible()).toBeTruthy();
});


test('get home page headers',async({homePage}) => {
    let allHeaders:string[]=await homePage.getHomePageHeaders();
    console.log("Home Page Headers: ",allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});