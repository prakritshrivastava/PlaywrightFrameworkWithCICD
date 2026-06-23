import {test,expect} from '../../src/fixtures/apiFixtures';

const TOKEN=process.env.API_TOKEN;
let AUTH_HEADER={Authorization:`Bearer ${TOKEN}`};

let userID:number;

test.describe.serial('run e2e crud api tests',()=>{

    test('GET API --GET ALL USERS',async ({apiHelper})=>{
        let response=await apiHelper.get('/public/v2/users',AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('POST API',async({ apiHelper })=>{

        let userData={
            name:'Check',
            email:`Check${Date.now()}@pw.com`,
            gender:'male',
            status:'active'
        }

        let response=await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(userData.name);

        let id=response.body.id;
        userID=id;
        console.log("ID is:",id);
    });

    test('PUT API',async({ apiHelper })=>{

        let userUpdatedData={
            name:'Check Updated',
            status:'inactive'
        }

        let response=await apiHelper.put(`/public/v2/users/${userID}`,userUpdatedData,AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userUpdatedData.name);
        expect(response.body.status).toBe(userUpdatedData.status);

    });

    test('DELETE API',async ({apiHelper})=>{
        let response=await apiHelper.delete(`/public/v2/users/${userID}`,AUTH_HEADER);
        expect(response.status).toBe(204);
    });

    test('ASSERT GET API',async ({apiHelper})=>{
        let response=await apiHelper.get(`/public/v2/users/${userID}`,AUTH_HEADER);
        expect(response.status).toBe(404);
    });

});
