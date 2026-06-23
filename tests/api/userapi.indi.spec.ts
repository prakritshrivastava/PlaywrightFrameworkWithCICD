import { ApiHelper } from '../../src/api/ApiHelper';
import {test,expect} from '../../src/fixtures/apiFixtures';

const TOKEN=process.env.API_TOKEN;
let AUTH_HEADER={Authorization:`Bearer ${TOKEN}`};

async function createUser(apiHelper:any){

        let userData={
            name:'Check',
            email:`Check${Date.now()}@pw.com`,
            gender:'male',
            status:'active'
        }

        let response=await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(userData.name);
        return await response.body;

};

test('POST',async({apiHelper})=>{

    //POST
    let userResponse=await createUser(apiHelper);

    //GET
    let response=await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);

    expect(response.status).toBe(200);

});


test('PUT',async({apiHelper})=>{

    //POST
    let userResponse=await createUser(apiHelper);

     let userUpdatedData={
            name:'Check Updated',
            status:'inactive'
        }

    //GET
    let response=await apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdatedData,AUTH_HEADER);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);


    let getResponse=await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);


});


test('DELETE',async({apiHelper})=>{

    //POST
    let userResponse=await createUser(apiHelper);

    
    //DELETE
    let response=await apiHelper.delete(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);

    expect(response.status).toBe(204);


    let getResponse=await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(getResponse.status).toBe(404);

});