const getDataAsyncAwait = async () => {
    try {
        const response = await fetch('https://wa-server-2-d6303887a0d7.herokuapp.com/api/v1/team-members', {
        method: 'GET'
        });
        
        if(response.status !== 200){
            throw Error('Not successful');
        }
        console.log(response);
        
        const data = await response.json();
      
        return data;

    } catch (e) {
        console.log('ERROR>>>>>>>>>>', e);
    }
}

export const Members = async () => {
    const categories = await getDataAsyncAwait();
    console.log(categories);
}
