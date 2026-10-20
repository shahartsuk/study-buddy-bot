import { describe, expect, it } from 'vitest';
import {
  getAcademicYear,
  getCohortYear,
  getSemester,
  getYearOfStudy,
} from '../src/config/academicCalendar.js';

// new Date(year, monthIndex, day) - months are 0-based, so 9 = October.
const NOV_2025 = new Date(2025, 10, 15);
const APR_2026 = new Date(2026, 3, 15);
const AUG_2026 = new Date(2026, 7, 15);
const OCT_2026 = new Date(2026, 9, 1);

describe('academic calendar', () => {
  it('names the academic year by the year it starts in October', () => {
    expect(getAcademicYear(NOV_2025)).toBe(2025);
    expect(getAcademicYear(APR_2026)).toBe(2025);
    expect(getAcademicYear(OCT_2026)).toBe(2026);
  });

  it('finds the current semester', () => {
    expect(getSemester(NOV_2025)).toBe('A');
    expect(getSemester(new Date(2026, 1, 1))).toBe('A'); // February
    expect(getSemester(APR_2026)).toBe('B');
    expect(getSemester(AUG_2026)).toBe('SUMMER');
  });

  it('turns "year 2" into a cohort and back', () => {
    const cohort = getCohortYear(2, NOV_2025);
    expect(cohort).toBe(2024);
    expect(getYearOfStudy(cohort, NOV_2025)).toBe(2);
  });

  it('moves the student up a year when a new academic year starts', () => {
    const cohort = getCohortYear(1, NOV_2025);
    expect(getYearOfStudy(cohort, AUG_2026)).toBe(1);
    expect(getYearOfStudy(cohort, OCT_2026)).toBe(2);
  });
});
