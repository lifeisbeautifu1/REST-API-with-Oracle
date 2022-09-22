import { Request, Response} from 'express'
const oracleDB = require('oracledb')

export const getStudents = async (req: Request, res: Response) => {

    const dbConnection = await oracleDB.getConnection('mypool')

    const students = await dbConnection.execute('SELECT * FROM STUDENTS');

    res.status(400).json(students.rows)
  
}


export const getStudent = async (req: Request, res: Response) => {
 
    const dbConnection = await oracleDB.getConnection('mypool')

    const student = await dbConnection.execute('SELECT * FROM STUDENTS WHERE STUDENTS.Num = :1', [req.params.id]);

    res.status(400).json(student.rows)
    
}