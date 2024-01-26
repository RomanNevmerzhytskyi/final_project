const getDataAsyncAwait = async () => {
    try {
        const response = await fetch(' https://wa-server-2-d6303887a0d7.herokuapp.com/api/v1/team-members', {
        method: 'GET'
        });
        
        if(response.status !== 200){
            throw Error('Not successful');
        }
        

        const data = await response.json();
        // console.log(data);
        return data;

    } catch (e) {
        console.log('ERROR>>>>>>>>>>', e);
    }
}

const render = ({avatarUrl, description, firstName, lastName, phone}) => {
    return `
    <div class="member-container">
        <div class="member-avatar"><img src="https://wa-server-2-d6303887a0d7.herokuapp.com${avatarUrl}" alt=""></div>
        <div class="member-info">
            <span class="member-name">${firstName}</span>
            <span class="member-name">${lastName}</span>
        </div>
        <h2 class="member-description"><a href="mailto:exaple@example.com">${description}</a></h2>
        <h3 class="member-phone">${phone}</h3>
    </div>
    `;
}

let isFileUploaded = false;

const label1 = document.querySelector('.txt');

    const section = document.querySelector('.upload-section');

    const errorText = document.querySelector('.error-text');
    const uploadBox = document.querySelector('.upload-btn-box');
    const uploadSPAN = document.querySelector('.SPAN1');

const FileInputHandler = (e) => {
    const fileName = e.target.value.split('\\').pop();
    // const label1 = document.querySelector('.txt');
    // const errorText = document.querySelector('.error-text');
    // const uploadBox = document.querySelector('.upload-btn-box');
    // const uploadSPAN = document.querySelector('.SPAN1');
    console.log(uploadBox);
    console.log(uploadSPAN);

        if (fileName) {
            label1.style.color = 'black';
            label1.textContent = 'Item';
            isFileUploaded = true;
            
        } else {
            uploadBox.classList.remove('upload-btn-box');
            uploadSPAN.classList.remove('SPAN1');

            section.classList.remove('upload-section');
            section.classList.add('upload-sectionError');
            label1.textContent = 'Item';
            uploadBox.classList.add('upload-btn-box2');
            uploadSPAN.classList.add('SPAN2');
            errorText.style.display = 'block';

            isFileUploaded = false;
        }
};

const TextInputHandler = (e) => {
    e.preventDefault();

    const formFields = document.querySelectorAll('.page-form__field');
    const img = document.querySelector('.success-img');
    const SuccessText = document.querySelector('.success-text');

    img.src = './images/success-image.jpg';

    let allFieldsFilled = true;

    formFields.forEach(field => {
        const input = field;
        const value = input.value.trim();

        const container = field.closest('.input-container');
        const errLabel = container.querySelector('.label');
        const errText = container.querySelector('.error-text2');
        const hint = container.querySelector('.userPhone__hint');
        console.log(hint);

        if (value === '') {
            field.classList.add('page-form__field2');
            if (errLabel) errLabel.style.display = 'block';
            if (errText) errText.style.display = 'block';
            if (hint) hint.style.opacity = '0';
            allFieldsFilled = false;
        } else {
            field.classList.remove('page-form__field2');
            if (errLabel) errLabel.style.display = 'none';
            if (errText) errText.style.display = 'none';
            if (hint) hint.style.opacity = '1';
        }
    });

    if (allFieldsFilled && isFileUploaded) {
        SuccessText.style.display = 'block';
        img.style.display = 'block';
    } else {
        SuccessText.style.display = 'none';
        img.style.display = 'none';

        if (!isFileUploaded) {
            section.classList.remove('upload-section');
            section.classList.add('upload-sectionError');
            uploadBox.classList.remove('upload-btn-box');
            uploadSPAN.classList.remove('SPAN1');
            label1.textContent = 'Item';
            uploadBox.classList.add('upload-btn-box2');
            uploadSPAN.classList.add('SPAN2');
            errorText.style.display = 'block';
        } else {
            label1.style.color = 'black';
            label1.textContent = 'Item';

            section.classList.add('upload-section');
            section.classList.remove('upload-sectionError');
            uploadBox.classList.add('upload-btn-box');
            uploadSPAN.classList.add('SPAN1');
            label1.textContent = 'Item';
            uploadBox.classList.remove('upload-btn-box2');
            uploadSPAN.classList.remove('SPAN2');
            errorText.style.display = 'none';
        }
    }
};




export const Members = async (root) => {
    const categories = await getDataAsyncAwait();
    console.log(categories);

    let content = '';

    for(let i = 0; i < categories.length; i++) {
        content += render(categories[i]);
    }

    root.innerHTML = content;
    
    document.getElementById('files').addEventListener('change', FileInputHandler);
    document.querySelector('.page-form').addEventListener('submit', TextInputHandler);
}
