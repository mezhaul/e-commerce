import { Component, createSignal } from "solid-js";

const ContactLayout:Component = () => {
    const [loading, setLoading] = createSignal(false);
    const [formData,setFormData] = createSignal({
        name: '',
        surname: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
    });
    
    const [formDataError,setFormDataError] = createSignal({
        name: '',
        surname: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
    });

    const changeFormData = (e: any) => {
        const { name, value } = e.currentTarget;
        setFormData((prv) => ({...prv,[name]: value}));
    }

    const changeFormDataError = (e: any) => {
       const { name } = e.currentTarget;
       setFormDataError((prv) => ({...prv,[name]: ''})); 
    }

    const submitFormData = () => {
        const {
            name,
            surname,
            email,
            mobile,
            subject,
            message
        } = formData();
        if(name === '' || surname === '' || email === '' || mobile === '' || subject === 'select' || message === ''){
            if(name === ''){
                setFormDataError((prv) => ({...prv,name:'Name is a required field'}));
            }
            if(surname === ''){
                setFormDataError((prv) => ({...prv,surname:'Surname is a required field'}));
            }
            if(email === ''){
                setFormDataError((prv) => ({...prv,email:'Email is a required field'}));
            }
            if(mobile === ''){
                setFormDataError((prv) => ({...prv,mobile:'Mobile is a required field'}));
            }
            if(subject === 'select'){
                setFormDataError((prv) => ({...prv,subject:'Please make a selection'}));
            }
            if(message === ''){
                setFormDataError((prv) => ({...prv,message:'Please enter a message'}));
            }
            return 
        }
        setLoading(true);
        alert(JSON.stringify(formData()));
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }


    return (
        <div class="w-full m-auto pt-20 flex gap-5">
            <div class="w-11/12 lg:w-1/2 m-auto  p-5">
                <h1 class="text-3xl pb-5">Contact us</h1>
                <div class="text-md flex flex-col gap-3">
                    <div class="flex gap-3">
                        <div class="w-1/2">
                            <label>
                                Name
                            </label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData().name}
                                oninput={changeFormData}
                                onChange={changeFormDataError}
                                placeholder={formDataError().name ? formDataError().name : "Name"}
                                class="w-full h-10 border mt-2 px-2"
                            />
                        </div>
                        <div class="w-1/2">
                            <label>
                                Surname
                            </label>
                            <input 
                                type="text" 
                                name="surname"
                                value={formData().surname}
                                oninput={changeFormData}
                                onChange={changeFormDataError}
                                placeholder={formDataError().surname ? formDataError().surname : "Surname"}
                                class="w-full h-10 border mt-2 px-2"
                            />
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <div class="w-1/2">
                            <label>
                                Email
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData().email}
                                oninput={changeFormData}
                                onChange={changeFormDataError}
                                placeholder={formDataError().email ? formDataError().email : "Email"}
                                class="w-full h-10 border mt-2 px-2"
                            />
                        </div>
                        <div class="w-1/2">
                            <label>
                                Mobile
                            </label>
                            <input 
                                type="tel" 
                                name="mobile"
                                value={formData().mobile}
                                oninput={changeFormData}
                                onChange={changeFormDataError}
                                placeholder={formDataError().mobile ? formDataError().mobile : "Mobile"}
                                class="w-full h-10 border mt-2 px-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label>
                            Subject
                        </label>
                        <select
                            name="subject"
                            class="w-full border mt-2 bg-white h-10 px-2"
                            oninput={changeFormData}
                            onChange={changeFormDataError}
                        >
                            {formDataError().subject !== '' 
                                ? 
                                    <option value="select">{formDataError().subject}</option>
                                :
                                    <option value="select">Select</option>
                            }
                        </select>
                    </div>
                    <div>
                        <label>
                            Message
                        </label>
                        <textarea 
                            name="message" 
                            cols="30" 
                            rows="6"
                            class="w-full border mt-2 resize-none p-2"
                            oninput={changeFormData}
                            onChange={changeFormDataError}
                            placeholder={formDataError().message ? formDataError().message : "Message"}
                        >
                            {formData().message}
                        </textarea>
                    </div>
                    <button
                        onclick={submitFormData} 
                        class="bg-black text-white w-full h-10"
                    >
                        {loading() 
                            ?
                                <div class="loaderSmall m-auto"></div>
                            :
                                'Submit'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContactLayout;