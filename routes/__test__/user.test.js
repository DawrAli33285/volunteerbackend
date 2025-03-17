const app=require('../../index')
const request=require('supertest')
const BearerToken=require('../../token')

it("gives 200 status if speicific user is found",async()=>{
    let userId="67d197bc13f41f5c93c3f2f5"
    console.log(BearerToken)
    let res=await request(app).get(`/api/users/${userId}`).set('authorization',BearerToken)
    expect(res.statusCode).toEqual(200)
})