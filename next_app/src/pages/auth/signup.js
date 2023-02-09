import React, { useState } from 'react'
import styles from '../../styles/form.module.css'
import { toast } from 'react-toastify';
import { url } from '@/components/url';
import axios from 'axios'
import { useRouter } from 'next/router';
import Link from 'next/link';




export default function signup() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [p, setP] = useState(false)
  const [cp, setCp] = useState(false)
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    cPassword: ''
  })

  const postData = async (data) => {
    try {
      let res = await axios.post(url + '/api/signup', data);
      toast("Signup successful!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success"
      });
      console.log(res);
      router.push('/auth/login')
    } catch (e) {
      console.log(e.message);
      toast("User already exists!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error"
      });
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (data.password && data.username && data.email && data.cPassword) {
      if (data.password === data.cPassword) {

        if (data.password.length < 5 || !data.email.includes('@gmail.com')) {
          setLoading(false)

          toast("Password should be more than 5 charecters || Enter a valid Email!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error"
          });
        } else {
          postData(data).finally(() => setLoading(false))
        }
        setLoading(false)
      } else {
        setLoading(false)

        toast("Please confirm the password!", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error"
        });
      }
    } else {
      setLoading(false)
      toast("Please fill all the details!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error"
      });
    }

  }

  return (
    <div className='w-full h-screen flex flex-row justify-center items-center p-10'>


      <form className={styles.form} onSubmit={handleSubmit}>

        <p className='text-2xl'>Welcome !</p>
        <p className='text-3xl font-bold'>Sign up to</p>
        
        <p className='text-sm mb-5'>Task Manager</p>


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

        <button disabled={loading} className={styles.formButton} type='submit'>{loading ? <img width='30px' src='https://cdn-icons-png.flaticon.com/512/3305/3305803.png' /> : 'REGISTER'}</button>
        <Link className='text-center' href='/auth/login'> <span style={{ color: 'gray' }}>Already have an account?</span> Login</Link>
      </form>


      <div className={styles.signup_img}>
        <img src='https://i.imgur.com/oWytCBR.png' alt='postimg' />
      </div>

    </div>
  )
}
