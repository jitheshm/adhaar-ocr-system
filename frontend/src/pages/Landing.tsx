import  { useState } from 'react';
import UserInputComponent from '../components/UserInputComponent';
import ParsedOutputComponent from '../components/ParsedOutputComponent';
import { ExtractedInfo } from '../types/ExtractedInfo';
import Loading from '../components/Loading';



function Landing() {
    const [parseData, setParseData] = useState<ExtractedInfo | null>(null)
    const [loading, setLoading] = useState(false)
    return (
        <>
            {
                loading && <Loading />
            }
            {

                !parseData ? <UserInputComponent setParseData={setParseData} setLoading={setLoading} /> : <ParsedOutputComponent parseData={parseData} />

            }


        </> 
    )
}

export default Landing;
