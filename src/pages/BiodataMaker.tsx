import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, User, Users, PhoneCall, Camera, ChevronDown, ArrowUp,ArrowDown,ChevronUp, GripVertical, X, Save, Edit2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
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

const rashiOptions = [
  "mesh (aries)", "varishabna (taurus)", "mithuna (gemini)", "karka (cancer)",
  "simha (leo)", "kanya (virgo)", "tula (libra)", "vrischika (scorpio)",
  "dhanur (sagittarius)", "makara (capricorn)", "kumbha (aquarius)", "meena (pisces)"
];

const complexionOptions = [
  "very fair", "fair", "medium", "brown", "dark"
];

// Generate height options from 3' 0" to 8' 0"
const heightOptions = [];
for (let ft = 3; ft <= 8; ft++) {
  for (let inch = 0; inch <= 11; inch++) {
    heightOptions.push(`${ft}' ${inch}"`);
    if (ft === 8 && inch === 0) break; // Stop at 8' 0"
  }
}

        // Updated handleLabelChange with validation
        const handleLabelChange = (section: keyof FormDataWithLabels, field: string, newLabel: string,e?: React.MouseEvent | React.KeyboardEvent) => {
            if (e) {
                e.preventDefault();
            }
            if (!newLabel.trim()) return;
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
    
        // Enhanced date handling
        const handleDateChange = (date: Date | null, section: keyof FormDataWithLabels, field: string) => {
            const value = date ? date.toISOString().split('T')[0] : '';
            handleInputChange(section, field, value);
        };
        const handleTimeChange = (time: string | null, section: keyof FormDataWithLabels, field: string) => {
            console.log("Time selected:", time); // For debugging
            
            // If time doesn't include seconds, add them
            let value = '';
            if (time) {
              const timeParts = time.split(':');
              // If seconds are missing, add them
              if (timeParts.length === 2) {
                value = `${time}:00`;
              } else {
                value = time;
              }
            }
            
            // Update the form data
            handleInputChange(section, field, value);
          };
          
        
    
        // Improved drag and drop handling
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
    
        // Add new field with unique key
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
        setEditingLabel(`${section}-${field}`);
        setTempLabel(formData[section][field].label);
    };

    // const handleLabelChange = (section: keyof FormDataWithLabels, field: string, newLabel: string) => {
    //     setFormData(prev => ({
    //         ...prev,
    //         [section]: {
    //             ...prev[section],
    //             [field]: {
    //                 ...prev[section][field],
    //                 label: newLabel
    //             }
    //         }
    //     }));
    //     setEditingLabel(null);
    //     setTempLabel('');
    // };

    const cancelLabelEdit = () => {
        setEditingLabel(null);
        setTempLabel('');
    };

    const handleDeleteField = (section: keyof FormDataWithLabels, fieldKey: string) => {
        // Remove the field from formData
        setFormData((prev) => {
            const updatedSection = { ...prev[section] };
            delete updatedSection[fieldKey];
            return {
                ...prev,
                [section]: updatedSection,
            };
        });
    
        // Remove the field from fieldOrder
        setFieldOrder((prev) => ({
            ...prev,
            [section]: prev[section].filter((key) => key !== fieldKey),
        }));
    };
    

    // const handleAddField = (section: keyof FormDataWithLabels) => {
    //     const newFieldKey = `newField${Date.now()}`;
    //     setFormData(prev => ({
    //         ...prev,
    //         [section]: {
    //             ...prev[section],
    //             [newFieldKey]: {
    //                 label: 'New Field',
    //                 value: ''
    //             }
    //         }
    //     }));
    // };
    const [fieldOrder, setFieldOrder] = useState<Record<string, string[]>>({
        personalDetails: Object.keys(initialFormData.personalDetails),
        familyDetails: Object.keys(initialFormData.familyDetails),
        contactDetails: Object.keys(initialFormData.contactDetails)
    });

    // const handleDragEnd = (result: any, section: keyof FormDataWithLabels) => {
    //     if (!result.destination) return;
        
    //     const items = Array.from(fieldOrder[section]);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);
        
    //     setFieldOrder(prev => ({
    //         ...prev,
    //         [section]: items
    //     }));
    // };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const processedData = Object.entries(formData).reduce((acc, [sectionKey, fields]) => {
            const section = sectionKey as keyof FormDataWithLabels;
            
            // Use fieldOrder to maintain drag-and-drop sequence
            acc[section] = fieldOrder[section].reduce((fieldAcc, fieldKey) => {
                const config = fields[fieldKey];
                if (config) { // Ensure field exists
                    fieldAcc[config.label] = config.value;
                }
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
        <motion.div className="min-h-screen bg-gray-50 py-8 px-4" initial="hidden" animate="visible" variants={containerVariants}>
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gray-900 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-center">Create Marriage Biodata</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div className="flex flex-col items-center space-y-4">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-pink-300 transition-all">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <Label htmlFor="image" className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                            Upload Profile Photo
                        </Label>
                        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </motion.div>

                    {(Object.keys(formData) as Array<keyof FormDataWithLabels>).map((section) => (
                        <motion.div key={section} className="rounded-lg bg-white shadow-sm">
                            <motion.button
                                type="button"
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                onClick={() => setExpandedSection(section)}
                            >
                                <div className="flex items-center space-x-3">
                                    {sectionIcons[section]}
                                    <span className="text-base font-medium text-gray-700">
                                        {section.split(/(?=[A-Z])/).join(' ')}
                                    </span>
                                </div>
                                {expandedSection === section ? (
                                    <ChevronUp className="text-gray-500" />
                                ) : (
                                    <ChevronDown className="text-gray-500" />
                                )}
                            </motion.button>

                            <motion.div
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
                                                                            >
                                                                                {/* <GripVertical className="w-4 h-4" /> */}
                                                                                <ArrowUp  className="w-4 h-4"/>
                                                                                <ArrowDown  className="w-4 h-4"/>
                                                                            </div>
                                                                            
                                                                            <div className="flex-1 space-y-2">
                                                                                {editingLabel === `${section}-${fieldKey}` ? (
                                                                                    <div className="flex space-x-2">
                                                                                        <Input
                                                                                            value={tempLabel}
                                                                                            onChange={(e) => setTempLabel(e.target.value)}
                                                                                            autoFocus
                                                                                            className="h-8"
                                                                                            onKeyPress={(e) => e.key === 'Enter' && handleLabelChange(section, fieldKey, tempLabel)}
                                                                                        />
                                                                                        <Button
                                                                                            variant="ghost"
                                                                                            type='button'
                                                                                            size="sm"
                                                                                            onClick={() => handleLabelChange(section, fieldKey, tempLabel)}
                                                                                            className="h-8 px-2"
                                                                                        >
                                                                                            <Save className="w-4 h-4" />
                                                                                        </Button>
                                                                                        <Button
                                                                                            variant="ghost"
                                                                                            size="sm"
                                                                                            type='button'
                                                                                            onClick={cancelLabelEdit}
                                                                                            className="h-8 px-2"
                                                                                        >
                                                                                            <X className="w-4 h-4" />
                                                                                        </Button>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="flex items-center justify-between">
                                                                                        <Label className="text-sm font-medium text-gray-700">
                                                                                            {config?.label}
                                                                                        </Label>
                                                                                        <Button
                                                                                            variant="ghost"
                                                                                            type="button"
                                                                                            size="sm"
                                                                                            onClick={() => startEditingLabel(section, fieldKey)}
                                                                                            className="h-6 px-2"
                                                                                        >
                                                                                            <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                                                                                        </Button>
                                                                                    </div>
                                                                                )}
   {fieldKey === 'dateOfBirth' ? (
  <DatePicker
    selected={config.value ? new Date(config.value) : null}
    onChange={(date: Date | null) => handleDateChange(date, section, fieldKey)}
    dateFormat="yyyy-MM-dd"
    className="w-full border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
    placeholderText="Select date of birth"
  />
) : fieldKey === 'timeOfBirth' ? (
  <TimePicker
    value={config.value || ''}
    onChange={(time: string | null) => handleTimeChange(time, section, fieldKey)}
    className="w-100 border-gray-200 rounded-md"
    format="HH:mm:ss a"
    disableClock={false}
    required={false}
    maxDetail={"second"}
  />
) : fieldKey === 'rashi' ? (
  <select
    value={config.value || ''}
    onChange={e => handleInputChange(section, fieldKey, e.target.value)}
    className="w-full border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
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
    className="border-gray-200 focus:ring-1 focus:ring-pink-300 focus:border-pink-300 text-sm"
    placeholder={`Enter ${config?.label}`}
  />
)}
                                                                            </div>

                                                                            <Button
                                                                                type="button"
                                                                                onClick={() => handleDeleteField(section, fieldKey)}
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                className="text-gray-400 hover:text-red-600 h-8 px-2"
                                                                            >
                                                                                <X className="w-4 h-4" />
                                                                            </Button>
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
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Field
                                    </Button>
                                </motion.div>
                            </motion.div>
                        ))}

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            type="submit"
                            className="w-full bg-gray-900 text-white hover:bg-gray-800 py-2.5 text-sm font-medium"
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