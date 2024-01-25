import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import supabase from '../components/supabaseClient';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PasswordUpdateForm from '../components/PasswordUpdateForm';
import Toast from '../components/Toast';
import { useUserContext } from '../components/UserContext';


async function uploadFile(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('profile-pics').upload(fileName, file);

    if (error) {
        throw error;
    }
    return data;
}




const AccountSettings = () => {
    const {userData, setUserData} = useUserContext()
   
    const [profile_pic, setProfile_pic] = useState(userData.profile_pic);
    const [imageFile, setImageFile] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [errors, setErrors] = useState('')
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate()
    const server = import.meta.env.VITE_URL

    const handleChangeProPic = (e) => {
        setProfile_pic(e.target.value);
        setImageFile(null); // Reset file input when URL is manually entered
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfile_pic(e.target.result); // Update the profile_pic state with the file's data URL
            };
            reader.readAsDataURL(file);
            setImageFile(file); // Store the selected file
        }
    };

    const handleImgError = (e) => {
        e.target.src =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAACUCAMAAAA9M+IXAAAAMFBMVEXk5ueutLfr7O3n6eqrsbTc3+Cxt7rh4+TV2NqnrrHIzM7Lz9G4vcC/xMbDyMrO0tNHfP24AAAEMUlEQVR4nO2cW5LjIAwAbcTTBnP/2y5+JOvMOAkgLNha+mfy2aWSBQIxw9DpdDqdTqfT6XQ6nU4HATAGSuiAGMLP2jofARDeyXGHj9J5Ba0ag9DLaPh4hhs56aFBY6Zmy19dD2Nu5+aE2SSvXA/hcW4pi2HQl4H9i5HtpAQo91l2C/Gi2vBl+n0enH2taMJ3ipHdUljXVg0skbYBM9eOLyTYhgBX9k2zXX2r2sbm7ROj68UXdKptiG+1+gAqWXatZ9Xqr00PbvB1dWTTE/fwrZO+OamwU0OXZaXCFl5H7wvCZEdX0lcHsNm2YXdGbqvzbdfwUvsmrr6vmIk4G4T8LvUpvMS6GcvvS3hpswGyq9iBY6S+SFvipQJRdHdIGyGGqgsblLWB4erCSLwQA9Z23fbS6Qq0LuXChluBD126XS94vO5IqDvhbQl7itTThUtdT2Xbdf8BXcLcRduS6s4FdCnrLj4ZCOvuUGJVI2ze8w9wnljC9oehbbmlsx0Y4kzk0F0o97sz+lsjvaVA92ojaeeObickaeOOXYY58anTv3WKMyhUbeDUZ2S5FxOHLvXtMKCOICm79sPXIYJLfby7gribIA/uOn2T62voduYnVNSQyG847RLxIPdwhJPfoxy+WUtbtZEGGHLSgXKj+8M3Y2PGK1SFp29y01bTNpDaE1eezQKfkg+VRhnOJGwlTQNzeqAjrwQ5Za/+HlA2JiHMUvcrOzF/mYfdBiDrJ8IDUG78JMzl0sz47gow7d5GmI+uodDuwCCcuchhbswkmgrtAwbaSRnSlO/Zuv6VIbAtum4AG7RfnN1wbvF6aGlG/gIIwVQioNT2u3Hgldo6l+wR1X6eQiLIR96OISGWyesQ6qEZ8ZCc2q+aoQgcmqfFIWC4DNqzVlClRzsBDMRst2rwbVHjUtpFQ7Uvb00Ab7lJ2fAaIyehKlThsCrM7uf7qRg4D0EmHpBmEFLg67bmrfFoF0GWFQBiyVZ9KluaNgiUthk58Bsj59ubCwB//Yguh7CtVHfWNgCdn7HXTDeWCRHV5STBR3+PcPjAPnYM2cL2jr175CO6HN/Rla5qkd1urnDhqxXwd4X2IVzwJSawAmNu33yLvVwKiXBvaHffQtMucNs39oMiLzFB31K+rihw3VZi9jXeFztCUmQEKx6DG/HOeUyJ88XElzQTdhD5i7tVz/XNrw8U9fa3b2b9ZRH/xuAWsta3ArNieWQN8EGBtxG5vjmfW61UWEm/Ikq63isMt6kdJ1S0TZ8nKfDCC4VMi22972wnbbEo8dIAR9KkWY3V95WkVyC028ZL3YS1AvN+vRQJM6j42Wc8fImtvbjp0VJEz8zi36mWIHo6TrUQ3OiXxBVanitiXxKXeN5VgsiVAmpuHU/ETho1UHU34po20YhuZI8pJG+C2CM+1gitzBT8N/wBcX44zAWEsQEAAAAASUVORK5CYII='; 
    };

    const onSubmitProPic = async (e) => {
      e.preventDefault();
      try {
          if (imageFile) {
             const uploadedImage = await uploadFile(imageFile);
             const url = `https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/${uploadedImage.fullPath}`
            
              await updateProfile('profile_pic', url)
          } else if (profile_pic) {
              
              console.log('Image URL:', profile_pic);
              await updateProfile('profile_pic', profile_pic)
          } else {
              console.log('No image selected or URL provided');
          }
          
      } catch (error) {
          console.error('Error in uploading file:', error);
      }
  };



  async function updateProfile(name, value) {
    const updateData = {
      [name]: value
    };
    const config = {
      credentials: 'include',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    };
    const res = await fetch(`${server}/users/${userData.id}`, config);
    if (res.ok) {
      setErrors([]);
      const data = await res.json();
      setUserData(data)
    } else {
      const messages = await res.json();
      setErrors(messages.errors);
      console.log(messages)
    }

  }
  const formik = useFormik({
    initialValues: {
        email: userData.email || ''
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
        try {
            updateProfile('email',values.email)
           
            console.log('Updating email to:', values.email);
          
            setUserData({ ...userData, email: values.email });
            
        } catch (error) {
            console.error('Error updating email:', error);
            
        }
      },
      });

      const handleDeleteAccount = () => {
        document.getElementById('delete').showModal()
    };


      function logout() {
        setUserData(null);
        fetch(`${server}/logout`, {
            method: "DELETE",
            credentials: 'include' 
        })
        .then(response => {
            if (response.ok) {
                navigate("/")
                navigate("/")
            } else {
              
                console.error('Logout failed:', response.status);
            }
        })
        .catch(error => {
            
            console.error('Network error on logout:', error);
        });
    }
      


      const confirmDelete = async () => {
        const server = import.meta.env.VITE_URL;

        try {
            const response = await fetch(`${server}/delete_account`, {
                method: 'DELETE',
               
            });

            if (!response.ok) {
                throw new Error('Error deleting account');
            }

           logout()

        } catch (error) {
            console.error('Failed to delete account:', error);
                   }
    };



      

    return (
        <> 
            <div className='flex flex-row bg-primary'>
                <Sidebar userData={userData} setUserData={setUserData} /> 
                <div className='lg:ml-80 mt-16 min-h-screen h-full w-full lg:w-bg bg-primary sm:bg-base-200'>
                    <div className='ml-4 mr-4'>
            
                        <form className='flex flex-row' onSubmit={(e)=>{onSubmitProPic(e)}} >
                            <div>
                                <div className="label">
                                    <span className="block mb-2  text-secondary sm:text-primary">Change Profile Picture</span>
                                </div>
                                <div className='flex flex-col sm:flex-row align-center items-center'>
                                    <div className="avatar mb-2 sm:mb-0 mx-auto py-0">
                                        <div className="w-24 mr-10 mask mask-hexagon">
                                            <img src={profile_pic } onError={handleImgError} />
                                        </div>
                                    </div>
                                    <input name='profile_pic' value={profile_pic} type="text" placeholder="enter valid URL" onChange={handleChangeProPic} className="input input-bordered w-full max-w-xs" />
                                    <div className="divider">OR</div>
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                                <button className='btn btn-accent mt-4 sm:mt-0 sm:ml-4 ' type='submit'>Update Profile Pic</button>
                                </div>
                            </div>
                        </form>
                        <form className='flex flex-col  mt-24' onSubmit={formik.handleSubmit}>
                          <label htmlFor="email" className="block mb-4 text-secondary sm:text-primary">Change Email</label>
                          <div className='flex align-baseline items-center'>
                              <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  value={formik.values.email}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className=" block w-full sm:w-1/2 rounded-md input input-bordered shadow-sm"
                              />
                          </div>
                          <button type="submit" className="btn btn-accent  btn-sm mt-4 sm:ml-4 sm:w-36">Update Email</button>
                              {formik.touched.email && formik.errors.email ? (
                                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                              ) : null}
                      </form>
                      <PasswordUpdateForm setShowToast={setShowToast} setToastMessage={setToastMessage}/>
                      <div className="divider divider-error">Danger Zone</div>
                      <div className='flex flex-row-reverse'>
                        <button onClick={handleDeleteAccount} className=" mt-12 mb-24 sm:mb-12 btn btn-error">
                          Delete Account
                      </button>
                      </div>         
                     
                    </div>
                </div>
            </div>
            <Toast 
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
            <dialog id="delete" className="modal">
              <div className="modal-box bg-error">
                <h3 className="font-bold text-lg">Danger!</h3>
                <p className="py-4"> Are you sure you want to delete your account? This action cannot be undone.</p>
                <div className="modal-action">
                      
                    <div role="alert" className="alert alert-error mt-8">
                      
                      <div className='flex'>
                        <button onClick={() => document.getElementById('delete').close()}  className="btn btn-sm btn-secondary mr-4">Cancel</button>
                        <button onClick={confirmDelete} className="btn btn-sm btn-warning py-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                          Delete Account</button>
                      </div>
                    </div>
                  
                    
                  
                </div>
              </div>
            </dialog>
        </>
    );
}

export default AccountSettings;
