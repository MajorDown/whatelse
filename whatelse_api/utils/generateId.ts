type DataType = 'user' | 'project' | 'task' | 'contribution';

/**
 * @description Génère un ID unique pour une entité (User, Project, etc.)
 * @param type - Le type de l'entité (ex: 'user', 'project', 'task', 'contribution')
 * @returns string - ID au format UYYMMDDHHmmSSmmm
 */
function generateId(type: DataType): string {
  const now = new Date();
  const pad = (n: number, l = 2) => n.toString().padStart(l, '0');

  const YY = now.getFullYear().toString().slice(2);
  const MM = pad(now.getMonth() + 1);
  const DD = pad(now.getDate());
  const HH = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const SS = pad(now.getSeconds());
  const mmm = pad(now.getMilliseconds(), 3);

  const prefix = type.charAt(0).toUpperCase();

  return `${prefix}${YY}${MM}${DD}${HH}${mm}${SS}${mmm}`;
}

export default generateId;