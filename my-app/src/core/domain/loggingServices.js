import { firebaseDb } from '../firebase';

/*{
 id,
 name,
 description
 }
 */
export const loggingServices = firebaseDb.ref('loggingServices');
