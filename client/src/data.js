// data.js

// States
export const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'UT'
];

// Cities by State
export const cities = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Tirupati', 'Guntur', 'Kakinada', 'Nellore', 'Rajahmundry'],
    'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Naharlagun', 'Bomdila', 'Ziro'],
    'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon', 'Tezpur'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Arrah'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Durg', 'Bilaspur', 'Jagdalpur'],
    'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Junagadh'],
    'Haryana': ['Chandigarh', 'Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu', 'Hamirpur'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Hazaribagh', 'Dumka', 'Giridih'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi', 'Dharwad', 'Mangaluru', 'Belagavi'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kottayam', 'Alappuzha', 'Thrissur'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad'],
    'Manipur': ['Imphal', 'Churachandpur', 'Thoubal', 'Bishnupur', 'Senapati'],
    'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Kolasib', 'Mamit'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Tuensang'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Balasore'],
    'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Mohali'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer'],
    'Sikkim': ['Gangtok', 'Namchi', 'Pelling', 'Mangan', 'Yuksom'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode'],
    'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Khammam', 'Nizamabad', 'Mahbubnagar'],
    'Tripura': ['Agartala', 'Udaipur', 'Ambassa', 'Kailashahar', 'Belonia'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Roorkee', 'Haldwani', 'Rishikesh'],
    'UT' : ['Andaman & Nicobar Islands','Chandigarh','Delhi','Jammu & Kashmir','Ladakh','Puducherry'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Kharagpur']
};

// Branches
export const branches = [
    'Engineering & Technology',
    'Science',
    'Commerce',
    'Arts & Humanities',
    'Management',
    'Medicine & Health Sciences',
    'Law',
    'Design & Arts',
    'Architecture',
    'Agriculture',
    'Education',
    'Hospitality & Travel',
];

// Courses by Branch
export const courses = {
    'Engineering & Technology': [
        'Computer Science Engineering',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electronics and Communication Engineering',
        'Information Technology',
        'Chemical Engineering',
        'Biotechnology',
    ],
    'Science': [
        'BSc Physics',
        'BSc Chemistry',
        'BSc Biology'
    ],
    'Commerce': [
        'BCom General',
        'BCom Accounting',
        'BCom Finance'
    ],
    'Arts & Humanities': [
        'BA English',
        'BA History',
        'BA Political Science',
        'BA Sociology',
        'BA Philosophy'
    ],
    'Management': [
        'BBA (Bachelor of Business Administration)',
        'BMS (Bachelor of Management Studies)',
        'BBM (Bachelor of Business Management)',
        'BCom in Management'
    ],
    'Medicine & Health Sciences': [
        'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
        'BDS (Bachelor of Dental Surgery)',
        'BAMS (Bachelor of Ayurveda, Medicine, and Surgery)',
        'BHMS (Bachelor of Homeopathic Medicine and Surgery)',
        'BPT (Bachelor of Physiotherapy)'
    ],
    'Law': [
        'LLB (Bachelor of Laws)',
        'BA LLB (Integrated Program in Law)',
        'BBA LLB (Integrated Program in Law)',
        'LLM (Master of Laws)'
    ],
    'Design & Arts': [
        'BDes (Bachelor of Design)',
        'BFA (Bachelor of Fine Arts)',
        'BArch (Bachelor of Architecture)',
        'BVA (Bachelor of Visual Arts)'
    ],
    'Architecture': [
        'BArch (Bachelor of Architecture)',
        'BPlan (Bachelor of Planning)'
    ],
    'Agriculture': [
        'BSc Agriculture',
        'BSc Horticulture',
        'BSc Forestry',
        'BSc Animal Husbandry'
    ],
    'Education': [
        'BEd (Bachelor of Education)',
        'BA BEd (Integrated Program in Education)',
        'BSc BEd (Integrated Program in Education)'
    ],
    'Hospitality & Travel': [
        'BHM (Bachelor of Hotel Management)',
        'BTTM (Bachelor of Travel and Tourism Management)',
        'BBA in Hospitality Management',
        'BSc in Hospitality and Catering Management'
    ]

};
