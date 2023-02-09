import React, { useState } from 'react'
import styles from '../../styles/form.module.css'
import { toast } from 'react-toastify';
import { url } from '@/components/url';
import axios from 'axios'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie'



export default function login() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [p, setP] = useState(false)
  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const postData = async (data) => {
    try {
      let res = await axios.post(url + '/api/login', data);
      toast("Login successful!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success"
      });
      localStorage.setItem('task', res.data);
      Cookies.set('task', res.data)
      router.push('/')
    } catch (e) {
      console.log(e.message);
      toast("Invalid credentials!", {
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

    if (data.password && data.username) {

      postData(data).finally(() => setLoading(false))

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
    <div className='w-full h-screen flex justify-center items-center'>

      <form className={styles.form} onSubmit={handleSubmit}>

        <p className='text-2xl'>Welcome !</p>
        <p className='text-3xl font-bold'>Sign in to</p>
        <p className='text-sm mb-5'>Task Manager</p>


        <label className={styles.label}>Username</label>
        <input name='username' onChange={handleChange} placeholder='Enter your username' className={styles.input} />

        <label className={styles.label}>Password</label>
        <div className={styles.formDiv}>
          <input name='password' onChange={handleChange} placeholder='Enter your Password' className={styles.input} type={!p ? 'password' : 'text'} />
          <img onClick={() => setP(!p)} className={styles.formImage} width={'20px'} src={!p ? 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png' : 'https://cdn-icons-png.flaticon.com/512/4298/4298899.png'} />
        </div>

        <button disabled={loading} className={styles.formButton} type='submit'>{loading ? <img width='30px' src='https://cdn-icons-png.flaticon.com/512/3305/3305803.png' /> : 'LOGIN'}</button>
        <Link className='text-center' href='/auth/signup'> <span style={{ color: 'gray' }}>Don't have an account?</span> Register </Link>
      </form>

      <div className={styles.signup_img}>
        <img src='https://i.imgur.com/oWytCBR.png' alt='postimg' />
      </div>

    </div>
  )
}
