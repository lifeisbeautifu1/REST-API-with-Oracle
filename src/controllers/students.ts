import { Request, Response } from 'express';
const oracleDB = require('oracledb');

export const getStudents = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  const students = await dbConnection.execute(
    'SELECT * FROM STUDENTS ORDER BY STUDENTS.Num ASC'
  );

  res.status(200).json(students.rows);
};

export const getStudent = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  const student = await dbConnection.execute(
    'SELECT * FROM STUDENTS WHERE STUDENTS.Num = :1',
    [req.params.id]
  );

  res.status(200).json(student.rows[0]);
};

export const deleteStudent = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  await dbConnection.execute('DELETE FROM STUDENTS WHERE STUDENTS.Num = :1', [
    req.params.id,
  ]);

  await dbConnection.execute('COMMIT');

  res.status(200).json({
    message: 'success',
  });
};

export const updateStudent = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  const { FNAME, YEAR, PLATE, MB, MONEY, ADDRESS } = req.body;

  await dbConnection.execute(
    'UPDATE STUDENTS SET STUDENTS.Fname = :1, STUDENTS.Year = :2, STUDENTS.Plate = :3, STUDENTS.Mb = :4, STUDENTS.Money = :5, STUDENTS.Address = :6 WHERE STUDENTS.Num = :7',
    [FNAME, YEAR, PLATE, MB, +MONEY, ADDRESS, req.params.id]
  );

  await dbConnection.execute('COMMIT');

  const student = await dbConnection.execute(
    'SELECT * FROM STUDENTS WHERE STUDENTS.Num = :1',
    [req.params.id]
  );

  res.status(200).json(student.rows[0]);
};

export const createStudent = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  const { NUM, FNAME, YEAR, PLATE, BDAY, MB, MONEY, ADDRESS } = req.body;

  await dbConnection.execute(
    "INSERT INTO PAS_6308.STUDENTS (Num, Fname, Year , Bday, Plate, Mb, Money, Address) VALUES (:1, :2, :3, TO_DATE(:4, 'yyyy/mm/dd'), :5, :6, :7, :8)",
    [NUM, FNAME, YEAR, BDAY, PLATE, MB, MONEY, ADDRESS]
  );

  await dbConnection.execute('COMMIT');

  const student = await dbConnection.execute(
    'SELECT * FROM STUDENTS WHERE STUDENTS.Num = :1',
    [NUM]
  );

  res.status(200).json(student.rows[0]);
};
