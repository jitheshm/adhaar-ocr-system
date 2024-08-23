import React, { useState } from 'react'
import FileUpload from '../components/FileUpload'

function Landing() {
    const [front, setFront] = useState<File | null>(null)
    const [back, setBack] = useState<File | null>(null)

    const frontOnChange = (file: File | null) => {
        setFront(file)
    }

    const backOnChange = (file: File | null) => {
        setBack(file)
    }
    return (
        <div className='p-10'>
            <div className='w-12/12 md:w-6/12 mx-auto'>
                <p className='my-3'>Aadhaar Front</p>
                <FileUpload onChange={frontOnChange} />

                <p className='my-3'>Aadhaar Back</p>
                <FileUpload onChange={backOnChange} />
            </div>

        </div>
    )
}

export default Landing