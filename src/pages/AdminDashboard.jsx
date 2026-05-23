import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Package, PlusCircle, Users, LogOut, ArrowLeft, Trash2, Edit2, 
  Check, X, RefreshCw, Layers, Database, ShieldCheck, 
  Camera, Upload, Image as ImageIcon
} from 'lucide-react';

// localStorage key for custom categories
const CUSTOM_CATS_KEY = 'shashi_custom_categories';

// Built-in category definitions
const BUILTIN_CATEGORIES = {
  gold: [
    { value: 'earrings', label: 'Earrings' },
    { value: 'rings', label: 'Rings' },
    { value: 'chains', label: 'Chains' },
    { value: 'haar', label: 'Traditional Haar' },
    { value: 'mathbedi', label: 'Mathabedi (Forehead)' },
    { value: 'nosering', label: 'Nose Ring (Nath)' }
  ],
  silver: [
    { value: 'payal', label: 'Payal (Anklet)' },
    { value: 'bracelet', label: 'Kada & Bracelet' },
    { value: 'chains', label: 'Silver Chains' },
    { value: 'rings', label: 'Silver Rings' },
    { value: 'bichhua', label: 'Bichhua (Toe Rings)' }
  ]
};

const BUILTIN_SUBCATEGORIES = {
  'gold_earrings': [
    { value: 'jhumka', label: 'Jhumka' },
    { value: 'bali', label: 'Bali' },
    { value: 'bunda', label: 'Bunda' },
    { value: 'katia', label: 'Katia' },
    { value: 'tops', label: 'Tops' },
    { value: 'jhala', label: 'Jhala' }
  ],
  'gold_rings': [
    { value: 'ladiesring', label: 'Ladies Rings' },
    { value: 'gentsring', label: 'Gents Rings' }
  ],
  'gold_chains': [{ value: 'goldchain', label: 'Gold Chain' }],
  'gold_haar': [{ value: 'haar', label: 'Traditional Haar' }],
  'gold_mathbedi': [{ value: 'mathbedi', label: 'Mathabedi' }],
  'gold_nosering': [{ value: 'nosering', label: 'Nose Ring' }],
  'silver_payal': [{ value: 'payal', label: 'Payal' }],
  'silver_bracelet': [{ value: 'bracelet', label: 'Bracelet/Kada' }],
  'silver_chains': [{ value: 'silverchain', label: 'Silver Chain' }],
  'silver_rings': [{ value: 'silverring', label: 'Silver Ring' }],
  'silver_bichhua': [{ value: 'bichhua', label: 'Bichhua' }]
};

// Load/save custom categories from localStorage
const loadCustomCategories = () => {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_CATS_KEY) || '{"categories":{},"subcategories":{}}');
  } catch { return { categories: {}, subcategories: {} }; }
};

const saveCustomCategories = (data) => {
  localStorage.setItem(CUSTOM_CATS_KEY, JSON.stringify(data));
};

