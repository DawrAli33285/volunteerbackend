const request=require('supertest')
const app=require('../../index')


it("Returns 200 status if email is correct for google Login",async()=>{
let res=await request(app).post('/api/auth/loginWithGoogle').send({
    email:'dawar@gmail.com'
})
expect(res.statusCode).toEqual(200)
})


it("returns 200 status code if everything passed correctly", async () => {
    jest.setTimeout(10000); 
    let name=`User-${Math.floor(Math.random()*99999)}`
    let email=`${Math.floor(Math.random()*99999999)}@gmail.com`

    const res = await request(app)
        .post('/api/auth/register')
        .send({
            name:name,
            email: email,
            password: name,
            role: "volunteer"
        });

    expect(res.statusCode).toEqual(200);
});

it("returns 200 status code if user email and password are correct",async()=>{
    const res=await request(app).post('/api/auth/login').send({email:"dawar@gmail.com",password:"dawar"})
    expect(res.statusCode).toEqual(200)
})

