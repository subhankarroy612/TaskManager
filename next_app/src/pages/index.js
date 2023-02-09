import { url } from "@/components/url";
import axios from "axios";
import { useRouter } from "next/router";
import styles from '../styles/dashboard.module.css'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";


export default function Home({ userData, allTasks }) {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   setData(allTasks)
  // }, []);

  const [task, setTask] = useState('')
  const router = useRouter()
  let date = new Date()
  let nth = function (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }
  let day = date.getDate();
  day += nth(day);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = months[date.getMonth()];
  let year = date.getFullYear();


  const handleLogout = () => {
    localStorage.removeItem('task');
    Cookies.remove('task');
    router.push('/auth/login');
    toast("Logout successful!", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success"
    });
  }

  const handleClick = async () => {

    if (data.length >= 5) {
      toast("Daily limit exceeded.", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error"
      });
    } else {
      setData([...data, task])

      // let date = new Date();
      // let year = date.getFullYear()
      // let month = date.getMonth()
      // let day = date.getDate()
      // let finalDate = year + '-' + (month + 1) + '-' + day
      // finalDate.toString()

      let res = await axios.post(url + '/api/userDetails', { task }, {
        headers: {
          token: localStorage.getItem('task')
        }
      })
      console.log(res.data);

    }
  }


  return (
    <div className="w-full h-screen flex justify-center items-center">

      <div className={styles.dashboard}>
        <p className="text-2xl">Hello</p>
        <p className="text-4xl font-bold">{userData && userData.username}</p>
        <p className="text-2xl">Good to see you here!</p>
        <p className="text-lg font-bold">Tasks for {day} {month}, {year} </p>

        <div className="h-[150px]">
          <ul>
            {
              data && data.map((ele, i) => {
                return <li key={i}>{ele.taskname || ele}</li>

              })
            }
          </ul>
        </div>

        <input onChange={(e) => setTask(e.target.value)} placeholder="Eg. Need to finish my assignment" className={styles.dashboard_input} />
        <button onClick={handleClick} className={styles.dashboard_button}>Add New Task</button>
        <button onClick={handleLogout} className='font-bold'>Logout</button>
      </div>

    </div >
  )
}

export async function getServerSideProps(context) {

  let res;
  const getData = async () => {
    try {
      res = await axios(url + '/api/userDetails'
        , { headers: { token: context.req.cookies.task } }
      )
    } catch (e) {

    }
  }

  await getData()

  return {
    props: {
      userData: res?.data?.userDetails || null,
      allTasks: res?.data?.allTasks || null
    }
  }
}
