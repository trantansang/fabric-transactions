const db = reqlib('utils/redis.js')

class Transaction {
    static listAll = async () => {
        let all = db.keys('user:*')
        return all
    }

}

module.exports = Transaction