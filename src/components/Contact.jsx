import {useState} from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "Jay",
    lastName: "Shaha",
    email: "jay@example.com",
  });
  return (
    <>
      <div>Contact Us Page</div>
      <div>
        <label htmlFor="">
            First Name :
          <input type="text" value={formData.firstName} onChange={e=> {
            setFormData({...formData,lastName:e.target.value});
          }}  />
        </label>
        <label htmlFor="">
            Last Name :
          <input type="text" value={formData.lastName} onChange={e=> {
            setFormData({...formData,lastName:e.target.value});
          }}  />
        </label>
        <label htmlFor="">
            Email :
          <input type="text" value={formData.email} onChange={e=> {
            setFormData({...formData,email:e.target.value});
          }}  />
        </label>

       <br />
       <p>
        {formData.firstName}{' '}{formData.lastName}{' '} - {(formData.email)}
       </p>

      </div>
    </>
  );
};

export default Contact;
