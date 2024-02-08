const cron =require('node-cron');

const job = () => { cron.schedule('35 9 * * *',()=>{
    console.log("i will run on 3 : 05 pm");
},{ timezone: "UTC" })}
job()

const jobOne = () => { cron.schedule('39 09 08 02 *',()=>{
    console.log("i will run on  08-02-2024 at 3:09pm");
},{ timezone: "UTC" })}
jobOne()

const jobTwo = ()=> {
    cron.schedule('48 9 08 * *',()=>{
        console.log('i will run every 8th of the month at 3 : 18 PM');
    },{timezone:"UTC"})
}

jobTwo()

const jobThree = ()=> {
    cron.schedule('03 10 08 * 4#2',()=>{
        console.log('i will run every 2nd week of 8th of the month at 3 : 33 PM');
    },{timezone:"UTC"})
}

jobThree()