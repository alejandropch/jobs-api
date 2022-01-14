const {Schema,Types, model} = require('mongoose')

const schema = JobSchema = new Schema({

    company: {
        type: String,
        required:[true, "You have to provide a company name"],
        minlength: 3,
        maxlength: 40,
    },
    position: {
        type: String,
        require:[true, "You have to provide a position"],
        minlength: 3,
        maxlength: 40,
    },
    status: {
        type: String,
        enum: ["interview", "pending","declined"],
        default: "pending",
        minlength: 3,
        maxlength: 40,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required:[true, "A job must be created by an user"]
    }
},{timestamps:true}
)

module.exports = model('Job', schema)