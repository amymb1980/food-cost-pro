import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Package, 
  ChefHat, 
  BarChart3, 
  Plus, 
  Search, 
  Menu,
  Home,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Edit,
  Trash2,
  Check,
  X,
  Camera,
  Bot,
  Star,
  Clock,
  Users,
  Globe,
  Upload,
  ScanLine,
  Target,
  Zap,
  FileText,
  Calculator,
  ChevronDown,
  ChevronRight,
  Settings,
  Bell,
  MapPin,
  ArrowRight,
  TrendingDown,
  Activity,
  Filter,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const FoodCostPro = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('main-kitchen');
  const [lastSync, setLastSync] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  
  // Core Data State
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Tomatoes', category: 'Vegetables', unit: 'kg', price: 4.50, supplier: 'Fresh Farms', stock: 25, reorderPoint: 10, lastUpdated: '2025-06-30', location: 'main-kitchen' },
    { id: 2, name: 'Mozzarella', category: 'Dairy', unit: 'kg', price: 12.00, supplier: 'Dairy Co', stock: 8, reorderPoint: 5, lastUpdated: '2025-06-29', location: 'main-kitchen' },
    { id: 3, name: 'Flour', category: 'Pantry', unit: 'kg', price: 2.20, supplier: 'Grain Supply', stock: 50, reorderPoint: 20, lastUpdated: '2025-06-28', location: 'main-kitchen' },
    { id: 4, name: 'Olive Oil', category: 'Oils', unit: 'L', price: 8.50, supplier: 'Mediterranean Imports', stock: 12, reorderPoint: 8, lastUpdated: '2025-06-30', location: 'main-kitchen' },
    { id: 5, name: 'Basil', category: 'Herbs', unit: 'bunch', price: 3.00, supplier: 'Herb Garden', stock: 3, reorderPoint: 5, lastUpdated: '2025-06-29', location: 'main-kitchen' }
  ]);

  const [locations] = useState([
    { id: 'main-kitchen', name: 'Main Kitchen', address: '123 Main St', type: 'Restaurant', icon: '🏪' },
    { id: 'catering-depot', name: 'Catering Depot', address: '456 Oak Ave', type: 'Catering', icon: '🚚' },
    { id: 'food-truck', name: 'Mobile Unit #1', address: 'Downtown Route', type: 'Food Truck', icon: '🚐' }
  ]);

  const [menus] = useState([
    { id: 'main-menu', name: 'Main Menu', description: 'Regular dining menu items' },
    { id: 'catering-menu', name: 'Catering Menu', description: 'Large volume catering items' },
    { id: 'seasonal-menu', name: 'Seasonal Menu', description: 'Limited time seasonal offerings' }
  ]);

  const [recipes, setRecipes] = useState([
    { 
      id: 1, 
      name: 'Margherita Pizza', 
      category: 'Entree',
      servings: 1,
      ingredients: [
        { ingredientId: 1, quantity: 0.15 },
        { ingredientId: 2, quantity: 0.12 },
        { ingredientId: 3, quantity: 0.25 },
        { ingredientId: 4, quantity: 0.02 },
        { ingredientId: 5, quantity: 0.25 }
      ],
      prepTime: 30,
      rating: 5,
      targetMargin: 65,
      location: 'main-kitchen',
      menu: 'main-menu',
      method: [
        '1. Preheat oven to maximum temperature with pizza stone.',
        '2. Make dough and let rise for 2 hours.',
        '3. Roll out dough to desired thickness.',
        '4. Add tomato sauce, leaving a border for crust.',
        '5. Add fresh mozzarella and basil leaves.',
        '6. Drizzle with olive oil and season.',
        '7. Bake 10-12 minutes until crust is golden.',
        '8. Serve immediately while hot.'
      ]
    },
    {
      id: 2,
      name: 'Caesar Salad',
      category: 'Salad', 
      servings: 1,
      ingredients: [
        { ingredientId: 1, quantity: 0.2 },
        { ingredientId: 4, quantity: 0.015 }
      ],
      prepTime: 15,
      rating: 4,
      targetMargin: 70,
      location: 'main-kitchen',
      menu: 'main-menu',
      method: [
        '1. Wash and chop romaine lettuce.',
        '2. Make dressing with garlic, anchovies, lemon juice.',
        '3. Add olive oil slowly while whisking.',
        '4. Toss lettuce with dressing.',
        '5. Top with parmesan and croutons.',
        '6. Serve immediately.'
      ]
    }
  ]);

  const [shoppingList, setShoppingList] = useState([]);
  const [showRecipeSearch, setShowRecipeSearch] = useState(false);
  const [recipeSearchResults, setRecipeSearchResults] = useState([]);
  const [onlineSearchTerm, setOnlineSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('main-menu');
  const [isMetric, setIsMetric] = useState(true);
  const [currentRegion, setCurrentRegion] = useState('australia');
  const [customGPTarget, setCustomGPTarget] = useState(65);
  const [showSupplierUpload, setShowSupplierUpload] = useState(false);
  const [showWholesaleDB, setShowWholesaleDB] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [showScalingModal, setShowScalingModal] = useState(false);
  const [selectedRecipeForScaling, setSelectedRecipeForScaling] = useState(null);
  const [scalingTarget, setScalingTarget] = useState('');
  const [expandedMethods, setExpandedMethods] = useState(new Set());
  const [editingIngredients, setEditingIngredients] = useState(new Set());
  const [tempQuantities, setTempQuantities] = useState({});
  const [wholesaleSearchTerm, setWholesaleSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Comprehensive Wholesale Pricing Databases
  const wholesalePricingDB = {
    australia: {
      currency: 'AUD',
      suppliers: ['Bidvest', 'PFD Food Services', 'Sysco', 'Performance Food Group'],
      categories: {
        'Meat & Poultry': [
          { name: 'Beef Mince', unit: 'kg', price: 12.50, supplier: 'Bidvest', category: 'Meat' },
          { name: 'Chicken Breast', unit: 'kg', price: 14.80, supplier: 'PFD Food Services', category: 'Meat' },
          { name: 'Chicken Thigh', unit: 'kg', price: 8.90, supplier: 'Bidvest', category: 'Meat' },
        ],
        'Dairy & Eggs': [
          { name: 'Milk (Full Cream)', unit: 'L', price: 1.85, supplier: 'Bidvest', category: 'Dairy' },
          { name: 'Butter (Unsalted)', unit: 'kg', price: 8.50, supplier: 'PFD Food Services', category: 'Dairy' },
          { name: 'Cheddar Cheese', unit: 'kg', price: 12.80, supplier: 'Sysco', category: 'Dairy' },
        ],
        'Vegetables': [
          { name: 'Tomatoes', unit: 'kg', price: 4.20, supplier: 'Bidvest', category: 'Vegetables' },
          { name: 'Onions', unit: 'kg', price: 2.80, supplier: 'PFD Food Services', category: 'Vegetables' },
          { name: 'Potatoes (Washed)', unit: 'kg', price: 2.50, supplier: 'Sysco', category: 'Vegetables' },
        ]
      }
    }
  };

  // Utility functions
  const calculateRecipeCost = (recipe) => {
    return recipe.ingredients.reduce((total, item) => {
      const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
      if (!ingredient) return total;
      return total + (ingredient.price * item.quantity);
    }, 0);
  };

  const calculateSuggestedPrice = (cost, margin) => {
    return cost / (1 - margin / 100);
  };

  const generateShoppingList = () => {
    const currentLocationIngredients = ingredients.filter(ing => ing.location === currentLocation);
    const list = currentLocationIngredients
      .filter(ing => ing.stock <= ing.reorderPoint)
      .map(ing => ({
        ...ing,
        suggestedQuantity: ing.reorderPoint * 2 - ing.stock,
        totalCost: (ing.reorderPoint * 2 - ing.stock) * ing.price
      }));
    setShoppingList(list);
  };

  useEffect(() => {
    generateShoppingList();
  }, [ingredients, currentLocation]);

  // Dashboard metrics
  const currentLocationIngredients = ingredients.filter(ing => ing.location === currentLocation);
  const currentLocationRecipes = recipes.filter(recipe => recipe.location === currentLocation);
  
  const dashboardMetrics = {
    totalInventoryValue: currentLocationIngredients.reduce((sum, ing) => sum + (ing.stock * ing.price), 0),
    lowStockItems: currentLocationIngredients.filter(ing => ing.stock <= ing.reorderPoint).length,
    avgMargin: currentLocationRecipes.length > 0 ? currentLocationRecipes.reduce((sum, recipe) => {
      const cost = calculateRecipeCost(recipe);
      const suggestedPrice = calculateSuggestedPrice(cost, recipe.targetMargin);
      return sum + ((suggestedPrice - cost) / suggestedPrice * 100);
    }, 0) / currentLocationRecipes.length : 0,
    activeRecipes: currentLocationRecipes.length
  };

  // Navigation
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, color: 'blue' },
    { id: 'ingredients', name: 'Ingredients', icon: Package, color: 'green' },
    { id: 'recipes', name: 'Recipes', icon: ChefHat, color: 'purple' },
    { id: 'menus', name: 'Menu Manager', icon: FileText, color: 'orange' },
    { id: 'shopping', name: 'Shopping', icon: ShoppingCart, color: 'red' },
    { id: 'stock-recipes', name: 'Stock Recipes', icon: Target, color: 'teal' },
    { id: 'wholesale-db', name: 'Wholesale Pricing', icon: BarChart3, color: 'indigo' },
    { id: 'scanner', name: 'Invoice Scanner', icon: ScanLine, color: 'pink' },
    { id: 'suppliers', name: 'Supplier Upload', icon: Upload, color: 'cyan' }
  ];

  // Region configuration
  const regions = [
    { id: 'australia', name: 'Australia', flag: '🇦🇺', currency: 'AUD' },
    { id: 'newzealand', name: 'New Zealand', flag: '🇳🇿', currency: 'NZD' },
    { id: 'usa', name: 'United States', flag: '🇺🇸', currency: 'USD' }
  ];

  const getCurrentRegionData = () => wholesalePricingDB[currentRegion] || wholesalePricingDB.australia;
  const getCurrentCurrency = () => regions.find(r => r.id === currentRegion)?.currency || 'AUD';

  // Header Component
  const Header = () => (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Food Cost Pro</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin size={14} />
              <span>{locations.find(l => l.id === currentLocation)?.name}</span>
              <span className="text-gray-400">•</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full mr-1 ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-gray-600">{regions.find(r => r.id === currentRegion)?.flag}</span>
            <span className="text-sm font-medium text-gray-700">{getCurrentCurrency()}</span>
            <button
              onClick={() => setIsMetric(!isMetric)}
              className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700"
            >
              {isMetric ? 'Metric' : 'Imperial'}
            </button>
          </div>
          
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100"
          >
            <Bell size={20} />
            {dashboardMetrics.lowStockItems > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {dashboardMetrics.lowStockItems}
              </div>
            )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-20 right-4 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {currentLocationIngredients
              .filter(ing => ing.stock <= ing.reorderPoint)
              .map(item => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl">
                  <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.name} is low</p>
                    <p className="text-xs text-gray-600">{item.stock} {item.unit} remaining</p>
                  </div>
                </div>
              ))}
            {currentLocationIngredients.filter(ing => ing.stock <= ing.reorderPoint).length === 0 && (
              <p className="text-sm text-gray-600 text-center py-4">No notifications</p>
            )}
          </div>
        </div>
      )}
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );

  // Sidebar Component
  const Sidebar = () => (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 to-gray-800 transform ${
      showMobileMenu ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <ChefHat size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Food Cost Pro</h2>
            <p className="text-gray-400 text-sm">Professional Kitchen</p>
          </div>
        </div>
        <button
          onClick={() => setShowMobileMenu(false)}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-6 border-b border-gray-700">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <select 
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.icon} {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Region</label>
            <select 
              value={currentRegion}
              onChange={(e) => setCurrentRegion(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500"
            >
              {regions.map(region => (
                <option key={region.id} value={region.id}>
                  {region.flag} {region.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <nav className="p-6 space-y-2 flex-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setShowMobileMenu(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all group ${
                isActive 
                  ? `bg-${item.color}-600 text-white shadow-lg` 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : `text-${item.color}-400`}`} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <ArrowRight size={16} className="ml-auto" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-700">
        <div className="bg-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Activity size={16} className="text-green-400" />
              <span className="text-sm font-medium text-white">System Status</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Last sync:</span>
              <span>{lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex justify-between">
              <span>Region:</span>
              <span>{regions.find(r => r.id === currentRegion)?.flag} {getCurrentCurrency()}</span>
            </div>
            <div className="flex justify-between">
              <span>Items tracked:</span>
              <span>{currentLocationIngredients.length}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );

  // Metric Card Component
  const MetricCard = ({ icon: Icon, label, value, subtitle, color, trend, onClick }) => (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group ${
        onClick ? 'hover:border-gray-200' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${color}-400 to-${color}-600 flex items-center justify-center`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-gray-600 font-medium">{label}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => {
    const topExpensive = currentLocationIngredients
      .sort((a, b) => (b.stock * b.price) - (a.stock * a.price))
      .slice(0, 5);

    const categoryData = currentLocationIngredients.reduce((acc, ing) => {
      acc[ing.category] = (acc[ing.category] || 0) + (ing.stock * ing.price);
      return acc;
    }, {});

    const chartData = Object.entries(categoryData).map(([category, value]) => ({
      category,
      value: Math.round(value)
    }));

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

    return (
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
                <p className="text-blue-100 text-lg mb-4">
                  {locations.find(l => l.id === currentLocation)?.name} is running smoothly
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Package size={16} />
                    <span>{currentLocationIngredients.length} ingredients tracked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ChefHat size={16} />
                    <span>{currentLocationRecipes.length} recipes active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={16} />
                    <span>{dashboardMetrics.avgMargin.toFixed(1)}% avg margin</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:mt-0">
                <button
                  onClick={() => setShowRecipeSearch(true)}
                  className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
                >
                  <Globe size={18} />
                  <span>Find New Recipes</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            icon={DollarSign}
            label="Inventory Value"
            value={`${getCurrentCurrency()} ${dashboardMetrics.totalInventoryValue.toFixed(0)}`}
            subtitle="Total stock value"
            color="green"
            trend={5.2}
            onClick={() => setCurrentView('ingredients')}
          />
          <MetricCard
            icon={AlertTriangle}
            label="Low Stock Items"
            value={dashboardMetrics.lowStockItems}
            subtitle="Need reordering"
            color="red"
            trend={dashboardMetrics.lowStockItems > 3 ? -12 : 8}
            onClick={() => setCurrentView('shopping')}
          />
          <MetricCard
            icon={TrendingUp}
            label="Average Margin"
            value={`${dashboardMetrics.avgMargin.toFixed(1)}%`}
            subtitle="Across all recipes"
            color="blue"
            trend={2.3}
            onClick={() => setCurrentView('menus')}
          />
          <MetricCard
            icon={ChefHat}
            label="Active Recipes"
            value={dashboardMetrics.activeRecipes}
            subtitle="Ready to cook"
            color="purple"
            onClick={() => setCurrentView('recipes')}
          />
        </div>

        {/* Charts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inventory Breakdown Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Inventory Breakdown</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Filter size={16} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {chartData.map((entry, index) => (
                  <div key={entry.category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-gray-700 font-medium">{entry.category}</span>
                    </div>
                    <span className="text-gray-900 font-bold">${entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button 
                onClick={() => setCurrentView('wholesale-db')}
                className="w-full flex items-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl hover:from-indigo-100 hover:to-blue-100 transition-all group"
              >
                <BarChart3 size={20} className="text-indigo-600 mr-3" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Wholesale Pricing</p>
                  <p className="text-sm text-gray-600">Compare supplier prices</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:text-gray-600" />
              </button>

              <button 
                onClick={() => setCurrentView('scanner')}
                className="w-full flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all group"
              >
                <ScanLine size={20} className="text-purple-600 mr-3" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Scan Invoice</p>
                  <p className="text-sm text-gray-600">Update prices instantly</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:text-gray-600" />
              </button>

              <button 
                onClick={() => setCurrentView('stock-recipes')}
                className="w-full flex items-center p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl hover:from-teal-100 hover:to-emerald-100 transition-all group"
              >
                <Target size={20} className="text-teal-600 mr-3" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Stock Recipes</p>
                  <p className="text-sm text-gray-600">What you can make now</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:text-gray-600" />
              </button>

              <button 
                onClick={() => setCurrentView('shopping')}
                className="w-full flex items-center p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl hover:from-red-100 hover:to-orange-100 transition-all group"
              >
                <ShoppingCart size={20} className="text-red-600 mr-3" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Shopping List</p>
                  <p className="text-sm text-gray-600">{shoppingList.length} items needed</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Low Stock Alerts */}
          {currentLocationIngredients.filter(ing => ing.stock <= ing.reorderPoint).length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <AlertTriangle size={20} className="text-red-500 mr-2" />
                  Stock Alerts
                </h3>
                <button 
                  onClick={() => setCurrentView('shopping')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {currentLocationIngredients
                  .filter(ing => ing.stock <= ing.reorderPoint)
                  .slice(0, 4)
                  .map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                          <Package size={18} className="text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.stock} {item.unit} remaining</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-red-600">Low Stock</p>
                        <p className="text-xs text-gray-500">Reorder: {item.reorderPoint} {item.unit}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Top Value Ingredients */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Top Value Inventory</h3>
              <button 
                onClick={() => setCurrentView('ingredients')}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {topExpensive.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.stock} {item.unit} in stock</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${(item.stock * item.price).toFixed(0)}</p>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}/{item.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Ingredients View Component
  const IngredientsView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showAddForm, setShowAddForm] = useState(false);
    
    const categories = ['All', ...new Set(currentLocationIngredients.map(ing => ing.category))];
    
    const filteredIngredients = currentLocationIngredients.filter(ing => {
      const matchesSearch = ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ing.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || ing.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Ingredients</h2>
            <p className="text-gray-600 mt-1">Manage your inventory and track stock levels</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
              {isMetric ? 'Metric System' : 'Imperial System'}
            </span>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-semibold flex items-center space-x-2 shadow-sm"
            >
              <Plus size={18} />
              <span>Add Ingredient</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search ingredients, suppliers, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIngredients.map((ingredient) => (
            <div 
              key={ingredient.id} 
              className={`bg-white rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md ${
                ingredient.stock <= ingredient.reorderPoint ? 'border-red-200 bg-red-50' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{ingredient.name}</h3>
                  <p className="text-sm text-gray-600">{ingredient.category}</p>
                </div>
                {ingredient.stock <= ingredient.reorderPoint && (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Low Stock
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per {ingredient.unit}:</span>
                  <span className="font-bold text-gray-900">{getCurrentCurrency()} ${ingredient.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Stock:</span>
                  <span className={`font-bold ${
                    ingredient.stock <= ingredient.reorderPoint ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {ingredient.stock} {ingredient.unit}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Value:</span>
                  <span className="font-bold text-gray-900">
                    {getCurrentCurrency()} ${(ingredient.stock * ingredient.price).toFixed(2)}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Supplier:</span>
                    <span className="text-gray-700 font-medium">{ingredient.supplier}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="text-gray-700">{ingredient.lastUpdated}</span>
                  </div>
                </div>

                {/* Stock Level Bar */}
                <div className="pt-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Stock Level</span>
                    <span>{ingredient.stock}/{ingredient.reorderPoint * 2} {ingredient.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        ingredient.stock <= ingredient.reorderPoint 
                          ? 'bg-red-500' 
                          : ingredient.stock <= ingredient.reorderPoint * 1.5
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${Math.min(100, (ingredient.stock / (ingredient.reorderPoint * 2)) * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIngredients.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No ingredients found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    );
  };

  // Unit conversion utilities
  const convertUnits = (value, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return value;
    
    const conversions = {
      // Weight conversions
      'kg_lb': 2.20462,
      'lb_kg': 0.453592,
      'g_oz': 0.035274,
      'oz_g': 28.3495,
      
      // Volume conversions  
      'L_gal': 0.264172,
      'gal_L': 3.78541,
      'L_qt': 1.05669,
      'qt_L': 0.946353,
      'ml_floz': 0.033814,
      'floz_ml': 29.5735
    };
    
    const key = `${fromUnit}_${toUnit}`;
    if (conversions[key]) {
      return value * conversions[key];
    }
    return value;
  };

  const getDisplayUnit = (unit, isMetric) => {
    if (isMetric) {
      // Convert imperial to metric
      const unitMap = {
        'lb': 'kg',
        'oz': 'g',
        'gal': 'L',
        'qt': 'L',
        'floz': 'ml'
      };
      return unitMap[unit] || unit;
    } else {
      // Convert metric to imperial
      const unitMap = {
        'kg': 'lb',
        'g': 'oz',
        'L': 'gal',
        'ml': 'floz'
      };
      return unitMap[unit] || unit;
    }
  };

  const getDisplayQuantity = (quantity, originalUnit, isMetric) => {
    const targetUnit = getDisplayUnit(originalUnit, isMetric);
    if (originalUnit === targetUnit) return quantity;
    
    return convertUnits(quantity, originalUnit, targetUnit);
  };

  const formatQuantityWithUnit = (quantity, unit, isMetric) => {
    const displayUnit = getDisplayUnit(unit, isMetric);
    const displayQuantity = getDisplayQuantity(quantity, unit, isMetric);
    
    return `${displayQuantity.toFixed(2)} ${displayUnit}`;
  };

  const formatUnit = (unit, isMetric) => {
    return getDisplayUnit(unit, isMetric);
  };

  // Recipe scaling functions
  const openScalingModal = (recipe) => {
    setSelectedRecipeForScaling(recipe);
    setScalingTarget(recipe.servings.toString());
    setShowScalingModal(true);
  };

  const scaleRecipe = (recipe, targetServings) => {
    const scaleFactor = targetServings / recipe.servings;
    return {
      ...recipe,
      servings: targetServings,
      ingredients: recipe.ingredients.map(item => ({
        ...item,
        quantity: item.quantity * scaleFactor
      }))
    };
  };

  const applyScaling = () => {
    if (!selectedRecipeForScaling || !scalingTarget) return;
    
    const targetServings = parseInt(scalingTarget);
    if (targetServings <= 0) return;
    
    const scaledRecipe = scaleRecipe(selectedRecipeForScaling, targetServings);
    
    setRecipes(prev => prev.map(recipe => 
      recipe.id === selectedRecipeForScaling.id ? scaledRecipe : recipe
    ));
    
    setShowScalingModal(false);
    setSelectedRecipeForScaling(null);
    setScalingTarget('');
  };

  // Toggle method visibility
  const toggleMethod = (recipeId) => {
    const newExpanded = new Set(expandedMethods);
    if (newExpanded.has(recipeId)) {
      newExpanded.delete(recipeId);
    } else {
      newExpanded.add(recipeId);
    }
    setExpandedMethods(newExpanded);
  };

  // Ingredient editing functions
  const startEditingIngredient = (recipeId, ingredientIndex, currentQuantity) => {
    const key = `${recipeId}-${ingredientIndex}`;
    setEditingIngredients(new Set([...editingIngredients, key]));
    setTempQuantities({...tempQuantities, [key]: currentQuantity.toString()});
  };

  const cancelEditingIngredient = (recipeId, ingredientIndex) => {
    const key = `${recipeId}-${ingredientIndex}`;
    const newEditing = new Set(editingIngredients);
    newEditing.delete(key);
    setEditingIngredients(newEditing);
    
    const newQuantities = {...tempQuantities};
    delete newQuantities[key];
    setTempQuantities(newQuantities);
  };

  const saveIngredientQuantity = (recipeId, ingredientIndex) => {
    const key = `${recipeId}-${ingredientIndex}`;
    const newQuantity = parseFloat(tempQuantities[key]);
    
    if (newQuantity > 0) {
      setRecipes(prev => prev.map(recipe => 
        recipe.id === recipeId ? {
          ...recipe,
          ingredients: recipe.ingredients.map((item, idx) => 
            idx === ingredientIndex ? { ...item, quantity: newQuantity } : item
          )
        } : recipe
      ));
    }
    
    cancelEditingIngredient(recipeId, ingredientIndex);
  };

  const deleteIngredient = (recipeId, ingredientIndex) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === recipeId ? {
        ...recipe,
        ingredients: recipe.ingredients.filter((_, idx) => idx !== ingredientIndex)
      } : recipe
    ));
  };

  const updateTempQuantity = (key, value) => {
    setTempQuantities({...tempQuantities, [key]: value});
  };

  const getRecipesFromStock = () => {
    return currentLocationRecipes.filter(recipe => {
      return recipe.ingredients.every(item => {
        const ingredient = currentLocationIngredients.find(ing => ing.id === item.ingredientId);
        return ingredient && ingredient.stock >= item.quantity;
      });
    });
  };

  const getMaxPortionsFromStock = (recipe) => {
    let maxPortions = Infinity;
    
    recipe.ingredients.forEach(item => {
      const ingredient = currentLocationIngredients.find(ing => ing.id === item.ingredientId);
      if (ingredient) {
        const possiblePortions = Math.floor(ingredient.stock / item.quantity);
        maxPortions = Math.min(maxPortions, possiblePortions);
      } else {
        maxPortions = 0;
      }
    });
    
    return maxPortions === Infinity ? 0 : maxPortions;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessingFile(true);
      
      setTimeout(() => {
        const mockParsedData = [
          { name: 'Premium Tomatoes', price: 5.20, unit: 'kg', supplier: file.name.includes('wholesale') ? 'Wholesale Direct' : 'Fresh Market Co' },
          { name: 'Organic Basil', price: 3.50, unit: 'bunch', supplier: file.name.includes('wholesale') ? 'Wholesale Direct' : 'Fresh Market Co' },
          { name: 'Extra Virgin Olive Oil', price: 12.00, unit: 'L', supplier: file.name.includes('wholesale') ? 'Wholesale Direct' : 'Fresh Market Co' },
          { name: 'Buffalo Mozzarella', price: 18.50, unit: 'kg', supplier: file.name.includes('wholesale') ? 'Wholesale Direct' : 'Fresh Market Co' },
          { name: 'Imported Parmesan', price: 22.00, unit: 'kg', supplier: file.name.includes('wholesale') ? 'Wholesale Direct' : 'Fresh Market Co' }
        ];
        
        const updatedIngredients = [...ingredients];
        const newIngredients = [];
        
        mockParsedData.forEach(item => {
          const existingIndex = updatedIngredients.findIndex(ing => 
            ing.name.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(ing.name.toLowerCase())
          );
          
          if (existingIndex >= 0) {
            updatedIngredients[existingIndex] = {
              ...updatedIngredients[existingIndex],
              price: item.price,
              supplier: item.supplier,
              lastUpdated: new Date().toISOString().split('T')[0]
            };
          } else {
            newIngredients.push({
              id: Date.now() + Math.random(),
              name: item.name,
              price: item.price,
              unit: item.unit,
              supplier: item.supplier,
              stock: 0,
              reorderPoint: 5,
              location: currentLocation,
              category: 'Vegetables',
              lastUpdated: new Date().toISOString().split('T')[0]
            });
          }
        });
        
        setIngredients([...updatedIngredients, ...newIngredients]);
        setIsProcessingFile(false);
        setUploadedFile(null);
        setShowSupplierUpload(false);
      }, 2000);
    }
  };

  const searchOnlineRecipes = (query) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      const mockResults = [
        {
          id: 'margherita_pro',
          name: 'Professional Margherita Pizza',
          source: 'Chef\'s Collection',
          rating: 4.8,
          reviewCount: 1234,
          cookTime: 30,
          difficulty: 'Medium',
          description: 'Authentic Neapolitan-style margherita pizza with fresh mozzarella, basil, and San Marzano tomatoes.',
          method: [
            '1. Preheat oven to maximum temperature with pizza stone.',
            '2. Stretch dough to 12-inch circle.',
            '3. Apply thin layer of tomato sauce.',
            '4. Add fresh mozzarella and basil.',
            '5. Bake for 8-10 minutes until crust is golden.',
            '6. Serve immediately.'
          ],
          recipeIngredients: [
            { name: 'Pizza Dough', quantity: 0.3, unit: 'kg', category: 'Pantry' },
            { name: 'Tomato Sauce', quantity: 0.1, unit: 'L', category: 'Vegetables' },
            { name: 'Fresh Mozzarella', quantity: 0.15, unit: 'kg', category: 'Dairy' },
            { name: 'Fresh Basil', quantity: 0.5, unit: 'bunch', category: 'Herbs' },
            { name: 'Olive Oil', quantity: 0.02, unit: 'L', category: 'Oils' }
          ]
        },
        {
          id: 'chicken_caesar',
          name: 'Grilled Chicken Caesar Salad',
          source: 'Restaurant Classics',
          rating: 4.6,
          reviewCount: 892,
          cookTime: 25,
          difficulty: 'Easy',
          description: 'Classic Caesar salad with perfectly grilled chicken breast, homemade croutons, and parmesan.',
          method: [
            '1. Season and grill chicken breast until cooked through.',
            '2. Prepare Caesar dressing with anchovies and garlic.',
            '3. Toss romaine lettuce with dressing.',
            '4. Top with sliced chicken, croutons, and parmesan.',
            '5. Serve immediately.'
          ],
          recipeIngredients: [
            { name: 'Chicken Breast', quantity: 0.2, unit: 'kg', category: 'Meat' },
            { name: 'Romaine Lettuce', quantity: 0.3, unit: 'kg', category: 'Vegetables' },
            { name: 'Parmesan Cheese', quantity: 0.05, unit: 'kg', category: 'Dairy' },
            { name: 'Anchovies', quantity: 0.02, unit: 'kg', category: 'Seafood' },
            { name: 'Garlic', quantity: 0.01, unit: 'kg', category: 'Vegetables' }
          ]
        }
      ];
      
      setRecipeSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const importOnlineRecipe = (onlineRecipe) => {
    const mappedIngredients = [];
    const newIngredientsToAdd = [];
    
    onlineRecipe.recipeIngredients.forEach(recipeIng => {
      let matchedIngredient = ingredients.find(inv => 
        inv.name.toLowerCase().includes(recipeIng.name.toLowerCase()) ||
        recipeIng.name.toLowerCase().includes(inv.name.toLowerCase())
      );
      
      if (matchedIngredient) {
        mappedIngredients.push({
          ingredientId: matchedIngredient.id,
          quantity: recipeIng.quantity
        });
      } else {
        const newIngredient = {
          id: Date.now() + Math.random(),
          name: recipeIng.name,
          category: recipeIng.category,
          unit: recipeIng.unit,
          price: recipeIng.category === 'Meat' ? 15.00 : recipeIng.category === 'Dairy' ? 8.00 : 4.00,
          supplier: 'To Be Assigned',
          stock: 0,
          reorderPoint: 5,
          lastUpdated: new Date().toISOString().split('T')[0],
          location: currentLocation
        };
        
        newIngredientsToAdd.push(newIngredient);
        mappedIngredients.push({
          ingredientId: newIngredient.id,
          quantity: recipeIng.quantity
        });
      }
    });
    
    if (newIngredientsToAdd.length > 0) {
      setIngredients([...ingredients, ...newIngredientsToAdd]);
    }
    
    const newRecipe = {
      id: Date.now(),
      name: onlineRecipe.name,
      category: onlineRecipe.name.toLowerCase().includes('pizza') ? 'Entree' : 
                onlineRecipe.name.toLowerCase().includes('salad') ? 'Salad' : 'Entree',
      servings: 4,
      ingredients: mappedIngredients,
      prepTime: onlineRecipe.cookTime,
      rating: Math.round(onlineRecipe.rating),
      targetMargin: 65,
      source: onlineRecipe.source,
      description: onlineRecipe.description,
      method: onlineRecipe.method || [],
      location: currentLocation,
      menu: selectedMenu
    };
    
    setRecipes([...recipes, newRecipe]);
    setShowRecipeSearch(false);
    setRecipeSearchResults([]);
    setOnlineSearchTerm('');
  };

  // Recipes View Component
  const RecipesView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredRecipes = currentLocationRecipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Recipes</h2>
            <p className="text-gray-600 mt-1">Manage your recipe collection and calculate costs</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
              {isMetric ? 'Metric System' : 'Imperial System'}
            </span>
            <button
              onClick={() => setShowRecipeSearch(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-semibold flex items-center space-x-2 shadow-sm"
            >
              <Globe size={18} />
              <span>Find Online Recipes</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => {
            const cost = calculateRecipeCost(recipe);
            const suggestedPrice = calculateSuggestedPrice(cost, recipe.targetMargin);
            
            return (
              <div key={recipe.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{recipe.name}</h3>
                    <p className="text-gray-600">{recipe.category}</p>
                  </div>
                  <button
                    onClick={() => openScalingModal(recipe)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm bg-blue-50 px-3 py-2 rounded-lg font-medium"
                    title="Scale Recipe"
                  >
                    <Calculator size={14} className="mr-1" />
                    Scale
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span className="font-medium">{recipe.servings}</span> serving{recipe.servings !== 1 ? 's' : ''}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{recipe.prepTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500" />
                        <span>{recipe.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Cost per serving:</span>
                        <p className="font-bold text-gray-900">{getCurrentCurrency()} ${cost.toFixed(2)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Suggested price ({recipe.targetMargin}% GP):</span>
                        <p className="font-bold text-green-600">{getCurrentCurrency()} ${suggestedPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-900">Ingredients:</h4>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        Cost: {getCurrentCurrency()} ${calculateRecipeCost(recipe).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {recipe.ingredients.map((item, index) => {
                        const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
                        if (!ingredient) return null;
                        
                        const key = `${recipe.id}-${index}`;
                        const isEditing = editingIngredients.has(key);
                        const displayQuantity = isEditing ? 
                          parseFloat(tempQuantities[key] || item.quantity) : 
                          item.quantity;
                        
                        return (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg group hover:bg-gray-100">
                            <span className="text-sm text-gray-700 flex-1">{ingredient.name}</span>
                            
                            <div className="flex items-center space-x-2">
                              {isEditing ? (
                                <>
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={tempQuantities[key] || item.quantity}
                                    onChange={(e) => updateTempQuantity(key, e.target.value)}
                                    className="w-16 px-1 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    autoFocus
                                  />
                                  <span className="text-xs text-gray-600">
                                    {formatUnit(ingredient.unit, isMetric)}
                                  </span>
                                  <button
                                    onClick={() => saveIngredientQuantity(recipe.id, index)}
                                    className="text-green-600 hover:text-green-800"
                                    title="Save"
                                  >
                                    <Check size={12} />
                                  </button>
                                  <button
                                    onClick={() => cancelEditingIngredient(recipe.id, index)}
                                    className="text-gray-400 hover:text-gray-600"
                                    title="Cancel"
                                  >
                                    <X size={12} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <span className="text-sm text-gray-600 min-w-[60px] text-right">
                                    {formatQuantityWithUnit(displayQuantity, ingredient.unit, isMetric)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {getCurrentCurrency()} ${(ingredient.price * displayQuantity).toFixed(2)}
                                  </span>
                                  <div className="opacity-0 group-hover:opacity-100 flex space-x-1 transition-opacity">
                                    <button
                                      onClick={() => startEditingIngredient(recipe.id, index, item.quantity)}
                                      className="text-blue-500 hover:text-blue-700"
                                      title="Edit quantity"
                                    >
                                      <Edit size={12} />
                                    </button>
                                    <button
                                      onClick={() => deleteIngredient(recipe.id, index)}
                                      className="text-red-500 hover:text-red-700"
                                      title="Delete ingredient"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleMethod(recipe.id)}
                    className="w-full flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-xl transition-colors font-medium border border-blue-200"
                  >
                    <FileText size={16} className="mr-2" />
                    {expandedMethods.has(recipe.id) ? 'Hide Cooking Method' : 'Show Cooking Method'}
                    {expandedMethods.has(recipe.id) ? (
                      <ChevronDown size={16} className="ml-2" />
                    ) : (
                      <ChevronRight size={16} className="ml-2" />
                    )}
                  </button>
                  
                  {expandedMethods.has(recipe.id) && (
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <h5 className="font-semibold text-blue-900 mb-3">Cooking Method:</h5>
                      <div className="space-y-2">
                        {recipe.method && recipe.method.length > 0 ? (
                          recipe.method.map((step, idx) => (
                            <div key={idx} className="text-sm text-blue-800 leading-relaxed pl-4 border-l-2 border-blue-300">
                              {step}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-blue-800 italic">
                            This recipe was created manually. Cooking instructions can be added by editing the recipe.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <ChefHat size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or add some new recipes.</p>
            <button
              onClick={() => setShowRecipeSearch(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-semibold"
            >
              Find Online Recipes
            </button>
          </div>
        )}
      </div>
    );
  };

  // Shopping View Component
  const ShoppingView = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Shopping List</h2>
          <p className="text-gray-600 mt-1">Items that need to be reordered based on stock levels</p>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
          {isMetric ? 'Metric System' : 'Imperial System'}
        </span>
      </div>
      
      {shoppingList.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Shopping list is empty! 🎉</h3>
          <p className="text-gray-600">All ingredients are well stocked at this location.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Items to Order</h3>
                <p className="text-gray-600 mt-1">{shoppingList.length} items need reordering</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getCurrentCurrency()} ${shoppingList.reduce((sum, item) => sum + item.totalCost, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {shoppingList.map((item) => {
              const displayUnit = getDisplayUnit(item.unit, isMetric);
              const displayStock = getDisplayQuantity(item.stock, item.unit, isMetric);
              const displaySuggested = getDisplayQuantity(item.suggestedQuantity, item.unit, isMetric);
              
              return (
                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <Package size={20} className="text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                        <p className="text-gray-600">{item.supplier}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>Current: <strong>{displayStock.toFixed(1)} {displayUnit}</strong></span>
                          <span>•</span>
                          <span>Suggested: <strong>{displaySuggested.toFixed(1)} {displayUnit}</strong></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{getCurrentCurrency()} ${item.totalCost.toFixed(2)}</p>
                      <p className="text-gray-600">{getCurrentCurrency()} ${item.price.toFixed(2)}/{item.unit}</p>
                      <div className="mt-2">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Low Stock
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  // Stock Recipes View Component
  const StockRecipesView = () => {
    const availableRecipes = getRecipesFromStock();
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Recipes from Stock</h2>
            <p className="text-gray-600 mt-1">Recipes you can make with current inventory at {locations.find(l => l.id === currentLocation)?.name}</p>
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl font-semibold">
            {availableRecipes.length} recipes available
          </div>
        </div>

        {availableRecipes.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No recipes available</h3>
            <p className="text-gray-600 mb-6">You need more ingredients in stock to make recipes from your current inventory.</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setCurrentView('shopping')}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-semibold"
              >
                View Shopping List
              </button>
              <button 
                onClick={() => setCurrentView('ingredients')}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 font-semibold"
              >
                Update Stock Levels
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {availableRecipes.map(recipe => {
              const maxPortions = getMaxPortionsFromStock(recipe);
              const cost = calculateRecipeCost(recipe);
              const suggestedPrice = calculateSuggestedPrice(cost, recipe.targetMargin);
              
              return (
                <div key={recipe.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{recipe.name}</h3>
                      <p className="text-gray-600">{recipe.category}</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-xl text-sm font-bold">
                      Can make {maxPortions}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-xl p-4">
                      <h4 className="font-semibold text-green-900 mb-3">Stock Check:</h4>
                      <div className="space-y-2">
                        {recipe.ingredients.map((item, index) => {
                          const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
                          if (!ingredient) return null;
                          
                          const needed = item.quantity;
                          const available = ingredient.stock || 0;
                          
                          return (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-green-800">{ingredient.name}</span>
                              <span className={available >= needed ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                {formatQuantityWithUnit(available, ingredient.unit, isMetric)} / {formatQuantityWithUnit(needed, ingredient.unit, isMetric)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Cost per portion:</span>
                          <p className="font-bold text-gray-900">${cost.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Suggested price:</span>
                          <p className="font-bold text-gray-900">${suggestedPrice.toFixed(2)}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">Max revenue:</span>
                          <p className="font-bold text-green-600 text-lg">
                            ${(suggestedPrice * maxPortions).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const updatedIngredients = ingredients.map(ing => {
                          const recipeItem = recipe.ingredients.find(item => item.ingredientId === ing.id);
                          if (recipeItem && ing.location === currentLocation) {
                            return { ...ing, stock: Math.max(0, ing.stock - recipeItem.quantity) };
                          }
                          return ing;
                        });
                        setIngredients(updatedIngredients);
                      }}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 font-semibold"
                      disabled={maxPortions === 0}
                    >
                      Use Ingredients (Make 1 Portion)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Menu Manager View Component
  const MenuManagerView = () => {
    const [selectedMenuRecipes, setSelectedMenuRecipes] = useState([]);
    
    useEffect(() => {
      const menuRecipes = currentLocationRecipes.filter(recipe => recipe.menu === selectedMenu);
      setSelectedMenuRecipes(menuRecipes);
    }, [selectedMenu, currentLocationRecipes]);

    const moveRecipeToMenu = (recipeId, newMenuId) => {
      setRecipes(prev => prev.map(recipe => 
        recipe.id === recipeId ? { ...recipe, menu: newMenuId } : recipe
      ));
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Menu Manager</h2>
            <p className="text-gray-600 mt-1">Organize recipes into menus and manage pricing strategies</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
            >
              {menus.map(menu => (
                <option key={menu.id} value={menu.id}>{menu.name}</option>
              ))}
            </select>
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-semibold">
              + Add Menu
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Menu */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-xl font-bold text-gray-900">
                {menus.find(m => m.id === selectedMenu)?.name} Recipes
              </h3>
              <p className="text-gray-600 mt-1">
                {menus.find(m => m.id === selectedMenu)?.description}
              </p>
            </div>
            <div className="p-6">
              {selectedMenuRecipes.length === 0 ? (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No recipes in this menu yet</p>
                  <button 
                    onClick={() => setCurrentView('recipes')}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-semibold"
                  >
                    Add Recipes
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedMenuRecipes.map(recipe => {
                    const cost = calculateRecipeCost(recipe);
                    const suggestedPrice = calculateSuggestedPrice(cost, recipe.targetMargin);
                    
                    return (
                      <div key={recipe.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">{recipe.name}</h4>
                            <p className="text-gray-600">{recipe.category}</p>
                          </div>
                          <select
                            value={recipe.menu}
                            onChange={(e) => moveRecipeToMenu(recipe.id, e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-2"
                          >
                            {menus.map(menu => (
                              <option key={menu.id} value={menu.id}>{menu.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <span className="text-gray-600">Cost:</span>
                            <p className="font-bold text-gray-900">${cost.toFixed(2)}</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <span className="text-gray-600">{recipe.targetMargin}% GP:</span>
                            <p className="font-bold text-green-600">${suggestedPrice.toFixed(2)}</p>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <span className="text-gray-600">Profit:</span>
                            <p className="font-bold text-blue-600">${(suggestedPrice - cost).toFixed(2)}</p>
                          </div>
                          <div className="bg-yellow-50 rounded-lg p-3">
                            <span className="text-gray-600">Rating:</span>
                            <p className="font-bold text-yellow-600">{recipe.rating}/5 ⭐</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Menu Stats & Controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Menu Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Recipes:</span>
                  <span className="font-bold text-gray-900">{selectedMenuRecipes.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg Cost:</span>
                  <span className="font-bold text-gray-900">
                    ${selectedMenuRecipes.length > 0 ? 
                      (selectedMenuRecipes.reduce((sum, recipe) => sum + calculateRecipeCost(recipe), 0) / selectedMenuRecipes.length).toFixed(2) : 
                      '0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg Margin:</span>
                  <span className="font-bold text-gray-900">
                    {selectedMenuRecipes.length > 0 ? 
                      (selectedMenuRecipes.reduce((sum, recipe) => sum + recipe.targetMargin, 0) / selectedMenuRecipes.length).toFixed(1) : 
                      '0'}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price Range:</span>
                  <span className="font-bold text-gray-900">
                    ${selectedMenuRecipes.length > 0 ? 
                      Math.min(...selectedMenuRecipes.map(r => calculateSuggestedPrice(calculateRecipeCost(r), r.targetMargin))).toFixed(2) : 
                      '0.00'} - 
                    ${selectedMenuRecipes.length > 0 ? 
                      Math.max(...selectedMenuRecipes.map(r => calculateSuggestedPrice(calculateRecipeCost(r), r.targetMargin))).toFixed(2) : 
                      '0.00'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">GP Pricing Controls</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Custom GP Target %</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={customGPTarget}
                      onChange={(e) => setCustomGPTarget(parseFloat(e.target.value) || 0)}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="Enter GP %"
                    />
                    <button 
                      onClick={() => {
                        setRecipes(prev => prev.map(recipe => 
                          recipe.menu === selectedMenu ? 
                            { ...recipe, targetMargin: customGPTarget } : 
                            recipe
                        ));
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setCustomGPTarget(65);
                    setRecipes(prev => prev.map(recipe => 
                      recipe.menu === selectedMenu ? 
                        { ...recipe, targetMargin: 65 } : 
                        recipe
                    ));
                  }}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-xl hover:bg-gray-700 font-semibold"
                >
                  Set All to 65% GP
                </button>
                <button 
                  onClick={() => {
                    setCustomGPTarget(70);
                    setRecipes(prev => prev.map(recipe => 
                      recipe.menu === selectedMenu ? 
                        { ...recipe, targetMargin: 70 } : 
                        recipe
                    ));
                  }}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 font-semibold"
                >
                  Set All to 70% GP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Wholesale Database View Component
  const WholesaleDatabaseView = () => {
    const regionData = getCurrentRegionData();
    const currency = getCurrentCurrency();
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const allItems = Object.values(regionData.categories).flat();
    const categories = ['All', ...Object.keys(regionData.categories)];
    
    const filteredItems = allItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || regionData.categories[selectedCategory]?.includes(item);
      const matchesSearch = item.name.toLowerCase().includes(wholesaleSearchTerm.toLowerCase()) ||
                           item.supplier.toLowerCase().includes(wholesaleSearchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(wholesaleSearchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const importWholesaleItem = (item) => {
      const existingIngredient = ingredients.find(ing => 
        ing.name.toLowerCase() === item.name.toLowerCase() && 
        ing.location === currentLocation
      );

      if (existingIngredient) {
        setIngredients(prev => prev.map(ing => 
          ing.id === existingIngredient.id ? {
            ...ing,
            price: item.price,
            supplier: item.supplier,
            lastUpdated: new Date().toISOString().split('T')[0]
          } : ing
        ));
      } else {
        const newIngredient = {
          id: Date.now() + Math.random(),
          name: item.name,
          category: item.category,
          unit: item.unit,
          price: item.price,
          supplier: item.supplier,
          stock: 0,
          reorderPoint: 5,
          lastUpdated: new Date().toISOString().split('T')[0],
          location: currentLocation
        };
        setIngredients(prev => [...prev, newIngredient]);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Wholesale Pricing Database</h2>
            <p className="text-gray-600 mt-1">Compare prices from major wholesale suppliers</p>
            <div className="flex items-center space-x-3 mt-2">
              <span className="text-gray-600">{regions.find(r => r.id === currentRegion)?.flag} {regions.find(r => r.id === currentRegion)?.name}</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {currency} • {isMetric ? 'Metric' : 'Imperial'}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {filteredItems.length} items • Updated daily
          </div>
        </div>

        {/* Suppliers info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">Available Suppliers</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {regionData.suppliers.map((supplier, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl font-medium">
                {supplier}
              </span>
            ))}
          </div>
          <p className="text-blue-700">
            💡 Prices are updated from major wholesale distributors and represent typical foodservice pricing
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search ingredients, suppliers, or categories..."
                value={wholesaleSearchTerm}
                onChange={(e) => setWholesaleSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const displayUnit = getDisplayUnit(item.unit, isMetric);
            const displayPrice = isMetric && item.unit !== displayUnit ? 
              item.price / convertUnits(1, item.unit, displayUnit) : 
              item.price;
            
            const isAlreadyImported = ingredients.some(ing => 
              ing.name.toLowerCase() === item.name.toLowerCase() && 
              ing.location === currentLocation
            );
            
            return (
              <div key={index} className={`bg-white rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md ${
                isAlreadyImported ? 'border-green-200 bg-green-50' : 'border-gray-100'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-gray-600">{displayUnit}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{currency} ${displayPrice.toFixed(2)}</p>
                    <p className="text-gray-600">per {displayUnit}</p>
                    {!isMetric && item.unit !== displayUnit && (
                      <p className="text-xs text-gray-500">({currency} ${item.price.toFixed(2)}/{item.unit})</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="font-semibold text-gray-900">{item.supplier}</p>
                  </div>

                  <button
                    onClick={() => importWholesaleItem(item)}
                    className={`w-full px-4 py-3 rounded-xl font-semibold transition-colors ${
                      isAlreadyImported 
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isAlreadyImported ? 'Update Price' : 'Import Item'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    );
  };

  // Scanner View Component
  const ScannerView = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Invoice Scanner</h2>
        <p className="text-gray-600 mt-1">Scan invoices to automatically update ingredient prices</p>
      </div>
      
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 text-center border-2 border-dashed border-purple-200">
          <Camera size={64} className="mx-auto text-purple-500 mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Scan Invoice with Camera</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Take a photo of your supplier invoice to automatically extract ingredient names, prices, and update your inventory costs
          </p>
          <button className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 font-semibold text-lg shadow-lg">
            Start Camera Scan
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Supports PDF invoices, photos, and scanned documents
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-3">✨ AI-Powered Recognition</h4>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>• Automatically detects ingredient names</li>
              <li>• Extracts prices and units</li>
              <li>• Matches to existing inventory</li>
              <li>• Updates supplier information</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h4 className="font-bold text-green-900 mb-3">📋 Supported Formats</h4>
            <ul className="text-green-800 space-y-2 text-sm">
              <li>• Standard supplier invoices</li>
              <li>• Receipt photos</li>
              <li>• PDF documents</li>
              <li>• Handwritten notes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Supplier Upload View Component
  const SupplierUploadView = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Supplier Data Upload</h2>
          <p className="text-gray-600 mt-1">Upload pricing spreadsheets and manage supplier data</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Upload Pricing Spreadsheet</h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-2xl p-12 text-center">
              <Upload size={48} className="mx-auto text-blue-500 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Upload Excel/CSV files with ingredient prices
              </h4>
              <p className="text-gray-600 mb-4">
                Expected columns: Ingredient Name, Price, Unit, Supplier
              </p>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 cursor-pointer inline-block font-semibold shadow-lg"
              >
                Choose File
              </label>
              {isProcessingFile && (
                <div className="mt-6">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 mt-3">Processing file...</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Scan Invoice</h3>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-200 rounded-2xl p-12 text-center">
              <Camera size={48} className="mx-auto text-purple-500 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Take a photo of supplier invoices
              </h4>
              <p className="text-gray-600 mb-4">
                Extract pricing automatically using AI
              </p>
              <button className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 font-semibold shadow-lg">
                Scan Invoice
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <h3 className="text-xl font-bold text-gray-900">Recently Updated Prices</h3>
            <p className="text-gray-600 mt-1">Track price changes from your uploads</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ingredient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Old Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">New Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Change</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supplier</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {ingredients.filter(ing => ing.lastUpdated === new Date().toISOString().split('T')[0]).map((ingredient, index) => (
                  <tr key={ingredient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{ingredient.name}</div>
                      <div className="text-sm text-gray-500">{ingredient.category}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">${(ingredient.price * 0.9).toFixed(2)}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${ingredient.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        +{((ingredient.price - ingredient.price * 0.9) / (ingredient.price * 0.9) * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{ingredient.supplier}</td>
                  </tr>
                ))}
                {ingredients.filter(ing => ing.lastUpdated === new Date().toISOString().split('T')[0]).length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No recent price updates. Upload a file to see changes here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard': 
        return <Dashboard />;
      case 'ingredients': 
        return <IngredientsView />;
      case 'recipes': 
        return <RecipesView />;
      case 'menus': 
        return <MenuManagerView />;
      case 'shopping': 
        return <ShoppingView />;
      case 'stock-recipes': 
        return <StockRecipesView />;
      case 'wholesale-db': 
        return <WholesaleDatabaseView />;
      case 'scanner': 
        return <ScannerView />;
      case 'suppliers': 
        return <SupplierUploadView />;
      default: 
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Mobile menu overlay */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="lg:ml-72 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 lg:p-8">
          {renderCurrentView()}
        </main>
      </div>

      {/* Recipe Search Modal */}
      {showRecipeSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">AI Recipe Search</h3>
                  <p className="text-gray-600 mt-1">Search like you would ask an AI chef - describe what you want!</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                    {isMetric ? 'Metric' : 'Imperial'}
                  </span>
                  <button
                    onClick={() => {
                      setShowRecipeSearch(false);
                      setRecipeSearchResults([]);
                      setOnlineSearchTerm('');
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex space-x-3 mb-6">
                <input
                  type="text"
                  placeholder="e.g., 'easy pasta for beginners', 'elegant chicken dish', 'quick vegetarian meal'..."
                  value={onlineSearchTerm}
                  onChange={(e) => setOnlineSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchOnlineRecipes(onlineSearchTerm)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  autoFocus
                />
                <button
                  onClick={() => searchOnlineRecipes(onlineSearchTerm)}
                  disabled={isSearching}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>

              {!recipeSearchResults.length && !isSearching && (
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">Try these smart searches:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { term: 'margherita pizza', desc: 'Italian classics' },
                      { term: 'chicken caesar', desc: 'Salads' },
                      { term: 'chocolate cake', desc: 'Desserts' },
                      { term: 'pasta carbonara', desc: 'Comfort food' },
                      { term: 'beef stew', desc: 'Main dishes' },
                      { term: 'tomato soup', desc: 'Soups' },
                      { term: 'grilled salmon', desc: 'Seafood' },
                      { term: 'vegetable stir fry', desc: 'Vegetarian' }
                    ].map(suggestion => (
                      <button
                        key={suggestion.term}
                        onClick={() => {
                          setOnlineSearchTerm(suggestion.term);
                          searchOnlineRecipes(suggestion.term);
                        }}
                        className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition-colors"
                      >
                        <div className="font-semibold text-blue-900">{suggestion.desc}</div>
                        <div className="text-sm text-blue-600 mt-1">"{suggestion.term}"</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isSearching && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 text-lg">Finding perfect recipes for you...</p>
                  <p className="text-sm text-gray-500 mt-2">Searching professional recipe databases</p>
                </div>
              )}

              {recipeSearchResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipeSearchResults.map((recipe) => (
                    <div key={recipe.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">{recipe.name}</h4>
                          <p className="text-blue-600 font-medium">{recipe.source}</p>
                        </div>
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-lg">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-semibold">{recipe.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{recipe.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {recipe.cookTime} min
                        </span>
                        <span className="bg-gray-100 px-3 py-1 rounded-lg font-medium">
                          {recipe.difficulty}
                        </span>
                        <span>{recipe.reviewCount.toLocaleString()} reviews</span>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Key Ingredients:</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          {recipe.recipeIngredients.slice(0, 4).map((ing, idx) => {
                            const displayUnit = getDisplayUnit(ing.unit, isMetric);
                            const displayQuantity = getDisplayQuantity(ing.quantity, ing.unit, isMetric);
                            
                            return (
                              <div key={idx} className="flex justify-between">
                                <span>{ing.name}</span>
                                <span>{displayQuantity.toFixed(2)} {displayUnit}</span>
                              </div>
                            );
                          })}
                          {recipe.recipeIngredients.length > 4 && (
                            <div className="text-center text-gray-500 text-xs">
                              +{recipe.recipeIngredients.length - 4} more ingredients
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <button
                          onClick={() => toggleMethod(recipe.id)}
                          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <FileText size={14} className="mr-1" />
                          {expandedMethods.has(recipe.id) ? 'Hide Method' : 'Show Method'}
                          {expandedMethods.has(recipe.id) ? (
                            <ChevronDown size={14} className="ml-1" />
                          ) : (
                            <ChevronRight size={14} className="ml-1" />
                          )}
                        </button>
                        
                        {expandedMethods.has(recipe.id) && recipe.method && (
                          <div className="mt-3 p-4 bg-blue-50 rounded-xl">
                            <h5 className="font-semibold text-blue-900 mb-3">Cooking Method:</h5>
                            <div className="space-y-2">
                              {recipe.method.map((step, idx) => (
                                <div key={idx} className="text-sm text-blue-800 leading-relaxed">
                                  {step}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => importOnlineRecipe(recipe)}
                        className="w-full bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 font-semibold transition-colors"
                      >
                        Import Recipe & Ingredients
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recipe Scaling Modal */}
      {showScalingModal && selectedRecipeForScaling && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Scale Recipe: {selectedRecipeForScaling.name}</h3>
                <button
                  onClick={() => {
                    setShowScalingModal(false);
                    setSelectedRecipeForScaling(null);
                    setScalingTarget('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Recipe Info */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-bold text-blue-900 mb-3">Current Recipe</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Servings:</span>
                      <span className="font-semibold">{selectedRecipeForScaling.servings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prep Time:</span>
                      <span className="font-semibold">{selectedRecipeForScaling.prepTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Cost:</span>
                      <span className="font-semibold">${calculateRecipeCost(selectedRecipeForScaling).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost per Serving:</span>
                      <span className="font-semibold">${(calculateRecipeCost(selectedRecipeForScaling) / selectedRecipeForScaling.servings).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Scaled Recipe Info */}
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-bold text-green-900 mb-3">Scaled Recipe</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Target Servings:</span>
                      <span className="font-semibold">{parseInt(scalingTarget) || 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prep Time:</span>
                      <span className="font-semibold">{selectedRecipeForScaling.prepTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Cost:</span>
                      <span className="font-semibold">
                        ${(calculateRecipeCost(selectedRecipeForScaling) * ((parseInt(scalingTarget) || 1) / selectedRecipeForScaling.servings)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost per Serving:</span>
                      <span className="font-semibold">
                        ${(calculateRecipeCost(selectedRecipeForScaling) * ((parseInt(scalingTarget) || 1) / selectedRecipeForScaling.servings) / (parseInt(scalingTarget) || 1)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-green-100 rounded-lg text-xs text-green-800">
                    <strong>Note:</strong> Cooking time stays the same - it doesn't scale with quantity.
                  </div>
                </div>
              </div>

              {/* Scaling Controls */}
              <div className="mt-6">
                <label className="block font-semibold text-gray-900 mb-3">Target Number of Servings</label>
                
                {/* Quick Scale Buttons */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[10, 20, 50, 100].map(size => (
                    <button
                      key={size}
                      onClick={() => setScalingTarget(size.toString())}
                      className={`px-4 py-3 rounded-xl font-semibold ${
                        scalingTarget === size.toString() 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size} portions
                    </button>
                  ))}
                </div>

                {/* Custom Input */}
                <div className="flex space-x-3">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={scalingTarget}
                    onChange={(e) => setScalingTarget(e.target.value)}
                    placeholder="Enter custom amount..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyScaling}
                    disabled={!scalingTarget || parseInt(scalingTarget) <= 0}
                    className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 disabled:bg-gray-400 font-semibold"
                  >
                    Apply Scaling
                  </button>
                </div>
              </div>

              {/* Scaled Ingredients Preview */}
              {parseInt(scalingTarget) > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Scaled Ingredients Preview</h4>
                  <div className="bg-gray-50 rounded-xl p-4 max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {selectedRecipeForScaling.ingredients.map((item, index) => {
                        const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
                        if (!ingredient) return null;
                        
                        const scaledQuantity = item.quantity * ((parseInt(scalingTarget) || 1) / selectedRecipeForScaling.servings);
                        
                        return (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-700">{ingredient.name}</span>
                            <span className="font-semibold">
                              {formatQuantityWithUnit(scaledQuantity, ingredient.unit, isMetric)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCostPro;
