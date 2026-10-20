import type { Db } from './database.js';

export interface Student {
  discordId: string;
  institutionId: string;
  fieldOfStudy: string;
  /** The academic year the student started in, e.g. 2025. See academicCalendar.ts. */
  cohortYear: number;
  createdAt: string;
  updatedAt: string;
}

export type StudentInput = Pick<
  Student,
  'discordId' | 'institutionId' | 'fieldOfStudy' | 'cohortYear'
>;

/** A row exactly as SQLite returns it (snake_case column names). */
interface StudentRow {
  discord_id: string;
  institution_id: string;
  field_of_study: string;
  cohort_year: number;
  created_at: string;
  updated_at: string;
}

function toStudent(row: StudentRow): Student {
  return {
    discordId: row.discord_id,
    institutionId: row.institution_id,
    fieldOfStudy: row.field_of_study,
    cohortYear: row.cohort_year,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Creates the student, or updates their details if they are already registered. */
export function saveStudent(db: Db, student: StudentInput): void {
  db.prepare(
    `INSERT INTO students (discord_id, institution_id, field_of_study, cohort_year)
     VALUES (@discordId, @institutionId, @fieldOfStudy, @cohortYear)
     ON CONFLICT (discord_id) DO UPDATE SET
       institution_id = excluded.institution_id,
       field_of_study = excluded.field_of_study,
       cohort_year    = excluded.cohort_year,
       updated_at     = datetime('now')`,
  ).run(student);
}

export function getStudent(db: Db, discordId: string): Student | undefined {
  const row = db
    .prepare<[string], StudentRow>('SELECT * FROM students WHERE discord_id = ?')
    .get(discordId);
  return row ? toStudent(row) : undefined;
}
