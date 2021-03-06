import React from 'react';
import useServices from '../../hooks/useServices';



const ManageServices = () => {
    const [services, setServices] = useServices();
    const handleDelete = id => {
        const procced = window.confirm('You want to delete?');
        if (procced) {
            const url = `https://secure-woodland-22929.herokuapp.com/service/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        console.log('data deleted');
                        const remaining = services.filter(service => service._id !== id);
                        setServices(remaining);
                    }

                })
        }
        return (
            <div className='w-50 mx-auto'>
                <h2>Manage Your Services: {services.length}</h2>
                {
                    services.map(service => <div key={service._id}>
                        <h5>{service.name} <button onClick={() => handleDelete(service._id)}>X</button></h5>

                    </div>)
                }
            </div>
        );
    };
}

export default ManageServices;