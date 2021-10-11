const db = reqlib('utils/redis.js');
const lodash = require('lodash')
const uuid = require('uuid');


class Transaction {
    static listAll = async () => {
        let keys = await db.keys('transaction:*');
        return await Promise.all(keys.map((key) => new Promise((resolve) => {
            resolve(db.hgetall(key));
        })));

    }
    static add = async (data) => {
        // Validate
        data['state'] = 'created';
        data['id'] = uuid.v4();
        data['amount'] = parseFloat(lodash.get(data, 'amount', 0));
        let user = await db.hgetall(`user:${lodash.get(data, 'user_id')}`)
        if (!user) {
            throw new Error('User does not exists');
        }
        // Before save. Do do simple database validation
        let creditLimit = parseFloat(lodash.get(user, 'credit_limit', 0))
        let creditUsed = parseFloat(lodash.get(user, 'credit_used', 0))
        if (!creditLimit) {
            throw new Error('You dont have credit');
        }
        let creditUsedAfterSave = creditUsed + parseFloat(lodash.get(data, 'amount', 0))
        if (creditUsedAfterSave > creditLimit) {
            throw new Error('Over credit');
        }
        let resultTransaction = await db.hmset(`transaction:${lodash.get(data, 'user_id')}:${data.id}`, data);
        // After save, update credit_used
        let resultUser = null;
        if (resultTransaction) {
            resultUser = await db.hmset(`user:${lodash.get(data, 'user_id')}`, {'credit_used': creditUsedAfterSave})
        }
        data['result'] = resultUser && 'Success' || 'Error'
        return data;
    }
}

module.exports = Transaction;