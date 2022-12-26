const jFile = require('jsonfile');

exports.GetFlag = () =>
{
    return new Promise((resolve,reject) =>
    {
        jFile.readFile(__dirname + "/../Data/Flag.json", function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data.flags);
            }
        })
    })
}

exports.SetFlag = (obj) =>
{
    return new Promise((resolve,reject) =>
    {
        jFile.writeFile(__dirname +"/../Data/Flag.json", ({"flags": obj }) ,function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data.flags);
            }
        })
    })
}