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

const extractInfo = (texts: string[]): ExtractedInfo|null => {
    const data = texts.join(' ');

    let uid: string | null = null;
    let name: string | null = null;
    let dob: string | null = null;
    let gender: string | null = null;
    let address: string | null = null;
    let pincode: string | null = null;

    const excludedWords = ["Date", "Sil", "India"];

    const uidPattern = /\b(\d{4} \d{4} \d{4})\b/;
    const removeWordsPattern = new RegExp(`\\b(${excludedWords.join('|')})\\b`, 'gi');
    const namePattern = /\b([A-Z][a-z]{2,}(?:\s[A-Z][a-zA-Z]*)+)\b/g;
    const datePattern = /\b(\d{2}\/\d{2}\/\d{4})\b/;
    const genderPattern = /\b(Male|Female)\b/i;
    const addressPattern = /Address:\s*([^-\n]+?)\s*\d{6}/;
    const pincodePattern = /\b\d{6}\b/;

    const checkData = data.match(uidPattern);
    const [beforeDOB] = data.split("DOB");
    const considerData = beforeDOB.replace(removeWordsPattern, '').trim();
    const matches = considerData.match(namePattern);
    const dobMatch = data.match(datePattern) ?? [];
    const genderMatch = data.match(genderPattern) ?? [];
    const addressMatch = data.match(addressPattern) ?? [];
    const pincodeMatch = data.match(pincodePattern) ?? [];
    console.log(data);

    name = matches ? String(matches) : '';
    uid = String(checkData?.every(str => str === checkData[0]) ? checkData[0] : '');
    dob = dobMatch[0] ? String(dobMatch[0]) : '';
    gender = genderMatch[0] ? String(genderMatch[0]) : '';
    address = addressMatch[1] ? String(addressMatch[1]?.trim()) : '';
    pincode = pincodeMatch[0] ? String(pincodeMatch[0]) : '';

    console.log(name);

    const currentYear = new Date().getFullYear();
    const birthYear = dob ? parseInt(dob.split('/')[2], 10) : 0;
    const age = currentYear - birthYear;

    let age_band = '';
    switch (Math.floor(age / 10)) {
        case 0:
            age_band = '0-9';
            break;
        case 1:
            age_band = '10-19';
            break;
        case 2:
            age_band = '20-29';
            break;
        case 3:
            age_band = '30-39';
            break;
        case 4:
            age_band = '40-49';
            break;
        case 5:
            age_band = '50-59';
            break;
        case 6:
            age_band = '60-69';
            break;
        case 7:
            age_band = '70-79';
            break;
        default:
            age_band = '80+';
            break;
    }
    
    if (uid && name && dob && gender && address && pincode) {
        return {
            UID: uid ?? '',
            Name: name ?? '',
            DOB: dob ?? '',
            Gender: gender ?? '',
            address: address ?? '',
            pincode: pincode ?? '',
            age_band: age_band ?? '',
            isUidSame: uid ? 'yes' : 'NO'
        };
    }
    else {
        return null
    }

}

export default extractInfo;
