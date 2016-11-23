import { firebaseDb } from '../firebase';

/*{
     id,
     name,
     price,
     description
  }
 */
export const services = firebaseDb.ref('services');
