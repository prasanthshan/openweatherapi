const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" ,"ejs");
app.use("/css",express.static("css"))
app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/index.html")
})


app.post("/",(req,res)=>{
    const cityName=req.body.cityName;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bdfa86343d892cbccc30a74b9430563b`;
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const wheather=JSON.parse(data);
           
        res.render("weather",{
            city:cityName,
            temp:wheather.main.temp,
       
            temp_min:wheather.main.temp_min,
            temp_max:wheather.main.temp_max,
             humidity:wheather.main.humidity,
            windspeed:wheather.wind.speed,
            description:wheather.weather,
          

        })
        })
    })



})
app.listen(process.env.PORT || 5000,()=>{
    console.log("run");
})