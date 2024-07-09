const mongoose = require("mongoose");
const dbname = process.env.DB

mongoose.connect(`mongodb://127.0.0.1/${dbname}`)
    .then(()=>console.log(`ok you are connected on ${dbname} database`))
    .catch(err => console.log(err))