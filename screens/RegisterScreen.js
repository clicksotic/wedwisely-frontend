import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Font from 'expo-font';

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

  const handleNext = () => {
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

    // Handle registration logic here
    console.log('Register:', formData);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* Top margin */}
          <View style={styles.topMargin} />

          {/* Back Navigation */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Register</Text>

          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={[styles.input, errors.firstName ? styles.inputError : null]}
              placeholder="Enter first name"
              placeholderTextColor="#666"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
          </View>

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={[styles.input, errors.lastName ? styles.inputError : null]}
              placeholder="Enter last name"
              placeholderTextColor="#666"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
          </View>

          {/* Age */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={[styles.input, errors.age ? styles.inputError : null]}
              placeholder="Enter age"
              placeholderTextColor="#666"
              value={formData.age}
              onChangeText={(value) => handleInputChange('age', value)}
              keyboardType="numeric"
              maxLength={3}
              returnKeyType="next"
            />
            {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}
          </View>

          {/* Gender */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={[styles.pickerContainer, errors.gender ? styles.inputError : null]}>
              <Picker
                selectedValue={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
                <Picker.Item label="Prefer not to say" value="prefer_not_to_say" />
              </Picker>
            </View>
            {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity 
              style={[styles.dateInput, errors.dob ? styles.inputError : null]} 
              onPress={showDatePicker}
            >
              <Text style={formData.dob ? styles.dateText : styles.datePlaceholder}>
                {formData.dob || 'Select date of birth'}
              </Text>
            </TouchableOpacity>
            {errors.dob ? <Text style={styles.errorText}>{errors.dob}</Text> : null}
          </View>

          {/* Country */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Country</Text>
            <TouchableOpacity 
              style={[styles.dropdownInput, errors.country ? styles.inputError : null]} 
              onPress={showCountryPicker}
            >
              <Text style={formData.country ? styles.dropdownText : styles.dropdownPlaceholder}>
                {formData.country || 'Select country'}
              </Text>
            </TouchableOpacity>
            {errors.country ? <Text style={styles.errorText}>{errors.country}</Text> : null}
          </View>

          {/* City */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TouchableOpacity 
              style={[styles.dropdownInput, !formData.country && styles.disabledInput, errors.city ? styles.inputError : null]} 
              onPress={showCityPicker}
              disabled={!formData.country}
            >
              <Text style={formData.city ? styles.dropdownText : styles.dropdownPlaceholder}>
                {formData.city || (formData.country ? 'Select city' : 'Select country first')}
              </Text>
            </TouchableOpacity>
            {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="jane@example.com"
              placeholderTextColor="#666"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              placeholder="Enter password"
              placeholderTextColor="#666"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
              placeholder="Confirm password"
              placeholderTextColor="#666"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>

          {/* Summary Error Message */}
          {Object.keys(errors).length > 0 && (
            <View style={styles.summaryErrorContainer}>
              <Text style={styles.summaryErrorText}>⚠️ Fix errors above</Text>
            </View>
          )}

          {/* Next Button */}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>REGISTER</Text>
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
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country</Text>
                <TouchableOpacity onPress={hideCountryPicker} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {Object.keys(countriesData).map((country) => (
                  <TouchableOpacity
                    key={country}
                    style={styles.countryItem}
                    onPress={() => {
                      handleInputChange('country', country);
                      hideCountryPicker();
                    }}
                  >
                    <Text style={styles.countryItemText}>{country}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* City Picker Modal */}
        {isCityPickerVisible && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select City</Text>
                <TouchableOpacity onPress={hideCityPicker} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {availableCities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={styles.cityItem}
                    onPress={() => {
                      handleInputChange('city', city);
                      hideCityPicker();
                    }}
                  >
                    <Text style={styles.cityItemText}>{city}</Text>
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Extra padding to ensure last elements are visible
  },
  topMargin: {
    height: '5%', // 5% top margin as requested
    minHeight: 40,
  },
  backButton: {
    marginBottom: 30,
    marginLeft: 20,
    marginTop: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 32,
    color: '#000',
    marginBottom: 30,
    textAlign: 'left',
    fontFamily: 'Comfortaa-Regular',
    marginLeft: 20,
  },
  inputContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    fontSize: 12,
    color: '#ff6b6b',
    marginTop: 4,
    marginLeft: 4,
    fontFamily: 'Roboto',
  },
  dateInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto',
  },
  datePlaceholder: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Roboto',
  },
  dropdownInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Roboto',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
  },
  pickerContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
  },
  summaryErrorContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 6,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ff6b6b',
  },
  summaryErrorText: {
    fontSize: 11,
    color: '#ff6b6b',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: '#000',
    height: 52,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Roboto',
  },
  // Modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Roboto',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  countryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryItemText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto',
  },
  cityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cityItemText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto',
  },
});

export default RegisterScreen; 