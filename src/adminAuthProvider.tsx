// // src/adminAuthProvider.tsx
// import { AuthProvider, UserIdentity } from 'react-admin';
// import { API_URL } from './config';

// interface LoginCredentials {
//   email: string;
//   password: string;
// }

// interface AdminInfo {
//   id: string;
//   name: string;
//   email: string;
// }

// const authProvider: AuthProvider = {
//   login: ({ email, password }: LoginCredentials) =>
//     fetch(`${API_URL}/api/admin/login`, {
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Login failed');
//         return res.json();
//       })
//       .then(({ token, admin }) => {
//         localStorage.setItem('adminToken', token);
//         localStorage.setItem('adminInfo', JSON.stringify({
//           id: admin.id,
//           name: admin.name,
//           email: admin.email
//         }));
//       }),

//       logout: () => {
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('adminInfo');
        
//         // Dispatch storage event to notify other components
//         window.dispatchEvent(new Event('storage'));
        
//         // This ensures React Admin knows to redirect to login
//         return Promise.resolve();
//       },

//   checkError: (error) => {
//     const status = error.status;
//     if (status === 401 || status === 403) {
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('adminInfo');
//       return Promise.reject();
//     }
//     return Promise.resolve();
//   },

//   checkAuth: () => {
//     return localStorage.getItem('adminToken') ? Promise.resolve() : Promise.reject();
//   },

//   getPermissions: () => Promise.resolve(),
  
//   getIdentity: () => {
//     try {
//       const adminInfoStr = localStorage.getItem('adminInfo');
//       if (!adminInfoStr) {
//         return Promise.reject('No admin info found');
//       }
      
//       const adminInfo: AdminInfo = JSON.parse(adminInfoStr);
      
//       // Create a UserIdentity object with proper types
//       const identity: UserIdentity = {
//         id: adminInfo.id,
//         fullName: adminInfo.name,
//         avatar: undefined, // Changed from null to undefined to match UserIdentity type
//         email: adminInfo.email
//       };
      
//       return Promise.resolve(identity);
//     } catch {
//       return Promise.reject('Failed to get admin identity');
//     }
//   }
// };

// export default authProvider;
import { AuthProvider, UserIdentity } from 'react-admin';
import { API_URL } from './config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AdminInfo {
  id: string;
  name: string;
  email: string;
}

const authProvider: AuthProvider = {
  login: ({ email, password }: LoginCredentials) =>
    fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
      })
      .then(({ token, admin }) => {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminInfo', JSON.stringify({
          id: admin.id,
          name: admin.name,
          email: admin.email
        }));
      }),

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event('storage'));
    
    // This ensures React Admin knows to redirect to login
    return Promise.resolve();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('adminToken') ? Promise.resolve() : Promise.reject();
  },

  getPermissions: () => Promise.resolve(),
  
  getIdentity: () => {
    try {
      const adminInfoStr = localStorage.getItem('adminInfo');
      if (!adminInfoStr) {
        return Promise.reject('No admin info found');
      }
      
      const adminInfo: AdminInfo = JSON.parse(adminInfoStr);
      
      // Create a UserIdentity object with proper types
      const identity: UserIdentity = {
        id: adminInfo.id,
        fullName: adminInfo.name,
        avatar: undefined, 
        email: adminInfo.email
      };
      
      return Promise.resolve(identity);
    } catch {
      return Promise.reject('Failed to get admin identity');
    }
  }
};

export default authProvider;