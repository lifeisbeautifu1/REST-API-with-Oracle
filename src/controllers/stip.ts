import { Request, Response} from 'express'
const oracleDB = require('oracledb')


export const getStips = async (req: Request, res: Response) => {

    const dbConnection = await oracleDB.getConnection('mypool')

    const stips = await dbConnection.execute('SELECT * FROM STIP ORDER BY STIP.Num ASC');

    res.status(200).json(stips.rows)
  
}


export const getStip = async (req: Request, res: Response) => {
 
    const dbConnection = await oracleDB.getConnection('mypool')

    const stip = await dbConnection.execute('SELECT * FROM STIP WHERE STIP.Num = :1', [req.params.id]);

    res.status(200).json(stip.rows[0])
    
}

export const deleteStip = async (req: Request, res: Response) => {
    const dbConnection = await oracleDB.getConnection('mypool')

    await dbConnection.execute('DELETE FROM STIP WHERE STIP.Num = :1', [req.params.id]);

    await dbConnection.execute('COMMIT');

    res.status(200).json({
        message: 'success'
    })
}

export const updateStip = async (req: Request, res: Response) => {
    const dbConnection = await oracleDB.getConnection('mypool')

    const {
        SALARY,
    } = req.body;

    await dbConnection.execute("UPDATE STIP SET STIP.Salary = :1 WHERE STIP.Num = :2", [SALARY,req.params.id]);

    await dbConnection.execute('COMMIT');

    const stip = await dbConnection.execute('SELECT * FROM STIP WHERE STIP.Num = :1', [req.params.id]);

    res.status(200).json(stip.rows[0])
}


export const createStip = async (req: Request, res: Response) => {

    const dbConnection = await oracleDB.getConnection('mypool')

    const {
        NUM,
        SALARY
    } = req.body;


    await dbConnection.execute("INSERT INTO PAS_6308.STIP (Num, Salary) VALUES (:1, :2)", [NUM, SALARY])

    await dbConnection.execute('COMMIT');

    const stip = await dbConnection.execute('SELECT * FROM STIP WHERE STIP.Num = :1', [NUM]);

    res.status(200).json(stip.rows[0])

}