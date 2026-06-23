import {test,expect} from '@playwright/test';

let AUTH_TOKEN={Authorization:'Bearer bf6be8aecd5c51e77358afe8090209744f44d4bfa03c8338d5a091410feeb045'};

test('get user test',async({ request })=>{

    let response=await request.get('https://gorest.co.in/public/v2/users',{
        headers:AUTH_TOKEN
    });

    let jsonBody=await response.json();
    console.log("Response JSON: ",jsonBody);
    console.log("Status Code:",response.status());
    console.log("Status Code:",response.statusText());

});

test('create a user',async({ request })=>{

    let userData={
        name:'Check',
        email:`Check${Date.now()}@pw.com`,
        gender:'male',
        status:'active'
    }

    //JS Object to JSON: Auto Serialization is done by playwright request fixture
    let response=await request.post('https://gorest.co.in/public/v2/users',{
        headers:AUTH_TOKEN,
        data:userData
    });

    console.log("Response: ", await response.json());
    console.log("Status Code: ",response.status());
    console.log("Status Line: ",response.statusText());


});

test('update a user',async({ request })=>{

    let userData={
        name:'Rasika',
        email:'rasika_101@pw.com',
        gender:'female',
        status:'active'
    }

    let response=await request.patch('https://gorest.co.in/public/v2/users/8501948',{
        headers:AUTH_TOKEN,
        data:userData
    });

    
    console.log("Response: ", await response.json());
    console.log("Status Code: ",response.status());
    console.log("Status Line: ",response.statusText());


});

test('delete a user',async({ request })=>{

   let response=await request.delete('https://gorest.co.in/public/v2/users/8501954',{
        headers:AUTH_TOKEN
   });

    console.log("Status Code: ",response.status());
    console.log("Status Line: ",response.statusText());

});

//after delete it should be checked that really the user is deleted using a GET call, expecting a HTTP code of 404 Not Founf

test('check user not available',async({ request })=>{

    let response=await request.get('https://gorest.co.in/public/v2/users/8501954',{
        headers:AUTH_TOKEN
    });

    let jsonBody=await response.json();
    console.log("Response JSON: ",jsonBody);
    expect(response.status()).toBe(404);
    expect(response.statusText()).toBe('Not Found')
    console.log("Status Code:",response.status());
    console.log("Status Code:",response.statusText());

});
