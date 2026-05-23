import { PRODUCTS_DATA } from '../data/products';

// Helper to simulate network latency
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Local DB Keys
const PRODUCTS_KEY = 'shashi_products';
const USERS_KEY = 'shashi_users';
const WISHLISTS_KEY = 'shashi_wishlists';

// Initialise Database
const initDB = () => {
  // Initialise Products
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS_DATA));
  }

  // Initialise Users (with default admin)
  if (!localStorage.getItem(USERS_KEY)) {
    const defaultUsers = [
      {
        id: 'admin_1',
        name: 'Shashi Kant Gupta',
        email: 'sashikantgo@gmail.com',
        phone: '9452352020',
        password: 'admin123', // In a real backend, this would be hashed
        role: 'admin'
      },
      {
        id: 'user_1',
        name: 'Rahul Sharma',
        email: 'rahul@gmail.com',
        phone: '9876543210',
        password: 'user123',
        role: 'user'
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }

  // Initialise Wishlists
  if (!localStorage.getItem(WISHLISTS_KEY)) {
    const defaultWishlists = {
      'user_1': ['g1', 's1'] // Default saved items for user_1
    };
    localStorage.setItem(WISHLISTS_KEY, JSON.stringify(defaultWishlists));
  }
};

initDB();

// API Interface
export const api = {
  // Authentication & Users
  auth: {
    login: async (email, password) => {
      await delay(400);
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password.');
      }
      
      // Return user details without password
      const { password: _, ...userProfile } = user;
      return userProfile;
    },

    register: async (name, phone, email, password) => {
      await delay(500);
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      
      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        throw new Error('An account with this email already exists.');
      }

      const newUser = {
        id: 'usr_' + Date.now(),
        name,
        phone,
        email,
        password,
        role: 'user' // Default role
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      const { password: _, ...userProfile } = newUser;
      return userProfile;
    },

    getAllUsers: async () => {
      await delay(300);
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      // Filter out admin passwords for simple security simulation
      return users.map(({ password: _, ...userProfile }) => userProfile);
    }
  },

  // Products CRUD
  products: {
    getAll: async () => {
      await delay(200);
      return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    },

    create: async (productData) => {
      await delay(400);
      const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
      
      const newProduct = {
        id: 'prod_' + Date.now(),
        ...productData
      };

      products.unshift(newProduct); // Add new products at the top
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return newProduct;
    },

    update: async (id, productData) => {
      await delay(400);
      const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
      const index = products.findIndex(p => p.id === id);
      
      if (index === -1) {
        throw new Error('Product not found.');
      }

      const updatedProduct = {
        ...products[index],
        ...productData
      };

      products[index] = updatedProduct;
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return updatedProduct;
    },

    delete: async (id) => {
      await delay(300);
      let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
      const exists = products.some(p => p.id === id);
      
      if (!exists) {
        throw new Error('Product not found.');
      }

      products = products.filter(p => p.id !== id);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return { success: true, id };
    }
  },

  // Wishlist
  wishlist: {
    get: async (userId) => {
      await delay(200);
      const wishlists = JSON.parse(localStorage.getItem(WISHLISTS_KEY) || '{}');
      return wishlists[userId] || [];
    },

    toggle: async (userId, productId) => {
      await delay(300);
      const wishlists = JSON.parse(localStorage.getItem(WISHLISTS_KEY) || '{}');
      let userList = wishlists[userId] || [];
      
      if (userList.includes(productId)) {
        userList = userList.filter(id => id !== productId);
      } else {
        userList.push(productId);
      }

      wishlists[userId] = userList;
      localStorage.setItem(WISHLISTS_KEY, JSON.stringify(wishlists));
      return userList;
    }
  }
};
