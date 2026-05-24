import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Reusable Field Component
const Field = ({ label, value, onChange, editable, multiline = false, className = '' }) => {
  if (editable) {
    if (multiline) {
      return (
        <div className="mb-3">
          {label && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
            rows={3}
          />
        </div>
      )
    }
    return (
      <div className="mb-3">
        {label && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        />
      </div>
    )
  }

  return (
    <div className={`mb-2 w-full ${className}`}>
      {label && <span className="text-slate-500 text-sm block">{label}:</span>}
      <span className="text-slate-800 text-sm block break-words">{value}</span>
    </div>
  )
}

// Reusable Card Component
const Card = ({ children, className = '', title }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6 ${className} w-full`}
  >
    {title && (
      <div className="mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    )}
    <div className="w-full">
      {children}
    </div>
  </motion.div>
)

// Reusable Tag Component
const Tag = ({ children, editable, onChange, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(children)

  if (editable && isEditing) {
    return (
      <div className="inline-flex items-center gap-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            setIsEditing(false)
            onChange(value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditing(false)
              onChange(value)
            }
          }}
          className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
          autoFocus
        />
      </div>
    )
  }

  return (
    <span
      onClick={() => editable && setIsEditing(true)}
      className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-primary-50 to-sky-50 text-primary-700 rounded-full text-sm cursor-default border border-primary-100 ${
        editable ? 'cursor-pointer hover:from-primary-100 hover:to-sky-100 hover:border-primary-200' : ''
      }`}
    >
      {children}
    </span>
  )
}

