import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
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

// Memoized constants to prevent recreation
const INITIAL_FORM_DATA: FormDataWithLabels = {
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

const MANDATORY_FIELDS = {
    PersonalDetails: ['name', 'dateOfBirth', 'placeOfBirth'],
    FamilyDetails: ['fatherName', 'motherName'],
    ContactDetails: ['ContactNumber', 'ContactPerson']
};

// Memoized options arrays
const RASHI_OPTIONS = [
    "mesh (aries)", "varishabna (taurus)", "mithuna (gemini)", "karka (cancer)",
    "simha (leo)", "kanya (virgo)", "tula (libra)", "vrischika (scorpio)",
    "dhanur (sagittarius)", "makara (capricorn)", "kumbha (aquarius)", "meena (pisces)"
];

const COMPLEXION_OPTIONS = [
    "very fair", "fair", "medium", "brown", "dark"
];

// Generate height options once
const HEIGHT_OPTIONS: string[] = (() => {
    const options: string[] = [];
    for (let ft = 3; ft <= 8; ft++) {
        for (let inch = 0; inch <= 11; inch++) {
            options.push(`${ft}' ${inch}"`);
            if (ft === 8 && inch === 0) break;
        }
    }
    return options;
})();

const BiodataFormSEO = memo(() => {
    const schemaData = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Create Marriage Biodata Online - Free Biodata Maker Form",
        "description": "Fill personal, family, and contact details to create professional marriage biodata. Easy form with photo upload, customizable fields, instant biodata generation.",
        "url": "https://www.freebiodatagenerator.com/create-biodata",
        "applicationCategory": "UtilityApplication",
        "featureList": [
            "Personal details form with validation",
            "Family information fields",
            "Contact details section",
            "Photo upload functionality",
            "Customizable field labels",
            "Drag and drop field reordering",
            "Add/remove custom fields",
            "Real-time form preview",
            "Step-by-step form progress",
            "Multi-language support",
            "Form data persistence",
            "Mobile responsive form"
        ],
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.freebiodatagenerator.com" },
                { "@type": "ListItem", "position": 2, "name": "Create Biodata", "item": "https://www.freebiodatagenerator.com/create-biodata" }
            ]
        },
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How do I fill the marriage biodata form?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Fill your personal, family, and contact details, upload a photo, and reorder fields to generate your biodata instantly."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What details should be included in a marriage biodata?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Include your name, date of birth, place of birth, education, occupation, family details, contact info, and a professional photo."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I add custom fields to the biodata?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, you can add custom fields, drag to reorder, and change field labels as per your requirements."
                    }
                }
            ]
        }
    }), []);

    return (
        <Helmet>
            <title>Create Marriage Biodata Online - Free Biodata Form | Personal Details</title>
            <meta name="description" content="Fill personal, family, and contact details to create marriage biodata online. Photo upload, customizable fields, drag-and-drop reordering, mobile friendly biodata form." />
            <meta name="keywords" content="create marriage biodata, marriage biodata form, biodata maker form, biodata creation form, fill biodata details, matrimonial profile form, biodata template, biodata form with photo" />
            <link rel="canonical" href="https://www.freebiodatagenerator.com/create-biodata" />
            {/* Open Graph for social sharing */}
            <meta property="og:title" content="Create Marriage Biodata Online - Free Biodata Form" />
            <meta property="og:description" content="Fill personal, family, and contact details, upload a photo, and create your professional marriage biodata instantly." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.freebiodatagenerator.com/create-biodata" />
            <meta property="og:image" content="https://www.freebiodatagenerator.com/biodata-form-preview.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Create Marriage Biodata Online - Free Biodata Form" />
            <meta name="twitter:description" content="Fill personal, family, and contact details, upload a photo, and create your professional marriage biodata instantly." />
            <meta name="twitter:image" content="https://www.freebiodatagenerator.com/biodata-form-preview.jpg" />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
            <meta name="author" content="Free Biodata Generator Team" />
            <meta name="language" content="en" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        </Helmet>
    );
});

BiodataFormSEO.displayName = 'BiodataFormSEO';

// Memoized Breadcrumb Component
const Breadcrumb = memo(() => {
    const navigate = useNavigate();

    const handleHomeClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <nav aria-label="Breadcrumb navigation" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                    <button
                        onClick={handleHomeClick}
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
});

Breadcrumb.displayName = 'Breadcrumb';

