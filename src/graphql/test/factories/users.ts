const randomEmail = `${Math.random().toString(36).substring(7)}@test.com`;
const randomUid = `${Math.random().toString(36).substring(7)}${Date.now()}`;

export const user = {
  name: 'Mr. Testing',
  email: randomEmail,
  active: true,
  firebaseUid: randomUid,
  createdAt: Date.now()
};