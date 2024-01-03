const MongoComplaint = require('../Complaint')
const operations = require('./operations')

module.exports = async (complaintId, Complaint, operation = operations.create) => {
    if (operation === operations.create || operation === operations.update) {
        const complaint = await Complaint.findByPk(complaintId, {
            include: { all: true, nested: true },
        })

        await MongoComplaint.deleteOne({ _id: complaintId })

        const mongoComplaint = new MongoComplaint({
            ...complaint.dataValues,
            user: complaint.user.dataValues,
            order: complaint.order.dataValues,
        })

        await mongoComplaint.save()
    }

    if (operation === operations.delete) {
        await MongoComplaint.deleteOne({ _id: complaintId })
    }
}
