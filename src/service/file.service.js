const connection = require('../app/database')

class FileService {
  // 头像
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [result] = await connection.execute(statement, [userId])
    return result[0]
  }

  // 动态配图
  async createFile(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, moment_id, user_id) VALUES (?, ?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, momentId, userId])
    return result
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

module.exports = new FileService()