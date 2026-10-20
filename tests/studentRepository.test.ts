import { beforeEach, describe, expect, it } from 'vitest';
import { openDatabase, type Db } from '../src/db/database.js';
import { getStudent, saveStudent } from '../src/db/studentRepository.js';

describe('student repository', () => {
  let db: Db;

  beforeEach(() => {
    // A fresh in-memory database for every test, so tests don't affect each other.
    db = openDatabase(':memory:');
  });

  it('returns undefined for a student who never registered', () => {
    expect(getStudent(db, '123')).toBeUndefined();
  });

  it('saves a student and reads them back', () => {
    saveStudent(db, {
      discordId: '123',
      institutionId: 'bgu',
      fieldOfStudy: 'הנדסת תוכנה',
      cohortYear: 2025,
    });

    expect(getStudent(db, '123')).toMatchObject({
      discordId: '123',
      institutionId: 'bgu',
      fieldOfStudy: 'הנדסת תוכנה',
      cohortYear: 2025,
    });
  });

  it('updates an existing student instead of creating a duplicate', () => {
    const student = {
      discordId: '123',
      institutionId: 'bgu',
      fieldOfStudy: 'CS',
      cohortYear: 2025,
    };
    saveStudent(db, student);
    saveStudent(db, { ...student, institutionId: 'tau' });

    expect(getStudent(db, '123')?.institutionId).toBe('tau');
    const { count } = db.prepare('SELECT COUNT(*) AS count FROM students').get() as {
      count: number;
    };
    expect(count).toBe(1);
  });
});
