import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, User, Users, PhoneCall, Camera, ChevronDown, ArrowUp, ArrowDown, ChevronUp, X, Save, Edit2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormSection {
    [key: string]: string;
}

interface BiodataFormData {
    PersonalDetails: FormSection;
    FamilyDetails: FormSection;
    ContactDetails: FormSection;
    image?: File;
}

interface FieldConfig {
    label: string;
    value: string;
}

type FormDataWithLabels = {
    [K in keyof Omit<BiodataFormData, 'image'>]: {
        [key: string]: FieldConfig;
    };
}

const initialFormData: FormDataWithLabels = {
    PersonalDetails: {
        name: { label: 'Name', value: '' },
        dateOfBirth: { label: 'Date of Birth', value: '' },
        placeOfBirth: { label: 'Place of Birth', value: '' },
        timeOfBirth: { label: 'Time of Birth', value: '' },
        rashi: { label: 'Rashi', value: '' },
        nakshatra: { label: 'Nakshatra', value: '' },
        complexion: { label: 'Complexion', value: '' },
        height: { label: 'Height', value: '' },
        gotra: { label: 'Gotra', value: '' },
        bachelors: { label: 'Education', value: '' },
        work: { label: 'Occupation', value: '' }
    },
    FamilyDetails: {
        fatherName: { label: 'Father\'s Name', value: '' },
        fatherOccupation: { label: 'Father\'s Occupation', value: '' },
        motherName: { label: 'Mother\'s Name', value: '' },
        motherOccupation: { label: 'Mother\'s Occupation', value: '' },
        siblingsName: { label: 'Siblings Name', value: '' }
    },
    ContactDetails: {
        ContactNumber: { label: 'Contact Number', value: '' },
        ContactPerson: { label: 'Contact Person', value: '' },
        emailId: { label: 'Email Id', value: '' },
        residentialAddress: { label: 'Residential Address', value: '' }
    }
};

// Define mandatory fields that cannot be edited
const MANDATORY_FIELDS = {
    PersonalDetails: ['name', 'dateOfBirth', 'placeOfBirth'],
    FamilyDetails: ['fatherName', 'motherName'],
    ContactDetails: ['ContactNumber', 'ContactPerson']
};

