const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function connectDB() {
  try {
    await oracledb.createPool({
      user: 'PAS_6308',
      password: '89179645957',
      connectString: 'localhost:1521/XE',
      poolAlias: 'mypool',
      poolMax: 999,
    });
  } catch (error) {
    console.error(error);
  }
}
