import { firebaseDb } from '../firebase';

/*{
 id,
 name,
 description
 }
 */
export const members = firebaseDb.ref('members');
