const request = require('supertest');
const app = require('../../index');
const BearerToken = require('../../token');
let scheduleId = require('../../scheduleId')

it("creates schedule", async () => {
    let currentDate = new Date();

    const res = await request(app)
        .post('/api/schedules')
        .set('authorization', BearerToken)
        .send({  
            eventName: "testEvent",
            maxVolunteers: "10",
            location: "Pakistan",
            date: currentDate
        });

  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Schedule created successfully");
});

it("fetches all schedules", async () => {
    let res = await request(app)
        .get('/api/schedules')
        .set('authorization', BearerToken);

    expect(res.statusCode).toEqual(200);
});

it("fetches all volunteers registered to a specific event", async () => {
   

    let res = await request(app)
        .get(`/api/schedules/${scheduleId}/volunteers`)
        .set('authorization', BearerToken);

    expect(res.statusCode).toEqual(200);
});

it("fetches a specific schedule", async () => {
    

    let res = await request(app)
        .get(`/api/schedules/${scheduleId}`)
        .set('authorization', BearerToken);

    expect(res.statusCode).toEqual(200);
});

it("registers and then removes a volunteer from a schedule", async () => {
   

    let registerRes = await request(app)
        .patch(`/api/schedules/${scheduleId}/signup`)
        .set('authorization', BearerToken);
    expect(registerRes.statusCode).toEqual(200);

});

it("creates and deletes a schedule", async () => {
    let createRes = await request(app)
        .post('/api/schedules')
        .set('authorization', BearerToken)
        .send({
            eventName: "DeleteMe",
            maxVolunteers: "5",
            location: "TestLocation",
            date: new Date()
        });



    let deleteRes = await request(app)
        .delete(`/api/schedules/${createRes.body.scheduleId}`)
        .set('authorization', BearerToken);
    expect(deleteRes.statusCode).toEqual(200);
});

it("edits schedule",async()=>{
    let createRes = await request(app)
    .patch(`/api/schedules/${scheduleId}`)
    .set('authorization', BearerToken)
    .send({
        maxVolunteers: "3",
    });
    expect(createRes.statusCode).toEqual(200)
})

it("removes volunteer from schedule",async()=>{
    let res=await request(app).patch(`/api/schedules/${scheduleId}/remove`).set('authorization',BearerToken)
expect(res.statusCode).toEqual(200)    
})