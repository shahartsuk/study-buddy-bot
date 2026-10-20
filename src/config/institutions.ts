export type InstitutionType = 'university' | 'college';

export interface Institution {
  /** Short stable id stored in the database. Never change an id once used. */
  id: string;
  /** Display name shown to users (Hebrew). */
  name: string;
  type: InstitutionType;
}

/** Id used when the student's college is not in the list. */
export const OTHER_INSTITUTION_ID = 'other';

// Discord select menus show at most 25 options, so each type must stay at 25 or fewer
// (including the "other" option that is added to the colleges menu).
export const INSTITUTIONS: readonly Institution[] = [
  // Universities
  { id: 'huji', name: 'האוניברסיטה העברית', type: 'university' },
  { id: 'tau', name: 'אוניברסיטת תל אביב', type: 'university' },
  { id: 'technion', name: 'הטכניון', type: 'university' },
  { id: 'biu', name: 'אוניברסיטת בר-אילן', type: 'university' },
  { id: 'haifa', name: 'אוניברסיטת חיפה', type: 'university' },
  { id: 'bgu', name: 'אוניברסיטת בן-גוריון', type: 'university' },
  { id: 'ariel', name: 'אוניברסיטת אריאל', type: 'university' },
  { id: 'runi', name: 'אוניברסיטת רייכמן', type: 'university' },
  { id: 'openu', name: 'האוניברסיטה הפתוחה', type: 'university' },

  // Colleges
  { id: 'afeka', name: 'אפקה', type: 'college' },
  { id: 'braude', name: 'אורט בראודה', type: 'college' },
  { id: 'jce', name: 'עזריאלי - ירושלים', type: 'college' },
  { id: 'hit', name: 'מכון טכנולוגי חולון (HIT)', type: 'college' },
  { id: 'sce', name: 'סמי שמעון (SCE)', type: 'college' },
  { id: 'jct', name: 'המרכז האקדמי לב (JCT)', type: 'college' },
  { id: 'shenkar', name: 'שנקר', type: 'college' },
  { id: 'colman', name: 'המכללה למינהל', type: 'college' },
  { id: 'ono', name: 'הקריה האקדמית אונו', type: 'college' },
  { id: 'mta', name: 'המכללה האקדמית תל אביב-יפו', type: 'college' },
  { id: 'ruppin', name: 'המרכז האקדמי רופין', type: 'college' },
  { id: 'sapir', name: 'המכללה האקדמית ספיר', type: 'college' },
  { id: 'telhai', name: 'תל-חי', type: 'college' },
  { id: 'kinneret', name: 'המכללה האקדמית כנרת', type: 'college' },
  { id: 'wgalil', name: 'המכללה האקדמית גליל מערבי', type: 'college' },
  { id: 'yvc', name: 'המכללה האקדמית עמק יזרעאל', type: 'college' },
  { id: 'netanya', name: 'המכללה האקדמית נתניה', type: 'college' },
  { id: 'hadassah', name: 'המכללה האקדמית הדסה', type: 'college' },
  { id: 'peres', name: 'המרכז האקדמי פרס', type: 'college' },
  { id: 'ashkelon', name: 'המכללה האקדמית אשקלון', type: 'college' },
  { id: 'achva', name: 'המכללה האקדמית אחוה', type: 'college' },
  { id: 'bezalel', name: 'בצלאל', type: 'college' },
  { id: 'levinsky', name: 'לוינסקי-וינגייט', type: 'college' },
  { id: 'zefat', name: 'המכללה האקדמית צפת', type: 'college' },
];

export function getInstitutionsByType(type: InstitutionType): Institution[] {
  return INSTITUTIONS.filter((institution) => institution.type === type);
}

export function findInstitution(id: string): Institution | undefined {
  return INSTITUTIONS.find((institution) => institution.id === id);
}
