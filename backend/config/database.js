const mongoose = require('mongoose')

exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            useUnifiedTopology: true
        }
    )
        .then(con => console.log(`db ${con.connection.host}`))
        .catch(err => console.log(err))
}