import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { z } from 'zod';
import axios from 'axios';

type ExtractedInfo = {
    UID: string | null;
    Name: string | null;
    DOB: string | null;
    Gender: string | null;
    address: string | null;
    pincode: string | null;
    age_band: string;
    isUidSame: string
};

const imageSchema = z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
        message: 'File must be an image',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: 'Image size should be less than 5MB',
    })
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
        message: 'Image must be in JPG or PNG format',
    });

function UserInputComponent({ setParseData, setLoading }: { setParseData: React.Dispatch<React.SetStateAction<ExtractedInfo | null>>, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [front, setFront] = useState<File | null>(null);
    const [back, setBack] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);


    const validateImage = (file: File | null) => {
        if (!file) {
            return 'File is required';
        }
        const validationResult = imageSchema.safeParse(file);
        if (!validationResult.success) {
            return validationResult.error.errors[0].message;
        }
        return null;
    };

    const handleSubmit = () => {
        
        if (!front || !back) {
            setError("Aadhaar front and back images needed");
            return;
        }

        const frontError = validateImage(front);
        const backError = validateImage(back);

        if (frontError || backError) {
            setError(frontError || backError);
            return;
        }

        setError(null);

        const formData = new FormData();
        formData.append('images', front);
        formData.append('images', back);
        setLoading(true)
        axios.post(import.meta.env.VITE_SERVER_URL + '/api/ocr', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res.data.data);
                setLoading(false)
                setParseData(res.data.data)
            })
            .catch((err) => {
                console.error(err);
                setError(err.response.data.message ?? 'Image not processable')
                setLoading(false)
            });
    };

    return (
        <div className='px-10'>
            <div className='w-12/12 md:w-6/12 mx-auto'>
                <p className='my-3'>Aadhaar Front</p>
                <FileUpload onChange={setFront} />

                <p className='my-3'>Aadhaar Back</p>
                <FileUpload onChange={setBack} />

                {error && <p className="text-red-500 my-4 mx-4">{error}</p>}

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    PARSE AADHAAR
                </button>
            </div>
        </div>
    );
}

export default UserInputComponent