// SEO Component for BiodataForm
const BiodataFormSEO = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Create Marriage Biodata - Biodata Maker Form",
        "description": "Fill in your personal details to create a professional marriage biodata. Easy form with customizable fields for matrimonial profiles.",
        "url": "https://yourdomain.com/create-biodata",
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://yourdomain.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Create Biodata",
                    "item": "https://yourdomain.com/create-biodata"
                }
            ]
        },
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What information do I need to create a biodata?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You need personal details like name, date of birth, education, occupation, family information, and contact details."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I customize the biodata fields?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, you can add custom fields, edit field labels, and reorder fields according to your preferences."
                    }
                }
            ]
        }
    };

    return (
        <Helmet>
            <title>Create Marriage Biodata - Professional Biodata Maker Form</title>
            <meta 
                name="description" 
                content="Create your professional marriage biodata with our easy-to-use form. Fill personal details, family information, and contact details to generate a beautiful biodata." 
            />
            <meta 
                name="keywords" 
                content="create biodata, marriage biodata form, matrimonial profile, biodata maker, wedding biodata, personal details form" 
            />
            <link rel="canonical" href="https://yourdomain.com/create-biodata" />
            
            {/* Open Graph Tags */}
            <meta property="og:title" content="Create Marriage Biodata - Professional Biodata Maker Form" />
            <meta property="og:description" content="Create your professional marriage biodata with our easy-to-use form. Fill personal details and generate a beautiful biodata." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://yourdomain.com/create-biodata" />
            <meta property="og:image" content="https://yourdomain.com/biodata-form-preview.jpg" />
            
            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Create Marriage Biodata - Professional Biodata Maker Form" />
            <meta name="twitter:description" content="Create your professional marriage biodata with our easy-to-use form" />
            <meta name="twitter:image" content="https://yourdomain.com/biodata-form-preview.jpg" />
            
            {/* Additional SEO Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Marriage Biodata Maker" />
            <meta name="language" content="en" />
            <meta name="revisit-after" content="7 days" />
            
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

// Breadcrumb Component for better navigation
const Breadcrumb = () => {
    const navigate = useNavigate();
    
    return (
        <nav aria-label="Breadcrumb navigation" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                    <button
                        onClick={() => navigate('/')}
                        className="hover:text-pink-600 transition-colors"
                    >
                        Home
                    </button>
                </li>
                <li className="flex items-center space-x-2">
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Create Biodata</span>
                </li>
            </ol>
        </nav>
    );
};

// Form Progress Indicator
const FormProgress = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
    const progress = (currentStep / totalSteps) * 100;
    
    return (
        <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Form Progress</span>
                <span>{currentStep} of {totalSteps} sections</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                    className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

const BiodataForm = () => {
    const [formData, setFormData] = useState<FormDataWithLabels>(initialFormData);
    const [expandedSection, setExpandedSection] = useState<string>('PersonalDetails');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [editingLabel, setEditingLabel] = useState<string | null>(null);
    const [tempLabel, setTempLabel] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<number>(1);
    const labelInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const rashiOptions = [
        "mesh (aries)", "varishabna (taurus)", "mithuna (gemini)", "karka (cancer)",
        "simha (leo)", "kanya (virgo)", "tula (libra)", "vrischika (scorpio)",
        "dhanur (sagittarius)", "makara (capricorn)", "kumbha (aquarius)", "meena (pisces)"
    ];

    const complexionOptions = [
        "very fair", "fair", "medium", "brown", "dark"
    ];

    // Generate height options from 3' 0" to 8' 0"
    const heightOptions: string[] = [];
    for (let ft = 3; ft <= 8; ft++) {
        for (let inch = 0; inch <= 11; inch++) {
            heightOptions.push(`${ft}' ${inch}"`);
            if (ft === 8 && inch === 0) break;
        }
    }

    const [fieldOrder, setFieldOrder] = useState<Record<string, string[]>>({
        PersonalDetails: Object.keys(initialFormData.PersonalDetails),
        FamilyDetails: Object.keys(initialFormData.FamilyDetails),
        ContactDetails: Object.keys(initialFormData.ContactDetails)
    });

    // Load saved data from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('biodataForm');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.formData) setFormData(parsed.formData);
                if (parsed.fieldOrder) setFieldOrder(parsed.fieldOrder);
            } catch (e) {
                console.error('Error loading saved form data:', e);
            }
        }
    }, []);

    // Auto-save form data
    // useEffect(() => {
    //     const dataToSave = {
    //         formData,
    //         fieldOrder,
    //         imagePreview
    //     };
    //     localStorage.setItem('biodataForm', JSON.stringify(dataToSave));
    // }, [formData, fieldOrder, imagePreview]);

    // Update current step based on expanded section
    useEffect(() => {
        const sections = ['PersonalDetails', 'FamilyDetails', 'ContactDetails'];
        const stepIndex = sections.indexOf(expandedSection);
        setCurrentStep(stepIndex + 1);
    }, [expandedSection]);

    // Custom hook to detect outside click
    const useOutsideClick = (callback: () => void) => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
            const handleClick = (event: MouseEvent) => {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    callback();
                }
            };

            document.addEventListener('mousedown', handleClick);
            return () => {
                document.removeEventListener('mousedown', handleClick);
            };
        }, [callback]);

        return ref;
    };

    // Check if a field is mandatory and cannot be edited
    const isMandatoryField = (section: keyof FormDataWithLabels, fieldKey: string): boolean => {
        return MANDATORY_FIELDS[section]?.includes(fieldKey) || false;
    };

    // Save label changes
    const saveLabelChange = (section: keyof FormDataWithLabels, field: string, newLabel: string) => {
        if (!newLabel.trim() || isMandatoryField(section, field)) return;
        
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: {
                    ...prev[section][field],
                    label: newLabel
                }
            }
        }));
        setEditingLabel(null);
        setTempLabel('');
    };

    // Handle outside click to save label
    const handleOutsideClick = () => {
        if (editingLabel && tempLabel.trim()) {
            const [section, field] = editingLabel.split('-');
            saveLabelChange(section as keyof FormDataWithLabels, field, tempLabel);
        } else {
            cancelLabelEdit();
        }
    };

    const outsideClickRef = useOutsideClick(handleOutsideClick);

    const handleLabelChange = (section: keyof FormDataWithLabels, field: string, newLabel: string, e?: React.MouseEvent | React.KeyboardEvent) => {
        if (e) {
            e.preventDefault();
        }
        saveLabelChange(section, field, newLabel);
    };

    const handleDateChange = (date: Date | null, section: keyof FormDataWithLabels, field: string) => {
        const value = date ? date.toISOString().split('T')[0] : '';
        handleInputChange(section, field, value);
    };

    const handleDragEnd = (result: any, section: keyof FormDataWithLabels) => {
        if (!result.destination) return;
        
        const items = Array.from(fieldOrder[section]);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        
        setFieldOrder(prev => ({
            ...prev,
            [section]: items
        }));
    };

    const handleAddField = (section: keyof FormDataWithLabels) => {
        const newFieldKey = `customField_${Date.now()}`;
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [newFieldKey]: {
                    label: 'New Field',
                    value: ''
                }
            }
        }));
        setFieldOrder(prev => ({
            ...prev,
            [section]: [...prev[section], newFieldKey]
        }));
    };

    const handleInputChange = (section: keyof FormDataWithLabels, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: {
                    ...prev[section][field],
                    value
                }
            }
        }));
    };

    const startEditingLabel = (section: keyof FormDataWithLabels, field: string) => {
        if (isMandatoryField(section, field)) {
            return;
        }
        
        setEditingLabel(`${section}-${field}`);
        setTempLabel(formData[section][field].label);
    };

    const cancelLabelEdit = () => {
        setEditingLabel(null);
        setTempLabel('');
    };

    const handleDeleteField = (section: keyof FormDataWithLabels, fieldKey: string) => {
        if (isMandatoryField(section, fieldKey)) {
            return;
        }

        setFormData((prev) => {
            const updatedSection = { ...prev[section] };
            delete updatedSection[fieldKey];
            return {
                ...prev,
                [section]: updatedSection,
            };
        });

        setFieldOrder((prev) => ({
            ...prev,
            [section]: prev[section].filter((key) => key !== fieldKey),
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Please select an image smaller than 5MB');
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }
            
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = ['name', 'dateOfBirth', 'ContactNumber'];
        const missingFields = requiredFields.filter(field => {
            for (const section of Object.keys(formData)) {
                for (const fieldKey of Object.keys(formData[section as keyof FormDataWithLabels])) {
                    if (fieldKey === field && !formData[section as keyof FormDataWithLabels][fieldKey].value) {
                        return true;
                    }
                }
            }
            return false;
        });

        if (missingFields.length > 0) {
            alert('Please fill in all required fields');
            return;
        }

        const processedData = Object.entries(formData).reduce((acc, [sectionKey, fields]) => {
            const section = sectionKey as keyof FormDataWithLabels;
            
            acc[section] = fieldOrder[section].reduce((fieldAcc, fieldKey) => {
                const config = fields[fieldKey];
                if (config) {
                    fieldAcc[config.label.replace(/\s+/g, '')] = config.value;  
                }
                return fieldAcc;
            }, {} as FormSection);

            return acc;
        }, {} as BiodataFormData);
        
        if (image) {
            processedData.image = image;
        }

        const dataToSave = {
            formData,
            fieldOrder,
            imagePreview
        };
        console.log(dataToSave,"save")
        localStorage.setItem('biodataForm', JSON.stringify(dataToSave));
        navigate('/templates', { state: { formData: processedData } });
    };

    const sectionIcons = {
        PersonalDetails: <User className="w-5 h-5" />,
        FamilyDetails: <Users className="w-5 h-5" />,
        ContactDetails: <PhoneCall className="w-5 h-5" />
    };

    const sectionDescriptions = {
        PersonalDetails: "Enter your personal information including name, date of birth, education, and occupation",
        FamilyDetails: "Provide your family details including parents' names and occupations",
        ContactDetails: "Add your contact information for interested parties to reach you"
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const formSectionVariants = {
        collapsed: { height: 0, overflow: 'hidden' },
        expanded: { height: 'auto', overflow: 'visible' }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <BiodataFormSEO />
            
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <div className="max-w-2xl mx-auto">
                    <Breadcrumb />
                    
                    <Card className="shadow-lg">
                        <CardHeader className="bg-gray-900 text-white rounded-t-lg">
                            <CardTitle className="text-xl font-semibold text-center">
                                Create Your Professional Marriage Biodata
                            </CardTitle>
                            <p className="text-center text-gray-300 text-sm mt-2">
                                Fill in your details to generate a beautiful biodata template
                            </p>
                        </CardHeader>
                        
                        <CardContent className="p-4">
                            <FormProgress currentStep={currentStep} totalSteps={3} />
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Profile Photo Section */}
                                <section className="flex flex-col items-center space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
                                    <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-pink-300 transition-all">
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt="Profile photo preview" 
                                                className="w-full h-full object-cover" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Camera className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <Label 
                                        htmlFor="image" 
                                        className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                                    >
                                        Upload Profile Photo
                                    </Label>
                                    <Input 
                                        id="image" 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        className="hidden"
                                        aria-label="Upload profile photo"
                                    />
                                </section>

                                {/* Form Sections */}
                                {(Object.keys(formData) as Array<keyof FormDataWithLabels>).map((section) => (
                                    <motion.section key={section} className="rounded-lg bg-white shadow-sm">
                                        <motion.button
                                            type="button"
                                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                            onClick={() => setExpandedSection(section)}
                                            aria-expanded={expandedSection === section}
                                            aria-controls={`${section}-content`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                {sectionIcons[section]}
                                                <div className="text-left">
                                                    <h3 className="text-base font-medium text-gray-700">
                                                        {section.split(/(?=[A-Z])/).join(' ')}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {sectionDescriptions[section]}
                                                    </p>
                                                </div>
                                            </div>
                                            {expandedSection === section ? (
                                                <ChevronUp className="text-gray-500" />
                                            ) : (
                                                <ChevronDown className="text-gray-500" />
                                            )}
                                        </motion.button>

                                        <motion.div
                                            id={`${section}-content`}
                                            variants={formSectionVariants}
                                            initial="collapsed"
                                            animate={expandedSection === section ? "expanded" : "collapsed"}
                                            className="px-4"
                                        >
                                            <DragDropContext onDragEnd={(result) => handleDragEnd(result, section)}>
                                                <Droppable droppableId={section}>
                                                    {(provided) => (
                                                        <div 
                                                            {...provided.droppableProps} 
                                                            ref={provided.innerRef}
                                                            className="space-y-3"
                                                        >
                                                            {fieldOrder[section].map((fieldKey, index) => {
                                                                const config = formData[section][fieldKey];
                                                                const isMandatory = isMandatoryField(section, fieldKey);
                                                                
                                                                return (
                                                                    <Draggable 
                                                                        key={fieldKey} 
                                                                        draggableId={fieldKey} 
                                                                        index={index}
                                                                    >
                                                                        {(provided) => (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                className="bg-gray-50 rounded-lg p-3 shadow-sm"
                                                                            >
                                                                                <div className="flex items-start space-x-2">
                                                                                    <div 
                                                                                        {...provided.dragHandleProps}
                                                                                        className="pt-2.5 cursor-move text-gray-400 hover:text-gray-600"
                                                                                        aria-label="Drag to reorder field"
                                                                                    >
                                                                                        <ArrowUp className="w-4 h-4"/>
                                                                                        <ArrowDown className="w-4 h-4"/>
                                                                                    </div>
                                                                                    
                                                                                    <div className="flex-1 space-y-2">
                                                                                        {editingLabel === `${section}-${fieldKey}` ? (
                                                                                            <div ref={outsideClickRef} className="flex space-x-2">
                                                                                                <Input
                                                                                                    ref={labelInputRef}
                                                                                                    value={tempLabel}
                                                                                                    onChange={(e) => setTempLabel(e.target.value)}
                                                                                                    autoFocus
                                                                                                    className="h-8"
                                                                                                    onKeyPress={(e) => {
                                                                                                        if (e.key === 'Enter') {
                                                                                                            handleLabelChange(section, fieldKey, tempLabel, e);
                                                                                                        }
                                                                                                    }}
                                                                                                    aria-label="Edit field label"
                                                                                                />
                                                                                                <Button
                                                                                                    variant="ghost"
                                                                                                    type='button'
                                                                                                    size="sm"
                                                                                                    onClick={() => handleLabelChange(section, fieldKey, tempLabel)}
                                                                                                    className="h-8 px-2"
                                                                                                    aria-label="Save label changes"
                                                                                                >
                                                                                                    <Save className="w-4 h-4" />
                                                                                                </Button>
                                                                                                <Button
                                                                                                    variant="ghost"
                                                                                                    size="sm"
                                                                                                    type='button'
                                                                                                    onClick={cancelLabelEdit}
                                                                                                    className="h-8 px-2"
                                                                                                    aria-label="Cancel label editing"
                                                                                                >
                                                                                                    <X className="w-4 h-4" />
                                                                                                </Button>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="flex items-center justify-between">
                                                                                                <Label className={`text-sm font-medium ${isMandatory ? 'text-gray-900' : 'text-gray-700'}`}>
                                                                                                    {config?.label}
                                                                                                    {isMandatory && <span className="text-red-500 ml-1">*</span>}
                                                                                                </Label>
                                                                                                {!isMandatory && (
                                                                                                    <Button
                                                                                                        variant="ghost"
                                                                                                        type="button"
                                                                                                        size="sm"
                                                                                                        onClick={() => startEditingLabel(section, fieldKey)}
                                                                                                        className="h-6 px-2"
                                                                                                        aria-label="Edit field label"
                                                                                                    >
                                                                                                        <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                                                                                                    </Button>
                                                                                                )}
                                                                                            </div>
                                                                                        )}

                                                                                        {/* Form Fields */}
                                                                                        {fieldKey === 'dateOfBirth' ? (
                                                                                            <DatePicker
                                                                                                selected={config.value ? new Date(config.value) : null}
                                                                                                onChange={(date: Date | null) => handleDateChange(date, section, fieldKey)}
                                                                                                dateFormat="yyyy-MM-dd"
                                                                                                className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-pink-300 focus:border-pink-300 focus:outline-none"
                                                                                                wrapperClassName="w-full"
                                                                                                placeholderText="Select date of birth"
                                                                                                showYearDropdown
                                                                                                showMonthDropdown
                                                                                                dropdownMode="select"
                                                                                                aria-label="Select date of birth"
                                                                                            />
                                                                                        ) : fieldKey === 'timeOfBirth' ? (
                                                                                            <input
                                                                                                type="time"
                                                                                                step="any"
                                                                                                value={config.value ? config.value.substring(0, 5) : ''}
                                                                                                onChange={(e) => handleInputChange(section, fieldKey, e.target.value)}
                                                                                                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                                                                                                className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-pink-300 focus:border-pink-300 focus:outline-none"
                                                                                                placeholder="Select time of birth"
                                                                                                aria-label="Select time of birth"
                                                                                            />
                                                                                        ) : fieldKey === 'rashi' ? (
                                                                                            <select
                                                                                                value={config.value || ''}
                                                                                                onChange={e => handleInputChange(section, fieldKey, e.target.value)}
                                                                                                className="w-full border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
                                                                                                aria-label="Select Rashi"
                                                                                            >
                                                                                                <option value="">Select Rashi</option>
                                                                                                {rashiOptions.map(opt => (
                                                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                        ) : fieldKey === 'complexion' ? (
                                                                                            <select
                                                                                                value={config.value || ''}
                                                                                                onChange={e => handleInputChange(section, fieldKey, e.target.value)}
                                                                                                className="w-full border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
                                                                                                aria-label="Select complexion"
                                                                                            >
                                                                                                <option value="">Select Complexion</option>
                                                                                                {complexionOptions.map(opt => (
                                                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                        ) : fieldKey === 'height' ? (
                                                                                            <select
                                                                                                value={config.value || ''}
                                                                                                onChange={e => handleInputChange(section, fieldKey, e.target.value)}
                                                                                                className="w-full border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
                                                                                                aria-label="Select height"
                                                                                            >
                                                                                                <option value="">Select Height</option>
                                                                                                {heightOptions.map(opt => (
                                                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                        ) : (
                                                                                            <Input
                                                                                                value={config?.value}
                                                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(section, fieldKey, e.target.value)}
                                                                                                className="border-gray-200 bg-white focus:ring-1 focus:ring-pink-300 focus:border-pink-300 text-sm"
                                                                                                placeholder={`Enter ${config?.label}`}
                                                                                                aria-label={`Enter ${config?.label}`}
                                                                                            />
                                                                                        )}
                                                                                    </div>

                                                                                    {!isMandatory && (
                                                                                        <Button
                                                                                            type="button"
                                                                                            onClick={() => handleDeleteField(section, fieldKey)}
                                                                                            variant="ghost"
                                                                                            size="sm"
                                                                                            className="text-gray-400 hover:text-red-600 h-8 px-2"
                                                                                            aria-label="Delete field"
                                                                                        >
                                                                                            <X className="w-4 h-4" />
                                                                                        </Button>
                                                                                    )}
                                                                                    {isMandatory && (
                                                                                        <div className="text-gray-400 cursor-default h-8 px-4" />
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            })}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>

                                            <Button
                                                type="button"
                                                onClick={() => handleAddField(section)}
                                                variant="ghost"
                                                className="w-full mt-3 text-sm text-gray-600 hover:bg-gray-100"
                                                aria-label="Add new field"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Field
                                            </Button>
                                        </motion.div>
                                    </motion.section>
                                ))}

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="submit"
                                        className="w-full bg-gray-900 text-white hover:bg-gray-800 py-2.5 text-sm font-medium"
                                        aria-label="Generate biodata with filled information"
                                    >
                                        Generate Professional Biodata
                                    </Button>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
};

export default BiodataForm;
