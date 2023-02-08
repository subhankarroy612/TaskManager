import React, { useState } from 'react'
import styles from '../../styles/form.module.css'

export default function signup() {

  const [p, setP] = useState(false)
  const [cp, setCp] = useState(false)
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    cPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data);
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Email</label>
        <input name='email' onChange={handleChange} placeholder='Enter your email' className={styles.input} />

        <label className={styles.label}>Username</label>
        <input name='username' onChange={handleChange} placeholder='Enter your username' className={styles.input} />

        <label className={styles.label}>Password</label>
        <div className={styles.formDiv}>
          <input name='password' onChange={handleChange} placeholder='Enter your Password' className={styles.input} type={!cp ? 'password' : 'text'} />
          <img onClick={() => setCp(!cp)} className={styles.formImage} width={'20px'} src={!cp ? 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png' : 'https://cdn-icons-png.flaticon.com/512/4298/4298899.png'} />
        </div>


        <label className={styles.label}>Confirm Password</label>
        <div className={styles.formDiv}>
          <input name='cPassword' onChange={handleChange} placeholder='Confirm your Password' className={styles.input} type={!p ? 'password' : 'text'} />
          <img onClick={() => setP(!p)} className={styles.formImage} width={'20px'} src={!p ? 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png' : 'https://cdn-icons-png.flaticon.com/512/4298/4298899.png'} />
        </div>

        <button className={styles.formButton} type='submit'>REGISTER</button>
      </form>

    </div>
  )
}
