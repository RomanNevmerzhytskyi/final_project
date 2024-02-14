const getDataAsyncAwait = async () => {
    try {
        const response = await fetch(' https://wa-server-2-d6303887a0d7.herokuapp.com/api/v1/team-members', {
        method: 'GET'
        });
        
        if(response.status !== 200){
            throw Error('Not successful');
        }
        
        const data = await response.json();

        return data;
    } catch (e) {
        console.log('ERROR>>>>>>>>>>', e);
    }
}

const extractPosition = (inputString) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const match = inputString.match(emailRegex);
  const email = match ? match[0] : '';
  const remaining = email ? inputString.replace(email, '').trim() : inputString.trim();
  return remaining;
}

const extractEmail = (inputString) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const match = inputString.match(emailRegex);
    return match ? match[0] : '';
  };  

const render = ({avatarUrl, description, firstName, lastName, phone}) => {
    return `
    <div class="member-container">
        <div class="member-avatar"><img src="https://wa-server-2-d6303887a0d7.herokuapp.com${avatarUrl}" alt=""></div>
        <div class="member-info">
            <span class="member-name">${firstName}</span>
            <span class="member-name">${lastName}</span>
        </div>
        <h2 class="member-description">${extractPosition(description)}</h2>
        <h2 class="member-description">
            <a href="mailto:${extractEmail(description)}" class="tooltip">${extractEmail(description)}
            <span class="tooltiptext">${extractEmail(description)}</span>
            </a>
        </h2>
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
    console.log(fileName);

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
        Button_checker();
};


const TextInputHandler = (e) => {
    const formFields = document.querySelectorAll('.page-form__field');
     
    formFields.forEach(field => {
        const input = field;
        const value = input.value.trim();
        const container = field.closest('.input-container');
        const errLabel = container.querySelector('.label');
        const errText = container.querySelector('.error-text2');
        const hint = container.querySelector('.userPhone__hint');
            
        try{
            if (value !== '') {
                field.classList.remove('page-form__field2');
                if (errLabel) errLabel.style.display = 'none';
                if (errText) errText.style.display = 'none';
                if (hint) hint.style.opacity = '1';
            } 
        } catch(e){
            console.error('Error', e.message);
    
            field.classList.add('page-form__field2');
            if (errLabel) errLabel.style.display = 'block';
            if (errText) errText.style.display = 'block';
            if (hint) hint.style.opacity = '0';
        }
        });   

    Button_checker();
};


const Button_checker = () => {
    const CheckBTN = document.querySelector('.upload-section__button');

    if (checkAllFieldsFilled() && isFileUploaded) {
        CheckBTN.disabled = false;
    } else {
        CheckBTN.disabled = true;
    }
};


const checkAllFieldsFilled = () => {
    const formFields = document.querySelectorAll('.page-form__field');

    for (const field of formFields) {
        const value = field.value.trim();
        if (value === '') {
            return false;
        }
    }
    return true;
};

const renderSuccess = (e) => {
    e.preventDefault();

    const img = document.querySelector('.success-img');
    const SuccessText = document.querySelector('.success-text');
    img.src = './images/success-image.jpg';

    if (checkAllFieldsFilled() && isFileUploaded) {
        SuccessText.style.display = 'block';
        img.style.display = 'block';
    } else {
        SuccessText.style.display = 'none';
        img.style.display = 'none';
    }
}


export const Members = async (root) => {
    const members = await getDataAsyncAwait();
    console.log(members);

    let content = '';

    for(let i = 0; i < members.length; i++) {
        content += render(members[i]);
    }
    root.innerHTML = content;
    
    document.getElementById('files').addEventListener('change', FileInputHandler);
    document.querySelector('.page-form').addEventListener('submit', renderSuccess);


    for (const field of document.querySelectorAll('.page-form__field')) {
        field.addEventListener('change', TextInputHandler);
    }

    Button_checker();
}
