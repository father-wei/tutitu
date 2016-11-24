import { firebaseDb } from '../firebase';

/*{
 id,
 name,
 description
 }
 */
export const users = firebaseDb.ref('users');
