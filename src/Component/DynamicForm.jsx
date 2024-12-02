/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import formResponses from './formResponses'; // Import the formResponses object

const DynamicForm = () => {
    const [formType, setFormType] = useState('');
    const [formData, setFormData] = useState({});
    const [submittedData, setSubmittedData] = useState([]);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    
    const handleFormTypeChange = (e) => {
        setFormType(e.target.value);
        setFormData({});

        setProgress(0);

        setError('');
    };

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        

        const totalFields = formResponses[formType].fields.length;
        const filledFields = formResponses[formType].fields.filter(
            (field) => updatedFormData[field.name] && updatedFormData[field.name].trim() !== ''
        ).length;
        setProgress((filledFields / totalFields) * 100);
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        
        const isValid = formResponses[formType].fields.every(
            (field) => !field.required || (formData[field.name] && formData[field.name].trim() !== '')
        );

        if (isValid) {
            setSubmittedData([...submittedData, formData]);
            setFormData({});
            setProgress(0);
            alert('Form submitted successfully!');
        } else {
            setError('Please fill all required fields.');
        }
    };

    return (
        <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_N7eu95i5eKiYvPWAwIqEq6js3YOHyELQyw&s')] bg-cover bg-center min-h-screen flex justify-center items-center">
            
            <div className="relative max-w-lg mx-auto p-8 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
                <h1 className="text-center text-3xl font-bold text-white underline mb-4">Dynamic Form</h1>
                <select
                    onChange={handleFormTypeChange}
                    className="w-full p-2 mb-4 rounded-md border border-gray-300 bg-transparent text-white"
                >
                    <option className="bg-gray-700 text-white p-6" value="">
                        Select Form Type
                    </option>
                    <option className="bg-gray-700 text-white p-6" value="userInfo">
                        User Information
                    </option>
                    <option className="bg-gray-700 text-white p-6" value="addressInfo">
                        Address Information
                    </option>
                    <option className="bg-gray-700 text-white p-6" value="paymentInfo">
                        Payment Information
                    </option>
                </select>

                {formType && (
                    <form onSubmit={handleSubmit}>
                        {formResponses[formType].fields.map((field) => (
                            <div key={field.name} className="mb-4">
                                <label className="block text-white mb-2">{field.label}</label>
                                {field.type === 'dropdown' ? (
                                    <select
                                        name={field.name}
                                        onChange={handleInputChange}
                                        required={field.required}
                                        value={formData[field.name] || ''}
                                        className="w-full p-2 rounded-md border border-gray-300 bg-transparent text-white"
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        
                                        onChange={handleInputChange}
                                        required={field.required}
                                        value={formData[field.name] || ''}
                                        className="w-full p-2 rounded-md border border-gray-300 bg-transparent text-white"
                                    />
                                )}
                                {error && !formData[field.name] && field.required && (
                                    <span className="text-red-500">{`${field.label} is required`}</span>
                                )}
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </form>
                )}

                <div className="mt-4">
                    <h3 className="text-white">Progress</h3>
                    <progress value={progress} max="100" className="w-full mt-2"></progress>
                    <p className="text-white">{Math.round(progress)}% completed</p>
                </div>

                {submittedData.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-white">Submitted Data</h3>
                        <table className="w-full text-white mt-4">
                            <thead>
                                <tr>
                                    {Object.keys(submittedData[0]).map((key) => (
                                        <th key={key} className="border-b px-4 py-2">{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {submittedData.map((data, index) => (
                                    <tr key={index}>
                                        {Object.values(data).map((value, i) => (
                                            <td key={i} className="border-b px-4 py-2">{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicForm;
