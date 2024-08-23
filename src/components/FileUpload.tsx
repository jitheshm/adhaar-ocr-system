import React, { useState, ChangeEvent } from 'react';
import { IoMdCloudUpload } from "react-icons/io";

// Define the prop types
interface FileUploadProps {
    onChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const id = Date.now() + Math.floor(Math.random() * 1000);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        } else {
            setSelectedImage(null); // Clear preview if no file
        }
        onChange(file);
    };

    return (
        <div className='rounded-3xl h-48 bg-[#F0F0F0] flex'>
            <div className='rounded-lg w-[96%] h-44 bg-[#F5F5F5] shadow-sm m-auto'>
                <label htmlFor={`dropzone-file${id}`} className="flex items-center justify-center w-full h-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Selected Preview"
                                className="max-h-32 object-cover"
                            />
                        ) : (
                            <>
                                <IoMdCloudUpload size={40} className='text-indigo-500' />
                                <p className="mb-2 font-semibold text-sm text-indigo-500">Click to Upload/Capture</p>
                            </>
                        )}
                    </div>
                    <input
                        id={`dropzone-file${id}`}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
}

export default FileUpload;
