import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export type CsvRow = {
  FirstName: string;
  LastName: string;
  JobTitle: string;
  LevelOfEducation: string;
  Gender: string;
  Experience: string;
  DateEntered: string;
  ExpectedResult: string;
  TestName: 'positiveTest' | 'negativeTest';
};

export function readCsv(relativePath: string): CsvRow[] {
  const absolutePath = path.resolve(__dirname, '..', relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`CSV file not found at path: ${absolutePath}`);
  }

  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  return parse(fileContent, {
    columns: true,       // return objects with headers as keys
    skip_empty_lines: true,
    trim: true
  }) as CsvRow[];
};


