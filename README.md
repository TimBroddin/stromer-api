# Stromer API for Node JS

This NPM package provides an wrapper for the [Stromer e-bikes API](https://www.stromerbike.com/fr_BE.html). By using this package you can get your bike's status, position and much more.

## Installation

`yarn add stromer-api`

or

`npm install stromer-api --save`

## Usage


    const Stromer = require('stromer-api');
    
    const api = new Stromer({
    username: "xxxxx",
    password: "xxxxxx",
    client_id: "xxxxxxx",
    client_secret: "xxxxxxx"
    });
    
    api.bike.state.get().then(state => console.log(state));
    
### Client id & secret

I can not share the Stromer client id & secret. However, it should be pretty easy to obtain them by using a tool like [mitmproxy](https://mitmproxy.org/) while using an official Stromer app.

## Methods

Once you've initiated the API, it's pretty easy to get all the info you need. All methods are async, so you can either use `async await` or use promises.



Let's say you've initiated the API like I did above:

| Method                                | Returns                                                                                      | 
| ------------------------------------- |:--------------------------------------------------------------------------------------------:|
| api.bike.state.get(cached = false)    | The state of your bike (battery info, FW version, temperatures, ...)                         |
| api.bike.state.get(cached = false)    | The position of your bike                                                                    |
| api.bike.serviceInfo.get()            | Technical details of all your bike parts (not in official app)                               |
| api.bike.settings.get()               | Get all settings                                                                             |
| api.bike.settings.getMainSettings()   | Get main settings (auto lock, ...)                                                           |
| api.bike.settings.getSensorSettings() | Get torque and brake sensor settings                                                         |         
| api.bike.settings.getTuningSettings() | Get tuning settings for preset 2                                                             |         
| api.bike.settings.set(data)           | Change a setting, pass data as an object                                                     |         
| api.bike.light.set(mode = flash)      | Flash the front light                                                                        |         
| api.bike.lock()                       | Lock your bike                                                                               |         
| api.bike.unlock()                     | Unlock your bike                                                                               |         

## Thanks

Many thanks to merstro on [StromerForum.nl](http://stromerforum.nl) for the initial Python code!

## Disclaimer

Use at your own risk! 