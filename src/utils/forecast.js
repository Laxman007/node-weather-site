const request=require('request')

const forecast=(address,callback)=>{
    const url='http://api.weatherapi.com/v1/forecast.json?key=4fe3ef993bc9457e8ba121437202506&q='+encodeURIComponent(address)

    request({ url,json:true },(error,{body}={})=>{
            if(error){
                callback('Unable to connect to weather service!',undefined)
            }
            else if(body.error){
                callback('Unable to find location!',undefined)
            }
            else{
                const data=body.current
                const loc=body.location.name+" ,"+body.location.region+" ,"+body.location.country
                const ans=data.condition.text+".It's "+data.temp_c+" degrees out there.There is "+100*data.precip_in+"% chance of rain."
                callback(undefined,{
                    location:loc,
                    response:ans
                })
            }
        })
}

module.exports=forecast