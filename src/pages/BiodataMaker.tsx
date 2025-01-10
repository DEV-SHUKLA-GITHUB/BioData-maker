import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, User, Users, PhoneCall, Camera, ChevronDown, ChevronUp } from 'lucide-react';

interface FormSection {
    [key: string]: string;
}

interface BiodataFormData {
    personalDetails: FormSection;
    familyDetails: FormSection;
    contactDetails: FormSection;
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
    personalDetails: {
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
    familyDetails: {
        fatherName: { label: 'Father\'s Name', value: '' },
        fatherOccupation: { label: 'Father\'s Occupation', value: '' },
        motherName: { label: 'Mother\'s Name', value: '' },
        motherOccupation: { label: 'Mother\'s Occupation', value: '' },
        siblings: { label: 'Siblings', value: '' }
    },
    contactDetails: {
        contactNumber: { label: 'Contact Number', value: '' },
        contactPerson: { label: 'Contact Person', value: '' },
        emailId: { label: 'Email ID', value: '' },
        residentialAddress: { label: 'Residential Address', value: '' }
    }
};

const BiodataForm = () => {
    const [formData, setFormData] = useState<FormDataWithLabels>(initialFormData);
    const [expandedSection, setExpandedSection] = useState<string>('personalDetails');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [editingLabel, setEditingLabel] = useState<string | null>(null);
    const [tempLabel, setTempLabel] = useState<string>('');
    const navigate = useNavigate();

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
        setEditingLabel(`${section}-${field}`);
        setTempLabel(formData[section][field].label);
    };

    const handleLabelChange = (section: keyof FormDataWithLabels, field: string, newLabel: string) => {
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

    const cancelLabelEdit = () => {
        setEditingLabel(null);
        setTempLabel('');
    };

    const handleDeleteField = (section: keyof FormDataWithLabels, field: string) => {
        const newSection = { ...formData[section] };
        delete newSection[field];
        setFormData(prev => ({
            ...prev,
            [section]: newSection
        }));
    };

    const handleAddField = (section: keyof FormDataWithLabels) => {
        const newFieldKey = `newField${Date.now()}`;
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
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const processedData = Object.entries(formData).reduce((acc, [section, fields]) => {
          acc[section as keyof FormDataWithLabels] = Object.entries(fields).reduce((fieldAcc, [_, config]) => {
              // Use the label as the key and the value as the value
              fieldAcc[config.label] = config.value; 
              return fieldAcc;
          }, {} as FormSection);
          return acc;
      }, {} as BiodataFormData);
      
      if (image) {
          processedData.image = image;
      }
      
      navigate('/template', { state: { formData: processedData } });
  };
  
    const sectionIcons = {
        personalDetails: <User className="w-5 h-5" />,
        familyDetails: <Users className="w-5 h-5" />,
        contactDetails: <PhoneCall className="w-5 h-5" />
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
        <motion.div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4" initial="hidden" animate="visible" variants={containerVariants}>
            <Card className="max-w-4xl mx-auto shadow-xl">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-bold text-center">Create Your Marriage Biodata</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div className="flex flex-col items-center space-y-4" whileHover={{ scale: 1.02 }}>
                            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-pink-200">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Camera className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                                )}
                            </div>
                            <Label htmlFor="image" className="cursor-pointer bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                                Upload Photo
                            </Label>
                            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </motion.div>

                        {(Object.keys(formData) as Array<keyof FormDataWithLabels>).map((section) => (
                            <motion.div key={section} className="rounded-lg border border-gray-200 overflow-hidden">
                                <motion.button
                                    type="button"
                                    className={`w-full p-4 flex items-center justify-between ${expandedSection === section ? 'bg-pink-50' : 'bg-white'}`}
                                    onClick={() => setExpandedSection(section)}
                                    whileHover={{ backgroundColor: 'rgba(255, 192, 203, 0.1)' }}
                                >
                                    <div className="flex items-center space-x-2">
                                        {sectionIcons[section]}
                                        <span className="text-lg font-semibold">{section.split(/(?=[A-Z])/).join(' ')}</span>
                                    </div>
                                    {expandedSection === section ? <ChevronUp /> : <ChevronDown />}
                                </motion.button>

                                <motion.div
                                    variants={formSectionVariants}
                                    initial="collapsed"
                                    animate={expandedSection === section ? "expanded" : "collapsed"}
                                    transition={{ duration: 0.3 }}
                                    className="p-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(formData[section]).map(([field, config]) => (
                                            <motion.div key={field} className="space-y-2 relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                                <div className="flex items-center space-x-2">
                                                    {editingLabel === `${section}-${field}` ? (
                                                        <div className="flex items-center space-x-2 w-full">
                                                            <Input
                                                                value={tempLabel}
                                                                onChange={(e) => setTempLabel(e.target.value)}
                                                                autoFocus
                                                                className="flex-grow"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleLabelChange(section, field, tempLabel)}
                                                            >
                                                                Save
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={cancelLabelEdit}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className='flex content-between items-center justify-between w-full'>
                                                            <Label>{config.label}</Label>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className=''
                                                                onClick={() => startEditingLabel(section, field)}
                                                            >
                                                                Edit Label
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>

                                                <Input
                                                    value={config.value}
                                                    onChange={(e) => handleInputChange(section, field, e.target.value)}
                                                    className="border-gray-200 focus:ring-pink-500 focus:border-pink-500"
                                                    placeholder={`Enter ${config.label}`}
                                                />

                                                <Button
                                                    type="button"
                                                    onClick={() => handleDeleteField(section, field)}
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute right-0 top-[45%]"
                                                >
                                                    Delete
                                                </Button>
                                            </motion.div>
                                        ))}
                                        
                                        <Button
                                            type="button"
                                            onClick={() => handleAddField(section)}
                                            variant="outline"
                                            className="flex items-center space-x-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Add New Field</span>
                                        </Button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
                            >
                                Generate Biodata
                            </Button>
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default BiodataForm;