export default function AdminDashboard({ onNavigate }) {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  
  // Database states
  const [products, setProducts] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Editing state
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states (Add/Edit)
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formMetal, setFormMetal] = useState('gold');
  const [formCategory, setFormCategory] = useState('earrings');
  const [formSubcategory, setFormSubcategory] = useState('jhumka');
  const [formPurity, setFormPurity] = useState('18KT Gold');
  const [formWeight, setFormWeight] = useState('');
  const [formImage, setFormImage] = useState('/images/gold_jhumka.png');

  // Custom category/subcategory states
  const [customCats, setCustomCats] = useState(loadCustomCategories());
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [showCustomSubcategoryInput, setShowCustomSubcategoryInput] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [customSubcategoryName, setCustomSubcategoryName] = useState('');

  // Image upload states
  const [imagePreview, setImagePreview] = useState('');
  const [imageMode, setImageMode] = useState('preset'); // 'preset', 'upload', 'url'
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Pre-loaded premium mockup images lists
  const availableImages = [
    { label: 'Gold Jhumka', value: '/images/gold_jhumka.png' },
    { label: 'Gold Bali', value: '/images/gold_bali.png' },
    { label: 'Gold Haar (Necklace)', value: '/images/gold_haar.png' },
    { label: 'Gold Curb Chain', value: '/images/gold_chain.png' },
    { label: 'Gold Rings', value: '/images/gold_ring.png' },
    { label: 'Silver Payal (Anklet)', value: '/images/silver_payal.png' },
    { label: 'Silver Elephant Kada', value: '/images/silver_bracelet.png' },
    { label: 'Silver Carved Ring', value: '/images/silver_ring.png' },
    { label: 'Silver Toe Rings (Bichhua)', value: '/images/silver_bichhua.png' }
  ];

  // Get merged categories (built-in + custom)
  const getMergedCategories = (metal) => {
    const builtIn = BUILTIN_CATEGORIES[metal] || [];
    const customForMetal = customCats.categories[metal] || [];
    return [...builtIn, ...customForMetal];
  };

  // Get merged subcategories (built-in + custom)
  const getMergedSubcategories = (metal, category) => {
    const key = `${metal}_${category}`;
    const builtIn = BUILTIN_SUBCATEGORIES[key] || [];
    const customForKey = customCats.subcategories[key] || [];
    return [...builtIn, ...customForKey];
  };

  // Load database tables
  const loadData = async () => {
    setLoading(true);
    try {
      const allProducts = await api.products.getAll();
      const allUsers = await api.auth.getAllUsers();
      setProducts(allProducts);
      setRegisteredUsers(allUsers);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Access Control redirect
    if (!currentUser || currentUser.role !== 'admin') {
      onNavigate('admin-login');
      return;
    }
    loadData();
  }, [currentUser]);

  // Handle image file selection (from device or camera)
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target.result;
      setFormImage(base64);
      setImagePreview(base64);
      setImageMode('upload');
    };
    reader.readAsDataURL(file);
  };

  // Handle custom category addition
  const addCustomCategory = () => {
    const name = customCategoryName.trim();
    if (!name) return;

    const value = name.toLowerCase().replace(/\s+/g, '');
    const updated = { ...customCats };
    if (!updated.categories[formMetal]) {
      updated.categories[formMetal] = [];
    }

    // Check for duplicates
    const allCats = getMergedCategories(formMetal);
    if (allCats.some(c => c.value === value)) {
      alert('This category already exists!');
      return;
    }

    updated.categories[formMetal].push({ value, label: name });
    setCustomCats(updated);
    saveCustomCategories(updated);
    setFormCategory(value);
    setFormSubcategory('');
    setShowCustomCategoryInput(false);
    setCustomCategoryName('');
  };

  // Handle custom subcategory addition
  const addCustomSubcategory = () => {
    const name = customSubcategoryName.trim();
    if (!name) return;

    const value = name.toLowerCase().replace(/\s+/g, '');
    const key = `${formMetal}_${formCategory}`;
    const updated = { ...customCats };
    if (!updated.subcategories[key]) {
      updated.subcategories[key] = [];
    }

    // Check for duplicates
    const allSubs = getMergedSubcategories(formMetal, formCategory);
    if (allSubs.some(s => s.value === value)) {
      alert('This subcategory already exists!');
      return;
    }

    updated.subcategories[key].push({ value, label: name });
    setCustomCats(updated);
    saveCustomCategories(updated);
    setFormSubcategory(value);
    setShowCustomSubcategoryInput(false);
    setCustomSubcategoryName('');
  };

  // Handle metal change
  const handleMetalChange = (metal) => {
    setFormMetal(metal);
    setShowCustomCategoryInput(false);
    setShowCustomSubcategoryInput(false);
    const cats = getMergedCategories(metal);
    if (cats.length > 0) {
      setFormCategory(cats[0].value);
      const subs = getMergedSubcategories(metal, cats[0].value);
      setFormSubcategory(subs.length > 0 ? subs[0].value : '');
    }
    if (metal === 'gold') {
      setFormPurity('18KT Gold');
    } else {
      setFormPurity('99.9% Pure Silver');
    }
  };

  const handleCategoryChange = (category) => {
    if (category === '__custom__') {
      setShowCustomCategoryInput(true);
      return;
    }
    setShowCustomCategoryInput(false);
    setShowCustomSubcategoryInput(false);
    setFormCategory(category);
    
    const subs = getMergedSubcategories(formMetal, category);
    setFormSubcategory(subs.length > 0 ? subs[0].value : '');
  };

  const handleSubcategoryChange = (subcategory) => {
    if (subcategory === '__custom__') {
      setShowCustomSubcategoryInput(true);
      return;
    }
    setShowCustomSubcategoryInput(false);
    setFormSubcategory(subcategory);
  };

  // Create Product Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formWeight) {
      alert('Please fill out Name and Weight specifications.');
      return;
    }

    const newProductData = {
      name: formName,
      description: formDescription || `High finish handcrafted ${formPurity} ${formMetal} ornament.`,
      metal: formMetal,
      category: formCategory,
      subcategory: formSubcategory,
      purity: formPurity,
      weight: formWeight,
      tagBadge: formMetal === 'gold' ? `${formPurity.split(' ')[0]} Traditional` : 'Pure Silver',
      image: formImage
    };

    try {
      await api.products.create(newProductData);
      setActionSuccess('Successfully added new product to stock catalog!');
      
      // Reset form
      resetForm();
      
      // Reload products list & view
      await loadData();
      setTimeout(() => {
        setActionSuccess('');
        setActiveTab('products');
      }, 1500);
    } catch (err) {
      alert('Failed to create product: ' + err.message);
    }
  };

  // Edit Trigger
  const startEdit = (product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormDescription(product.description || '');
    setFormMetal(product.metal);
    setFormCategory(product.category);
    setFormSubcategory(product.subcategory);
    setFormPurity(product.purity);
    setFormWeight(product.weight);
    setFormImage(product.image);
    setImagePreview(product.image?.startsWith('data:') ? product.image : '');
    setImageMode(product.image?.startsWith('data:') ? 'upload' : 'preset');
  };

  const resetForm = () => {
    setFormName('');
    setFormDescription('');
    setFormWeight('');
    setImagePreview('');
    setImageMode('preset');
    setFormImage('/images/gold_jhumka.png');
    setShowCustomCategoryInput(false);
    setShowCustomSubcategoryInput(false);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    resetForm();
  };

  // Update Product Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updatedData = {
      name: formName,
      description: formDescription,
      metal: formMetal,
      category: formCategory,
      subcategory: formSubcategory,
      purity: formPurity,
      weight: formWeight,
      image: formImage
    };

    try {
      await api.products.update(editingProduct.id, updatedData);
      setActionSuccess('Product details successfully updated!');
      setEditingProduct(null);
      
      resetForm();
      
      await loadData();
      setTimeout(() => setActionSuccess(''), 2000);
    } catch (err) {
      alert('Failed to update product: ' + err.message);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}" from stock?`)) {
      return;
    }

    try {
      await api.products.delete(id);
      setActionSuccess(`Deleted "${name}" successfully.`);
      await loadData();
      setTimeout(() => setActionSuccess(''), 2000);
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  const handleAdminLogout = () => {
    logout();
    onNavigate('login');
  };

  // Current merged lists
  const currentCategories = getMergedCategories(formMetal);
  const currentSubcategories = getMergedSubcategories(formMetal, formCategory);

  return (
    <div className="admin-dashboard-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--cream-bg)' }}>
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="admin-sidebar" style={{ width: '260px', background: 'var(--wood-gradient)', color: '#fff', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem' }}>
        {/* Brand/Logo */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', fontSize: '1.15rem', letterSpacing: '0.12em', margin: 0 }}>SHASHI ADMIN</h2>
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.6)' }}>AYODHYA CONSOLE</span>
        </div>

        {/* Navigation list */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active-admin-nav' : ''}`}
            onClick={() => { setActiveTab('products'); cancelEdit(); }}
          >
            <Package size={16} />
            Products Inventory
          </button>
          
          <button 
            className={`admin-nav-item ${activeTab === 'add-product' ? 'active-admin-nav' : ''}`}
            onClick={() => { setActiveTab('add-product'); cancelEdit(); }}
          >
            <PlusCircle size={16} />
            Add New Product
          </button>
          
          <button 
            className={`admin-nav-item ${activeTab === 'users' ? 'active-admin-nav' : ''}`}
            onClick={() => { setActiveTab('users'); cancelEdit(); }}
          >
            <Users size={16} />
            User Directory
          </button>
        </nav>

        {/* Footer actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <button 
            onClick={() => onNavigate('home')} 
            className="admin-nav-item-secondary"
          >
            <ArrowLeft size={15} />
            Back to Showroom
          </button>
          
          <button 
            onClick={handleAdminLogout} 
            className="admin-nav-item-secondary" 
            style={{ color: '#ffb3b3' }}
          >
            <LogOut size={15} />
            Consoles Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD PANELS */}
      <main className="admin-main-panel" style={{ flexGrow: 1, padding: '3rem', textAlign: 'left', overflowY: 'auto' }}>
        
        {/* Console Header Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid rgba(44, 26, 17, 0.08)', paddingBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', margin: 0 }}>
              {activeTab === 'products' && 'Products Inventory'}
              {activeTab === 'add-product' && (editingProduct ? 'Edit Product Details' : 'Add New Ornament')}
              {activeTab === 'users' && 'Showroom Customer Database'}
            </h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Logged in as: <strong>{currentUser?.name}</strong> (Administrator)
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={loadData}
              disabled={loading}
              className="btn-secondary" 
              style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem' }}
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#2c662d', background: '#e2f0d9', padding: '0.35rem 0.75rem', borderRadius: '30px', fontWeight: 600 }}>
              <ShieldCheck size={14} />
              <span>SECURED CONSOLE</span>
            </div>
          </div>
        </header>

        {/* Action success flash banner */}
        {actionSuccess && (
          <div style={{ background: '#e2f0d9', borderLeft: '4px solid #2c662d', padding: '1rem', color: '#1b3e1c', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
            <Check size={16} />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* LOADING INDICATOR */}
        {loading && !editingProduct && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 0' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <RefreshCw size={36} className="animate-spin text-maroon" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontSize: '0.85rem' }}>Loading secure database tables...</p>
            </div>
          </div>
        )}

        {/* VIEW 1: PRODUCTS INVENTORY */}
        {!loading && activeTab === 'products' && (
          <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-light)', borderRadius: '4px', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: 'var(--cream-panel)', borderBottom: '1px solid rgba(44, 26, 17, 0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>Image</th>
                  <th style={{ padding: '1rem' }}>Name</th>
                  <th style={{ padding: '1rem' }}>Metal</th>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem' }}>Purity</th>
                  <th style={{ padding: '1rem' }}>Weight Range</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((prod) => (
                    <tr key={prod.id} style={{ borderBottom: '1px solid rgba(44, 26, 17, 0.05)' }}>
                      <td style={{ padding: '1rem' }}>
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(197, 155, 39, 0.15)' }} 
                        />
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{prod.name}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          textTransform: 'uppercase', 
                          fontSize: '0.65rem', 
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '10px',
                          background: prod.metal === 'gold' ? '#FDF6E2' : '#F0F0F2',
                          color: prod.metal === 'gold' ? 'var(--gold-primary)' : 'var(--text-secondary)',
                          border: prod.metal === 'gold' ? '1px solid rgba(197,155,39,0.2)' : '1px solid rgba(163,163,168,0.2)'
                        }}>
                          {prod.metal}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textTransform: 'capitalize' }}>
                        {prod.category} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({prod.subcategory})</span>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{prod.purity}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{prod.weight}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button 
                            onClick={() => { startEdit(prod); setActiveTab('add-product'); }}
                            style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', padding: '4px' }}
                            title="Edit Product"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(prod.id, prod.name)}
                            style={{ background: 'none', border: 'none', color: 'var(--maroon-accent)', cursor: 'pointer', padding: '4px' }}
                            title="Delete Product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No items currently recorded in showroom database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* VIEW 2: ADD / EDIT PRODUCT FORM */}
        {!loading && activeTab === 'add-product' && (
          <div style={{ maxWidth: '700px', backgroundColor: '#fff', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '2.5rem', boxShadow: 'var(--shadow-soft)' }}>
            <form onSubmit={editingProduct ? handleEditSubmit : handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', borderBottom: '1px solid rgba(44, 26, 17, 0.08)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
                {editingProduct ? `Edit SKU: ${editingProduct.id}` : 'Create New Stock Item'}
              </h3>

              {/* Form Row: Name */}
              <div className="form-group">
                <label className="form-label">Ornament Name</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Imperial Floral Sita Haar"
                  className="form-input"
                  style={{ paddingLeft: '0.8rem' }}
                  required
                />
              </div>

              {/* Form Row: Metal Toggle (Gold vs Silver) */}
              <div className="form-row" style={{ display: 'flex', gap: '1.5rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Metal Selection</label>
                  <select 
                    value={formMetal}
                    onChange={(e) => handleMetalChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="gold">Gold (Yellow)</option>
                    <option value="silver">Silver (99.9% Pure)</option>
                  </select>
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Metal Purity Badge</label>
                  <input 
                    type="text" 
                    value={formPurity}
                    onChange={(e) => setFormPurity(e.target.value)}
                    placeholder="e.g. 18KT Gold, 18KT Gold, or 99.9% Pure Silver"
                    className="form-input"
                    style={{ paddingLeft: '0.8rem' }}
                    required
                  />
                </div>
              </div>

              {/* Form Row: Category & Subcategory with Custom option */}
              <div className="form-row" style={{ display: 'flex', gap: '1.5rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Category</label>
                  <select 
                    value={showCustomCategoryInput ? '__custom__' : formCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="form-select"
                  >
                    {currentCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                    <option value="__custom__">＋ Add Custom Category...</option>
                  </select>

                  {/* Custom category input */}
                  {showCustomCategoryInput && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <input
                        type="text"
                        value={customCategoryName}
                        onChange={(e) => setCustomCategoryName(e.target.value)}
                        placeholder="e.g. Mangalsutra"
                        className="form-input"
                        style={{ flex: 1, paddingLeft: '0.8rem', fontSize: '0.78rem' }}
                        autoFocus
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomCategory(); } }}
                      />
                      <button 
                        type="button" 
                        onClick={addCustomCategory} 
                        style={{ background: 'var(--gold-primary)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}
                      >
                        <Check size={13} /> Add
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { setShowCustomCategoryInput(false); setCustomCategoryName(''); }}
                        style={{ background: 'none', border: '1px solid rgba(44,26,17,0.12)', borderRadius: '8px', padding: '0.4rem 0.6rem', cursor: 'pointer', color: 'var(--text-muted)' }}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Subcategory</label>
                  <select 
                    value={showCustomSubcategoryInput ? '__custom__' : formSubcategory}
                    onChange={(e) => handleSubcategoryChange(e.target.value)}
                    className="form-select"
                  >
                    {currentSubcategories.map((sub) => (
                      <option key={sub.value} value={sub.value}>{sub.label}</option>
                    ))}
                    <option value="__custom__">＋ Add Custom Subcategory...</option>
                  </select>

                  {/* Custom subcategory input */}
                  {showCustomSubcategoryInput && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <input
                        type="text"
                        value={customSubcategoryName}
                        onChange={(e) => setCustomSubcategoryName(e.target.value)}
                        placeholder="e.g. Temple Style"
                        className="form-input"
                        style={{ flex: 1, paddingLeft: '0.8rem', fontSize: '0.78rem' }}
                        autoFocus
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomSubcategory(); } }}
                      />
                      <button 
                        type="button" 
                        onClick={addCustomSubcategory} 
                        style={{ background: 'var(--gold-primary)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}
                      >
                        <Check size={13} /> Add
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { setShowCustomSubcategoryInput(false); setCustomSubcategoryName(''); }}
                        style={{ background: 'none', border: '1px solid rgba(44,26,17,0.12)', borderRadius: '8px', padding: '0.4rem 0.6rem', cursor: 'pointer', color: 'var(--text-muted)' }}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Row: Weight */}
              <div className="form-group">
                <label className="form-label">Est. Weight Specification</label>
                <input 
                  type="text" 
                  value={formWeight}
                  onChange={(e) => setFormWeight(e.target.value)}
                  placeholder="e.g. 15g - 25g or 40g per pair"
                  className="form-input"
                  style={{ paddingLeft: '0.8rem' }}
                  required
                />
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="form-group">
                <label className="form-label">Product Image</label>
                
                {/* Image source tabs */}
                <div style={{ display: 'flex', gap: '0', background: 'var(--cream-panel)', borderRadius: '10px', padding: '3px', marginBottom: '0.75rem' }}>
                  <button 
                    type="button"
                    onClick={() => { setImageMode('preset'); setImagePreview(''); }}
                    style={{
                      flex: 1, padding: '0.55rem 0.5rem', border: 'none', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                      background: imageMode === 'preset' ? '#fff' : 'transparent',
                      color: imageMode === 'preset' ? 'var(--gold-primary)' : 'var(--text-muted)',
                      boxShadow: imageMode === 'preset' ? '0 2px 6px rgba(44,26,17,0.06)' : 'none',
                      transition: 'all 0.25s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
                    }}
                  >
                    <ImageIcon size={13} /> Preset
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setImageMode('upload'); }}
                    style={{
                      flex: 1, padding: '0.55rem 0.5rem', border: 'none', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                      background: imageMode === 'upload' ? '#fff' : 'transparent',
                      color: imageMode === 'upload' ? 'var(--gold-primary)' : 'var(--text-muted)',
                      boxShadow: imageMode === 'upload' ? '0 2px 6px rgba(44,26,17,0.06)' : 'none',
                      transition: 'all 0.25s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
                    }}
                  >
                    <Upload size={13} /> Upload / Camera
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setImageMode('url'); setImagePreview(''); }}
                    style={{
                      flex: 1, padding: '0.55rem 0.5rem', border: 'none', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                      background: imageMode === 'url' ? '#fff' : 'transparent',
                      color: imageMode === 'url' ? 'var(--gold-primary)' : 'var(--text-muted)',
                      boxShadow: imageMode === 'url' ? '0 2px 6px rgba(44,26,17,0.06)' : 'none',
                      transition: 'all 0.25s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
                    }}
                  >
                    🔗 URL
                  </button>
                </div>

                {/* PRESET image selector */}
                {imageMode === 'preset' && (
                  <select 
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="form-select"
                  >
                    {availableImages.map((img) => (
                      <option key={img.value} value={img.value}>{img.label}</option>
                    ))}
                  </select>
                )}

                {/* UPLOAD from device / camera */}
                {imageMode === 'upload' && (
                  <div>
                    {/* Hidden file inputs */}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={handleImageFile}
                    />
                    <input 
                      ref={cameraInputRef}
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      style={{ display: 'none' }} 
                      onChange={handleImageFile}
                    />

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          flex: 1, padding: '1.25rem 1rem', border: '2px dashed rgba(197, 155, 39, 0.25)', borderRadius: '10px',
                          background: 'rgba(197, 155, 39, 0.02)', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', gap: '8px', transition: 'all 0.25s ease', color: 'var(--text-secondary)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold-primary)'; e.currentTarget.style.background = 'rgba(197, 155, 39, 0.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(197, 155, 39, 0.25)'; e.currentTarget.style.background = 'rgba(197, 155, 39, 0.02)'; }}
                      >
                        <Upload size={22} style={{ color: 'var(--gold-primary)' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Upload from Device</span>
                        <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>JPG, PNG, WebP · Max 5MB</span>
                      </button>

                      <button 
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        style={{
                          flex: 1, padding: '1.25rem 1rem', border: '2px dashed rgba(94, 25, 20, 0.15)', borderRadius: '10px',
                          background: 'rgba(94, 25, 20, 0.01)', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', gap: '8px', transition: 'all 0.25s ease', color: 'var(--text-secondary)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--maroon-accent)'; e.currentTarget.style.background = 'rgba(94, 25, 20, 0.03)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(94, 25, 20, 0.15)'; e.currentTarget.style.background = 'rgba(94, 25, 20, 0.01)'; }}
                      >
                        <Camera size={22} style={{ color: 'var(--maroon-accent)' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Capture from Camera</span>
                        <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Opens device camera</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* URL input */}
                {imageMode === 'url' && (
                  <input 
                    type="text" 
                    value={formImage?.startsWith('data:') ? '' : formImage}
                    onChange={(e) => { setFormImage(e.target.value); setImagePreview(''); }}
                    placeholder="Paste external image URL here"
                    className="form-input"
                    style={{ paddingLeft: '0.8rem' }}
                  />
                )}

                {/* Image Preview */}
                {(imagePreview || (formImage && !formImage.startsWith('data:'))) && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden',
                      border: '2px solid rgba(197, 155, 39, 0.2)', flexShrink: 0,
                      background: 'var(--cream-panel)'
                    }}>
                      <img 
                        src={imagePreview || formImage} 
                        alt="Preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', paddingTop: '0.25rem' }}>
                      <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Image Preview</p>
                      {imagePreview && (
                        <p style={{ margin: 0 }}>
                          Uploaded from device ✓
                          <button 
                            type="button"
                            onClick={() => { setImagePreview(''); setFormImage('/images/gold_jhumka.png'); setImageMode('preset'); }}
                            style={{ background: 'none', border: 'none', color: 'var(--maroon-accent)', cursor: 'pointer', fontSize: '0.7rem', marginLeft: '0.5rem', textDecoration: 'underline' }}
                          >
                            Remove
                          </button>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Row: Description */}
              <div className="form-group">
                <label className="form-label">Ornament Description</label>
                <textarea 
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the craft pattern, filigree detailing, closures, buyback options, etc."
                  className="form-textarea"
                  rows="4"
                ></textarea>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  {editingProduct ? 'Save Product Details' : 'Add Item to Catalog'}
                </button>
                {editingProduct && (
                  <button 
                    type="button" 
                    onClick={cancelEdit} 
                    className="btn-secondary" 
                    style={{ flex: 1, color: 'var(--maroon-accent)', borderColor: 'var(--maroon-accent)' }}
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

            </form>
          </div>
        )}

        {/* VIEW 3: REGISTERED USERS DIRECTORY */}
        {!loading && activeTab === 'users' && (
          <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-light)', borderRadius: '4px', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: 'var(--cream-panel)', borderBottom: '1px solid rgba(44, 26, 17, 0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>User ID</th>
                  <th style={{ padding: '1rem' }}>Full Name</th>
                  <th style={{ padding: '1rem' }}>Phone Number</th>
                  <th style={{ padding: '1rem' }}>Email Address</th>
                  <th style={{ padding: '1rem' }}>Role/Auth Clearance</th>
                </tr>
              </thead>
              <tbody>
                {registeredUsers.length > 0 ? (
                  registeredUsers.map((usr) => (
                    <tr key={usr.id} style={{ borderBottom: '1px solid rgba(44, 26, 17, 0.05)' }}>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{usr.id}</td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{usr.name}</td>
                      <td style={{ padding: '1rem' }}>{usr.phone}</td>
                      <td style={{ padding: '1rem' }}>{usr.email}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          textTransform: 'uppercase', 
                          fontSize: '0.65rem', 
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '10px',
                          background: usr.role === 'admin' ? '#f8d7da' : '#d1ecf1',
                          color: usr.role === 'admin' ? '#721c24' : '#0c5460',
                          border: usr.role === 'admin' ? '1px solid #f5c6cb' : '1px solid #bee5eb'
                        }}>
                          {usr.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No registered customers recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </main>

    </div>
  );
}
