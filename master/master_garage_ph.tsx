import React, { useState, useEffect } from 'react';
import { 
  Wrench, Calendar, CreditCard, MessageSquare, Car, 
  Settings, MapPin, Clock, CheckCircle, Menu, X, 
  Phone, Mail, ChevronRight, Shield, Zap, Wind
} from 'lucide-react';

const BRANCHES = [
  { id: 'qc', name: 'Quezon City Main', address: '123 Commonwealth Ave, QC' },
  { id: 'makati', name: 'Makati Central', address: '456 Chino Roces Ave, Makati' },
  { id: 'alabang', name: 'Alabang South', address: '789 Commerce Ave, Muntinlupa' }
];

const SERVICES = [
  { 
    id: 'pms', 
    title: 'Preventive Maintenance (PMS)', 
    icon: <Settings className="w-8 h-8" />,
    description: 'Comprehensive fluid checks, oil change, filter replacements, and overall vehicle health assessment.',
    price: 'Starts at ₱3,500' 
  },
  { 
    id: 'engine', 
    title: 'Engine Repair & Diagnostics', 
    icon: <Zap className="w-8 h-8" />,
    description: 'Advanced computer diagnostics, timing belt replacement, head gasket repair, and full engine overhaul.',
    price: 'Varies based on diagnosis' 
  },
  { 
    id: 'underchassis', 
    title: 'Underchassis & Suspension', 
    icon: <Car className="w-8 h-8" />,
    description: 'Shock absorbers, tie rods, bushings, ball joints replacement, and wheel alignment.',
    price: 'Starts at ₱2,000 / side' 
  },
  { 
    id: 'electrical', 
    title: 'Auto Electrical Systems', 
    icon: <Shield className="w-8 h-8" />,
    description: 'Battery testing, alternator repair, starter motor issues, and complex wiring diagnostics.',
    price: 'Starts at ₱1,500' 
  },
  { 
    id: 'ac', 
    title: 'Air Conditioning Services', 
    icon: <Wind className="w-8 h-8" />,
    description: 'Freon recharge, compressor repair, evaporator cleaning, and leak detection.',
    price: 'Starts at ₱1,800' 
  }
];

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function MasterGarageApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to switch tabs and close mobile menu
  const navigateTo = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const Navigation = () => (
    <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
            <Wrench className="w-8 h-8 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold text-white tracking-tight uppercase">
              Master <span className="text-yellow-500">Garage</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'booking', label: 'Book Service' },
              { id: 'services', label: 'Services' },
              { id: 'payment', label: 'Pay Invoice' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === item.id ? 'text-yellow-500' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { id: 'home', label: 'Home' },
              { id: 'booking', label: 'Book Service' },
              { id: 'services', label: 'Services' },
              { id: 'payment', label: 'Pay Invoice' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left px-3 py-4 text-base font-medium uppercase tracking-wide ${
                  activeTab === item.id ? 'text-yellow-500 bg-zinc-950' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  const HomeView = () => (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight uppercase mb-6">
            Precision <span className="text-yellow-500">Engineering.</span><br/> Ultimate Performance.
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-zinc-400 mb-10">
            The premier multi-branch auto repair facility in the Philippines. Expert diagnostics, transparent pricing, and world-class service bays.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => navigateTo('booking')}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded font-bold uppercase tracking-widest transition-transform hover:scale-105 flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book an Appointment
            </button>
            <button 
              onClick={() => navigateTo('services')}
              className="border border-zinc-600 hover:border-yellow-500 text-white hover:text-yellow-500 px-8 py-4 rounded font-bold uppercase tracking-widest transition-colors flex items-center justify-center"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Our Services
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats/Features */}
      <div className="bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border border-zinc-800 rounded bg-zinc-900">
              <MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white uppercase mb-2">3 Prime Locations</h3>
              <p className="text-zinc-400">Conveniently located branches across Metro Manila for easy access.</p>
            </div>
            <div className="p-6 border border-zinc-800 rounded bg-zinc-900">
              <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white uppercase mb-2">Real-Time Booking</h3>
              <p className="text-zinc-400">Secure your service bay slot instantly with our online schedule system.</p>
            </div>
            <div className="p-6 border border-zinc-800 rounded bg-zinc-900">
              <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white uppercase mb-2">Certified Mechanics</h3>
              <p className="text-zinc-400">Our team consists of highly trained and certified automotive engineers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingView = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      branch: '', date: '', time: '', service: '', 
      vehicleMake: '', vehicleModel: '', vehicleYear: '', plateNumber: '',
      name: '', phone: '', email: ''
    });
    const [availableTimes, setAvailableTimes] = useState([]);
    const [isChecking, setIsChecking] = useState(false);

    // Mock real-time availability check
    useEffect(() => {
      if (formData.branch && formData.date) {
        setIsChecking(true);
        // Simulate network delay
        const timer = setTimeout(() => {
          // Randomly disable some slots based on branch/date to simulate availability
          const randomSeed = formData.branch.length + formData.date.length;
          const slots = TIME_SLOTS.map((time, index) => ({
            time,
            available: (randomSeed + index) % 3 !== 0 // ~66% availability
          }));
          setAvailableTimes(slots);
          setIsChecking(false);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        setAvailableTimes([]);
      }
    }, [formData.branch, formData.date]);

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTimeSelect = (time) => {
      setFormData({ ...formData, time });
    };

    const submitBooking = (e) => {
      e.preventDefault();
      setStep(3); // Success step
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
        <h2 className="text-4xl font-bold text-white uppercase tracking-tight mb-2">Book a Service Bay</h2>
        <p className="text-zinc-400 mb-8">Select a branch and date to check real-time availability.</p>

        {step === 1 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-yellow-500 mb-6 uppercase border-b border-zinc-800 pb-2">1. Location & Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Select Branch</label>
                <select 
                  name="branch" value={formData.branch} onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500 focus:outline-none"
                >
                  <option value="">-- Choose Branch --</option>
                  {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Preferred Date</label>
                <input 
                  type="date" name="date" value={formData.date} onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500 focus:outline-none [color-scheme:dark]"
                />
              </div>
            </div>

            {formData.branch && formData.date && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-400 mb-4">Available Time Slots</label>
                {isChecking ? (
                  <div className="flex items-center text-yellow-500">
                    <Clock className="w-5 h-5 animate-spin mr-2" /> Checking availability...
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableTimes.map((slot, i) => (
                      <button
                        key={i}
                        disabled={!slot.available}
                        onClick={() => handleTimeSelect(slot.time)}
                        className={`p-3 rounded border text-center transition-all ${
                          !slot.available ? 'border-zinc-800 bg-zinc-950 text-zinc-600 cursor-not-allowed'
                          : formData.time === slot.time ? 'border-yellow-500 bg-yellow-500 text-black font-bold'
                          : 'border-zinc-700 bg-zinc-900 text-white hover:border-yellow-500'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end mt-8">
              <button 
                disabled={!formData.branch || !formData.date || !formData.time}
                onClick={() => setStep(2)}
                className="bg-yellow-500 disabled:bg-zinc-800 disabled:text-zinc-500 hover:bg-yellow-400 text-black px-8 py-3 rounded font-bold uppercase tracking-wider flex items-center"
              >
                Next Step <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={submitBooking} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 md:p-8 animate-fadeIn">
            <h3 className="text-xl font-bold text-yellow-500 mb-6 uppercase border-b border-zinc-800 pb-2">2. Vehicle & Contact Details</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Primary Service Needed</label>
              <select 
                name="service" value={formData.service} onChange={handleInputChange} required
                className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500 focus:outline-none"
              >
                <option value="">-- Select Service --</option>
                {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Vehicle Make & Model</label>
                <input type="text" name="vehicleMake" placeholder="e.g. Toyota Hilux" value={formData.vehicleMake} onChange={handleInputChange} required className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Plate Number</label>
                <input type="text" name="plateNumber" placeholder="ABC 1234" value={formData.plateNumber} onChange={handleInputChange} required className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Contact Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500" />
              </div>
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t border-zinc-800">
              <button type="button" onClick={() => setStep(1)} className="text-zinc-400 hover:text-white px-4 py-2 uppercase font-semibold">Back</button>
              <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded font-bold uppercase tracking-wider">Confirm Booking</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 text-center animate-fadeIn">
            <CheckCircle className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white uppercase mb-4">Booking Confirmed!</h3>
            <p className="text-zinc-400 max-w-md mx-auto mb-8">
              Your service bay at <strong>{BRANCHES.find(b=>b.id===formData.branch)?.name}</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong> is reserved. A confirmation SMS has been sent to {formData.phone}.
            </p>
            <button onClick={() => navigateTo('home')} className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3 rounded font-bold uppercase tracking-wider transition-colors">
              Return to Home
            </button>
          </div>
        )}
      </div>
    );
  };

  const ServicesView = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white uppercase tracking-tight mb-4">Engineering Services</h2>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Master Garage PH offers comprehensive, state-of-the-art automotive repair and maintenance services.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map(service => (
          <div key={service.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-yellow-500 transition-colors group">
            <div className="w-16 h-16 bg-zinc-950 rounded-full flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white uppercase mb-3">{service.title}</h3>
            <p className="text-zinc-400 mb-6 min-h-[80px]">{service.description}</p>
            <div className="border-t border-zinc-800 pt-4 flex justify-between items-center">
              <span className="text-yellow-500 font-semibold">{service.price}</span>
              <button onClick={() => navigateTo('booking')} className="text-sm text-white hover:text-yellow-500 uppercase font-bold tracking-wider flex items-center">
                Book <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PaymentView = () => {
    const [invoiceNo, setInvoiceNo] = useState('');
    const [paymentState, setPaymentState] = useState('lookup'); // lookup, paying, success
    const [mockInvoice, setMockInvoice] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSearch = (e) => {
      e.preventDefault();
      if (!invoiceNo) return;
      // Mock finding an invoice
      setTimeout(() => {
        setMockInvoice({
          id: invoiceNo.toUpperCase(),
          date: new Date().toLocaleDateString(),
          customer: 'John Doe',
          vehicle: 'Toyota Hilux (ABC 1234)',
          services: ['Full Synthetic Oil Change', 'Brake Pad Replacement', 'Labor'],
          total: '₱ 8,450.00'
        });
        setPaymentState('paying');
      }, 500);
    };

    const handlePayment = () => {
      if (!paymentMethod) return;
      // Mock payment processing
      setPaymentState('processing');
      setTimeout(() => {
        setPaymentState('success');
      }, 1500);
    };

    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-fadeIn">
        <div className="text-center mb-10">
          <CreditCard className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white uppercase tracking-tight mb-4">Payment Portal</h2>
          <p className="text-zinc-400">Securely settle your Master Garage invoices online.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 md:p-10">
          {paymentState === 'lookup' && (
            <form onSubmit={handleSearch} className="max-w-md mx-auto text-center">
              <label className="block text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Enter Invoice Number</label>
              <input 
                type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)}
                placeholder="e.g. INV-2023-089" required
                className="w-full bg-zinc-950 border border-zinc-700 rounded p-4 text-center text-xl text-white focus:border-yellow-500 focus:outline-none mb-6 uppercase"
              />
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded font-bold uppercase tracking-wider">
                Find Invoice
              </button>
            </form>
          )}

          {paymentState === 'paying' && mockInvoice && (
            <div className="animate-fadeIn">
              <div className="border border-zinc-700 rounded p-6 bg-zinc-950 mb-8">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-zinc-800">
                  <div>
                    <h3 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Invoice</h3>
                    <p className="text-2xl font-bold text-white">{mockInvoice.id}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Total Due</h3>
                    <p className="text-2xl font-bold text-yellow-500">{mockInvoice.total}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-zinc-300"><span className="text-zinc-500 mr-2">Customer:</span> {mockInvoice.customer}</p>
                  <p className="text-zinc-300"><span className="text-zinc-500 mr-2">Vehicle:</span> {mockInvoice.vehicle}</p>
                  <p className="text-zinc-300"><span className="text-zinc-500 mr-2">Date:</span> {mockInvoice.date}</p>
                </div>
                <div>
                  <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-3 border-b border-zinc-800 pb-2">Itemized Services</h4>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    {mockInvoice.services.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              </div>

              <h4 className="text-lg font-bold text-white uppercase mb-4">Select Payment Method</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {['GCash', 'Maya', 'Credit Card'].map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 rounded border text-center font-bold uppercase tracking-wider transition-colors ${
                      paymentMethod === method ? 'border-yellow-500 bg-yellow-500 text-black' : 'border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-yellow-500 hover:text-white'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button onClick={() => setPaymentState('lookup')} className="text-zinc-400 hover:text-white px-4 py-2 uppercase font-semibold">Cancel</button>
                <button 
                  disabled={!paymentMethod}
                  onClick={handlePayment} 
                  className="bg-yellow-500 disabled:bg-zinc-800 disabled:text-zinc-500 hover:bg-yellow-400 text-black px-8 py-3 rounded font-bold uppercase tracking-wider"
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}

          {paymentState === 'processing' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-zinc-800 border-t-yellow-500 rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-white uppercase">Processing Payment...</h3>
              <p className="text-zinc-400 mt-2">Please do not close this window.</p>
            </div>
          )}

          {paymentState === 'success' && (
            <div className="text-center py-8 animate-fadeIn">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white uppercase mb-2">Payment Successful</h3>
              <p className="text-zinc-400 mb-8">Invoice {mockInvoice?.id} has been fully settled via {paymentMethod}. Receipt sent to your email.</p>
              <button onClick={() => { setPaymentState('lookup'); setInvoiceNo(''); }} className="border border-zinc-600 hover:border-yellow-500 text-white hover:text-yellow-500 px-8 py-3 rounded font-bold uppercase tracking-wider transition-colors">
                Process Another Payment
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ContactView = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tight mb-6">Technical Inquiry</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Experiencing unusual noises, warning lights, or performance drops? Describe your vehicle's symptoms, and our master mechanics will get back to you with a preliminary assessment.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-yellow-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-bold uppercase mb-1">Headquarters</h4>
                  <p className="text-zinc-400">123 Commonwealth Ave, Quezon City, Metro Manila, Philippines</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
                <p className="text-zinc-400">+63 917 123 4567 / (02) 8123 4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
                <p className="text-zinc-400">support@mastergarage.ph</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white uppercase mb-2">Inquiry Received</h3>
                <p className="text-zinc-400">Our technical team will review your symptoms and contact you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 border border-zinc-700 hover:border-yellow-500 text-white px-6 py-2 rounded uppercase text-sm font-bold">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                    <input type="text" required className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Phone</label>
                    <input type="tel" required className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Vehicle Make/Model/Year</label>
                  <input type="text" placeholder="e.g. Honda Civic 2018" required className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Describe the Issue</label>
                  <textarea rows="4" placeholder="e.g. Squeaking noise when braking..." required className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-yellow-500 resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded font-bold uppercase tracking-wider mt-4">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-yellow-500 selection:text-black">
      <Navigation />
      
      <main className="min-h-[calc(100vh-160px)]">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'booking' && <BookingView />}
        {activeTab === 'services' && <ServicesView />}
        {activeTab === 'payment' && <PaymentView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Wrench className="w-6 h-6 text-yellow-500 mr-2" />
            <span className="text-xl font-bold text-white tracking-tight uppercase">Master Garage PH</span>
          </div>
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Master Garage Philippines. All rights reserved. Mock Application.
          </p>
        </div>
      </footer>

      {/* Basic Custom CSS for specific animations (Tailwind handles the rest) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}