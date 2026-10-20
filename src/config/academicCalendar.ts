// Approximate Israeli academic calendar (it varies a little between institutions):
//   Semester A: October - February
//   Semester B: March - June
//   Summer:     July - September
// An academic year is named by the calendar year it starts in (October 2025 -> 2025).

export type Semester = 'A' | 'B' | 'SUMMER';

const OCTOBER = 9; // JavaScript months are 0-based (0 = January)
const MARCH = 2;
const JULY = 6;

export function getAcademicYear(date: Date): number {
  const year = date.getFullYear();
  return date.getMonth() >= OCTOBER ? year : year - 1;
}

export function getSemester(date: Date): Semester {
  const month = date.getMonth();
  if (month >= OCTOBER || month < MARCH) return 'A';
  if (month < JULY) return 'B';
  return 'SUMMER';
}

/**
 * Converts "I'm in year N" (said today) into the academic year the student started in.
 * We store this instead of the year of study, so it never needs updating.
 */
export function getCohortYear(yearOfStudy: number, today: Date): number {
  return getAcademicYear(today) - (yearOfStudy - 1);
}

/** The student's current year of study (1 = first year), computed from their cohort. */
export function getYearOfStudy(cohortYear: number, today: Date): number {
  return getAcademicYear(today) - cohortYear + 1;
}
