import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useStudentsContext } from '../contexts/studentsContext';
import { useSessionsContext } from '../contexts/sessionsContext';

function Record() {
  const [fileType, setFileType] = useState('json');

  const {
    studentsState: { students },
  } = useStudentsContext();
  const {
    sessionsState: { sessions },
  } = useSessionsContext();
  const { pathname } = useLocation();

  const downoald = () => {
    let output: any = '';
    if (fileType === 'json') {
      output = JSON.stringify(
        {
          [pathname === '/students' ? 'students' : 'sessions']:
            pathname === '/students' ? students : sessions,
        },
        null,
        4
      );
    } else if (fileType === 'text') {
      output +=
        pathname === '/students'
          ? `${'Num'.padEnd(10, ' ')} ${'Fname'.padEnd(
              20,
              ' '
            )} ${'Year'.padEnd(10, ' ')} ${'Bday'.padEnd(
              30,
              ' '
            )} ${'Plate'.padEnd(10, ' ')} ${'Mb'.padEnd(
              10,
              ' '
            )} ${'Money'.padEnd(10, ' ')} ${'Address'.padEnd(30, ' ')} \n`
          : `${'Num'.padEnd(10, ' ')} ${'SessNum'.padEnd(
              10,
              ' '
            )} ${'Sub1'.padEnd(10, ' ')} ${'Sub2'.padEnd(
              10,
              ' '
            )} ${'Sub3'.padEnd(10, ' ')}\n`;
      pathname === '/students'
        ? students.forEach((s) => {
            output += `${`${s.NUM}`.padEnd(10, ' ')} ${`${s.FNAME}`.padEnd(
              20,
              ' '
            )} ${`${s.YEAR}`.padEnd(10, ' ')} ${`${s.BDAY}`.padEnd(
              30,
              ' '
            )} ${`${s.PLATE}`.padEnd(10, ' ')} ${`${s.MB.toFixed(2)}`.padEnd(
              10,
              ' '
            )} ${`${s.MONEY}`.padEnd(10, ' ')} ${`${s.ADDRESS}`.padEnd(
              30,
              ' '
            )}\n`;
          })
        : sessions.forEach((s) => {
            output += `${`${s.NUM}`.padEnd(10, ' ')} ${`${s.SESSNUM}`.padEnd(
              10,
              ' '
            )} ${`${s.SUB1}`.padEnd(10, ' ')} ${`${s.SUB2}`.padEnd(
              10,
              ' '
            )} ${`${s.SUB3}`.padEnd(10, ' ')}\n`;
          });
    } else {
      let contents = [];
      pathname === '/students'
        ? contents.push([
            'Num',
            'Fname',
            'Year',
            'Bday',
            'Plate',
            'Mb',
            'Money',
            'Address',
          ])
        : contents.push(['Num', 'SessNum', 'Sub1', 'Sub2', 'Sub3']);
      pathname === '/students'
        ? students.forEach((s) => {
            contents.push([
              s.NUM,
              s.FNAME,
              s.YEAR,
              s.BDAY,
              s.PLATE,
              s.MB.toFixed(2),
              s.MONEY,
              s.ADDRESS,
            ]);
          })
        : sessions.forEach((s) => {
            contents.push([s.NUM, s.SESSNUM, s.SUB1, s.SUB2, s.SUB3]);
          });
      output = makeCSV(contents);
    }
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download =
      pathname === '/students'
        ? 'students.' + fileType
        : 'sessions.' + fileType;
    link.href = fileDownloadUrl;
    link.click();
  };
  const makeCSV = (content: any) => {
    let csv = '';
    content.forEach((value: any) => {
      value.forEach((item: any, i: number) => {
        let innerValue = item === null ? '' : item.toString();
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) {
          result = '"' + result + '"';
        }
        if (i > 0) {
          csv += ',';
        }
        csv += result;
      });
      csv += '\n';
    });
    return csv;
  };
  return (
    <div>
      <span className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        File Type:
      </span>
      <select
        className="cursor-pointer mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
      >
        <option value="csv">CSV</option>
        <option value="json">JSON</option>
        <option value="text">Text</option>
      </select>
      <button
        className="border rounded text-sm shadow py-1 px-2 hover:bg-gray-100"
        onClick={downoald}
      >
        Download Record
      </button>
    </div>
  );
}

export default Record;