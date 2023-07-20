const mongoose = require('mongoose')



const connectDB = () => {
        // const MongoUrl = "mongodb://127.0.0.1:27017/project_V"
        const MongoUrl = process.env.MONGO_CONNECTIONS
        mongoose.connect(MongoUrl,
                {
                        useNewUrlParser: true,
                },
                console.log('Database is connected..')
        );
}

module.exports = connectDB