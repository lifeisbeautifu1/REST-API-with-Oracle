import { Request, Response } from 'express';
const oracleDB = require('oracledb');

export const getSessions = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  const sessions = await dbConnection.execute(
    'SELECT * FROM SESSION_HISTORY ORDER BY SESSION_HISTORY.Num ASC'
  );

  res.status(200).json(sessions.rows);
};

export const getUserSessions = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  const sessions = await dbConnection.execute(
    'SELECT * FROM SESSION_HISTORY WHERE SESSION_HISTORY.Num = :1 ORDER BY SessNum ASC',
    [req.params.id]
  );

  res.status(200).json(sessions.rows);
};

export const getSession = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  const sessions = await dbConnection.execute(
    'SELECT * FROM SESSION_HISTORY WHERE SESSION_HISTORY.SessNum = :1 AND SESSION_HISTORY.Num = :2',
    [req.params.id, req.params.userId]
  );

  res.status(200).json(sessions.rows[0]);
};

export const deleteSession = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  await dbConnection.execute(
    'DELETE FROM SESSION_HISTORY WHERE SESSION_HISTORY.Num = :1 AND SESSION_HISTORY.SessNum = :2',
    [req.params.userId, req.params.id]
  );

  await dbConnection.execute('COMMIT');

  res.status(200).json({
    message: 'success',
  });
};

export const updateSession = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  const { SESSNUM, SUB1, SUB2, SUB3 } = req.body;

  await dbConnection.execute(
    'UPDATE SESSION_HISTORY SET SESSION_HISTORY.SessNum = :1, SESSION_HISTORY.Sub1 = :2, SESSION_HISTORY.Sub2 = :3, SESSION_HISTORY.Sub3 = :4 WHERE SESSION_HISTORY.Num = :5 AND SESSION_HISTORY.SessNum = :6',
    [SESSNUM, SUB1, SUB2, SUB3, req.params.userId, req.params.id]
  );

  await dbConnection.execute('COMMIT');

  const sessions = await dbConnection.execute(
    'SELECT * FROM SESSION_HISTORY WHERE SESSION_HISTORY.Num = :1 AND SESSION_HISTORY.SessNum = :2',
    [req.params.userId, SESSNUM]
  );

  res.status(200).json(sessions.rows[0]);
};

export const createSession = async (req: Request, res: Response) => {
  const dbConnection = await oracleDB.getConnection('mypool');

  const { NUM, SESSNUM, SUB1, SUB2, SUB3 } = req.body;

  await dbConnection.execute(
    'INSERT INTO PAS_6308.SESSION_HISTORY (Num, SessNum, Sub1, Sub2, Sub3) VALUES (:1, :2, :3, :4, :5)',
    [NUM, SESSNUM, SUB1, SUB2, SUB3]
  );

  await dbConnection.execute('COMMIT');

  const sessions = await dbConnection.execute(
    'SELECT * FROM SESSION_HISTORY WHERE SESSION_HISTORY.Num = :1 AND SESSION_HISTORY.SessNum = :2',
    [NUM, SESSNUM]
  );

  res.status(200).json(sessions.rows[0]);
};
