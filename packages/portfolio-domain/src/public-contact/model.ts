import {
  PublicContactSchema,
  type Contact,
  type PublicContact,
} from '../schemas';

export const toPublicContact = (contact: Contact): PublicContact =>
  PublicContactSchema.parse(contact);
