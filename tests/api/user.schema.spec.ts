import {test,expect} from '../../src/fixtures/apiFixtures';
import Ajv from 'ajv';

let TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER={ Authorization: `Bearer ${TOKEN}`};

//Setup AJV
let ajv = new Ajv();


//define JSON schema
let userSchema={
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        },
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};

test('ThisisGETAPI',async({apiHelper})=>{

    let userData={
        name:'schema test',
        email:`auto_${Date.now()}@open.com`,
        gender:'male',
        status:'active'
    };

    let createUserResponse=await apiHelper.post("/public/v2/users",userData,AUTH_HEADER);
    let userID=createUserResponse.body.id;

    let getUserResponse=await apiHelper.get(`/public/v2/users/${userID}`,AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    //schema validation
    let validate=ajv.compile(userSchema);
    let is_schema_valid=validate(getUserResponse.body);
    
    if(!is_schema_valid){
        console.log("Schema Error: ",validate.errors);
    }
    
    expect(is_schema_valid).toBeTruthy();

});


let userArrSchema={
    "type": "array",
    "items": userSchema
};

test('GET ALL Users',async({apiHelper})=>{

    
    let getUserResponse=await apiHelper.get(`/public/v2/users`,AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    //schema validation
    let validate=ajv.compile(userArrSchema);
    let is_schema_valid=validate(getUserResponse.body);
    
    if(!is_schema_valid){
        console.log("Schema Error: ",validate.errors);
    }
    
    expect(is_schema_valid).toBeTruthy();

});