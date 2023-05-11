import SpotForm from './SpotForm';

const CreateSpotForm = () => {
    const spot = {
        country: '',
        address: '',
        city: '',
        state: '',
        lat: 0,
        lng: 0,
        description: '',
        name: '',
        price: 0
    };

    return (
        <SpotForm spot={spot} formType={'post'} />
    )
};

export default CreateSpotForm;
