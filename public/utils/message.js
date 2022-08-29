const moment = require ('moment')

function formatMessage(username, msg) {
    return {
        username: username,
        message: msg,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage