const jFile = require('jsonfile');

exports.getUsers = () =>
{
    return new Promise((resolve,reject) =>
    {
        jFile.readFile(__dirname + "/../Data/users.json", function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}

