import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import authService from '../services/authService';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    dob: '',
    country: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [isCityPickerVisible, setCityPickerVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const scrollViewRef = useRef(null);

  // Countries and cities data (alphabetically ordered)
  const countriesData = {
    'Afghanistan': ['Kabul', 'Kandahar', 'Herat', 'Mazar-i-Sharif', 'Kunduz', 'Jalalabad', 'Ghazni', 'Balkh', 'Baghlan', 'Gardez'],
    'Algeria': ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Batna', 'Blida', 'Sétif', 'Chlef', 'Souk Ahras', 'Tiaret'],
    'Andorra': ['Andorra la Vella', 'Escaldes-Engordany', 'Encamp', 'Sant Julià de Lòria', 'La Massana', 'Canillo', 'Ordino'],
    'Armenia': ['Yerevan', 'Gyumri', 'Vanadzor', 'Vagharshapat', 'Abovyan', 'Kapan', 'Hrazdan', 'Ijevan', 'Gavar', 'Armavir'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong'],
    'Austria': ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck', 'Klagenfurt', 'Villach', 'Wels', 'Sankt Pölten', 'Dornbirn'],
    'Azerbaijan': ['Baku', 'Ganja', 'Sumqayit', 'Mingachevir', 'Lankaran', 'Shirvan', 'Nakhchivan', 'Shaki', 'Yevlakh', 'Gabala'],
    'Bangladesh': ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Barisal', 'Sylhet', 'Comilla', 'Rangpur', 'Mymensingh', 'Narayanganj'],
    'Belgium': ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Leuven', 'Mons', 'Aalst'],
    'Bhutan': ['Thimphu', 'Phuntsholing', 'Paro', 'Gelephu', 'Samdrup Jongkhar', 'Samtse', 'Punakha', 'Wangdue Phodrang', 'Trongsa', 'Bumthang'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
    'Bulgaria': ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven', 'Sliven', 'Dobrich', 'Shumen'],
    'Cambodia': ['Phnom Penh', 'Battambang', 'Siem Reap', 'Sihanoukville', 'Kampot', 'Kampong Cham', 'Kampong Thom', 'Kratie', 'Takeo', 'Kampong Speu'],
    'Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
    'China': ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Tianjin', 'Chongqing', 'Nanjing', 'Wuhan', 'Xi\'an'],
    'Cyprus': ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta', 'Kyrenia', 'Aradippou', 'Lakatamia', 'Aglandjia', 'Paralimni'],
    'Czech Republic': ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec', 'Olomouc', 'Ústí nad Labem', 'České Budějovice', 'Hradec Králové', 'Pardubice'],
    'Denmark': ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Roskilde'],
    'Egypt': ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'El-Mahalla El-Kubra', 'Aswan'],
    'Finland': ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyväskylä', 'Lahti', 'Kuopio', 'Pori'],
    'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
    'Georgia': ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Gori', 'Zugdidi', 'Poti', 'Khashuri', 'Samtredia', 'Senaki'],
    'Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    'Ghana': ['Accra', 'Kumasi', 'Tamale', 'Sekondi-Takoradi', 'Ashaiman', 'Sunyani', 'Cape Coast', 'Obuasi', 'Teshie', 'Tema'],
    'Greece': ['Athens', 'Thessaloniki', 'Patras', 'Piraeus', 'Larissa', 'Heraklion', 'Peristeri', 'Kallithea', 'Acharnes', 'Kalamaria'],
    'Hungary': ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr', 'Nyíregyháza', 'Kecskemét', 'Székesfehérvár', 'Szombathely'],
    'Iceland': ['Reykjavík', 'Kópavogur', 'Hafnarfjörður', 'Reykjanesbær', 'Akureyri', 'Garðabær', 'Mosfellsbær', 'Árborg', 'Akranes', 'Fjallabyggð'],
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'],
    'Indonesia': ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Palembang', 'Makassar', 'Tangerang', 'Depok', 'Bekasi'],
    'Iran': ['Tehran', 'Mashhad', 'Isfahan', 'Tabriz', 'Shiraz', 'Kerman', 'Yazd', 'Qom', 'Kermanshah', 'Urmia'],
    'Iraq': ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Sulaymaniyah', 'Najaf', 'Karbala', 'Kirkuk', 'Wasit', 'Diyala'],
    'Ireland': ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford', 'Drogheda', 'Swords', 'Dundalk', 'Bray', 'Navan'],
    'Israel': ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Ashdod', 'Netanya', 'Beer Sheva', 'Holon', 'Bnei Brak'],
    'Italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
    'Japan': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
    'Jordan': ['Amman', 'Zarqa', 'Irbid', 'Russeifa', 'Al-Quwaysimah', 'Tila al-Ali', 'Wadi al-Seer', 'Khoura', 'Aqaba', 'Madaba'],
    'Kazakhstan': ['Almaty', 'Nur-Sultan', 'Shymkent', 'Aktobe', 'Karaganda', 'Taraz', 'Pavlodar', 'Oskemen', 'Semey', 'Atyrau'],
    'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale', 'Kakamega', 'Nyeri'],
    'Kuwait': ['Kuwait City', 'Salmiya', 'Hawalli', 'Jahra', 'Farwaniya', 'Mubarak Al-Kabeer', 'Ahmadi', 'Al Jahra'],
    'Kyrgyzstan': ['Bishkek', 'Osh', 'Jalal-Abad', 'Karakol', 'Talas', 'Naryn', 'Balykchy', 'Kara-Balta', 'Tokmok', 'Kant'],
    'Laos': ['Vientiane', 'Savannakhet', 'Pakse', 'Luang Prabang', 'Xam Neua', 'Phonsavan', 'Thakhek', 'Vang Vieng', 'Luang Namtha', 'Muang Xay'],
    'Lebanon': ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Zahle', 'Baalbek', 'Jounieh', 'Nabatieh', 'Batroun', 'Byblos'],
    'Liechtenstein': ['Vaduz', 'Schaan', 'Triesen', 'Balzers', 'Triesenberg', 'Eschen', 'Mauren', 'Ruggell', 'Gamprin', 'Schellenberg'],
    'Luxembourg': ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange', 'Ettelbruck', 'Diekirch', 'Wiltz', 'Echternach', 'Rumelange', 'Grevenmacher'],
    'Malaysia': ['Kuala Lumpur', 'George Town', 'Ipoh', 'Shah Alam', 'Johor Bahru', 'Melaka', 'Alor Setar', 'Miri', 'Petaling Jaya', 'Kuching'],
    'Maldives': ['Male', 'Addu City', 'Fuvahmulah', 'Kulhudhuffushi', 'Thinadhoo', 'Hithadhoo', 'Naifaru', 'Vilufushi', 'Mahibadhoo', 'Gan'],
    'Malta': ['Valletta', 'Birkirkara', 'Mosta', 'Qormi', 'Żabbar', 'Żebbuġ', 'Sliema', 'San Ġwann', 'Naxxar', 'Fgura'],
    'Mexico': ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Ciudad Juárez', 'León', 'Zapopan', 'Monclova', 'Aguascalientes'],
    'Monaco': ['Monaco', 'Monte Carlo', 'La Condamine', 'Fontvieille', 'Monaco-Ville', 'Larvotto', 'La Rousse', 'Saint Michel', 'La Colle', 'Les Révoires'],
    'Mongolia': ['Ulaanbaatar', 'Erdenet', 'Darkhan', 'Choibalsan', 'Mörön', 'Nalaikh', 'Khovd', 'Ölgii', 'Bayankhongor', 'Arvaikheer'],
    'Morocco': ['Casablanca', 'Rabat', 'Fez', 'Marrakech', 'Agadir', 'Tangier', 'Meknes', 'Oujda', 'Kénitra', 'Tetouan'],
    'Myanmar': ['Yangon', 'Mandalay', 'Naypyidaw', 'Bago', 'Mawlamyine', 'Pathein', 'Meiktila', 'Myitkyina', 'Taunggyi', 'Pyin Oo Lwin'],
    'Nepal': ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bharatpur', 'Biratnagar', 'Birgunj', 'Dharan', 'Butwal', 'Dhangadhi', 'Hetauda'],
    'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
    'New Zealand': ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier-Hastings', 'Dunedin', 'Palmerston North', 'Nelson', 'Rotorua'],
    'North Korea': ['Pyongyang', 'Hamhung', 'Chongjin', 'Nampo', 'Wonsan', 'Sinuiju', 'Tanchon', 'Kaechon', 'Sariwon', 'Haeju'],
    'Norway': ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Fredrikstad', 'Kristiansand', 'Sandnes', 'Sandefjord', 'Haugesund'],
    'Oman': ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Saham', 'Barka', 'Rustaq', 'Al Buraimi'],
    'Pakistan': ['Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Hyderabad', 'Gujranwala', 'Peshawar', 'Quetta', 'Islamabad'],
    'Palestine': ['Gaza City', 'East Jerusalem', 'Hebron', 'Nablus', 'Ramallah', 'Khan Yunis', 'Rafah', 'Tulkarm', 'Qalqilya', 'Jenin'],
    'Philippines': ['Manila', 'Quezon City', 'Davao City', 'Caloocan', 'Cebu City', 'Zamboanga City', 'Antipolo', 'Pasig', 'Taguig', 'Valenzuela'],
    'Poland': ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Katowice'],
    'Portugal': ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga', 'Funchal', 'Coimbra', 'Setúbal', 'Almada', 'Agualva-Cacém'],
    'Qatar': ['Doha', 'Al Wakrah', 'Al Khor', 'Al Rayyan', 'Umm Salal', 'Al Daayen', 'Al Shamal', 'Al Gharafa'],
    'Romania': ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova', 'Galați', 'Ploiești', 'Brăila', 'Oradea'],
    'San Marino': ['San Marino', 'Serravalle', 'Borgo Maggiore', 'Domagnano', 'Fiorentino', 'Acquaviva', 'Faetano', 'Montegiardino', 'Chiesanuova'],
    'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif', 'Tabuk', 'Buraydah', 'Khamis Mushait', 'Hail'],
    'Singapore': ['Singapore', 'Jurong West', 'Woodlands', 'Tampines', 'Sengkang', 'Hougang', 'Yishun', 'Choa Chu Kang', 'Bukit Batok', 'Bukit Panjang'],
    'South Africa': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Kimberley', 'Polokwane', 'Nelspruit'],
    'South Korea': ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Seongnam'],
    'Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
    'Sri Lanka': ['Colombo', 'Dehiwala-Mount Lavinia', 'Moratuwa', 'Negombo', 'Kandy', 'Kalmunai', 'Vavuniya', 'Galle', 'Jaffna', 'Trincomalee'],
    'Sweden': ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping'],
    'Switzerland': ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Winterthur', 'Lucerne', 'St. Gallen', 'Lugano', 'Biel'],
    'Syria': ['Damascus', 'Aleppo', 'Homs', 'Hama', 'Latakia', 'Deir ez-Zor', 'Raqqa', 'Al-Hasakah', 'Qamishli', 'Tartus'],
    'Taiwan': ['Taipei', 'New Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Taoyuan', 'Hsinchu', 'Keelung', 'Chiayi', 'Changhua'],
    'Tajikistan': ['Dushanbe', 'Khujand', 'Kulob', 'Qurghonteppa', 'Istaravshan', 'Konibodom', 'Vahdat', 'Tursunzoda', 'Isfara', 'Panjakent'],
    'Thailand': ['Bangkok', 'Chiang Mai', 'Pattaya', 'Phuket', 'Hat Yai', 'Udon Thani', 'Khon Kaen', 'Nakhon Ratchasima', 'Chiang Rai', 'Nakhon Si Thammarat'],
    'Tunisia': ['Tunis', 'Sfax', 'Sousse', 'Ettadhamen', 'Kairouan', 'Gabès', 'Bizerte', 'Ariana', 'Gafsa', 'Monastir'],
    'Turkey': ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Kayseri', 'Mersin'],
    'Turkmenistan': ['Ashgabat', 'Türkmenabat', 'Dasoguz', 'Mary', 'Balkanabat', 'Bereket', 'Tejen', 'Bayramaly', 'Gyzylarbat', 'Magdanly'],
    'Ukraine': ['Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol'],
    'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
    'United Kingdom': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    'Uzbekistan': ['Tashkent', 'Samarkand', 'Namangan', 'Andijan', 'Bukhara', 'Nukus', 'Qarshi', 'Fergana', 'Jizzakh', 'Urgench'],
    'Vatican City': ['Vatican City'],
    'Venezuela': ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay', 'Ciudad Guayana', 'Petare', 'Maturín', 'Barcelona', 'Mérida'],
    'Vietnam': ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho', 'Bien Hoa', 'Hue', 'Nha Trang', 'Buon Ma Thuot', 'Da Lat'],
    'Yemen': ['Sana\'a', 'Aden', 'Taiz', 'Hodeidah', 'Ibb', 'Dhamar', 'Al-Mukalla', 'Zinjibar', 'Sayyan', 'Lahij'],
  };

  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Comfortaa-Regular': require('../assets/fonts/Comfortaa-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        setFontsLoaded(true); // Continue anyway
      }
    }
    loadFonts();
  }, []);

  const validateField = (field, value) => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return '* First name is required';
        if (value.trim().length < 2) return '* First name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return '* First name can only contain letters';
        return '';
      case 'lastName':
        if (!value.trim()) return '* Last name is required';
        if (value.trim().length < 2) return '* Last name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return '* Last name can only contain letters';
        return '';
      case 'age':
        if (!value.trim()) return '* Age is required';
        if (isNaN(value) || parseInt(value) < 13 || parseInt(value) > 120) return '* Age must be between 13 and 120';
        return '';
      case 'gender':
        if (!value) return '* Please select your gender';
        return '';
      case 'dob':
        if (!value) return '* Date of birth is required';
        return '';
      case 'country':
        if (!value) return '* Please select your country';
        return '';
      case 'city':
        if (!value) return '* Please select your city';
        return '';
      case 'email':
        if (!value.trim()) return '* Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return '* Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return '* Password is required';
        if (value.length < 8) return '* Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return '* Password must contain uppercase, lowercase and number';
        return '';
      case 'confirmPassword':
        if (!value) return '* Please confirm your password';
        if (value !== formData.password) return '* Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // If country changes, reset city and update available cities
    if (field === 'country') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        city: '' // Reset city when country changes
      }));
      setAvailableCities(countriesData[value] || []);
      // Clear city error
      setErrors(prev => ({
        ...prev,
        city: ''
      }));
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    handleInputChange('dob', formattedDate);
    hideDatePicker();
  };

  const showCountryPicker = () => {
    setCountryPickerVisible(true);
  };

  const hideCountryPicker = () => {
    setCountryPickerVisible(false);
  };

  const showCityPicker = () => {
    if (!formData.country) {
      Alert.alert('Select Country First', 'Please select a country before choosing a city.');
      return;
    }
    setCityPickerVisible(true);
  };

  const hideCityPicker = () => {
    setCityPickerVisible(false);
  };

  // Removed automatic scrolling to prevent page jumping when typing

  const handleNext = async () => {
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      // Show loading state
      setErrors({ general: 'Creating account...' });
      
      // Prepare user data for backend
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        dateOfBirth: formData.dob,
        country: formData.country,
        city: formData.city,
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      // Call backend registration API
      const response = await authService.register(userData);

      if (response.success) {
        console.log('✅ Registration successful!', response.data);
        setErrors({}); // Clear any errors
        
        // Show success message
        Alert.alert(
          'Success! 🎉',
          'Your account has been created successfully!',
          [
            {
              text: 'Continue',
              onPress: () => navigation.replace('MainTabs') // Navigate to main app
            }
          ]
        );
      } else {
        setErrors({ general: response.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView 
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled={true}
      >
        <ScrollView 
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={tw`flex-grow pb-25`}
          bounces={true}
          alwaysBounceVertical={false}
          decelerationRate="normal"
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          overScrollMode="always"
          removeClippedSubviews={false}
          keyboardDismissMode="on-drag"
        >
          {/* Top margin */}
          <View style={tw`h-5 min-h-10`} />

          {/* Back Navigation */}
          <TouchableOpacity 
            style={tw`mb-8 ml-5 mt-5`}
            onPress={() => navigation.goBack()}
          >
            <Text style={tw`text-2xl text-black font-semibold font-roboto`}>←</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={[tw`text-3xl text-black mb-8 text-left ml-5`, { fontFamily: fontsLoaded ? 'Comfortaa-Regular' : 'System' }]}>Register</Text>

          {/* First Name */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>First Name</Text>
            <TextInput
              style={[
                tw`h-13 border rounded px-4 text-base text-black bg-white font-roboto`,
                errors.firstName ? tw`border-error` : tw`border-black`
              ]}
              placeholder="Enter first name"
              placeholderTextColor="#666"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.firstName && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.firstName}</Text>
            )}
          </View>

          {/* Last Name */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Last Name</Text>
            <TextInput
              style={[
                tw`h-13 border rounded px-4 text-base text-black bg-white font-roboto`,
                errors.lastName ? tw`border-error` : tw`border-black`
              ]}
              placeholder="Enter last name"
              placeholderTextColor="#666"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.lastName && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.lastName}</Text>
            )}
          </View>

          {/* Age */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Age</Text>
            <TextInput
              style={[
                tw`h-13 border rounded px-4 text-base text-black bg-white font-roboto`,
                errors.age ? tw`border-error` : tw`border-black`
              ]}
              placeholder="Enter age"
              placeholderTextColor="#666"
              value={formData.age}
              onChangeText={(value) => handleInputChange('age', value)}
              keyboardType="numeric"
              maxLength={3}
              returnKeyType="next"
            />
            {errors.age && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.age}</Text>
            )}
          </View>

          {/* Gender */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Gender</Text>
            <View style={[
              tw`h-13 border rounded bg-white justify-center`,
              errors.gender ? tw`border-error` : tw`border-black`
            ]}>
              <Picker
                selectedValue={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                style={tw`h-12.5`}
              >
                <Picker.Item label="Select gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
                <Picker.Item label="Prefer not to say" value="prefer_not_to_say" />
              </Picker>
            </View>
            {errors.gender && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.gender}</Text>
            )}
          </View>

          {/* Date of Birth */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Date of Birth</Text>
            <TouchableOpacity 
              style={[
                tw`h-13 border rounded px-4 justify-center bg-white`,
                errors.dob ? tw`border-error` : tw`border-black`
              ]} 
              onPress={showDatePicker}
            >
              <Text style={formData.dob ? tw`text-base text-black font-roboto` : tw`text-base text-gray-500 font-roboto`}>
                {formData.dob || 'Select date of birth'}
              </Text>
            </TouchableOpacity>
            {errors.dob && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.dob}</Text>
            )}
          </View>

          {/* Country */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Country</Text>
            <TouchableOpacity 
              style={[
                tw`h-13 border rounded px-4 justify-center bg-white`,
                errors.country ? tw`border-error` : tw`border-black`
              ]} 
              onPress={showCountryPicker}
            >
              <Text style={formData.country ? tw`text-base text-black font-roboto` : tw`text-base text-gray-500 font-roboto`}>
                {formData.country || 'Select country'}
              </Text>
            </TouchableOpacity>
            {errors.country && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.country}</Text>
            )}
          </View>

          {/* City */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>City</Text>
            <TouchableOpacity 
              style={[
                tw`h-13 border rounded px-4 justify-center bg-white`,
                !formData.country && tw`bg-gray-100 border-gray-300`,
                errors.city ? tw`border-error` : tw`border-black`
              ]} 
              onPress={showCityPicker}
              disabled={!formData.country}
            >
              <Text style={formData.city ? tw`text-base text-black font-roboto` : tw`text-base text-gray-500 font-roboto`}>
                {formData.city || (formData.country ? 'Select city' : 'Select country first')}
              </Text>
            </TouchableOpacity>
            {errors.city && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.city}</Text>
            )}
          </View>

          {/* Email */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Email</Text>
            <TextInput
              style={[
                tw`h-13 border rounded px-4 text-base text-black bg-white font-roboto`,
                errors.email ? tw`border-error` : tw`border-black`
              ]}
              placeholder="jane@example.com"
              placeholderTextColor="#666"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.email && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.email}</Text>
            )}
          </View>

          {/* Password */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Password</Text>
            <View style={tw`relative`}>
              <TextInput
                style={[
                  tw`h-13 border rounded px-4 pr-12 text-base text-black bg-white font-roboto`,
                  errors.password ? tw`border-error` : tw`border-black`
                ]}
                placeholder="Enter password"
                placeholderTextColor="#666"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
              <TouchableOpacity
                style={tw`absolute right-4 top-0 bottom-0 justify-center`}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons 
                  name={showPassword ? 'visibility-off' : 'visibility'} 
                  size={24} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.password}</Text>
            )}
          </View>

          {/* Confirm Password */}
          <View style={tw`mb-5 mx-5`}>
            <Text style={tw`text-base text-black mb-2 font-roboto font-medium`}>Confirm Password</Text>
            <View style={tw`relative`}>
              <TextInput
                style={[
                  tw`h-13 border rounded px-4 pr-12 text-base text-black bg-white font-roboto`,
                  errors.confirmPassword ? tw`border-error` : tw`border-black`
                ]}
                placeholder="Confirm password"
                placeholderTextColor="#666"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={tw`absolute right-4 top-0 bottom-0 justify-center`}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <MaterialIcons 
                  name={showConfirmPassword ? 'visibility-off' : 'visibility'} 
                  size={24} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={[tw`text-sm mt-2 font-roboto`, { color: '#ff6b6b' }]}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Summary Error Message */}
          {Object.keys(errors).filter(key => errors[key]).length > 0 && (
            <View style={tw`mx-5 mb-5 p-3 bg-red-50 border border-error rounded-lg`}>
              <Text style={tw`text-sm text-error text-center font-roboto`}>⚠️ Please fix the errors above</Text>
            </View>
          )}

          {/* Next Button */}
          <TouchableOpacity style={tw`bg-black h-13 rounded justify-center items-center mt-5 mb-10 mx-5`} onPress={handleNext}>
            <Text style={tw`text-white text-base font-bold tracking-wider font-roboto`}>REGISTER</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
          maximumDate={new Date()} // Can't select future dates
          minimumDate={new Date(1900, 0, 1)} // Reasonable minimum date
        />

        {/* Country Picker Modal */}
        {isCountryPickerVisible && (
          <View style={tw`absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50`}>
            <View style={tw`bg-white rounded-lg w-90 max-h-80 shadow-lg`}>
              <View style={tw`flex-row justify-between items-center p-5 border-b border-gray-200`}>
                <Text style={tw`text-lg font-bold text-black font-roboto`}>Select Country</Text>
                <TouchableOpacity onPress={hideCountryPicker} style={tw`p-1`}>
                  <Text style={tw`text-xl text-gray-500 font-bold`}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={tw`max-h-100`}>
                {Object.keys(countriesData).map((country) => (
                  <TouchableOpacity
                    key={country}
                    style={tw`p-4 border-b border-gray-200`}
                    onPress={() => {
                      handleInputChange('country', country);
                      hideCountryPicker();
                    }}
                  >
                    <Text style={tw`text-base text-black font-roboto`}>{country}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* City Picker Modal */}
        {isCityPickerVisible && (
          <View style={tw`absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50`}>
            <View style={tw`bg-white rounded-lg w-90 max-h-80 shadow-lg`}>
              <View style={tw`flex-row justify-between items-center p-5 border-b border-gray-200`}>
                <Text style={tw`text-lg font-bold text-black font-roboto`}>Select City</Text>
                <TouchableOpacity onPress={hideCityPicker} style={tw`p-1`}>
                  <Text style={tw`text-xl text-gray-500 font-bold`}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={tw`max-h-100`}>
                {availableCities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={tw`p-4 border-b border-gray-200`}
                    onPress={() => {
                      handleInputChange('city', city);
                      hideCityPicker();
                    }}
                  >
                    <Text style={tw`text-base text-black font-roboto`}>{city}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen; 