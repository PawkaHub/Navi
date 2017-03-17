// Slapp
import slapp from 'config/slapp';

export const getUserData = ({ token, user }) => {
  return new Promise((resolve, reject) => {
    slapp.client.users.info({ token, user }, (err, userData) => {
      if (userData) { resolve(userData); }
      reject(err);
    });
  });
}

export const logError = (error) => {
  console.log('error', error);
}
