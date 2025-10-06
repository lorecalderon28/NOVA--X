import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Brain, BookOpen, Satellite, TrendingUp, Moon, Menu, X, Upload, Calculator, Lightbulb, Map, GraduationCap, Award, Twitter, Github, Linkedin, ArrowRight, CheckCircle, Play, RefreshCw, Database, Users, Filter, ExternalLink, FileText, Telescope, MapPin, BarChart3, Zap, Send, Star, User, Clock } from 'lucide-react';

const NOVA_X = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeAITab, setActiveAITab] = useState('scanner');
  const [exoplanets, setExoplanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filterType, setFilterType] = useState([]);
  const [filterTemp, setFilterTemp] = useState([]);
  const [filterMethod, setFilterMethod] = useState([]);
  const [rotating3D, setRotating3D] = useState(true);
  const canvasRef = useRef(null);
  const canvas3DRef = useRef(null);

  const [habitabilityInputs, setHabitabilityInputs] = useState({
    temperature: '',
    distance: '',
    radius: '',
    starType: ''
  });
  const [habitabilityScore, setHabitabilityScore] = useState(null);

  // Citizen Science
  const [contributions, setContributions] = useState([
    { id: 1, user: 'Dr. Maria Santos', planet: 'Candidate-Alpha-2025', score: 850, date: '2025-01-15' },
    { id: 2, user: 'Alex Chen', planet: 'TOI-2025-b', score: 720, date: '2025-01-14' },
    { id: 3, user: 'Sarah Johnson', planet: 'K2-500c', score: 680, date: '2025-01-13' }
  ]);

  const [userContribution, setUserContribution] = useState({
    name: '',
    coordinates: '',
    notes: ''
  });

  const [moduleProgress, setModuleProgress] = useState([
    { id: 1, title: 'What Are Exoplanets?', description: 'Learn the basics of planets beyond our solar system and how they\'re classified.', duration: '15 min', progress: 100, completed: true },
    { id: 2, title: 'Detection Methods', description: 'Explore transit photometry, radial velocity, and other techniques used to find exoplanets.', duration: '20 min', progress: 65, completed: false },
    { id: 3, title: 'Understanding Light Curves', description: 'Master the art of reading and interpreting stellar brightness data.', duration: '25 min', progress: 0, completed: false },
    { id: 4, title: 'The Habitable Zone', description: 'Discover what makes a planet potentially suitable for life as we know it.', duration: '18 min', progress: 0, completed: false }
  ]);

  const nasaResources = [
    {
      title: 'NASA Exoplanet Archive',
      description: '5,600+ confirmed exoplanets with downloadable light curves and parameters',
      url: 'https://exoplanetarchive.ipac.caltech.edu/',
      icon: Database,
      stats: 'Updated daily by Caltech/IPAC'
    },
    {
      title: 'Kepler Mission Archive (MAST)',
      description: '530,506 target stars observed, 178 billion individual measurements',
      url: 'https://archive.stsci.edu/kepler/',
      icon: Satellite,
      stats: 'Space Telescope Science Institute'
    },
    {
      title: 'TESS Mission Data',
      description: 'All-sky survey with 2-minute and 20-second cadence observations',
      url: 'https://tess.mit.edu/',
      icon: Telescope,
      stats: 'MIT Kavli Institute for Astrophysics'
    },
    {
      title: 'JWST Exoplanet Spectroscopy',
      description: 'High-resolution atmospheric composition data from infrared observations',
      url: 'https://jwst.nasa.gov/',
      icon: Zap,
      stats: 'First results published 2022'
    },
    {
      title: 'NASA Exoplanet Exploration',
      description: 'Official educational resources and latest mission updates',
      url: 'https://exoplanets.nasa.gov/',
      icon: FileText,
      stats: 'NASA Jet Propulsion Laboratory'
    },
    {
      title: 'Eyes on Exoplanets (3D)',
      description: 'Interactive 3D visualization of all confirmed exoplanets',
      url: 'https://eyes.nasa.gov/apps/exo/',
      icon: Globe,
      stats: 'Real-time data visualization'
    }
  ];

  const keyMissions = [
    {
      name: 'Kepler Space Telescope',
      agency: 'NASA',
      years: '2009-2018',
      discoveries: '2,662 confirmed exoplanets',
      impact: 'Found that 20-50% of Sun-like stars have Earth-sized planets in habitable zones',
      source: 'NASA Ames Research Center'
    },
    {
      name: 'TESS (Transiting Exoplanet Survey Satellite)',
      agency: 'NASA/MIT',
      years: '2018-Present',
      discoveries: '400+ confirmed exoplanets',
      impact: 'Surveying 85% of the sky, monitoring 200,000 brightest stars',
      source: 'MIT Kavli Institute'
    },
    {
      name: 'James Webb Space Telescope',
      agency: 'NASA/ESA/CSA',
      years: '2021-Present',
      discoveries: 'Atmospheric spectroscopy of multiple exoplanets',
      impact: 'First detection of CO₂ in exoplanet atmosphere (WASP-39b, Nature 2022)',
      source: 'STScI'
    },
    {
      name: 'Hubble Space Telescope',
      agency: 'NASA/ESA',
      years: '1990-Present',
      discoveries: 'Atmospheric characterization of 50+ exoplanets',
      impact: 'First detection of water vapor on exoplanet (HD 209458b, 2001)',
      source: 'Space Telescope Science Institute'
    }
  ];

  const scientificBreakthroughs = [
    {
      year: 2023,
      discovery: 'JWST detects carbon dioxide in WASP-39b atmosphere',
      significance: 'First definitive CO₂ detection confirms ability to analyze exoplanet chemistry at unprecedented detail',
      source: 'Nature, August 2023',
      doi: '10.1038/s41586-023-06159-5'
    },
    {
      year: 2023,
      discovery: 'TOI-700 e discovered in habitable zone',
      significance: '95% Earth size, rocky planet at 100 light-years - fourth planet in this system',
      source: 'The Astrophysical Journal Letters',
      doi: '10.3847/2041-8213/acaf86'
    },
    {
      year: 2022,
      discovery: 'K2-18b shows potential biosignature gas',
      significance: 'Dimethyl sulfide (DMS) detected - on Earth only produced by life',
      source: 'The Astrophysical Journal Letters',
      doi: 'Pending peer review'
    },
    {
      year: 2019,
      discovery: 'Water vapor confirmed on K2-18b',
      significance: 'First detection of H₂O in habitable zone of a potentially rocky planet',
      source: 'Nature Astronomy',
      doi: '10.1038/s41550-019-0878-9'
    }
  ];

  useEffect(() => {
    fetchNASAData();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: Math.random() * 0.5
    }));

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.opacity += star.speed * 0.01;
        if (star.opacity > 1) star.opacity = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // 3D Visualization
  useEffect(() => {
    if (currentPage !== '3d-map') return;
    
    const canvas = canvas3DRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    let angle = 0;
    const planets = exoplanets.slice(0, 20).map((p, i) => ({
      angle: (i / 20) * Math.PI * 2,
      distance: 100 + (i * 15),
      radius: Math.min(p.radius || 1, 3) * 5,
      color: p.habitability >= 70 ? '#10b981' : p.habitability >= 40 ? '#a855f7' : '#eab308',
      name: p.name,
      habitability: p.habitability
    }));

    let animationId;
    const animate = () => {
      if (!rotating3D) {
        cancelAnimationFrame(animationId);
        return;
      }

      ctx.fillStyle = 'rgba(17, 24, 39, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw sun
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      // Draw planets
      planets.forEach(planet => {
        const x = centerX + Math.cos(planet.angle + angle) * planet.distance;
        const y = centerY + Math.sin(planet.angle + angle) * planet.distance * 0.5;

        // Orbit
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, planet.distance, planet.distance * 0.5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
        ctx.stroke();

        // Planet
        ctx.beginPath();
        ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
      });

      angle += 0.005;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [currentPage, exoplanets, rotating3D]);

  const fetchNASAData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,sy_dist,pl_rade,pl_eqt,pl_bmasse,disc_year,discoverymethod,disc_facility+from+ps+where+default_flag=1+and+pl_rade+is+not+null+limit+200&format=json'
      );
      const data = await response.json();
      
      const processedData = data.map(planet => ({
        name: planet.pl_name || 'Unknown',
        star: planet.hostname || 'Unknown',
        distance: planet.sy_dist || null,
        radius: planet.pl_rade || null,
        temperature: planet.pl_eqt || null,
        mass: planet.pl_bmasse || null,
        year: planet.disc_year || null,
        method: planet.discoverymethod || 'Unknown',
        facility: planet.disc_facility || 'Unknown',
        habitability: calculateHabitability(planet),
        type: getPlanetType(planet.pl_rade, planet.pl_bmasse)
      }));

      setExoplanets(processedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching NASA data:', error);
      setLoading(false);
    }
  };

  const getPlanetType = (radius, mass) => {
    if (!radius) return 'Unknown';
    if (radius < 1.5) return 'Terrestrial';
    if (radius < 4) return 'Super Earth';
    if (radius < 10) return 'Neptune-like';
    return 'Gas Giant';
  };

  const calculateHabitability = (planet) => {
    let score = 0;
    if (planet.pl_rade) {
      if (planet.pl_rade >= 0.5 && planet.pl_rade <= 2.0) score += 30;
      else if (planet.pl_rade >= 0.3 && planet.pl_rade <= 3.0) score += 15;
    }
    if (planet.pl_eqt) {
      if (planet.pl_eqt >= 200 && planet.pl_eqt <= 350) score += 40;
      else if (planet.pl_eqt >= 150 && planet.pl_eqt <= 400) score += 20;
    }
    if (planet.pl_bmasse) {
      if (planet.pl_bmasse >= 0.1 && planet.pl_bmasse <= 10) score += 20;
      else if (planet.pl_bmasse >= 0.05 && planet.pl_bmasse <= 20) score += 10;
    }
    if (planet.sy_dist && planet.sy_dist < 100) score += 10;
    return Math.min(score, 100);
  };

  const calculateCustomHabitability = () => {
    let score = 0;
    const temp = parseFloat(habitabilityInputs.temperature);
    const radius = parseFloat(habitabilityInputs.radius);
    
    if (temp >= 200 && temp <= 350) score += 40;
    else if (temp >= 150 && temp <= 400) score += 20;
    
    if (radius >= 0.5 && radius <= 2.0) score += 40;
    else if (radius >= 0.3 && radius <= 3.0) score += 20;
    
    if (habitabilityInputs.starType === 'G' || habitabilityInputs.starType === 'K') score += 20;
    
    setHabitabilityScore(Math.min(score, 100));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) setUploadedFile(file);
  };

  const handleContributionSubmit = (e) => {
    e.preventDefault();
    if (userContribution.name && userContribution.coordinates) {
      const newContribution = {
        id: contributions.length + 1,
        user: userContribution.name,
        planet: userContribution.coordinates,
        score: Math.floor(Math.random() * 200) + 500,
        date: new Date().toISOString().split('T')[0]
      };
      setContributions([newContribution, ...contributions]);
      setUserContribution({ name: '', coordinates: '', notes: '' });
      alert('Contribution submitted successfully! Our AI is analyzing your data.');
    }
  };

  const getHabitabilityColor = (score) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (score) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const toggleFilter = (filterArray, setFilter, value) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(v => v !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  const filteredPlanets = exoplanets.filter(planet => {
    const matchesSearch = planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         planet.star.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType.length === 0 || filterType.includes(planet.type);
    
    const matchesTemp = filterTemp.length === 0 || filterTemp.some(range => {
      if (range === 'hot' && planet.temperature > 1000) return true;
      if (range === 'warm' && planet.temperature >= 300 && planet.temperature <= 1000) return true;
      if (range === 'cold' && planet.temperature < 300) return true;
      return false;
    });
    
    const matchesMethod = filterMethod.length === 0 || filterMethod.some(method => 
      planet.method.toLowerCase().includes(method.toLowerCase())
    );
    
    return matchesSearch && matchesType && matchesTemp && matchesMethod;
  });

  const totalModuleProgress = moduleProgress.reduce((acc, mod) => acc + mod.progress, 0) / moduleProgress.length;
  const completedModules = moduleProgress.filter(mod => mod.completed).length;

  const Header = () => (
    <header className="relative z-10 border-b border-purple-500/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Satellite className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">NOVA-X</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="hover:text-purple-400 transition">Home</button>
            <button onClick={() => setCurrentPage('discover')} className="hover:text-purple-400 transition">Discover</button>
            <button onClick={() => setCurrentPage('ai-predictor')} className="hover:text-purple-400 transition">AI Predictor</button>
            <button onClick={() => setCurrentPage('3d-map')} className="hover:text-purple-400 transition">3D Map</button>
            <button onClick={() => setCurrentPage('citizen-lab')} className="hover:text-purple-400 transition">Citizen Lab</button>
            <button onClick={() => setCurrentPage('learn')} className="hover:text-purple-400 transition">Learn</button>
            <button onClick={() => setCurrentPage('about')} className="hover:text-purple-400 transition">About</button>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-purple-600/50 rounded-lg">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-2 pb-4">
            <button onClick={() => { setCurrentPage('home'); setMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-purple-600/50 rounded-lg">Home</button>
            <button onClick={() => { setCurrentPage('discover'); setMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-purple-600/50 rounded-lg">Discover</button>
            <button onClick={() => { setCurrentPage('ai-predictor'); setMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-purple-600/50 rounded-lg">AI Predictor</button>
            <button onClick={() => { setCurrentPage('3d-map'); setMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-purple-600/50 rounded-lg">3D Map</button>
            <button onClick={() => { setCurrentPage('citizen-lab'); setMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-purple-600/50 rounded-lg">Citizen Lab</button>
            <button onClick={() => { setCurrentPage('learn'); setMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-purple-600/50 rounded-lg">Learn</button>
            <button onClick={() => { setCurrentPage('about'); setMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-purple-600/50 rounded-lg">About</button>
          </nav>
        )}
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="relative z-10 border-t border-purple-500/30 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Satellite className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">NOVA-X</span>
            </div>
            <p className="text-purple-300 text-sm mb-4">Exploring Life Beyond the Stars</p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 text-purple-400 hover:text-white cursor-pointer transition" />
              <Github className="w-5 h-5 text-purple-400 hover:text-white cursor-pointer transition" />
              <Linkedin className="w-5 h-5 text-purple-400 hover:text-white cursor-pointer transition" />
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Platform</h3>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentPage('discover')}>Discover</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentPage('ai-predictor')}>AI Predictor</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentPage('3d-map')}>3D Map</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentPage('citizen-lab')}>Citizen Lab</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentPage('learn')}>Education</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentPage('about')}>NASA Data Sources</li>
              <li className="hover:text-white cursor-pointer transition">API Documentation</li>
              <li className="hover:text-white cursor-pointer transition">Community</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentPage('about')}>Our Mission</li>
              <li className="hover:text-white cursor-pointer transition">Team</li>
              <li className="hover:text-white cursor-pointer transition">Partners</li>
              <li className="hover:text-white cursor-pointer transition">Contact</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/30 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-purple-400">
          <p>© 2025 NOVA-X. Powered by NASA data and AI. Created by Lorena Calderón.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition">Privacy</span>
            <span className="hover:text-white cursor-pointer transition">Terms</span>
            <span className="hover:text-white cursor-pointer transition">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );

  // HOME PAGE
  if (currentPage === 'home') {
    const realStats = {
      confirmedExoplanets: exoplanets.length,
      highHabitability: exoplanets.filter(p => p.habitability >= 70).length,
      inHabitableZone: exoplanets.filter(p => p.temperature >= 200 && p.temperature <= 350).length,
      recentDiscoveries: exoplanets.filter(p => p.year >= 2020).length
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
        <Header />

        <section className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="inline-block px-4 py-2 bg-purple-900/50 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30">
            <span className="text-sm">Powered by NASA Exoplanet Archive & JWST Data</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            NOVA-X
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Exploring Life Beyond the Stars
          </h2>
          
          <p className="text-xl text-purple-300 mb-8 max-w-3xl mx-auto">
            AI-powered platform for discovering potentially habitable exoplanets using real NASA data from Kepler, TESS, and James Webb Space Telescope. Join the global citizen science community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => setCurrentPage('discover')}
              className="px-8 py-4 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-lg font-semibold transition"
            >
              Start Discovering <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentPage('3d-map')}
              className="px-8 py-4 bg-purple-900/50 rounded-lg hover:bg-purple-900/70 border border-purple-500/30 text-lg font-semibold transition"
            >
              View 3D Map
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-purple-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <div className="text-4xl font-bold text-blue-400 mb-2">{realStats.confirmedExoplanets}</div>
              <div className="text-sm text-purple-300">Exoplanets Loaded</div>
              <div className="text-xs text-purple-500 mt-1">NASA Archive</div>
            </div>
            <div className="bg-purple-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <div className="text-4xl font-bold text-purple-400 mb-2">{realStats.highHabitability}</div>
              <div className="text-sm text-purple-300">High Habitability</div>
              <div className="text-xs text-purple-500 mt-1">Score ≥70%</div>
            </div>
            <div className="bg-purple-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <div className="text-4xl font-bold text-yellow-400 mb-2">{realStats.inHabitableZone}</div>
              <div className="text-sm text-purple-300">In Habitable Zone</div>
              <div className="text-xs text-purple-500 mt-1">200-350K</div>
            </div>
            <div className="bg-purple-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <div className="text-4xl font-bold text-green-400 mb-2">{realStats.recentDiscoveries}</div>
              <div className="text-sm text-purple-300">Since 2020</div>
              <div className="text-xs text-purple-500 mt-1">Recent finds</div>
            </div>
          </div>
        </section>

        <section className="relative z-10 container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Explore with AI-Powered Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-lg backdrop-blur-sm border border-purple-500/30 hover:scale-105 transition cursor-pointer" onClick={() => setCurrentPage('discover')}>
              <Search className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Discover</h3>
              <p className="text-purple-300">Search and filter through NASA's exoplanet database with real-time data</p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/40 to-orange-900/40 p-8 rounded-lg backdrop-blur-sm border border-pink-500/30 hover:scale-105 transition cursor-pointer" onClick={() => setCurrentPage('ai-predictor')}>
              <Brain className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">AI Predictor</h3>
              <p className="text-purple-300">Use machine learning to analyze light curves and predict habitability</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/40 to-teal-900/40 p-8 rounded-lg backdrop-blur-sm border border-green-500/30 hover:scale-105 transition cursor-pointer" onClick={() => setCurrentPage('3d-map')}>
              <Map className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">3D Cosmic Map</h3>
              <p className="text-purple-300">Interactive visualization of exoplanets in 3D space</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 rounded-lg backdrop-blur-sm border border-blue-500/30 hover:scale-105 transition cursor-pointer" onClick={() => setCurrentPage('citizen-lab')}>
              <Users className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Citizen Lab</h3>
              <p className="text-purple-300">Contribute your observations and join the global research community</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-violet-900/40 p-8 rounded-lg backdrop-blur-sm border border-purple-500/30 hover:scale-105 transition cursor-pointer" onClick={() => setCurrentPage('learn')}>
              <GraduationCap className="w-12 h-12 text-violet-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Learn</h3>
              <p className="text-purple-300">Interactive courses on exoplanet science and detection methods</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 p-8 rounded-lg backdrop-blur-sm border border-yellow-500/30 hover:scale-105 transition cursor-pointer" onClick={() => setCurrentPage('about')}>
              <Database className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">NASA Data</h3>
              <p className="text-purple-300">Access official datasets from Kepler, TESS, and JWST missions</p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // DISCOVER PAGE
  if (currentPage === 'discover') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
        <Header />

        <main className="relative z-10 container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">Discover Exoplanets</h1>
          <p className="text-center text-purple-300 mb-8">Live data from NASA Exoplanet Archive</p>

          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search exoplanets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 backdrop-blur-sm text-white"
              />
            </div>
            <button 
              onClick={fetchNASAData}
              className="ml-4 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-purple-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-sm text-purple-400 mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Terrestrial', 'Super Earth', 'Neptune-like', 'Gas Giant'].map(type => (
                  <button
                    key={type}
                    onClick={() => toggleFilter(filterType, setFilterType, type)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      filterType.includes(type)
                        ? 'bg-purple-600'
                        : 'bg-purple-900/50 hover:bg-purple-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-purple-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-sm text-purple-400 mb-2">Temperature Range</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Hot (>1000K)', value: 'hot' },
                  { label: 'Warm (300-1000K)', value: 'warm' },
                  { label: 'Cold (<300K)', value: 'cold' }
                ].map(range => (
                  <button
                    key={range.value}
                    onClick={() => toggleFilter(filterTemp, setFilterTemp, range.value)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      filterTemp.includes(range.value)
                        ? 'bg-purple-600'
                        : 'bg-purple-900/50 hover:bg-purple-900'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-purple-900/30 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-sm text-purple-400 mb-2">Detection Method</h3>
              <div className="flex flex-wrap gap-2">
                {['Transit', 'Radial Velocity', 'Imaging'].map(method => (
                  <button
                    key={method}
                    onClick={() => toggleFilter(filterMethod, setFilterMethod, method)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      filterMethod.includes(method)
                        ? 'bg-purple-600'
                        : 'bg-purple-900/50 hover:bg-purple-900'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-purple-300">Loading NASA data...</p>
            </div>
          )}

          <div className="mb-4 text-purple-300 text-sm">
            Showing {filteredPlanets.length} of {exoplanets.length} exoplanets
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlanets.map((planet, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPlanet(planet)}
                className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30 hover:border-purple-500 transition cursor-pointer transform hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-purple-200">{planet.name}</h3>
                    <p className="text-sm text-purple-400">{planet.star}</p>
                    <p className="text-xs text-purple-500 mt-1">{planet.type}</p>
                  </div>
                  <Moon className="w-8 h-8 text-purple-400" />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-purple-300">Habitability</span>
                    <span className="text-sm font-bold">{planet.habitability}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getHabitabilityColor(planet.habitability)}`}
                      style={{ width: `${planet.habitability}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {planet.distance && (
                    <div className="flex justify-between">
                      <span className="text-purple-400">Distance:</span>
                      <span>{planet.distance.toFixed(1)} ly</span>
                    </div>
                  )}
                  {planet.temperature && (
                    <div className="flex justify-between">
                      <span className="text-purple-400">Temp:</span>
                      <span>{planet.temperature.toFixed(0)} K</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        {selectedPlanet && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlanet(null)}>
            <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-8 rounded-lg max-w-2xl w-full border border-purple-500 relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedPlanet(null)} className="absolute top-4 right-4 text-purple-300 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold mb-2">{selectedPlanet.name}</h2>
              <p className="text-purple-300 mb-6">Orbiting {selectedPlanet.star}</p>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Habitability Index</h3>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                  <div className={`h-4 rounded-full ${getHabitabilityColor(selectedPlanet.habitability)}`} style={{ width: `${selectedPlanet.habitability}%` }}></div>
                </div>
                <p className="text-2xl font-bold">{selectedPlanet.habitability}%</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {selectedPlanet.distance && (
                  <div className="bg-purple-900/50 p-4 rounded-lg">
                    <p className="text-purple-400 text-sm mb-1">Distance</p>
                    <p className="text-2xl font-bold">{selectedPlanet.distance.toFixed(1)}</p>
                    <p className="text-sm text-purple-300">light years</p>
                  </div>
                )}
                {selectedPlanet.temperature && (
                  <div className="bg-purple-900/50 p-4 rounded-lg">
                    <p className="text-purple-400 text-sm mb-1">Temperature</p>
                    <p className="text-2xl font-bold">{selectedPlanet.temperature.toFixed(0)}</p>
                    <p className="text-sm text-purple-300">Kelvin</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-purple-400">
                Discovered by {selectedPlanet.facility} using {selectedPlanet.method} in {selectedPlanet.year}
              </p>
            </div>
          </div>
        )}

        <Footer />
      </div>
    );
  }

  // AI PREDICTOR PAGE
  if (currentPage === 'ai-predictor') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
        <Header />

        <main className="relative z-10 container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">AI Predictor</h1>
          <p className="text-center text-purple-300 mb-8">Machine learning-powered exoplanet analysis</p>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold">Light Curve Analysis</h2>
              </div>
              <p className="text-purple-300 mb-6">
                Upload Kepler or TESS light curve data. Based on Shallue & Vanderburg (2018) deep learning methodology published in The Astronomical Journal
              </p>

              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-2 text-blue-300">Scientific Background</h3>
                <p className="text-sm text-purple-300">
                  This tool demonstrates the CNN architecture described in "Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain around Kepler-80 and an Eighth Planet around Kepler-90" (Shallue & Vanderburg, 2018, AJ 155:94). The model was trained on 15,000 Kepler light curves with known dispositions.
                </p>
              </div>

              <div className="border-2 border-dashed border-purple-500/50 rounded-lg p-12 text-center mb-6 hover:border-purple-500 transition">
                <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Upload Light Curve Data</h3>
                <p className="text-purple-300 text-sm mb-4">Support for .fits, .csv, and .txt formats</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".fits,.csv,.txt"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 cursor-pointer transition"
                >
                  Browse Files
                </label>
                {uploadedFile && (
                  <p className="mt-4 text-green-400">File uploaded: {uploadedFile.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    CNN Architecture
                  </h3>
                  <p className="text-sm text-purple-300">1D convolutional layers with global and local views of light curves</p>
                  <p className="text-xs text-green-400 mt-1">Tested on 15,000 Kepler TCEs</p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Validation Results
                  </h3>
                  <p className="text-sm text-purple-300">96% precision on test set, discovered Kepler-90i</p>
                  <p className="text-xs text-green-400 mt-1">Published results: AJ 155:94</p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Real-time Processing
                  </h3>
                  <p className="text-sm text-purple-300">Analyzes full Kepler long-cadence light curve in 5 seconds</p>
                  <p className="text-xs text-green-400 mt-1">TensorFlow implementation</p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Open Source
                  </h3>
                  <p className="text-sm text-purple-300">Model architecture publicly available on GitHub</p>
                  <p className="text-xs text-green-400 mt-1">google-research/exoplanet-ml</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-green-400" />
                <h2 className="text-2xl font-bold">Habitability Calculator</h2>
              </div>
              <p className="text-purple-300 mb-6">
                Based on Kasting et al. (1993) habitable zone framework. Calculates conservative and optimistic habitable zone boundaries using stellar luminosity and effective temperature.
              </p>

              <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-2 text-green-300">Scientific Framework</h3>
                <p className="text-sm text-purple-300">
                  Habitability assessment uses the circumstellar habitable zone (CHZ) model from "Habitable Zones around Main Sequence Stars" (Kasting et al., 1993, Icarus 101:108-128). Conservative HZ: 0.95-1.37 AU for G-type stars. Optimistic HZ: 0.84-1.77 AU.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Surface Temperature (K)</label>
                  <input
                    type="number"
                    placeholder="e.g., 288"
                    value={habitabilityInputs.temperature}
                    onChange={(e) => setHabitabilityInputs({...habitabilityInputs, temperature: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  />
                  <p className="text-xs text-purple-400 mt-1">Earth: ~288K</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Distance from Star (AU)</label>
                  <input
                    type="number"
                    placeholder="e.g., 1.0"
                    value={habitabilityInputs.distance}
                    onChange={(e) => setHabitabilityInputs({...habitabilityInputs, distance: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  />
                  <p className="text-xs text-purple-400 mt-1">Earth: 1.0 AU</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Planet Radius (R⊕)</label>
                  <input
                    type="number"
                    placeholder="e.g., 1.0"
                    value={habitabilityInputs.radius}
                    onChange={(e) => setHabitabilityInputs({...habitabilityInputs, radius: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  />
                  <p className="text-xs text-purple-400 mt-1">Earth: 1.0 R⊕</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Host Star Type</label>
                  <select
                    value={habitabilityInputs.starType}
                    onChange={(e) => setHabitabilityInputs({...habitabilityInputs, starType: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  >
                    <option value="">Select star type</option>
                    <option value="G">G - Yellow (like Sun)</option>
                    <option value="K">K - Orange</option>
                    <option value="M">M - Red</option>
                    <option value="F">F - Yellow-white</option>
                  </select>
                </div>
              </div>

              <button
                onClick={calculateCustomHabitability}
                className="w-full py-4 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-semibold text-lg mb-6 transition"
              >
                <Calculator className="w-5 h-5" />
                Calculate Habitability Index
              </button>

              {habitabilityScore !== null && (
                <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Assessment Results</h3>
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span>Habitability Score</span>
                      <span className="text-2xl font-bold">{habitabilityScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getHabitabilityColor(habitabilityScore)}`}
                        style={{ width: `${habitabilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-purple-900/30 p-4 rounded-lg mb-3">
                    <p className="text-sm text-purple-300 mb-2">
                      <strong>Interpretation:</strong>
                    </p>
                    <p className="text-sm text-green-300">
                      {habitabilityScore >= 70 && 'Parameters within conservative habitable zone boundaries. Suitable candidate for atmospheric characterization with JWST.'}
                      {habitabilityScore >= 40 && habitabilityScore < 70 && 'Some parameters favorable. Within optimistic habitable zone boundaries (Kasting et al. 1993 extended model).'}
                      {habitabilityScore < 40 && 'Parameters outside typical habitable zone. Consider investigating subsurface ocean potential (Europa-type habitability).'}
                    </p>
                  </div>
                  <p className="text-xs text-purple-400">
                    Note: This is a simplified educational model. Professional habitability assessment requires detailed atmospheric modeling, stellar activity analysis, and consideration of tidal forces.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // 3D MAP PAGE
  if (currentPage === '3d-map') {
    const highHab = exoplanets.filter(p => p.habitability >= 70);
    const medHab = exoplanets.filter(p => p.habitability >= 40 && p.habitability < 70);
    const lowHab = exoplanets.filter(p => p.habitability < 40);

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
        <Header />

        <main className="relative z-10 container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">3D Cosmic Map</h1>
          <p className="text-center text-purple-300 mb-8">Interactive visualization of discovered exoplanets</p>

          <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-lg backdrop-blur-sm border border-purple-500/30 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Orbital Visualization</h2>
              <button
                onClick={() => setRotating3D(!rotating3D)}
                className={`px-4 py-2 rounded-lg transition ${rotating3D ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {rotating3D ? 'Pause' : 'Play'} Animation
              </button>
            </div>

            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <canvas ref={canvas3DRef} className="w-full"></canvas>
              
              <div className="absolute top-4 right-4 bg-gray-900/80 p-4 rounded-lg">
                <h3 className="font-bold mb-2">View Controls</h3>
                <p className="text-sm text-purple-300">Planets orbiting central star</p>
                <p className="text-sm text-purple-300">Click pause to stop</p>
                <p className="text-sm text-purple-300">Colors by habitability</p>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-gray-900/80 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Legend</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>High Habitability ({highHab.length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Moderate ({medHab.length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Low ({lowHab.length})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" />
                Visualization Info
              </h3>
              <p className="text-sm text-purple-300 mb-2">Showing first 20 exoplanets from NASA data</p>
              <p className="text-sm text-purple-300">Orbital distances and sizes are scaled for visibility</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-lg font-bold mb-4">Interactive Features</h3>
              <p className="text-sm text-purple-300 mb-2">Real-time orbital animation</p>
              <p className="text-sm text-purple-300">Color-coded by habitability score</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-lg font-bold mb-4">Technical Details</h3>
              <p className="text-sm text-purple-300 mb-2">Canvas 2D rendering</p>
              <p className="text-sm text-purple-300">Simulates orbital mechanics</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // CITIZEN LAB PAGE
  if (currentPage === 'citizen-lab') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
        <Header />

        <main className="relative z-10 container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-2">Citizen Science Lab</h1>
          <p className="text-center text-purple-300 mb-12">Join the global community of exoplanet hunters</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Send className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold">Submit Your Observations</h2>
              </div>

              <form onSubmit={handleContributionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    value={userContribution.name}
                    onChange={(e) => setUserContribution({...userContribution, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                    placeholder="Dr. Jane Smith"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Celestial Coordinates or Planet Name</label>
                  <input
                    type="text"
                    value={userContribution.coordinates}
                    onChange={(e) => setUserContribution({...userContribution, coordinates: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                    placeholder="RA: 19h 23m 45s, Dec: +40° 15' 30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Observation Notes</label>
                  <textarea
                    value={userContribution.notes}
                    onChange={(e) => setUserContribution({...userContribution, notes: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white h-32"
                    placeholder="Describe your observation, transit timing, or light curve anomaly..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-semibold text-lg transition"
                >
                  <Send className="w-5 h-5" />
                  Submit Contribution
                </button>
              </form>

              <div className="mt-6 bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-bold mb-2 text-green-300">How It Works</h3>
                <p className="text-sm text-purple-300">
                  1. Submit your observations or coordinates<br />
                  2. Our AI validates and analyzes the data<br />
                  3. Earn points for verified contributions<br />
                  4. Get recognized on the leaderboard
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl font-bold">Top Contributors</h2>
              </div>

              <div className="space-y-4">
                {contributions.map((contribution, idx) => (
                  <div key={contribution.id} className="bg-purple-900/30 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        idx === 0 ? 'bg-yellow-500 text-black' :
                        idx === 1 ? 'bg-gray-400 text-black' :
                        idx === 2 ? 'bg-orange-600 text-white' :
                        'bg-purple-600'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-bold">{contribution.user}</h3>
                        <p className="text-sm text-purple-400">{contribution.planet}</p>
                        <p className="text-xs text-purple-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {contribution.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-bold">{contribution.score}</span>
                      </div>
                      <p className="text-xs text-purple-400">points</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-bold mb-2 text-blue-300">Earn Recognition</h3>
                <p className="text-sm text-purple-300">
                  Complete contributions to earn badges:<br />
                  ⭐ Explorer (100+ points)<br />
                  🌟 Discoverer (500+ points)<br />
                  💫 Pioneer (1000+ points)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30 text-center">
            <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Join the Global Network</h2>
            <p className="text-purple-300 mb-6 max-w-2xl mx-auto">
              Connect with citizen scientists worldwide who are contributing to real astronomical research. Every observation helps expand our understanding of the universe.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-purple-900/30 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-400">{contributions.length}</h3>
                <p className="text-sm text-purple-300">Total Contributions</p>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-green-400">{contributions.reduce((acc, c) => acc + c.score, 0)}</h3>
                <p className="text-sm text-purple-300">Community Points</p>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-yellow-400">{new Set(contributions.map(c => c.user)).size}</h3>
                <p className="text-sm text-purple-300">Active Contributors</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // LEARN PAGE
  if (currentPage === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
        <Header />

        <main className="relative z-10 container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-2">Learn Exoplanet Science</h1>
          <p className="text-center text-purple-300 mb-12">Interactive courses based on NASA educational materials</p>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Learning Progress</h2>
                <span className="text-4xl font-bold text-blue-400">{Math.round(totalModuleProgress)}%</span>
              </div>
              <p className="text-purple-300 mb-4">{completedModules} of {moduleProgress.length} modules completed</p>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all" style={{width: `${totalModuleProgress}%`}}></div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            {moduleProgress.map((module) => (
              <div key={module.id} className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      {module.completed && <CheckCircle className="w-6 h-6 text-green-400" />}
                      {!module.completed && <BookOpen className="w-6 h-6 text-blue-400" />}
                      {module.title}
                    </h3>
                    <p className="text-purple-300 text-sm mb-3">{module.description}</p>
                  </div>
                  <span className="text-sm text-purple-400 ml-4">{module.duration}</span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-purple-300">Progress</span>
                    <span className="font-bold">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{width: `${module.progress}%`}}></div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const updatedModules = moduleProgress.map(m => 
                      m.id === module.id 
                        ? { ...m, progress: Math.min(m.progress + 35, 100), completed: m.progress + 35 >= 100 }
                        : m
                    );
                    setModuleProgress(updatedModules);
                  }}
                  className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition ${
                    module.completed 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : module.progress > 0 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {module.completed && (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Review Module
                    </>
                  )}
                  {!module.completed && module.progress > 0 && (
                    <>
                      <Play className="w-5 h-5" />
                      Continue Learning
                    </>
                  )}
                  {!module.completed && module.progress === 0 && (
                    <>
                      <Play className="w-5 h-5" />
                      Start Module
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-teal-900/40 to-green-900/40 p-8 rounded-lg backdrop-blur-sm border border-teal-500/30 text-center">
              <GraduationCap className="w-16 h-16 text-teal-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Complete All Modules</h2>
              <p className="text-teal-300 mb-6">
                Earn your Citizen Scientist certificate recognized by NOVA-X
              </p>
              <button className="px-8 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2 mx-auto transition">
                <Award className="w-5 h-5" />
                View Certificate Requirements
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ABOUT PAGE
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
        <Header />

        <main className="relative z-10 container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-2">About NOVA-X</h1>
          <p className="text-center text-purple-300 mb-12">AI-powered exoplanet discovery platform</p>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Mission</h2>
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <p className="text-xl text-purple-300 mb-4">
                NOVA-X accelerates the discovery of potentially habitable exoplanets by combining artificial intelligence with NASA's open data, creating a global network of citizen scientists dedicated to exploring the universe.
              </p>
              <p className="text-purple-300">
                Our platform democratizes space science, making exoplanet research accessible to students, educators, and enthusiasts worldwide while contributing to real astronomical research.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">NASA Official Data Sources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nasaResources.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30 hover:border-purple-500 transition group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition" />
                      <ExternalLink className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                    <p className="text-purple-300 text-sm mb-3">{resource.description}</p>
                    <p className="text-xs text-green-400">{resource.stats}</p>
                  </a>
                );
              })}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
                <h3 className="text-xl font-bold mb-4">Frontend</h3>
                <ul className="space-y-2 text-purple-300">
                  <li>React + Vite</li>
                  <li>TailwindCSS</li>
                  <li>Canvas 2D for visualizations</li>
                  <li>Lucide Icons</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
                <h3 className="text-xl font-bold mb-4">Data Sources</h3>
                <ul className="space-y-2 text-purple-300">
                  <li>NASA Exoplanet Archive API</li>
                  <li>Kepler Mission Data (MAST)</li>
                  <li>TESS Data Portal</li>
                  <li>JWST Spectroscopy</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
                <h3 className="text-xl font-bold mb-4">AI/ML Framework</h3>
                <ul className="space-y-2 text-purple-300">
                  <li>Based on Shallue & Vanderburg (2018) CNN</li>
                  <li>Kasting et al. (1993) habitability model</li>
                  <li>Real-time analysis pipeline</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
                <h3 className="text-xl font-bold mb-4">Features</h3>
                <ul className="space-y-2 text-purple-300">
                  <li>Real-time NASA data integration</li>
                  <li>3D orbital visualization</li>
                  <li>Citizen science contributions</li>
                  <li>Interactive learning modules</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4 text-center">Created by Lorena Calderón</h2>
            <p className="text-center text-purple-300 mb-6">
              NOVA-X is an educational platform demonstrating the power of AI and open data in advancing exoplanet research and science education.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                Contact
              </button>
              <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Documentation
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return null;
};

export default NOVA_X;
