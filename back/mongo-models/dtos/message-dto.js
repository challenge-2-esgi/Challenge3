const MongoMessage = require('../Message')
const operations = require('./operations')

module.exports = async (messageId, Message, operation = operations.create) => {
    if (operation === operations.create || operation === operations.update) {
        const message = await Message.findByPk(messageId, {
            include: [
                { association: 'sender' },
                { association: 'receiver' },
            ],
        })
        await MongoMessage.deleteOne({ _id: messageId })

        const mongoMessage = new MongoMessage({
            _id: messageId,
            ...message.dataValues,
            sender: message.sender.dataValues,
            receiver: message.receiver.dataValues,
        })

        await mongoMessage.save()
    }

    if (operation === operations.delete) {
        await MongoMessage.deleteOne({ _id: messageId })
    }
}