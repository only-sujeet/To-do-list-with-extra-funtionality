const mongoose = require('mongoose')

const connectDB = () => {
        mongoose.connect('mongodb://localhost:27017/project_V',
                {
                        useNewUrlParser: true,
                },
                console.log('Database is connected..')
        );
}

module.exports = connectDB