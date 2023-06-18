const mongoose = require('mongoose')



const connectDB = () => {
        const MongoUrl = "mongodb://localhost:27017/project_V"
        //       const MongoUrl = "mongodb+srv://jvikram0585:jvikram@inkcluster.kdkbtjl.mongodb.net/?retryWrites=true&w=majority"
        mongoose.connect(MongoUrl,
                {
                        useNewUrlParser: true,
                },
                console.log('Database is connected..')
        );
}

module.exports = connectDB