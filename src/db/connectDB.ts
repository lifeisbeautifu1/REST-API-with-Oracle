const oracledb = require('oracledb')

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function connectDB(){
    try {
        await oracledb.createPool({
            user: 'PAS_6308',
            password: '89179645957',
            connectString: 'localhost:1521/XE',
            poolAlias: 'mypool'
        })
        // dbConnection = await oracledb.getConnection({
        //     user: 'PAS_6308',
        //     password: '89179645957',
        //     connectString: 'localhost:1521/XE'
        // });
       
        // const data = await dbConnection.execute('SELECT * FROM SESSION_HISTORY WHERE Num = :1', [100050]);
        // console.log(data.rows);

        // console.log(dbConnection)
        
    } catch (error) {
        console.error(error)
    }
}