// Reusable TimelineItem Component
const TimelineItem = ({ period, title, location, description, points, editable, onChange, dir }) => (
  <div className={`relative ${dir === 'rtl' ? 'pr-6 border-r-2 right-[-9px]' : 'pl-6 border-l-2 left-[-9px]'} pb-6 border-slate-200 last:border-0 last:pb-0`}>
    <div className={`absolute ${dir === 'rtl' ? 'right-[-9px]' : 'left-[-9px]'} top-0 w-4 h-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full border-2 border-white shadow-sm`}></div>
    <div className="mb-2">
      <Field
        label=""
        value={period}
        onChange={(v) => onChange({ ...onChange.currentData, period: v })}
        editable={editable}
        className="period"
      />
    </div>
    <div className="mb-1">
      <Field
        label=""
        value={title}
        onChange={(v) => onChange({ ...onChange.currentData, title: v })}
        editable={editable}
        className="title"
      />
    </div>
    {location && (
      <div className="mb-2">
        <Field
          label=""
          value={location}
          onChange={(v) => onChange({ ...onChange.currentData, location: v })}
          editable={editable}
          className="location"
        />
      </div>
    )}
    {description && (
      <div className="mb-2">
        <Field
          label=""
          value={description}
          onChange={(v) => onChange({ ...onChange.currentData, description: v })}
          editable={editable}
          multiline
        />
      </div>
    )}
    {points && points.length > 0 && (
      <ul className={`text-slate-600 text-sm space-y-1 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`}>
        {points.map((point, idx) => (
          <li key={idx}>
            <Field
              label=""
              value={point}
              onChange={(v) => {
                const newPoints = [...points]
                newPoints[idx] = v
                onChange({ ...onChange.currentData, points: newPoints })
              }}
              editable={editable}
            />
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default function App() {
  const [editable, setEditable] = useState(false)
  const [language, setLanguage] = useState('he') // 'he' for Hebrew, 'en' for English
  
  const translations = {
    he: {
      name: 'ליאה פרגן',
      title: 'סטודנטית לחשבונאות | שנה ג׳',
      location: 'רעננה, ישראל',
      birthDate: '26 בדצמבר 2002',
      profile: 'אחראית ושיטתית, בעלת יכולת הסתגלות מהירה וכושר למידה גבוה. עובדת לפי נהלים קפדניים, מתמודדת היטב עם מצבי לחץ ומפגינה רמת דיסקרטיות ואמינות גבוהה. דייקנית, אחראית ודיסקרטית — עובדת לפי נהלים קבועים, יכולה לעבוד בצוות ובצורה עצמאית, בעלת מוסר עבודה גבוה ויכולת למידה מהירה. מחפשת הזדמנות להתחיל תפקיד בתחום החשבונאות, לרכוש ניסיון מעשי ולהשתלב בסביבת עבודה מקצועית ויציבה.',
      objective: 'השתלבות בתפקיד התחלתי בתחום החשבונאות, הכספים, נהלת חשבונות או אדמיניסטרציה פיננסית, תוך שימוש ביכולות סדר, דיוק, אחריות ועבודה עם נתונים.',
      labels: {
        email: 'אימייל',
        phone: 'טלפון',
        location: 'מיקום',
        birthDate: 'תאריך לידה'
      },
      sections: {
        profile: 'פרופיל אישי',
        objective: 'יעד מקצועי',
        education: 'השכלה והכשרות',
        experience: 'ניסיון תעסוקתי',
        military: 'שירות צבאי',
        skills: 'שליטה בתוכנות מחשב',
        volunteering: 'התנדבות',
        languages: 'שפות',
        sports: 'כישורים ספורטיביים',
        strengths: 'חוזקות'
      },
      buttons: {
        print: 'הדפס / שמור PDF',
        edit: 'ערוך טקסט',
        save: 'שמור שינויים',
        reset: 'איפוס',
      },
      footer: 'CV מקצועי | ליאה פרגן'
    },
    en: {
      name: 'Lea Fergan',
      title: 'Accounting Student | 3rd Year',
      location: 'Raanana, Israel',
      birthDate: 'December 26, 2002',
      profile: 'Highly motivated and detail-oriented third-year Accounting student with strong organizational skills and commitment to precision. Demonstrates excellent work ethic, reliability, and ability to work both independently and collaboratively. Experienced in following strict procedures and maintaining confidentiality. Seeking to apply academic knowledge and strong attention to detail in a professional accounting environment while contributing to team success.',
      objective: 'To obtain an entry-level position in accounting, bookkeeping, or financial administration where I can utilize my academic background, organizational skills, and attention to detail while gaining practical experience in a professional accounting firm or corporate finance department.',
      labels: {
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        birthDate: 'Date of Birth'
      },
      sections: {
        profile: 'Personal Profile',
        objective: 'Professional Objective',
        education: 'Education and Qualifications',
        experience: 'Work Experience',
        military: 'Military Service',
        skills: 'Computer Skills',
        volunteering: 'Volunteering',
        languages: 'Languages',
        sports: 'Sports Skills',
        strengths: 'Strengths'
      },
      buttons: {
        print: 'Print / Save PDF',
        edit: 'Edit Text',
        save: 'Save Changes',
        reset: 'Reset',
      },
      footer: 'Professional CV | Lea Fergan'
    }
  }

  const [cv, setCv] = useState({
    name: translations[language].name,
    title: translations[language].title,
    email: 'lea.fergan@gmail.com',
    phone: '0584180025',
    location: translations[language].location,
    birthDate: translations[language].birthDate,
    profile: translations[language].profile,
    objective: translations[language].objective
  })

  const [sections, setSections] = useState(() => {
    const hebrewSections = {
      education: [
        {
          id: 1,
          period: '2023 — היום',
          title: 'תואר ראשון B.A בחשבונאות',
          location: 'המרכז האקדמי שערי מדע ומשפט, הוד השרון',
          description: 'שנה ג׳ לתואר ראשון בחשבונאות. רכישת ידע בתחומי חשבונאות, כספים, דוחות, בקרה וניתוח נתונים.'
        },
        {
          id: 2,
          period: '2015 — 2020',
          title: 'השכלה תיכונית מלאה — 12 שנות לימוד',
          location: 'תיכון רעננה — אמי״ת רננים',
          description: 'סיום לימודים תיכוניים מלאים, בסיס לימודי רחב והרגלי למידה מסודרים.'
        },
        {
          id: 3,
          period: '2020',
          title: 'קורס אבטחה — תעודת הסמכה',
          location: 'מרכז להכשרת מאבטחים, רעננה',
          description: 'הכשרה מקצועית בתחום האבטחה, עבודה לפי נהלים, אחריות, ערנות ותגובה מהירה למצבי חירום.'
        }
      ],
      experience: [
        {
          id: 1,
          period: '2022 — היום',
          title: 'שמרטפית',
          location: 'משפחות פרטיות, רעננה',
          points: [
            'טיפול וליווי ילדים תוך אחריות על בטיחותם ורווחתם.',
            'פיתוח סבלנות, אמינות ויחסי אנוש מצוינים.',
            'יכולת הקשבה, פתרון בעיות והתנהלות רגועה במצבים משתנים.'
          ]
        }
      ],
      military: {
        id: 1,
        period: 'שירות צבאי',
        title: 'תחום הביטחון',
        location: 'צה״ל, ישראל',
        points: [
          'שמירה ואבטחה במתקנים רגישים תוך עבודה מדויקת לפי נהלים.',
          'אחריות וערנות גבוהה, עמידה בלחץ ותגובה מהירה למצבי חירום.',
          'קבלת תעודת הצטיינות על ביצועים יוצאי דופן.'
        ]
      },
      skills: [
        'Microsoft Excel — הזנת נתונים, טבלאות, נוסחאות בסיסיות, סדר וארגון מידע.',
        'Microsoft Word — יצירת מסמכים מקצועיים, עיצוב ועבודה עם תבניות.',
        'Microsoft PowerPoint — הכנת מצגות ברורות ומסודרות.'
      ],
      volunteering: [
        'ליווי ותמיכה באוכלוסייה מבוגרת — עבודה רגישה ואחראית.',
        'קבלת תעודות והמלצות חיוביות בעקבות עבודה מסורה ואמינה.'
      ],
      languages: [
        'צרפתית — שפת אם',
        'עברית — רמה טובה',
        'אנגלית — טובה'
      ],
      sports: [
        'קרב מגע — חגורה חומה, בהכנה לחגורה שחורה, 10 שנות ניסיון.',
        'טניס — 7 שנות ניסיון.'
      ],
      strengths: [
        'דיוק וסדר',
        'אחריות',
        'אמינות',
        'דיסקרטיות',
        'עמידה בלחץ',
        'למידה מהירה',
        'יחסי אנוש',
        'עבודה לפי נהלים',
        'עבודה עצמאית ובצוות'
      ]
    }

    const englishSections = {
      education: [
        {
          id: 1,
          period: '2023 — Present',
          title: 'B.A. in Accounting',
          location: 'Shaarei Mishpat College, Hod Hasharon',
          description: 'Currently completing third year of B.A. studies in Accounting. Coursework includes financial accounting, managerial accounting, auditing, taxation, financial reporting, and data analysis. Developing strong foundation in accounting principles and financial management.'
        },
        {
          id: 2,
          period: '2015 — 2020',
          title: 'High School Diploma — Full Matriculation',
          location: 'Raanana High School — Amit Renanim',
          description: 'Completed full high school education with emphasis on mathematics and economics. Developed strong analytical skills and disciplined study habits essential for accounting profession.'
        },
        {
          id: 3,
          period: '2020',
          title: 'Security Certification Course',
          location: 'Security Training Center, Raanana',
          description: 'Professional training emphasizing procedural compliance, responsibility, situational awareness, and emergency response protocols. Developed strong attention to detail and adherence to established procedures.'
        }
      ],
      experience: [
        {
          id: 1,
          period: '2022 — Present',
          title: 'Childcare Provider',
          location: 'Private Families, Raanana',
          points: [
            'Provided responsible care and supervision ensuring safety and well-being of children.',
            'Developed strong interpersonal skills, reliability, and ability to build trust with families.',
            'Enhanced problem-solving abilities and maintained composure in dynamic situations.'
          ]
        }
      ],
      military: {
        id: 1,
        period: 'Military Service',
        title: 'Security Operations',
        location: 'Israel Defense Forces',
        points: [
          'Maintained security protocols at sensitive facilities with strict adherence to operational procedures.',
          'Demonstrated high level of responsibility, situational awareness, and ability to perform under pressure.',
          'Received certificate of excellence for outstanding performance and attention to detail.'
        ]
      },
      skills: [
        'Microsoft Excel — Proficient in data entry, spreadsheet management, formulas, pivot tables, and financial data organization.',
        'Microsoft Word — Skilled in creating professional business documents, financial reports, and templates.',
        'Microsoft PowerPoint — Experienced in preparing clear and organized business presentations.'
      ],
      volunteering: [
        'Provided support and companionship to elderly community members, demonstrating empathy and reliability.',
        'Received commendations and positive references for dedicated and trustworthy service.'
      ],
      languages: [
        'French — Native language',
        'Hebrew — Professional proficiency',
        'English — Professional proficiency'
      ],
      sports: [
        'Krav Maga — Brown belt, currently training for black belt certification, 10 years of disciplined practice.',
        'Tennis — 7 years of competitive experience, demonstrating commitment and perseverance.'
      ],
      strengths: [
        'Attention to Detail',
        'Organizational Skills',
        'Reliability',
        'Confidentiality',
        'Working Under Pressure',
        'Quick Learning Ability',
        'Strong Interpersonal Skills',
        'Procedural Compliance',
        'Independent and Collaborative Work'
      ]
    }

    return language === 'he' ? hebrewSections : englishSections
  })

  const [originalCv, setOriginalCv] = useState(cv)
  const [originalSections, setOriginalSections] = useState(sections)

  useEffect(() => {
    setOriginalCv(cv)
    setOriginalSections(sections)
  }, [])

  useEffect(() => {
    // Update CV data when language changes
    setCv({
      name: translations[language].name,
      title: translations[language].title,
      email: 'lea.fergan@gmail.com',
      phone: '0584180025',
      location: translations[language].location,
      birthDate: translations[language].birthDate,
      profile: translations[language].profile,
      objective: translations[language].objective
    })
  }, [language])

  useEffect(() => {
    // Update sections when language changes
    const hebrewSections = {
      education: [
        {
          id: 1,
          period: '2023 — היום',
          title: 'תואר ראשון B.A בחשבונאות',
          location: 'המרכז האקדמי שערי מדע ומשפט, הוד השרון',
          description: 'שנה ג׳ לתואר ראשון בחשבונאות. רכישת ידע בתחומי חשבונאות, כספים, דוחות, בקרה וניתוח נתונים.'
        },
        {
          id: 2,
          period: '2015 — 2020',
          title: 'השכלה תיכונית מלאה — 12 שנות לימוד',
          location: 'תיכון רעננה — אמי״ת רננים',
          description: 'סיום לימודים תיכוניים מלאים, בסיס לימודי רחב והרגלי למידה מסודרים.'
        },
        {
          id: 3,
          period: '2020',
          title: 'קורס אבטחה — תעודת הסמכה',
          location: 'מרכז להכשרת מאבטחים, רעננה',
          description: 'הכשרה מקצועית בתחום האבטחה, עבודה לפי נהלים, אחריות, ערנות ותגובה מהירה למצבי חירום.'
        }
      ],
      experience: [
        {
          id: 1,
          period: '2022 — היום',
          title: 'שמרטפית',
          location: 'משפחות פרטיות, רעננה',
          points: [
            'טיפול וליווי ילדים תוך אחריות על בטיחותם ורווחתם.',
            'פיתוח סבלנות, אמינות ויחסי אנוש מצוינים.',
            'יכולת הקשבה, פתרון בעיות והתנהלות רגועה במצבים משתנים.'
          ]
        }
      ],
      military: {
        id: 1,
        period: 'שירות צבאי',
        title: 'תחום הביטחון',
        location: 'צה״ל, ישראל',
        points: [
          'שמירה ואבטחה במתקנים רגישים תוך עבודה מדויקת לפי נהלים.',
          'אחריות וערנות גבוהה, עמידה בלחץ ותגובה מהירה למצבי חירום.',
          'קבלת תעודת הצטיינות על ביצועים יוצאי דופן.'
        ]
      },
      skills: [
        'Microsoft Excel — הזנת נתונים, טבלאות, נוסחאות בסיסיות, סדר וארגון מידע.',
        'Microsoft Word — יצירת מסמכים מקצועיים, עיצוב ועבודה עם תבניות.',
        'Microsoft PowerPoint — הכנת מצגות ברורות ומסודרות.'
      ],
      volunteering: [
        'ליווי ותמיכה באוכלוסייה מבוגרת — עבודה רגישה ואחראית.',
        'קבלת תעודות והמלצות חיוביות בעקבות עבודה מסורה ואמינה.'
      ],
      languages: [
        'צרפתית — שפת אם',
        'עברית — רמה טובה',
        'אנגלית — טובה'
      ],
      sports: [
        'קרב מגע — חגורה חומה, בהכנה לחגורה שחורה, 10 שנות ניסיון.',
        'טניס — 7 שנות ניסיון.'
      ],
      strengths: [
        'דיוק וסדר',
        'אחריות',
        'אמינות',
        'דיסקרטיות',
        'עמידה בלחץ',
        'למידה מהירה',
        'יחסי אנוש',
        'עבודה לפי נהלים',
        'עבודה עצמאית ובצוות'
      ]
    }

    const englishSections = {
      education: [
        {
          id: 1,
          period: '2023 — Present',
          title: 'B.A. in Accounting',
          location: 'Shaarei Mishpat College, Hod Hasharon',
          description: 'Currently completing third year of B.A. studies in Accounting. Coursework includes financial accounting, managerial accounting, auditing, taxation, financial reporting, and data analysis. Developing strong foundation in accounting principles and financial management.'
        },
        {
          id: 2,
          period: '2015 — 2020',
          title: 'High School Diploma — Full Matriculation',
          location: 'Raanana High School — Amit Renanim',
          description: 'Completed full high school education with emphasis on mathematics and economics. Developed strong analytical skills and disciplined study habits essential for accounting profession.'
        },
        {
          id: 3,
          period: '2020',
          title: 'Security Certification Course',
          location: 'Security Training Center, Raanana',
          description: 'Professional training emphasizing procedural compliance, responsibility, situational awareness, and emergency response protocols. Developed strong attention to detail and adherence to established procedures.'
        }
      ],
      experience: [
        {
          id: 1,
          period: '2022 — Present',
          title: 'Childcare Provider',
          location: 'Private Families, Raanana',
          points: [
            'Provided responsible care and supervision ensuring safety and well-being of children.',
            'Developed strong interpersonal skills, reliability, and ability to build trust with families.',
            'Enhanced problem-solving abilities and maintained composure in dynamic situations.'
          ]
        }
      ],
      military: {
        id: 1,
        period: 'Military Service',
        title: 'Security Operations',
        location: 'Israel Defense Forces',
        points: [
          'Maintained security protocols at sensitive facilities with strict adherence to operational procedures.',
          'Demonstrated high level of responsibility, situational awareness, and ability to perform under pressure.',
          'Received certificate of excellence for outstanding performance and attention to detail.'
        ]
      },
      skills: [
        'Microsoft Excel — Proficient in data entry, spreadsheet management, formulas, pivot tables, and financial data organization.',
        'Microsoft Word — Skilled in creating professional business documents, financial reports, and templates.',
        'Microsoft PowerPoint — Experienced in preparing clear and organized business presentations.'
      ],
      volunteering: [
        'Provided support and companionship to elderly community members, demonstrating empathy and reliability.',
        'Received commendations and positive references for dedicated and trustworthy service.'
      ],
      languages: [
        'French — Native language',
        'Hebrew — Professional proficiency',
        'English — Professional proficiency'
      ],
      sports: [
        'Krav Maga — Brown belt, currently training for black belt certification, 10 years of disciplined practice.',
        'Tennis — 7 years of competitive experience, demonstrating commitment and perseverance.'
      ],
      strengths: [
        'Attention to Detail',
        'Organizational Skills',
        'Reliability',
        'Confidentiality',
        'Working Under Pressure',
        'Quick Learning Ability',
        'Strong Interpersonal Skills',
        'Procedural Compliance',
        'Independent and Collaborative Work'
      ]
    }

    setSections(language === 'he' ? hebrewSections : englishSections)
  }, [language])

  const handlePrint = () => {
    window.print()
  }

  const handleEditToggle = () => {
    if (editable) {
      setEditable(false)
    } else {
      setEditable(true)
    }
  }

  const handleSave = () => {
    setEditable(false)
    setOriginalCv(cv)
    setOriginalSections(sections)
  }

  const handleReset = () => {
    setCv(originalCv)
    setSections(originalSections)
    setEditable(false)
  }

  const updateEducationItem = (id, newData) => {
    setSections({
      ...sections,
      education: sections.education.map(item => item.id === id ? { ...item, ...newData } : item)
    })
  }

  const updateExperienceItem = (id, newData) => {
    setSections({
      ...sections,
      experience: sections.experience.map(item => item.id === id ? { ...item, ...newData } : item)
    })
  }

  const updateMilitary = (newData) => {
    setSections({
      ...sections,
      military: { ...sections.military, ...newData }
    })
  }

  const handleLanguageToggle = () => {
    setLanguage(prev => {
      const newLang = prev === 'he' ? 'en' : 'he'
      document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr'
      document.documentElement.lang = newLang
      return newLang
    })
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 py-4 sm:py-6 md:py-8 px-2 sm:px-4 ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto w-full">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-4 md:mb-8 no-print"
        >
          <button
            onClick={handlePrint}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            
            <span className="hidden sm:inline">{translations[language].buttons.print}</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button
            onClick={handleLanguageToggle}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            
            {language === 'he' ? 'English' : 'עברית'}
          </button>
          {!editable ? (
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-primary-600 border-2 border-primary-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
            >
              
              <span className="hidden sm:inline">{translations[language].buttons.edit}</span>
              <span className="sm:hidden">Edit</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                
                <span className="hidden sm:inline">{translations[language].buttons.save}</span>
                <span className="sm:hidden">Save</span>
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-lg hover:from-rose-700 hover:to-rose-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                
                <span className="hidden sm:inline">{translations[language].buttons.reset}</span>
                <span className="sm:hidden">Reset</span>
              </button>
            </>
          )}
        </motion.div>

        {/* CV Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="cv-container bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-l from-primary-900 via-primary-800 to-primary-700 text-white p-4 sm:p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-primary-900/50 to-transparent"></div>
            <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6 mb-3 md:mb-4">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-0">
                  
                  {editable ? (
                    <input
                      type="text"
                      value={cv.name}
                      onChange={(e) => setCv({ ...cv, name: e.target.value })}
                      className="bg-transparent border-none text-white text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary-200 rounded px-2 py-1 w-full max-w-xs"
                    />
                  ) : (
                    <span className="text-white text-lg md:text-xl font-semibold truncate">{cv.name}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  
                  {editable ? (
                    <input
                      type="text"
                      value={cv.title}
                      onChange={(e) => setCv({ ...cv, title: e.target.value })}
                      className="bg-transparent border-none text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary-200 rounded px-2 py-1 w-full max-w-xs"
                    />
                  ) : (
                    <span className="text-white text-sm md:text-base truncate">{cv.title}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  
                  <div className="min-w-0 flex-1">
                    {editable ? (
                      <input
                        type="text"
                        value={cv.email}
                        onChange={(e) => setCv({ ...cv, email: e.target.value })}
                        className="bg-transparent border-none text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 rounded px-1 py-0.5 w-full break-words"
                      />
                    ) : (
                      <span className="text-white text-sm block break-words">{cv.email}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  
                  <div className="min-w-0 flex-1">
                    {editable ? (
                      <input
                        type="text"
                        value={cv.phone}
                        onChange={(e) => setCv({ ...cv, phone: e.target.value })}
                        className="bg-transparent border-none text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 rounded px-1 py-0.5 w-full break-words"
                      />
                    ) : (
                      <span className="text-white text-sm block break-words">{cv.phone}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  
                  <div className="min-w-0 flex-1">
                    {editable ? (
                      <input
                        type="text"
                        value={cv.location}
                        onChange={(e) => setCv({ ...cv, location: e.target.value })}
                        className="bg-transparent border-none text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 rounded px-1 py-0.5 w-full break-words"
                      />
                    ) : (
                      <span className="text-white text-sm block break-words">{cv.location}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  
                  <div className="min-w-0 flex-1">
                    {editable ? (
                      <input
                        type="text"
                        value={cv.birthDate}
                        onChange={(e) => setCv({ ...cv, birthDate: e.target.value })}
                        className="bg-transparent border-none text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 rounded px-1 py-0.5 w-full break-words"
                      />
                    ) : (
                      <span className="text-white text-sm block break-words">{cv.birthDate}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Profile Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6" title={translations[language].sections.profile}>
              <Field
                label=""
                value={cv.profile}
                onChange={(v) => setCv({ ...cv, profile: v })}
                editable={editable}
                multiline
              />
            </Card>

            {/* Objective Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6" title={translations[language].sections.objective}>
              <Field
                label=""
                value={cv.objective}
                onChange={(v) => setCv({ ...cv, objective: v })}
                editable={editable}
                multiline
              />
            </Card>

            {/* Education Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6"  title={translations[language].sections.education}>
              {sections.education.map((item) => (
                <TimelineItem
                  key={item.id}
                  {...item}
                  editable={editable}
                  dir={language === 'he' ? 'rtl' : 'ltr'}
                  onChange={{ currentData: item, call: (newData) => updateEducationItem(item.id, newData) }}
                />
              ))}
            </Card>

            {/* Experience Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6"  title={translations[language].sections.experience}>
              {sections.experience.map((item) => (
                <TimelineItem
                  key={item.id}
                  {...item}
                  editable={editable}
                  dir={language === 'he' ? 'rtl' : 'ltr'}
                  onChange={{ currentData: item, call: (newData) => updateExperienceItem(item.id, newData) }}
                />
              ))}
            </Card>

            {/* Military Service Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6" title={translations[language].sections.military}>
              <TimelineItem
                {...sections.military}
                editable={editable}
                dir={language === 'he' ? 'rtl' : 'ltr'}
                onChange={{ currentData: sections.military, call: updateMilitary }}
              />
            </Card>

            {/* Computer Skills Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6"  title={translations[language].sections.skills}>
              <ul className="space-y-1 md:space-y-2">
                {sections.skills.map((skill, idx) => (
                  <li key={idx}>
                    <Field
                      label=""
                      value={skill}
                      onChange={(v) => {
                        const newSkills = [...sections.skills]
                        newSkills[idx] = v
                        setSections({ ...sections, skills: newSkills })
                      }}
                      editable={editable}
                    />
                  </li>
                ))}
              </ul>
            </Card>

            {/* Volunteering Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6"  title={translations[language].sections.volunteering}>
              <ul className="space-y-1 md:space-y-2">
                {sections.volunteering.map((item, idx) => (
                  <li key={idx}>
                    <Field
                      label=""
                      value={item}
                      onChange={(v) => {
                        const newVolunteering = [...sections.volunteering]
                        newVolunteering[idx] = v
                        setSections({ ...sections, volunteering: newVolunteering })
                      }}
                      editable={editable}
                    />
                  </li>
                ))}
              </ul>
            </Card>

            {/* Languages Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6"  title={translations[language].sections.languages}>
              <ul className="space-y-1 md:space-y-2">
                {sections.languages.map((lang, idx) => (
                  <li key={idx}>
                    <Field
                      label=""
                      value={lang}
                      onChange={(v) => {
                        const newLanguages = [...sections.languages]
                        newLanguages[idx] = v
                        setSections({ ...sections, languages: newLanguages })
                      }}
                      editable={editable}
                    />
                  </li>
                ))}
              </ul>
            </Card>

            {/* Sports Skills Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6"  title={translations[language].sections.sports}>
              <ul className="space-y-1 md:space-y-2">
                {sections.sports.map((sport, idx) => (
                  <li key={idx}>
                    <Field
                      label=""
                      value={sport}
                      onChange={(v) => {
                        const newSports = [...sections.sports]
                        newSports[idx] = v
                        setSections({ ...sections, sports: newSports })
                      }}
                      editable={editable}
                    />
                  </li>
                ))}
              </ul>
            </Card>

            {/* Strengths Section */}
            <Card className="mb-3 md:mb-4 lg:mb-6" title={translations[language].sections.strengths}>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {sections.strengths.map((strength, idx) => (
                  <Tag key={idx} editable={editable}>
                    {strength}
                  </Tag>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-slate-500 text-sm no-print"
        >
          <p>{translations[language].footer}</p>
        </motion.div>
      </div>
    </div>
  )
}