// Memoized Form Progress Component
const FormProgress = memo(({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
    const progress = useMemo(() => (currentStep / totalSteps) * 100, [currentStep, totalSteps]);

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
});

FormProgress.displayName = 'FormProgress';

const BiodataForm = memo(() => {
    const [formData, setFormData] = useState<FormDataWithLabels>(INITIAL_FORM_DATA);
    const [expandedSection, setExpandedSection] = useState<string>('PersonalDetails');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [editingLabel, setEditingLabel] = useState<string | null>(null);
    const [tempLabel, setTempLabel] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<number>(1);
    const labelInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Memoized field order
    const [fieldOrder, setFieldOrder] = useState<Record<string, string[]>>(() => ({
        PersonalDetails: Object.keys(INITIAL_FORM_DATA.PersonalDetails),
        FamilyDetails: Object.keys(INITIAL_FORM_DATA.FamilyDetails),
        ContactDetails: Object.keys(INITIAL_FORM_DATA.ContactDetails)
    }));

    // Memoized constants
    const sectionIcons = useMemo(() => ({
        PersonalDetails: <User className="w-5 h-5" />,
        FamilyDetails: <Users className="w-5 h-5" />,
        ContactDetails: <PhoneCall className="w-5 h-5" />
    }), []);

    const sectionDescriptions = useMemo(() => ({
        PersonalDetails: "Enter your personal information including name, date of birth, education, and occupation",
        FamilyDetails: "Provide your family details including parents' names and occupations",
        ContactDetails: "Add your contact information for interested parties to reach you"
    }), []);

    // Load saved data from localStorage (only once on mount)
    useEffect(() => {
        const saved = localStorage.getItem('biodataForm');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.formData) setFormData(parsed.formData);
                if (parsed.fieldOrder) setFieldOrder(parsed.fieldOrder);
                if (parsed.imagePreview) setImagePreview(parsed.imagePreview);
            } catch (e) {
                console.error('Error loading saved form data:', e);
            }
        }
    }, []);

    // Update current step based on expanded section
    useEffect(() => {
        const sections = ['PersonalDetails', 'FamilyDetails', 'ContactDetails'];
        const stepIndex = sections.indexOf(expandedSection);
        setCurrentStep(stepIndex + 1);
    }, [expandedSection]);

    // Memoized callbacks
    const isMandatoryField = useCallback((section: keyof FormDataWithLabels, fieldKey: string): boolean => {
        return MANDATORY_FIELDS[section]?.includes(fieldKey) || false;
    }, []);

    const handleInputChange = useCallback((section: keyof FormDataWithLabels, field: string, value: string) => {
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
    }, []);

    const handleDateChange = useCallback((date: Date | null, section: keyof FormDataWithLabels, field: string) => {
        const value = date ? date.toISOString().split('T')[0] : '';
        handleInputChange(section, field, value);
    }, [handleInputChange]);

    const handleDragEnd = useCallback((result: any, section: keyof FormDataWithLabels) => {
        if (!result.destination) return;

        const items = Array.from(fieldOrder[section]);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFieldOrder(prev => ({
            ...prev,
            [section]: items
        }));
    }, [fieldOrder]);

    const handleAddField = useCallback((section: keyof FormDataWithLabels) => {
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
    }, []);

    const handleDeleteField = useCallback((section: keyof FormDataWithLabels, fieldKey: string) => {
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
    }, [isMandatoryField]);

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.size > 5 * 1024 * 1024) {
                alert('Please select an image smaller than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

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

        const dataToSave = { formData, fieldOrder, imagePreview };
        localStorage.setItem('biodataForm', JSON.stringify(dataToSave));
        navigate('/templates', { state: { formData: processedData } });
    }, [formData, fieldOrder, image, imagePreview, navigate]);

    // Custom hook for outside click detection
    const useOutsideClick = useCallback((callback: () => void) => {
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
    }, []);

    const saveLabelChange = useCallback((section: keyof FormDataWithLabels, field: string, newLabel: string) => {
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
    }, [isMandatoryField]);

    const handleOutsideClick = useCallback(() => {
        if (editingLabel && tempLabel.trim()) {
            const [section, field] = editingLabel.split('-');
            saveLabelChange(section as keyof FormDataWithLabels, field, tempLabel);
        } else {
            setEditingLabel(null);
            setTempLabel('');
        }
    }, [editingLabel, tempLabel, saveLabelChange]);

    const outsideClickRef = useOutsideClick(handleOutsideClick);

    const startEditingLabel = useCallback((section: keyof FormDataWithLabels, field: string) => {
        if (isMandatoryField(section, field)) {
            return;
        }
        setEditingLabel(`${section}-${field}`);
        setTempLabel(formData[section][field].label);
    }, [isMandatoryField, formData]);

    const cancelLabelEdit = useCallback(() => {
        setEditingLabel(null);
        setTempLabel('');
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <BiodataFormSEO />
            
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
                                            loading="lazy"
                                            width="112"
                                            height="112"
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
                                <section key={section} className="rounded-lg bg-white shadow-sm">
                                    <button
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
                                    </button>

                                    {expandedSection === section && (
                                        <div
                                            id={`${section}-content`}
                                            className="px-4 pb-4"
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
                                                                                        <ArrowUp className="w-4 h-4" />
                                                                                        <ArrowDown className="w-4 h-4" />
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
                                                                                                            saveLabelChange(section, fieldKey, tempLabel);
                                                                                                        }
                                                                                                    }}
                                                                                                    aria-label="Edit field label"
                                                                                                />
                                                                                                <Button
                                                                                                    variant="ghost"
                                                                                                    type='button'
                                                                                                    size="sm"
                                                                                                    onClick={() => saveLabelChange(section, fieldKey, tempLabel)}
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
                                                                                                {RASHI_OPTIONS.map(opt => (
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
                                                                                                {COMPLEXION_OPTIONS.map(opt => (
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
                                                                                                {HEIGHT_OPTIONS.map(opt => (
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
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                );
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
                                        </div>
                                    )}
                                </section>
                            ))}

                            <Button
                                type="submit"
                                className="w-full bg-gray-900 text-white hover:bg-gray-800 py-2.5 text-sm font-medium"
                                aria-label="Generate biodata with filled information"
                            >
                                Generate Professional Biodata
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
});

BiodataForm.displayName = 'BiodataForm';

export default BiodataForm;
